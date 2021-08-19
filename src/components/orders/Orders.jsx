import './orders.scss'
import { ProductCard, queriedProductList } from '../home/Home'
import { DeadlineSchedule } from '../sell/Sell'

const orderedProducts = queriedProductList

export default function Orders() {
    return (
        <div className="orders">
            <h1>My Orders</h1>
            <div className="container">
                {orderedProducts.map((product) => (
                    <div className="order-items">
                        <ProductCard product={product} />
                        <div className="order-status">
                            <DeadlineSchedule product={product} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
