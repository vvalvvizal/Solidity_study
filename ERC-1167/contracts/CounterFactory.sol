// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./Counter.sol";

// ERC-1167 Minimal Proxy 팩토리.
// implementation 하나만 풀 배포해 두고, clone() 으로 약 45 bytes 의
// 초소형 프록시만 찍어내기 때문에 가스가 크게 절감된다.
contract CounterFactory {
    address public immutable implementation;

    address[] public clones;

    event CounterCreated(address indexed clone, address indexed owner);

    constructor(address _implementation) {
        require(_implementation != address(0), "Factory: zero impl");
        implementation = _implementation;
    }

    function createCounter(address counterOwner) external returns (address clone) {
        clone = Clones.clone(implementation);
        Counter(clone).initialize(counterOwner);
        clones.push(clone);
        emit CounterCreated(clone, counterOwner);
    }

    // 동일 salt 로 항상 같은 주소를 얻고 싶을 때 사용 (CREATE2 기반).
    function createCounterDeterministic(address counterOwner, bytes32 salt)
        external
        returns (address clone)
    {
        clone = Clones.cloneDeterministic(implementation, salt);
        Counter(clone).initialize(counterOwner);
        clones.push(clone);
        emit CounterCreated(clone, counterOwner);
    }

    function predictAddress(bytes32 salt) external view returns (address) {
        return Clones.predictDeterministicAddress(implementation, salt, address(this));
    }

    function clonesLength() external view returns (uint256) {
        return clones.length;
    }
}
