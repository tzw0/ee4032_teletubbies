import './login.scss'
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import { Button } from '@material-ui/core'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import InfoIcon from '@material-ui/icons/Info';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

export default function Login() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const [account, setAccount] = useState('loading..')
    const [network, setNetwork] = useState('loading..')

    window.ethereum.on('accountsChanged', function (accounts) {
        setAccount(accounts[0])
    })

    useEffect(() => {
        const ethEnabled = async () => {
            if (window.ethereum) {
                await window.ethereum.send('eth_requestAccounts');
                window.web3 = new Web3(window.ethereum);
                return true;
            }
            return false;
        }

        const loadBlockchainData = async () => {
            const accounts = await web3.eth.getAccounts()
            const networkType = await web3.eth.net.getNetworkType()
            setAccount(accounts[0])
            setNetwork(networkType)
        }

        ethEnabled();
        loadBlockchainData();
    }, [web3.eth])

    return (
        <div className="login">
            <div className="container">
                {account == null ?
                    <h2> <ErrorOutlineIcon /> Please login with metamask </h2> :
                    <h2><VerifiedUserIcon /> Logged in with address: <span> {account}</span> </h2>}
                <p><WifiTetheringIcon /> Network: <span>{network}</span></p>
                <h2><InfoIcon /> <strong>Contract interactions require some time to take effect. You can view the status on the Metamask plugin.</strong> </h2>
                <h2><ReportProblemIcon /> <strong>You can only checkout once for each product campaign per account.</strong> </h2>

                {account == null ?
                    <Button className="btn" color="inherit" variant="outlined" >Login with MetaMask</Button>
                    : <span></span>}

            </div>
            <div className="margin">

            </div>
        </div>
    )
}
