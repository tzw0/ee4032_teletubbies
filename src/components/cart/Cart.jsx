import './cart.scss'
import { ProductCard } from '../home/Home'
import { Button } from '@material-ui/core'
// import Checkbox from '@material-ui/core/Checkbox';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { CheckoutCart, web3 } from '../../contract';

// const cartProducts = queriedProductList

export default function Cart(props) {
    const getCartItems = () => {
        var cartItems = [];
        for (const [key, value] of Object.entries(props.productsQuantity)) {
            cartItems.push({
                "addr": key,
                "quantity": value
            })
        }

        return cartItems
    }

    var totalCost = 0

    return (
        <div className="cart">
            <h1>Shopping Cart</h1>
            <div className="container">
                {Object.keys(props.products).map((productAddress) => {
                    const product = props.products[productAddress]
                    totalCost += Number(web3.utils.fromWei(String(product.cost), 'ether')) * props.productsQuantity[productAddress]

                    return (
                        <div className="cart-items">
                            {/* <Checkbox color="inherit" size="large"
                            onChange={handleChange}
                             inputProps={{ 'aria-label': 'primary checkbox' }}
                            /> */}
                            <ProductCard product={product} />
                            <div className="controls">
                                <h3>
                                    <span onClick={() => props.removeFromCart(product)}> <RemoveCircleOutlineIcon fontSize="inherit" /> </span>
                                    {props.productsQuantity[productAddress]}
                                    <span onClick={() => props.addToCart(product)}> <AddCircleOutlineIcon fontSize="inherit" /></span>
                                </h3>

                            </div>
                        </div>
                    )
                }

                )}
            </div>
            {
                Object.keys(props.products).length === 0 ?
                    <div className="empty-cart">
                        <h2>Cart is empty...</h2>
                    </div> :
                    <div className="btn-wrapper">
                        {/* <Button className="btn" color="inherit" variant="outlined" >Save Cart</Button> */}
                        <Button className="btn" color="inherit" variant="outlined" onClick={() => { CheckoutCart(getCartItems(), totalCost * 2); props.clearCart(); }} >Checkout &nbsp; <strong>{" (" + totalCost + " ETH)"}</strong></Button>
                        <span>*Actual transaction includes a deposit equal to the cost of the item. Once the order is complete, the deposit will be refunded to you.*</span>
                    </div>
            }
        </div>
    )
}
