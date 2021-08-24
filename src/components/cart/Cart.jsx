import './cart.scss'
import { ProductCard, queriedProductList } from '../home/Home'
import { Button } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const cartProducts = queriedProductList

export default function Cart() {
    return (
        <div className="cart">
            <h1>Shopping Cart</h1>
            <div className="container">
                {cartProducts.map((product) => (
                    <div className="cart-items">
                        <Checkbox color="inherit" size="large"
                        // onChange={handleChange}
                        // inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <ProductCard product={product} />
                        <div className="controls">
                            <h3>
                                <span> <RemoveCircleOutlineIcon fontSize="inherit" /> </span>
                                2
                                <span> <AddCircleOutlineIcon fontSize="inherit" /></span>
                            </h3>

                        </div>
                    </div>
                ))}
            </div>
            <div className="btn-wrapper">
                <Button className="btn" color="inherit" variant="outlined" >Save Cart</Button>
                <Button className="btn" color="inherit" variant="outlined" >Checkout</Button>
            </div>
        </div>
    )
}
