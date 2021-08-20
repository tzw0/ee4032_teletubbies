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
import Footer from "./components/footer/Footer";
import Test from './components/test/Test';
// import Account from "./components/account/Account";


function App() {

  return (
    <div className="app">
      <Router>
        <Topbar />
        <div className="pages">
          <Switch>
            {/* <Route path="/account" component={Account} /> */}
            <Route path="/store" component={Sell} />
            <Route path="/orders" component={Orders} />
            <Route path="/cart" component={Cart} />
            <Route path={["/test", "/account"]} component={Test}>
            </Route>
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
