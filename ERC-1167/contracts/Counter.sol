// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

// ERC-1167 클론은 생성자를 통해 상태를 초기화할 수 없다.
// DELEGATECALL 로 로직만 빌려 쓰는 구조이므로, 각 클론의 storage 는
// initialize() 같은 일반 함수로 한 번만 세팅해야 한다.
contract Counter {
    address public owner;
    uint256 public count;
    bool private _initialized;

    event Initialized(address indexed owner);
    event Incremented(address indexed by, uint256 newCount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Counter: not owner");
        _;
    }

    function initialize(address _owner) external {
        require(!_initialized, "Counter: already initialized");
        _initialized = true;
        owner = _owner;
        emit Initialized(_owner);
    }

    function increment() external onlyOwner {
        count += 1;
        emit Incremented(msg.sender, count);
    }
}
