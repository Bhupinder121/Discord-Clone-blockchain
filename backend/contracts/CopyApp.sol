pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract CopyApp is ERC721{
    address public owner;
    uint256 public totalChannels;
    uint256 public totalSupply;

    struct Channel{
        uint256 id;
        string name;
        uint256 cost;
    }

    mapping(uint256 => Channel) public channels;
    mapping(uint256 => mapping(address => bool)) private hasJoined;


    modifier OnlyOwner(){
        require(msg.sender == owner);
        _;
    }

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol){
        owner = msg.sender;    
    }

    function createChannel (string memory channel_name, uint256 channel_cost) public OnlyOwner{
        totalChannels = totalChannels + 1;
        channels[totalChannels] = Channel(totalChannels, channel_name, channel_cost);

    }

    function mint(uint256 channel_id) public payable{
        require(channel_id > 0);
        require(channel_id <= totalChannels);
        require(hasJoined[channel_id][msg.sender] == false);
        require(msg.value >= channels[channel_id].cost);

        hasJoined[channel_id][msg.sender] = true;


        //minting the nft
        totalSupply++;
        _safeMint(msg.sender, totalSupply);
    }

    function withdraw() public OnlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }

    function getChannel(uint256 id) public view returns (Channel memory) {
        return channels[id];
    }
}
