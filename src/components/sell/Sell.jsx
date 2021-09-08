import './sell.scss'
import { ProductCard } from '../home/Home'
import { Button } from '@material-ui/core'
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { MainColor, Background, SecondaryColorFaded, SecondaryColor, PrimaryColor } from '../../global'
import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { CancelNRefund, CreateProduct, SellerCloseOrders, SetProgressDone, AddProgress } from '../../contract';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import { web3 } from '../../contract';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import InfoIcon from '@material-ui/icons/Info';

export const DeadlineSchedule = (props) => {
    const product = props.product
    const epochToDate = (epoch) => {
        var date = new Date(0)
        date.setUTCSeconds(epoch)

        return date.toLocaleString('en-GB').split(',')[0]
    }

    const stepperDataFixed = [
        {
            "icon": ShoppingCartIcon,
            "title": "Orders Open",
            "deadline": "Launched"
        },
        {
            "icon": AssignmentTurnedInIcon,
            "title": "Orders Closed",
            "deadline": epochToDate(product.order_close_date),
        },].concat(
            product.progress ?
                product.progress.map((status) => ({
                    "icon": null,
                    "title": status.title,
                    "deadline": status.timestamp == null || status.timestamp === 0 ? "-/-/-" : epochToDate(status.timestamp)
                })) : [])

    const stepperDataRefunded = stepperDataFixed.concat(
        {
            "icon": LocalAtmIcon,
            "title": "Refunded",
            "deadline": epochToDate(product.promised_deadline),
        })

    const stepperDataDelivered = stepperDataFixed.concat(
        {
            "icon": LocalShippingIcon,
            "title": "Deliveries Completed",
            "deadline": epochToDate(product.promised_deadline),
        })

    const stepperData = parseInt(product.user_item_data[1]) < 0 ? stepperDataRefunded : stepperDataDelivered

    const getFormattedIcon = (OriginalIcon) => {
        const formattedIcon = (props) => {
            return (
                <div className="icon" style={props.completed || props.active ? { opacity: 1, color: PrimaryColor } : { opacity: 0.3, color: SecondaryColor }}>
                    {OriginalIcon === null ? (
                        props.completed || props.active ? <CheckCircleOutlineIcon /> : <RadioButtonUncheckedIcon />
                    ) : <OriginalIcon />}
                </div>
            )
        }
        return formattedIcon
    }

    const currentStatus = product.production_status === "ORDERS_CANCELLED" ? "PRODUCT CANCELLED" : stepperData[product.current_progress].title
    const activeStep = parseInt(product.user_item_data[1]) <= 0 ? stepperData.length - 1 : parseInt(product.current_progress)

    return (
        <div className="deadline-schedule">

            {
                <span> &nbsp; &nbsp; &nbsp; &nbsp; Current Status: <strong>{currentStatus}</strong></span>
            }

            <Stepper alternativeLabel activeStep={activeStep}>
                {stepperData.map((status, index) => (
                    <Step key={status}>
                        <StepLabel StepIconComponent={getFormattedIcon(status.icon)}>
                            <div className="text-box">
                                <div className="deadline">{status.deadline}</div>
                                <div className="title">{status.title}</div>
                            </div>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    )
}

const DeadlineScheduleControls = (props) => {
    //somehow this state does not rerender when variable changes
    const { current_progress, progress, production_status } = props.product
    var CancelVisibile = true;
    var NextStepVisibile = true;
    var CloseOrders = false;
    var NextStepTitle = ""
    var CancelTitle = "Cancel & Refund"
    const haveCustomSchedule = !(progress == null || progress.length === 0)
    //deploy
    switch (parseInt(current_progress)) {
        case 0:
            NextStepVisibile = false
            if (Date.now() / 1000 >= props.product.order_close_date &&
                props.product.current_orders >= props.product.min_orders) {
                CloseOrders = true
            }
            CancelTitle += " existing orders"
            break
        case 1:
            if (!haveCustomSchedule) {
                // NextStepTitle = "Deliveries Completed"
                NextStepVisibile = false
                break
            }
        // eslint-disable-next-line
        case 2:
            if (!haveCustomSchedule) {
                CancelVisibile = false
                NextStepVisibile = false
                break
            }
        // eslint-disable-next-line
        default:
            if (haveCustomSchedule) {
                const intCurrent_progress = parseInt(current_progress);
                if (intCurrent_progress === progress.length + 1) {
                    // NextStepTitle = "Deliveries Completed"
                    // CancelVisibile = false
                    NextStepVisibile = false
                } else if (intCurrent_progress > progress.length + 1) {
                    CancelVisibile = false
                    NextStepVisibile = false
                } else {
                    NextStepTitle = progress[intCurrent_progress - 1].title
                }
            } else {
                CancelVisibile = false
                NextStepVisibile = false
                break
            }
    }

    if (production_status === "ORDERS_CANCELLED") {
        NextStepVisibile = false
        CloseOrders = false
        CancelVisibile = false
        // NextStepTitle = "Relaunch Product"
    }

    return (
        <div className="btn-wrapper">
            {
                CloseOrders ?
                    <Button className="btn" color="inherit" variant="outlined" onClick={() => SellerCloseOrders(props.product.product_address)} >
                        <CancelPresentationIcon /> &nbsp;
                        Close Orders
                    </Button> : <div></div>
            }
            {
                NextStepVisibile ?
                    <Button className="btn" color="inherit" variant="outlined" onClick={() => SetProgressDone(props.product.product_address)}>
                        <CheckCircleIcon /> &nbsp;
                        {NextStepTitle}
                    </Button> : <div></div>
            }
            {
                CancelVisibile ?
                    <Button onClick={() => CancelNRefund(props.product.product_address)} className="btn refund" color="inherit" variant="outlined" >
                        <CancelIcon /> &nbsp;
                        {CancelTitle}
                    </Button> : <div></div>
            }
        </div>
    )
}

export default function Sell(props) {
    const [selectedProductIndex, setSelectedProductIndex] = useState(0)
    const selectedProduct = props.products == null || props.products.length === 0 ? null : props.products[selectedProductIndex]

    const [daysToOrderClose, setDaysToOrderClose] = useState(0)
    const [daysToPromisedDeadline, setDaysToPromisedDeadline] = useState(0)
    const [keywords, setKeywords] = useState("")
    const [img, setImg] = useState("")
    const [productTitle, setProductTitle] = useState("")
    const [minOrder, setMinOrder] = useState(0)
    const [maxOrder, setMaxOrder] = useState(0)
    const [stageTitle, setStageTitle] = useState("")
    const [stageTimestamp, setStageTimestamp] = useState(0)
    const [cost, setCost] = useState(0)
    const classes = UseAutocompleteStyles();
    const onProductClick = (productListIndex) => {
        setSelectedProductIndex(productListIndex)
    }

    const callCreateProduct = (e) => {
        e.preventDefault();
        CreateProduct(
            productTitle,
            img,
            keywords,
            minOrder,
            maxOrder,
            cost,
            daysToOrderClose,
            daysToPromisedDeadline
        )
        e.target.reset();
    }

    return (
        <div className="sell">
            <h1>My Shop</h1>
            <div className="section-wrapper">
                <h2>My Products</h2>
                {
                    props.products == null ? <div className="no-result">
                        <h2>Loading ...</h2>
                    </div> :
                        (props.products.length === 0 ?
                            <div className="no-result">
                                <h2>No Products Found ...</h2>
                            </div> :
                            <div className="container">
                                {props.products.map((product, index) => (
                                    <div onClick={() => onProductClick(index)}>
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        )}
                <br />

                {selectedProduct == null ? <div></div> :
                    <div>
                        <div className="selected-product">
                            <h2>Product Status of: </h2>
                            <Autocomplete
                                classes={classes}
                                freeSolo
                                id="search-bar"
                                value={selectedProduct.product_name}
                                onChange={(event) => { setSelectedProductIndex(event.target.dataset.optionIndex); }}
                                // disableClearable
                                options={props.products.map((product) => product.product_name)}
                                style={{ width: "400px", color: "white" }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        margin="normal"
                                        variant="outlined"
                                        InputProps={{
                                            ...params.InputProps,
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <span>* select product by clicking it in My Products section *</span>

                        <div className="field-container">
                            <div className="field">
                                <h3>Current Orders:</h3> <h2>{selectedProduct.current_orders}<LocalMallIcon fontSize="inherit" /></h2>
                            </div>
                            <div className="field">
                                <h3>Min Orders:</h3><h4>{selectedProduct.min_orders}<LocalMallIcon fontSize="inherit" /></h4>
                            </div>
                            <div className="field">
                                <h3>Max Orders:</h3> <h4>{selectedProduct.max_orders}<LocalMallIcon fontSize="inherit" /></h4>
                            </div>
                            <div className="field">
                                <h3>Cost:</h3>
                                <h4>{web3.utils.fromWei(String(selectedProduct.cost), 'ether')} ETH</h4>
                            </div>
                            <div className="order-status-wrapper">
                                <div className="field">
                                    <h3>Product Timeline:</h3>
                                </div>
                                <div className="order-status">
                                    <DeadlineSchedule product={selectedProduct} />
                                    <DeadlineScheduleControls product={selectedProduct} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>

            {selectedProduct == null || selectedProduct.production_status === "ORDERS_CANCELLED" ||
                selectedProduct.production_status === "ORDERS_ENDED" ? <div></div> :
                <div className="section-wrapper">
                    <h2>Add Progress Stage to <strong>{selectedProduct.product_name}</strong></h2>
                    <div className="field-container">
                        <div className="field">
                            <h3>Stage Name:</h3>
                            <input className="input-field" name="progress_state" required input="text" placeholder="Production Completed" onInput={e => setStageTitle(e.target.value)} />
                        </div>
                        <div className="field">
                            <h3>Estimated Completion Time:</h3>
                            <input className="input-field" name="estimated_timestamp" input="text" placeholder="i.e. 1629366318" onInput={e => setStageTimestamp(e.target.value)} />
                        </div>
                        <Button className="btn" color="inherit" variant="outlined" type="submit"
                            onClick={() => AddProgress(selectedProduct.product_address, stageTitle, stageTimestamp)}>Add +</Button>
                    </div>
                </div>}



            <div className="section-wrapper">
                <h2>Add New Product
                    {/* <AddCircleOutlineIcon fontSize="inherit" /> */}
                </h2>
                <form action="" onSubmit={callCreateProduct}>
                    <div className="field-container">

                        <div className="field">
                            <h3>Product Title:</h3>
                            <input className="input-field" name="title" required input="text" placeholder="i.e. keyboard"
                                onInput={e => setProductTitle(e.target.value)} />
                        </div>
                        <div className="field">
                            <h3>Img Src:</h3>
                            <input className="input-field" name="img" required input="text" placeholder="i.e. my.stuff/keyboard.jpg"
                                onInput={e => setImg(e.target.value)} />
                        </div>
                        <div className="field">
                            <h3>Cost</h3>
                            <input className="input-field" name="cost" placeholder="i.e. 1" required input="text"
                                onInput={e => setCost(e.target.value)}
                            />
                        </div>

                        <div className="field">
                            <h3>Minimum Orders</h3>
                            <input className="input-field" name="min-orders" placeholder="i.e. 30" required input="text"
                                onInput={e => setMinOrder(e.target.value)} />
                        </div>

                        <div className="field">
                            <h3>Maximum Orders</h3>
                            <input className="input-field" name="max-orders" placeholder="i.e. 100" required input="text"
                                onInput={e => setMaxOrder(e.target.value)} />
                        </div>
                        <div className="field">
                            <h3>Search Keywords:</h3>
                            <input className="input-field" name="keywords" placeholder="i.e. rgb, mechanical keyboard, typewriter, ..." required input="text"
                                onInput={e => setKeywords(e.target.value)} />
                        </div>

                        <div className="field">
                            <h3>Order Deadline:</h3>
                            <input className="input-field" name="expiry" placeholder="i.e. 1629366318" required input="text"
                                onInput={e => setDaysToOrderClose(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <h3>Delivery Deadline:</h3>
                            <input className="input-field" name="delivery" placeholder="i.e. 1639366318" required input="text"
                                onInput={e => setDaysToPromisedDeadline(e.target.value)} />
                        </div>
                    </div>
                    <span><InfoIcon /> The order and delivery deadlines are corrected to the start of the day</span>
                    <br />
                    <br />
                    <Button className="btn" color="inherit" variant="outlined" type="submit">Add +</Button>
                </form>
            </div>

        </div>
    )
}



const UseAutocompleteStyles = makeStyles((theme) => ({
    root: {
        "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
            transform: "translate(34px, 20px) scale(1);"
        }
    },
    inputRoot: {
        color: MainColor,
        background: Background,
        fontSize: "inherit",
        '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
            padding: 0,
            paddingLeft: 10,
            paddingRight: 10,
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: MainColor
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: MainColor
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: SecondaryColorFaded
        }
    },
    paper: {
        background: Background,
        color: MainColor,
    },
    option: {
        // Hover with light-grey
        '&[data-focus="true"]': {
            backgroundColor: SecondaryColorFaded,
            borderColor: 'transparent',
        },
        // Selected has dark-grey
        '&[aria-selected="true"]': {
            backgroundColor: PrimaryColor,
            borderColor: 'transparent',
        },
    },
    clearIndicator: {
        display: "none",
        fontSize: "inherit",
    },
}));