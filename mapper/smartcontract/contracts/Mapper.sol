pragma solidity ^0.4.17;



contract Mapper {
    uint public constant priceRead = 3 ether;
    uint public constant priceAuthor = 2 ether;
    mapping (bytes32 => address) public authors;
    address private tempAddress;
    bytes32 private tempString;


    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }



    function store(string locationID) public {
        tempString = stringToBytes32(locationID);
        authors[tempString] = msg.sender;
        tempString = "";
    }



    function read(string locationID) public payable {
        if(msg.value != priceRead){
            revert();
        }
        tempString = stringToBytes32(locationID);
        tempAddress = authors[tempString];
        tempAddress.transfer(priceAuthor);
        tempString = "";
    }
}


