import './cart.scss'
import { ProductCard, queriedProductList } from '../home/Home'
import { Button } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox';

const cartProducts = queriedProductList

export default function Cart() {
    return (
        <div className="cart">
            <h1>Shopping Cart</h1>
            <div className="container">
                {cartProducts.map((product) => (
                    <div className="cart-items">
                        <ProductCard product={product} />
                        <div className="controls">
                            <Button className="btn" color="inherit" variant="outlined" >-</Button>
                            <h3> 2</h3>
                            <Button className="btn" color="inherit" variant="outlined" >+</Button>
                            <Checkbox color="inherit" size="large"
                            // checked={checked}
                            // onChange={handleChange}
                            // inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Button className="btn" color="inherit" variant="outlined" >Checkout</Button>
        </div>
    )
}
