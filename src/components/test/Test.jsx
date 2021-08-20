import React from 'react'
import Web3 from 'web3'
import { useEffect, useState } from 'react';
import { SMART_CONTRACT_ABI, SMART_CONTRACT_ADDRESS } from '../../config'
import { Button } from '@material-ui/core';

export default function Test() {
    const [account, setAccount] = useState('loading..')
    const [network, setNetwork] = useState('loading..')
    const [status, setStatus] = useState('pending..')
    const [varX, setVarX] = useState('loading..')
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const smartContract = new web3.eth.Contract(SMART_CONTRACT_ABI, SMART_CONTRACT_ADDRESS)

    smartContract.events.MyEvent({
        fromBlock: "latest"
    })
        .on('data', event => updateX());

    const updateContractVarX = async () => {
        const value = "x" + Math.round((1000 * Math.random()))
        setStatus("update X request is pending...")
        await smartContract.methods.setVarX(value).send({ from: account })
        //   const receipt = await smartContract.methods.emitEvent('update').send({
        //     from: account
        //   })

        //   console.log(receipt.events);
    }

    const updateX = async () => {
        const var_x = await smartContract.methods.getVarX().call()
        setVarX(var_x)
        setStatus("X is updated")
        console.log("update x")
    }

    useEffect(() => {
        async function fetchInitialData() {
            const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
            const smartContract = new web3.eth.Contract(SMART_CONTRACT_ABI, SMART_CONTRACT_ADDRESS)
            const var_x = await smartContract.methods.getVarX().call()
            setVarX(var_x)
        }
        setStatus("X is updated")

        fetchInitialData()
    }, [])


    const loadBlockchainData = async () => {
        const accounts = await web3.eth.getAccounts()
        const networkType = await web3.eth.net.getNetworkType()
        setAccount(accounts[0])
        setNetwork(networkType)
    }

    loadBlockchainData();

    console.log(account)

    return (
        <div className="test">
            {account == null ? "you are not signed in" : "Welcome " + account}
            <p>your account: {account}</p>
            <p>your network: {network}</p>
            <p>VarX: {varX}</p>
            <p>Status: {status}</p>
            <Button color="primary" variant="contained" onClick={() => { updateContractVarX().catch(function (e) { console.log("transaction failed"); setStatus("X is updated (transaction rejected)") }) }}>Change VarX</Button>
        </div>
    )
}
