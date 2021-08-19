pragma solidity 0.5.1;

contract Test {
    string public varX = "hello";
    
    event MyEvent (
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