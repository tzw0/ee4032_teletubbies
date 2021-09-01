import './footer.scss'
import StoreIcon from '@material-ui/icons/Store';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export default function PageFooter() {
    return (
        <div className="footer">
            <div className="padding"></div>

            <div className="container">
                {/* <h2>Shoppeth Topbar menu navigation</h2> */}
                <div className="info">
                    <HomeIcon />
                    <div> Go back to Home
                    </div>
                </div> &nbsp;&nbsp;&nbsp;
                <div className="info">
                    <StoreIcon />
                    <div> Go to My Shop to start selling on shoppeth or to manage your products
                    </div>
                </div>
                <div className="info">
                    <ShoppingCartIcon />
                    <div> Go to Shopping Cart to checkout products added
                    </div>
                </div>
                <div className="info">
                    <LocalMallIcon />
                    <div> Go to My Orders to check status of orders, declare item received or request for a refund
                    </div>
                </div>
                <div className="info">
                    <SearchIcon />
                    <div> Type the product name, a product keyword, seller's address,
                    </div>
                </div>
            </div>
        </div>
    )
}
