import { SHOPPETH_ABI, SHOPPETH_ADDRESS, PRODUCT_ABI, EVENT_EMITTER_ADDRESS, EVENT_EMITTER_ABI } from './config'
import Web3 from 'web3'

export const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
export const shoppethContract = new web3.eth.Contract(SHOPPETH_ABI, SHOPPETH_ADDRESS) //, { gasLimit: 5000000 })
export const eventEmitterContract = new web3.eth.Contract(EVENT_EMITTER_ABI, EVENT_EMITTER_ADDRESS)

export const CreateProduct = async (
    product_name,
    img,
    keywords,
    min_orders,
    max_orders,
    cost,
    days_to_order_close,
    days_to_promised_deadline,
) => {
    const accounts = await web3.eth.getAccounts();
    const keywordList = String(keywords).split(',')
    var filteredKeywordList = ['all', product_name.toLowerCase(), accounts[0].toLowerCase()]
    var map = {}

    //check for dupes n 'all' n 'product_name' n 'seller_address'
    map['xall'] = true
    map["x" + product_name.toLowerCase()] = true
    map["x" + accounts[0].toLowerCase()] = true
    for (let i = 0; i < keywordList.length; i++) {
        if (map["x" + keywordList[i].toLowerCase()] == null && keywordList[i].length <= 40) {
            map["x" + keywordList[i].toLowerCase()] = true
            filteredKeywordList.push(keywordList[i].toLowerCase())
        }
    }

    await shoppethContract.methods.createProduct(
        product_name,
        img,
        filteredKeywordList,
        min_orders,
        max_orders,
        days_to_order_close,
        days_to_promised_deadline
    ).send({ from: accounts[0], value: web3.utils.toWei(String(parseInt(cost) * 2), "ether") })
}

export const BrowseProduct = async (keyword) => {
    const accounts = await web3.eth.getAccounts();
    if (accounts[0] == null) return []
    return await shoppethContract.methods.browseProducts(keyword.toLowerCase()).call()
}

export const GetProductData = async (address) => {
    const productContract = new web3.eth.Contract(PRODUCT_ABI, address)
    return await productContract.methods.getData().call()
}

export const CheckoutCart = async (cartItems, totalCost) => {
    const accounts = await web3.eth.getAccounts();
    await shoppethContract.methods.checkoutCart(cartItems)
        .send({ from: accounts[0], value: web3.utils.toWei(String(totalCost), "ether") })
}

export const GetOrderedProducts = async () => {
    const accounts = await web3.eth.getAccounts();
    return await shoppethContract.methods.getOrders().call({ from: accounts[0] })
}

export const GetMyProducts = async () => {
    const accounts = await web3.eth.getAccounts();
    return await shoppethContract.methods.getSelling().call({ from: accounts[0] })
}

export const CancelNRefund = async (address) => {
    const accounts = await web3.eth.getAccounts();
    const productContract = new web3.eth.Contract(PRODUCT_ABI, address)
    await productContract.methods.abort().send({ from: accounts[0] })
}

export const BuyerReceived = async (address) => {
    const accounts = await web3.eth.getAccounts();
    const productContract = new web3.eth.Contract(PRODUCT_ABI, address)
    await productContract.methods.confirmReceived().send({ from: accounts[0] })
}

export const BuyerRequestRefund = async (address) => {
    const accounts = await web3.eth.getAccounts();
    const productContract = new web3.eth.Contract(PRODUCT_ABI, address)
    await productContract.methods.onPromisedDeadline().send({ from: accounts[0] })
}

export const SellerCloseOrders = async (address) => {
    const accounts = await web3.eth.getAccounts();
    const productContract = new web3.eth.Contract(PRODUCT_ABI, address)
    await productContract.methods.checkProductionStatus().send({ from: accounts[0] })
}

export const AddProgress = async (address, title, timestamp) => {
    const accounts = await web3.eth.getAccounts();
    const productContract = new web3.eth.Contract(PRODUCT_ABI, address)
    await productContract.methods.addProgress(title, timestamp).send({ from: accounts[0] })
}

export const SetProgressDone = async (address) => {
    const accounts = await web3.eth.getAccounts();
    const productContract = new web3.eth.Contract(PRODUCT_ABI, address)
    await productContract.methods.setProgressDone().send({ from: accounts[0] })
}