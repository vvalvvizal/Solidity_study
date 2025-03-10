pragma solidity >=0.7.0 <0.9.0;

contract Ballot{

    struct Voter{
        uint vote;
        bool voted;
        uint weight;
    }

    struct Proposal {//제안서 
        bytes32 name; 
        uint voteCount;
    }

    Proposal[] public proposals;

    mapping(address => Voter) public voters;

    address public chairperson;

    constructor(bytes32[] memory proposalNames){

        chairperson = msg.sender;
        voters[chairperson].weight = 1; 

        for(uint i = 0; i < proposalNames.length; i++){
             proposals.push(
                Proposal({  
                    name: proposalNames[i],
                    voteCount: 0
                    }));                   
            }

    }
        function giveRightToVote(address voter) public{
            require(msg.sender == chairperson,'Only the chairperson can give access to vote');
            require(!voters[voter].voted,'The voter has already voted');
            require(voters[voter].weight==0);
            

            voters[voter].weight = 1;
        }   
        
        function vote(uint proposal) public {
            Voter storage sender = voters[msg.sender];
            require(sender.weight != 0,'Has no right to vote');
            require(!sender.voted,'Already voted');
            sender.voted = true;
            sender.vote = proposal; //인자로 받은
            
            proposals[proposal].voteCount += sender.weight;
        }

        function winningProposal() public view returns (uint winningProposal_){
            uint winningVoteCount = 0;
            for(uint i = 0; i< proposals.length; i ++){
                if(proposals[i].voteCount>winningVoteCount){
                    winningVoteCount = proposals[i].voteCount;
                    winningProposal_ = i;
                }
            }
        }

        function winningName() public view returns (bytes32 winningName_){
           winningName_ =  proposals[winningProposal()].name;
        }
}
            