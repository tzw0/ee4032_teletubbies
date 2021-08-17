export const SMART_CONTRACT_ADDRESS = '0x302C81888c5857d3866Cd340ad7255ACAB6354A0';
export const SMART_CONTRACT_ABI =
    [
        {
            "constant": true,
            "inputs": [],
            "name": "getVarX",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_varX",
                    "type": "string"
                }
            ],
            "name": "setVarX",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "value",
                    "type": "string"
                }
            ],
            "name": "emitEvent",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "varX",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "value",
                    "type": "string"
                }
            ],
            "name": "MyEvent",
            "type": "event"
        }
    ]