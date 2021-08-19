pragma solidity ^0.8.7;

//"SPDX-License-Identifier: UNLICENSED"
// pragma solidity 0.5.1;

contract Test {
    string public varX = "hello";

    event MyEvent(
        string indexed value //indexed is for filtering, limit of 3 for each event
    );

    function emitEvent(string memory value) public {
        emit MyEvent(value);
    }

    function setVarX(string memory _varX) public {
        varX = _varX;
        emitEvent("x");
    }

    function getVarX() public view returns (string memory) {
        return varX;
    }
}

// pragma solidity 0.8.1;

contract Factory {
    Contract[] newContracts;
    address[] newContractAddresses;
    address public lastAddress;

    // int256[] intArray;

    function createContract(string memory name) public {
        // intArray.push(10);
        Contract newContract = new Contract();
        newContract.updateNum(name);
        address newContractAddress = address(newContract);

        newContracts.push(newContract);
        newContractAddresses.push(newContractAddress);
    }

    function getLastAddress() public returns (address) {
        lastAddress = newContractAddresses[newContractAddresses.length - 1];
        return lastAddress;
    }
}

contract Contract {
    string public Name;

    constructor() {}

    function updateNum(string memory name) public {
        Name = name;
    }
}
