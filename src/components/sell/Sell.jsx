import './sell.scss'
import { ProductCard } from '../home/Home'
import { Button } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { MainColor, Background, SecondaryColorFaded, SecondaryColor, PrimaryColor } from '../../global'
import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { queriedProductList } from '../home/Home';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const myProductList = queriedProductList

export const DeadlineSchedule = (props) => {
    const product = props.product
    const epochToDate = (epoch) => {
        var date = new Date(0)
        date.setUTCSeconds(epoch)

        return date.toLocaleString().split(',')[0]
    }
    const stepperData = [
        {
            "icon": AssignmentTurnedInIcon,
            "title": "Orders Closed",
            "deadline": epochToDate(product.expiry),
        },].concat(
            product.schedule ?
                product.schedule.map((status) => ({
                    "icon": null,
                    "title": status.title,
                    "deadline": epochToDate(status.deadline)
                })) : [],
            {
                "icon": LocalShippingIcon,
                "title": "Deliveries Completed",
                "deadline": epochToDate(product.delivery),
            })

    const getFormattedIcon = (OriginalIcon) => {
        const formattedIcon = (props) => {
            return (
                <div className="icon" style={props.completed || props.active ? { opacity: 1, color: PrimaryColor } : { opacity: 0.5, color: SecondaryColor }}>
                    {OriginalIcon === null ? (
                        props.completed || props.active ? <CheckCircleOutlineIcon /> : <RadioButtonUncheckedIcon />
                    ) : <OriginalIcon />}
                </div>
            )
        }
        return formattedIcon
    }

    const countdown = Math.floor((product.expiry - Date.now() / 1000) / (24 * 60 * 60))
    const currentStatus = product.status < 0 ?
        (product.status <= -2 ? "Order Cancelled" : "Ordering In Progress (" + countdown + " days left)")
        : (product.status >= stepperData.length ? stepperData[stepperData.length - 1] : stepperData[product.status].title)

    return (
        <div className="deadline-schedule">

            {
                <span> &nbsp; &nbsp; &nbsp; &nbsp; Current Status: <strong>{currentStatus}</strong></span>
            }

            <Stepper alternativeLabel activeStep={product.status}>
                {stepperData.map((status) => (
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
    const { status, schedule } = props.product
    var CancelVisibile = true;
    var NextStepVisibile = true;
    var NextStepTitle = ""
    var CancelTitle = "Cancel & Refund"
    const haveCustomSchedule = !(schedule == null)
    switch (status) {
        case -2:
            NextStepTitle = "Relaunch Product"
            CancelTitle = "Delete Product";
            break
        case -1:
            NextStepVisibile = false
            CancelTitle += " existing orders"
            break
        case 0:
            if (!haveCustomSchedule) {
                NextStepTitle = "Deliveries Completed"
                CancelVisibile = false
                break
            }
        // eslint-disable-next-line
        case 1:
            if (!haveCustomSchedule) {
                CancelVisibile = false
                NextStepVisibile = false
                break
            }
        // eslint-disable-next-line
        default:
            if (haveCustomSchedule) {
                if (status === schedule.length - 1) {
                    NextStepTitle = "Deliveries Completed"
                    CancelVisibile = false
                } else if (status >= schedule.length) {
                    CancelVisibile = false
                    NextStepVisibile = false
                } else {
                    NextStepTitle = schedule[status].title
                }
            }
    }

    return (
        <div className="btn-wrapper">
            {
                NextStepVisibile ?
                    <Button className="btn" color="inherit" variant="outlined" >
                        <CheckCircleIcon /> &nbsp;
                        {NextStepTitle}
                    </Button> : <div></div>
            }
            {
                CancelVisibile ?
                    <Button className="btn refund" color="inherit" variant="outlined" >
                        <CancelIcon /> &nbsp;
                        {CancelTitle}
                    </Button> : <div></div>
            }
        </div>
    )
}

export default function Sell() {
    const [selectedProduct, setSelectedProduct] = useState(myProductList[0])
    const classes = UseAutocompleteStyles();
    const onProductClick = (productListIndex) => {
        setSelectedProduct(myProductList[productListIndex])
    }

    return (
        <div className="sell">
            <h1>My Store</h1>
            <div className="section-wrapper">
                <h1>My Products</h1>
                <div className="container">
                    {myProductList.map((product, index) => (
                        <div onClick={() => onProductClick(index)}>
                            <ProductCard product={product} noCart />
                        </div>
                    ))}
                </div>
                <br />
                <h1>Product Status</h1>
                <span>* select product by clicking it in My Products section *</span>
                <div className="selected-product">
                    <h2>Product: </h2>
                    <Autocomplete
                        classes={classes}
                        freeSolo
                        id="search-bar"
                        value={selectedProduct.title}
                        onChange={(event) => { setSelectedProduct(myProductList[event.target.dataset.optionIndex]); console.log(event) }}
                        // disableClearable
                        options={myProductList.map((product) => product.title)}
                        style={{ width: "100%", color: "white", display: "block", marginLeft: "auto", marginRight: "auto" }}
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
                <div className="field-container">
                    <div className="field">
                        <h3>Added to cart:</h3> <h2>{selectedProduct.cart}<AddShoppingCartIcon fontSize="inherit" /></h2>
                    </div>
                    <div className="field">
                        <h3>Orders:</h3> <h2>{selectedProduct.orders}<LocalMallIcon fontSize="inherit" /></h2>
                    </div>
                    <div className="field">
                        <h3>Pricings:</h3>
                        {selectedProduct.pricing.map((price) => (
                            <div className="price-tag">{price.qty} for {price.cost} ETH</div>
                        ))}
                    </div>

                    <div className="order-status-wrapper">
                        <div className="field">
                            <h3>Product Deadline Schedule:</h3>
                        </div>
                        <div className="order-status">
                            <DeadlineSchedule product={selectedProduct} />
                            <DeadlineScheduleControls product={selectedProduct} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-wrapper">
                <h1>Add New Product <AddCircleOutlineIcon fontSize="inherit" /></h1>
                <form action="" onSubmit="">
                    <div className="field-container">

                        <div className="field">
                            <h3>Product Title:</h3>
                            <input className="input-field" name="title" required input="text" placeholder="i.e. keyboard" />
                        </div>
                        <div className="field">
                            <h3>Img Src:</h3>
                            <input className="input-field" name="img" required input="text" placeholder="i.e. my.stuff/keyboard.jpg" />
                        </div>
                        <div className="field">
                            <h3>Group Deals:</h3>
                            <input className="input-field" name="pricing" placeholder="i.e. 100for10, 1000for5" required input="text" />
                        </div>
                        <div className="field">
                            <h3>Search KeyWords:</h3>
                            <input className="input-field" name="keywords" placeholder="i.e. rgb, mechanical keyboard, typewriter, ..." required input="text" />
                        </div>

                        <div className="field">
                            <h3>Order Deadline:</h3>
                            <input className="input-field" name="expiry" placeholder="1629366318" required input="text" />
                        </div>
                        <div className="field">
                            <h3>Delivery Deadline:</h3>
                            <input className="input-field" name="delivery" placeholder="1639366318" required input="text" />
                        </div>
                        <div className="field">
                            <h3>Product Deadline Schedule:</h3>
                            <input className="input-field" name="delivery" placeholder="stage1(1629366318), stage2(1629466318), shipped(1639066318)" required input="text" style={{ width: 500 }} />
                        </div>
                    </div>
                    <Button className="btn" color="inherit" variant="outlined" >Add +</Button>
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