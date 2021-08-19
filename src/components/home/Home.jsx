import './home.scss'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { Tooltip } from '@material-ui/core';

export const queriedProductList = [
    {
        "id": "0",
        "title": "Keyboard x1312",
        "img": "https://i.dell.com/is/image/DellContent//content/dam/global-asset-library/Products/peripherals_dell/Keyboards/aw410k/aw410k_ckb_rf_gy.psd?fmt=pjpg&pscan=auto&scl=1&wid=3422&hei=2468&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0&size=3422,2468",
        "keywords": ["title", "key1", "key2"],
        "cart": 4,
        "orders": 3,
        "pricing": [
            {
                "cost": 10,
                "qty": 8
            },
            {
                "cost": 7,
                "qty": 30
            },
            {
                "cost": 5,
                "qty": 100
            },
            {
                "cost": 3,
                "qty": 300
            },
        ],
        "expiry": 1629359273,
        "delivery": 1629469273,
        "schedule": [
            {
                "title": "Production Begins",
                "deadline": 1629409273
            },
            {
                "title": "Production Completed",
                "deadline": 1629429273
            },
            {
                "title": "Products Shipped",
                "deadline": 1629429273
            },
        ],
        "status": -2
    },
    {
        "id": "1",
        "title": "Longboard xa13",
        "img": "https://m.media-amazon.com/images/I/71chafl5hRL._AC_SL1500_.jpg",
        "keywords": ["title", "key1", "key2"],
        "cart": 4,
        "orders": 29,
        "pricing": [
            {
                "cost": 10,
                "qty": 8
            },
            {
                "cost": 7,
                "qty": 30
            },
            {
                "cost": 5,
                "qty": 100
            },
            {
                "cost": 3,
                "qty": 300
            },
        ],
        "expiry": 1639359273,
        "delivery": 1623569273,
        "status": -1
    },
    {
        "id": "2",
        "title": "Laptop dfbd213",
        "img": "data:image/jpeg;base64,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",
        "keywords": ["title", "key1", "key2"],
        "cart": 4,
        "orders": 32,
        "pricing": [
            {
                "cost": 10,
                "qty": 8
            },
            {
                "cost": 7,
                "qty": 30
            },
            {
                "cost": 5,
                "qty": 100
            },
            {
                "cost": 3,
                "qty": 300
            },
        ],
        "expiry": 1631359273,
        "delivery": 1636769273,
        "status": -1
    },
    {
        "id": "3",
        "title": "Shoes 39291",
        "img": "data:image/jpeg;base64,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",
        "keywords": ["title", "key1", "key2"],
        "cart": 4,
        "orders": 2000,
        "pricing": [
            {
                "cost": 10,
                "qty": 8
            },
            {
                "cost": 7,
                "qty": 30
            },
            {
                "cost": 5,
                "qty": 100
            },
            {
                "cost": 3,
                "qty": 300
            },
        ],
        "expiry": 1629359273,
        "delivery": 1649869273,
        "status": 2,
        "schedule": [
            {
                "title": "Production Begins",
                "deadline": 1629409273
            },
            {
                "title": "Production Completed",
                "deadline": 1629429273
            },
            {
                "title": "Products Shipped",
                "deadline": 1629429273
            },
        ],
    },
]

const TextProgressBar = (props) => {
    return (
        <div className="text-progress-bar" style={{ width: 210 }}>
            <div className="bar-fill" style={{ width: 210 * props.progress }}>
            </div>
            <h4>{props.text}</h4>
        </div>
    )
}

const PriceView = (props) => {
    var currentPriceIndex = 0;
    var nextPriceIndex = 0;
    for (var i = 0; i < props.pricing.length; i++) {
        if (props.currentQty < props.pricing[i].qty) {
            currentPriceIndex = i - 1
            nextPriceIndex = i

            if (i === 0) {

                return (
                    <div className="price-view">
                        <h4 className="current-price"> {props.pricing[nextPriceIndex].qty - props.currentQty + " Orders More"}
                            {props.noCart ?
                                <span></span> :
                                <span className="add-cart"><AddShoppingCartIcon /></span>
                            }
                        </h4>
                        <TextProgressBar text={props.currentQty + "/" + props.pricing[nextPriceIndex].qty + " orders"} progress={props.currentQty / props.pricing[nextPriceIndex].qty} />
                        <h4 className="next-price">to {props.pricing[nextPriceIndex].cost} ETH</h4>
                    </div>
                )
            }

            break
        }

        if (i === props.pricing.length - 1) {
            currentPriceIndex = i

            return (
                <div className="price-view">
                    <h4 className="current-price">{props.pricing[currentPriceIndex].cost} ETH
                        {props.noCart ?
                            <span></span> :
                            <span className="add-cart"><AddShoppingCartIcon /></span>
                        }
                    </h4>
                    <TextProgressBar text={props.currentQty + "/" + props.pricing[currentPriceIndex].qty + " orders"} progress={1} />
                </div>
            )
        }
    }

    return (
        <div className="price-view">
            <h4 className="current-price">{props.pricing[currentPriceIndex].cost} ETH
                {props.noCart ?
                    <span></span> :
                    <span className="add-cart"><AddShoppingCartIcon /></span>
                }
            </h4>
            <TextProgressBar text={props.currentQty + "/" + props.pricing[nextPriceIndex].qty + " orders"} progress={props.currentQty / props.pricing[nextPriceIndex].qty} />
            <h4 className="next-price">to {props.pricing[nextPriceIndex].cost} ETH</h4>
        </div>
    )
}

const DatesRowView = (props) => {
    var expiryDate = new Date(0)
    expiryDate.setUTCSeconds(props.expiry)
    var expiryStr
    switch (true) {
        case props.status === -2:
            expiryStr = "DEMAND NOT MET"
            break
        case props.status >= 0:
            expiryStr = "ORDERS CLOSED"
            break
        default:
            expiryStr = expiryDate.toLocaleString().split(',')[0]
    }

    var deliveryDate = new Date(0)
    deliveryDate.setUTCSeconds(props.delivery)
    var deliveryStr = deliveryDate.toLocaleString().split(',')[0]

    return (
        <div className="dates-row-view">
            <Tooltip arrow title={props.status === -1 || props.status == null ? <h5>Order Deadline</h5> : <h5>Orders Closed</h5>}>
                <div className="expiry"> {expiryStr} </div>
            </Tooltip>
            <Tooltip arrow title={<h5>get your order by this date</h5>}>
                <div className="delivery">
                    <LocalShippingIcon fontSize="inherit" />
                    <span>{deliveryStr}</span>
                </div></Tooltip>
        </div >
    )
}

export const ProductCard = (props) => {
    const product = props.product

    return (
        <div className="product" key={product.title.concat(product.id)} style={product.status === -1 || product.status == null ? { opacity: 1 } : { opacity: 0.55 }}>
            <div className="img-wrapper">
                <img src={product.img} alt="" />
            </div>
            <div className="text-wrapper">
                <h3>{product.title}</h3>
                <div className="pricing">{/* can do the css rule to only display the first item*/}
                    <PriceView pricing={product.pricing} currentQty={product.orders} noCart={props.noCart} />
                </div>
                <div className="dates-row">
                    <DatesRowView expiry={product.expiry} delivery={product.delivery} status={product.status} />
                </div>
            </div>
        </div >
    )
}


export default function Home() {
    return (
        <div className="home">
            <div className="container">
                {queriedProductList.map((product) => (
                    <ProductCard product={product} />
                ))}
            </div>
        </div>
    )
}
