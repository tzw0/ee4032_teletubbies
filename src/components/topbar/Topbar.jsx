import './topbar.scss'
import { Link } from 'react-router-dom'
import { GlobalDomainPrefix, PrimaryColor, TopbarBackgroundColor, TopbarFontColor, TopbarIconSize } from '../../global'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalMallIcon from '@material-ui/icons/LocalMall';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import StoreIcon from '@material-ui/icons/Store';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { ReactComponent as Shoppeth } from './SHOPPETH.svg';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router-dom';

export default function Topbar(props) {
    let history = useHistory();
    const [recentSearches, setRecentSearches] = useState(["all"])
    const [recentSearchesSet, setRecentSearchesSet] = useState({ "all": true })
    const addSearch = (search) => {
        if (!recentSearchesSet[search]) {
            setRecentSearches(oldSearches => [...oldSearches, search])
            setRecentSearchesSet((prevState => ({
                ...prevState,
                [search]: true
            })))
        }
    }

    const submitSearch = (value) => {
        if (value == null || value === "") {
            return
        }
        props.onKeywordChange(value);
        addSearch(value);
        history.push(GlobalDomainPrefix);
    }

    const classes = UseAutocompleteStyles();

    return (
        <div className="topbar">
            <div className="left">
                <Link to={GlobalDomainPrefix + "/"}>
                    <img src="assets/logo.png" alt="" />
                    <Shoppeth width={200} color="inherit" />
                </Link >
            </div>
            <div className="center">
                <Autocomplete
                    classes={classes}
                    freeSolo
                    id="search-bar"
                    // disableClearable
                    onChange={(event, value) => { submitSearch(value) }}
                    options={recentSearches.map((option) => option)}
                    style={{ width: "100%", color: "white", display: "block", marginLeft: "auto", marginRight: "auto" }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            margin="normal"
                            variant="outlined"
                            placeholder={"Searching for... '" + props.keyword + "'"}
                            InputProps={{
                                ...params.InputProps,

                                // startAdornment: (
                                //     <InputAdornment position="start">
                                //         <AccountCircle />
                                //     </InputAdornment>
                                // ),
                            }}
                        />
                    )}
                />
                <div className="search-btn" >
                    <Link to={GlobalDomainPrefix + "/"}>
                        <SearchIcon fontSize="inherit" />
                    </Link>
                </div>
            </div>
            <div className="right">
                <Link to={GlobalDomainPrefix + "/"}>
                    <Tooltip title={<h5 style={{ fontSize: TopbarIconSize }}> Home</h5>}>
                        < HomeIcon fontSize="inherit" />
                    </Tooltip>
                </Link>
                <Link to={GlobalDomainPrefix + "/myshop"}>
                    <Tooltip title={<h5 style={{ fontSize: TopbarIconSize }}> My Shop</h5>}>
                        < StoreIcon fontSize="inherit" />
                    </Tooltip>
                </Link>
                <Link to={GlobalDomainPrefix + "/cart"}>
                    <Tooltip title={<h5 style={{ fontSize: TopbarIconSize }}>Shopping Cart</h5>}>
                        <ShoppingCartIcon fontSize="inherit" />
                    </Tooltip>
                </Link>
                <Link to={GlobalDomainPrefix + "/orders"}>
                    <Tooltip title={<h5 style={{ fontSize: TopbarIconSize }}> My Orders</h5>}>
                        <LocalMallIcon fontSize="inherit" />
                    </Tooltip>
                </Link>
                {/* <Link to="/account">
                    <Tooltip title={<h5 style={{ fontSize: TopbarIconSize }}> My Account</h5>}>
                        <AccountCircleIcon fontSize="inherit" />
                    </Tooltip>
                </Link> */}
            </div>
        </div>
    )
}

export const UseAutocompleteStyles = makeStyles((theme) => ({
    root: {
        "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
            transform: "translate(34px, 20px) scale(1);"
        }
    },
    inputRoot: {
        height: "40px",
        color: TopbarFontColor,
        background: TopbarBackgroundColor,
        fontSize: "inherit",
        '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
            padding: 0,
            paddingLeft: 26,
            paddingRight: 26,
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: TopbarFontColor
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: TopbarFontColor
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: PrimaryColor
        }
    },
    paper: {
        background: TopbarBackgroundColor,
        color: TopbarFontColor,
    },
    option: {
        // Hover with light-grey
        '&[data-focus="true"]': {
            backgroundColor: PrimaryColor,
            borderColor: 'transparent',
        },
        // Selected has dark-grey
        '&[aria-selected="true"]': {
            backgroundColor: TopbarBackgroundColor,
            borderColor: 'transparent',
        },
    },
    clearIndicator: {
        display: "none",
        color: TopbarFontColor,
        fontSize: "inherit",
    },
    popupIndicator: {
        color: TopbarFontColor,
        fontSize: "inherit",
    },
}));