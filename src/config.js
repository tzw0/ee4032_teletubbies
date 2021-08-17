export const SMART_CONTRACT_ADDRESS = '0x711E2807a6b88f0FC2802E4e6aFCE2De032b6553';
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
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "date",
                    "type": "uint256"
                },
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