import './orders.scss'
import { ProductCard } from '../home/Home'
import { DeadlineSchedule } from '../sell/Sell'
import { BuyerReceived, BuyerRequestRefund } from '../../contract'
import { Button } from '@material-ui/core'

// const orderedProducts = queriedProductList

export default function Orders(props) {
    return (
        <div className="orders">
            <h1>My Orders</h1>
            <div className="container">
                {
                    props.products == null ?
                        <div className="no-result">
                            <h2>
                                Loading...
                            </h2>
                        </div> : (
                            props.products.length === 0 ?
                                <div className="no-result">
                                    <h2>
                                        No Orders Yet ...
                                    </h2>
                                </div> :

                                props.products.map((product) => (
                                    <div className="order-items">
                                        <h2>{product.user_item_data[0]} x </h2>
                                        <ProductCard product={product} />
                                        <div className="order-status">
                                            <DeadlineSchedule product={product} canReceive />
                                        </div>
                                        <div className="flex-column">
                                            {product.production_status === "ORDERS_CLOSED" && parseInt(product.user_item_data[1]) > 0 ?
                                                <div>
                                                    <br />
                                                    <Button onClick={() => BuyerReceived(product.product_address)} className="btn" color="inherit" variant="outlined" >Received!</Button>
                                                    <br />
                                                    <br />

                                                </div> : <div></div>
                                            }
                                            {
                                                parseInt(product.user_item_data[1]) > 0 && Date.now() / 1000 >= product.promised_deadline ?
                                                    <div>
                                                        <Button onClick={() => BuyerRequestRefund(product.product_address)} className="btn" color="inherit" variant="outlined" >Request Refund</Button>
                                                        <br />
                                                        <span>*Refund will only succeed once the 'Deliveries Completed' deadline is reached*</span>
                                                    </div>
                                                    : <div></div>
                                            }
                                        </div>
                                    </div>
                                )))}
            </div>
        </div>
    )
}
