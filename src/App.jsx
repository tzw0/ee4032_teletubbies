import './app.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Topbar from "./components/topbar/Topbar";
import Home from "./components/home/Home";
import Sell from "./components/sell/Sell";
import Orders from "./components/orders/Orders";
import Cart from "./components/cart/Cart";
// import Footer from "./components/footer/Footer";
// import Test from './components/test/Test';
import Login from "./components/login/Login";
import { useState } from 'react';
import { BrowseProduct, GetMyProducts, GetOrderedProducts, eventEmitterContract } from './contract';
import { useMount } from 'react-use';
import { GlobalDomainPrefix } from './global';

function App() {
  const [keyword, setKeyword] = useState("all")
  const [browsedData, setBrowsedData] = useState(null)
  const [orderData, setOrderData] = useState(null)
  const [sellingData, setSellingData] = useState(null)
  const [cartProducts, setCartProducts] = useState({})
  const [cartProductsQuantity, setCartProductsQuantity] = useState({})
  // const [account, setAccount] = useState('loading..')

  const getSellingData = () => {
    setSellingData(null);
    loadSellingData();
  }

  const loadSellingData = async () => {
    const products = await GetMyProducts()
    setSellingData(products);
  }

  const getOrderData = () => {
    setOrderData(null);
    loadOrderData();
  }

  const loadOrderData = async () => {
    const products = await GetOrderedProducts()
    setOrderData(products);
  }

  const getHomeProducts = (keyword_) => {
    setBrowsedData(null);
    searchProducts(keyword_);
  }

  const searchProducts = async (keyword_) => {
    if (keyword_ == null) {
      return
    }
    setKeyword(keyword_)
    const browseData = await BrowseProduct(keyword_);
    setBrowsedData(browseData);
  }

  const addToCart = (product) => {
    const count = cartProductsQuantity[product.product_address] == null ? 1 : (cartProductsQuantity[product.product_address] + 1)
    setCartProductsQuantity((prevState => ({
      ...prevState,
      [product.product_address]: count
    })))
    setCartProducts((prevState => ({
      ...prevState,
      [product.product_address]: product
    })))
  }

  const removeFromCart = (product) => {
    const count = cartProductsQuantity[product.product_address] == null
      || cartProductsQuantity[product.product_address] <= 1 ? null : (cartProductsQuantity[product.product_address] - 1)

    const newCartProductsQuantity = { ...cartProductsQuantity }

    const newCartProducts = { ...cartProducts }

    if (count == null) {
      delete newCartProductsQuantity[product.product_address]
      delete newCartProducts[product.product_address]
    } else {
      newCartProductsQuantity[product.product_address] = count
    }

    setCartProductsQuantity(newCartProductsQuantity)
    setCartProducts(newCartProducts)
  }

  const clearCart = () => {
    setCartProducts({})
    setCartProductsQuantity({})
  }

  useMount(() => {
    getHomeProducts(keyword)
    getSellingData()
    getOrderData()
  });

  eventEmitterContract.events.ProductEvents({
  }).on('data', event => getHomeProducts(keyword))

  // window.ethereum.on('accountsChanged', function (accounts) {
  //   setAccount(accounts[0])
  // })

  eventEmitterContract.events.UserEvents({
    filter: {
      // user_address: 
    }
  }).on('data', event => { getSellingData(); getOrderData(); })

  return (
    <div className="app">
      <Router>
        <Topbar onKeywordChange={getHomeProducts} keyword={keyword} />
        <div className="pages">
          <Login />
          <Switch>
            <Route path={GlobalDomainPrefix + "/myshop"} > <Sell products={sellingData} /> </Route>
            <Route path={GlobalDomainPrefix + "/orders"} > <Orders products={orderData} /> </Route>
            <Route path={GlobalDomainPrefix + "/cart"} > <Cart products={cartProducts} productsQuantity={cartProductsQuantity} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} /></Route>
            {/* <Route path={"/test"} component={Test}> */}
            {/* </Route> */}
            <Route path={[GlobalDomainPrefix, "/"]}> <Home products={browsedData} orders={orderData} keyword={keyword} addToCart={addToCart} /> </Route>
          </Switch>
        </div>
      </Router>
      <div className="space"></div>
      {/* <Footer /> */}
    </div >
  );
}

export default App;
