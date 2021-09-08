export const SHOPPETH_ADDRESS = '0x72BE66Dafc89c2c967FcC94Fff589eD20B3C0c36';
export const EVENT_EMITTER_ADDRESS = '0x48c842b82ba49e5eA8211b487b99919E738c71CA';
export const EVENT_EMITTER_ABI =
	[
		{
			"anonymous": false,
			"inputs": [],
			"name": "ProductEvents",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "user_address",
					"type": "address"
				}
			],
			"name": "UserEvents",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "emitProductEvents",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "user_address",
					"type": "address"
				}
			],
			"name": "emitUserEvents",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	]

export const PRODUCT_ABI =
	[
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "seller_address",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "product_name",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "img",
					"type": "string"
				},
				{
					"internalType": "string[]",
					"name": "keywords",
					"type": "string[]"
				},
				{
					"internalType": "uint256",
					"name": "min_orders",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "max_orders",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "cost",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "order_close_date",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "promised_deadline",
					"type": "uint256"
				},
				{
					"internalType": "contract EventEmitter",
					"name": "_eventEmitter",
					"type": "address"
				}
			],
			"stateMutability": "payable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [],
			"name": "Aborted",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [],
			"name": "ItemReceived",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "buyer_address",
					"type": "address"
				}
			],
			"name": "PurchaseConfirmed",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "string",
					"name": "production_status",
					"type": "string"
				}
			],
			"name": "StatusChanged",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "abort",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "title",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "timestamp",
					"type": "uint256"
				}
			],
			"name": "addProgress",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "buyer",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "checkProductionStatus",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_quantity",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "sender",
					"type": "address"
				}
			],
			"name": "confirmPurchase",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "confirmReceived",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "data",
			"outputs": [
				{
					"internalType": "address",
					"name": "product_address",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "seller",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "product_name",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "img",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "min_orders",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "max_orders",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "current_orders",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "cost",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "current_progress",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "production_status",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "contract_created_date",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "order_close_date",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "promised_deadline",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getData",
			"outputs": [
				{
					"components": [
						{
							"internalType": "address",
							"name": "product_address",
							"type": "address"
						},
						{
							"internalType": "address",
							"name": "seller",
							"type": "address"
						},
						{
							"internalType": "string",
							"name": "product_name",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "img",
							"type": "string"
						},
						{
							"internalType": "string[]",
							"name": "keywords",
							"type": "string[]"
						},
						{
							"internalType": "uint256",
							"name": "min_orders",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "max_orders",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "current_orders",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "cost",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "current_progress",
							"type": "uint256"
						},
						{
							"components": [
								{
									"internalType": "string",
									"name": "title",
									"type": "string"
								},
								{
									"internalType": "uint256",
									"name": "timestamp",
									"type": "uint256"
								}
							],
							"internalType": "struct DataTypes.ProgressState[]",
							"name": "progress",
							"type": "tuple[]"
						},
						{
							"internalType": "string",
							"name": "production_status",
							"type": "string"
						},
						{
							"internalType": "uint256",
							"name": "contract_created_date",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "order_close_date",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "promised_deadline",
							"type": "uint256"
						},
						{
							"internalType": "int256[]",
							"name": "user_item_data",
							"type": "int256[]"
						}
					],
					"internalType": "struct DataTypes.ProductData",
					"name": "",
					"type": "tuple"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "number_of_buyers",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "onPromisedDeadline",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "orders_not_received",
			"outputs": [
				{
					"internalType": "int256",
					"name": "",
					"type": "int256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "setProgressDone",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "state",
			"outputs": [
				{
					"internalType": "enum Product.EscrowState",
					"name": "",
					"type": "uint8"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "value",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]

export const SHOPPETH_ABI =
	[
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "buyer_address",
					"type": "address"
				}
			],
			"name": "CartChanged",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "buyer_address",
					"type": "address"
				}
			],
			"name": "OrderChanged",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "seller_address",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "prod_address",
					"type": "address"
				}
			],
			"name": "ProductCreated",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "keyword",
					"type": "string"
				}
			],
			"name": "browseProducts",
			"outputs": [
				{
					"components": [
						{
							"internalType": "address",
							"name": "product_address",
							"type": "address"
						},
						{
							"internalType": "address",
							"name": "seller",
							"type": "address"
						},
						{
							"internalType": "string",
							"name": "product_name",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "img",
							"type": "string"
						},
						{
							"internalType": "string[]",
							"name": "keywords",
							"type": "string[]"
						},
						{
							"internalType": "uint256",
							"name": "min_orders",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "max_orders",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "current_orders",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "cost",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "current_progress",
							"type": "uint256"
						},
						{
							"components": [
								{
									"internalType": "string",
									"name": "title",
									"type": "string"
								},
								{
									"internalType": "uint256",
									"name": "timestamp",
									"type": "uint256"
								}
							],
							"internalType": "struct DataTypes.ProgressState[]",
							"name": "progress",
							"type": "tuple[]"
						},
						{
							"internalType": "string",
							"name": "production_status",
							"type": "string"
						},
						{
							"internalType": "uint256",
							"name": "contract_created_date",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "order_close_date",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "promised_deadline",
							"type": "uint256"
						},
						{
							"internalType": "int256[]",
							"name": "user_item_data",
							"type": "int256[]"
						}
					],
					"internalType": "struct DataTypes.ProductData[]",
					"name": "",
					"type": "tuple[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"components": [
						{
							"internalType": "address",
							"name": "addr",
							"type": "address"
						},
						{
							"internalType": "int64",
							"name": "quantity",
							"type": "int64"
						}
					],
					"internalType": "struct Shoppeth.ProductItem[]",
					"name": "cart_items",
					"type": "tuple[]"
				}
			],
			"name": "checkoutCart",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "product_name",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "img",
					"type": "string"
				},
				{
					"internalType": "string[]",
					"name": "keywords",
					"type": "string[]"
				},
				{
					"internalType": "uint256",
					"name": "min_orders",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "max_orders",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "order_close_date",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "promised_deadline",
					"type": "uint256"
				}
			],
			"name": "createProduct",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "eventEmitter",
			"outputs": [
				{
					"internalType": "contract EventEmitter",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getCart",
			"outputs": [
				{
					"components": [
						{
							"internalType": "address",
							"name": "product_address",
							"type": "address"
						},
						{
							"internalType": "address",
							"name": "seller",
							"type": "address"
						},
						{
							"internalType": "string",
							"name": "product_name",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "img",
							"type": "string"
						},
						{
							"internalType": "string[]",
							"name": "keywords",
							"type": "string[]"
						},
						{
							"internalType": "uint256",
							"name": "min_orders",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "max_orders",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "current_orders",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "cost",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "current_progress",
							"type": "uint256"
						},
						{
							"components": [
								{
									"internalType": "string",
									"name": "title",
									"type": "string"
								},
								{
									"internalType": "uint256",
									"name": "timestamp",
									"type": "uint256"
								}
							],
							"internalType": "struct DataTypes.ProgressState[]",
							"name": "progress",
							"type": "tuple[]"
						},
						{
							"internalType": "string",
							"name": "production_status",
							"type": "string"
						},
						{
							"internalType": "uint256",
							"name": "contract_created_date",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "order_close_date",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "promised_deadline",
							"type": "uint256"
						},
						{
							"internalType": "int256[]",
							"name": "user_item_data",
							"type": "int256[]"
						}
					],
					"internalType": "struct DataTypes.ProductData[]",
					"name": "",
					"type": "tuple[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getOrders",
			"outputs": [
				{
					"components": [
						{
							"internalType": "address",
							"name": "product_address",
							"type": "address"
						},
						{
							"internalType": "address",
							"name": "seller",
							"type": "address"
						},
						{
							"internalType": "string",
							"name": "product_name",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "img",
							"type": "string"
						},
						{
							"internalType": "string[]",
							"name": "keywords",
							"type": "string[]"
						},
						{
							"internalType": "uint256",
							"name": "min_orders",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "max_orders",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "current_orders",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "cost",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "current_progress",
							"type": "uint256"
						},
						{
							"components": [
								{
									"internalType": "string",
									"name": "title",
									"type": "string"
								},
								{
									"internalType": "uint256",
									"name": "timestamp",
									"type": "uint256"
								}
							],
							"internalType": "struct DataTypes.ProgressState[]",
							"name": "progress",
							"type": "tuple[]"
						},
						{
							"internalType": "string",
							"name": "production_status",
							"type": "string"
						},
						{
							"internalType": "uint256",
							"name": "contract_created_date",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "order_close_date",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "promised_deadline",
							"type": "uint256"
						},
						{
							"internalType": "int256[]",
							"name": "user_item_data",
							"type": "int256[]"
						}
					],
					"internalType": "struct DataTypes.ProductData[]",
					"name": "",
					"type": "tuple[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getProductCount",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "productCount",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getSelling",
			"outputs": [
				{
					"components": [
						{
							"internalType": "address",
							"name": "product_address",
							"type": "address"
						},
						{
							"internalType": "address",
							"name": "seller",
							"type": "address"
						},
						{
							"internalType": "string",
							"name": "product_name",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "img",
							"type": "string"
						},
						{
							"internalType": "string[]",
							"name": "keywords",
							"type": "string[]"
						},
						{
							"internalType": "uint256",
							"name": "min_orders",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "max_orders",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "current_orders",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "cost",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "current_progress",
							"type": "uint256"
						},
						{
							"components": [
								{
									"internalType": "string",
									"name": "title",
									"type": "string"
								},
								{
									"internalType": "uint256",
									"name": "timestamp",
									"type": "uint256"
								}
							],
							"internalType": "struct DataTypes.ProgressState[]",
							"name": "progress",
							"type": "tuple[]"
						},
						{
							"internalType": "string",
							"name": "production_status",
							"type": "string"
						},
						{
							"internalType": "uint256",
							"name": "contract_created_date",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "order_close_date",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "promised_deadline",
							"type": "uint256"
						},
						{
							"internalType": "int256[]",
							"name": "user_item_data",
							"type": "int256[]"
						}
					],
					"internalType": "struct DataTypes.ProductData[]",
					"name": "",
					"type": "tuple[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "keyword_db",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "lastContractAddress",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "productContracts",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "product_db",
			"outputs": [
				{
					"internalType": "contract Product",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"components": [
						{
							"internalType": "address",
							"name": "addr",
							"type": "address"
						},
						{
							"internalType": "int64",
							"name": "quantity",
							"type": "int64"
						}
					],
					"internalType": "struct Shoppeth.ProductItem[]",
					"name": "cart_items",
					"type": "tuple[]"
				}
			],
			"name": "updateCart",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "user_db",
			"outputs": [
				{
					"internalType": "address",
					"name": "addr",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "cart_length",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]