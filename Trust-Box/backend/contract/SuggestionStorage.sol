// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SuggestionStorage {

    struct Suggestion {
        string title;
        string description;
        address author;
        uint256 networkId;
        uint256 suggestionId;
        uint256 votes;
        bool exists;
    }

    // Mapping from suggestion ID to Suggestion
    mapping(uint256 => Suggestion) private suggestions;

    // Event to notify that suggestion is stored
    event SuggestionStored(
        uint256 suggestionId,
        string title,
        address author,
        uint256 networkId,
        uint256 votes
    );

    /// @notice Store a new suggestion
    function storeSuggestion(
        uint256 _suggestionId,
        string memory _title,
        string memory _description,
        uint256 _networkId,
        uint256 _votes
    ) external {
        require(!suggestions[_suggestionId].exists, "Suggestion already exists");

        suggestions[_suggestionId] = Suggestion({
            title: _title,
            description: _description,
            author: msg.sender,
            networkId: _networkId,
            suggestionId: _suggestionId,
            votes: _votes,
            exists: true
        });

        emit SuggestionStored(_suggestionId, _title, msg.sender, _networkId, _votes);
    }

    /// @notice Retrieve a suggestion by ID
    function getSuggestion(uint256 _suggestionId) external view returns (
        string memory title,
        string memory description,
        address author,
        uint256 networkId,
        uint256 votes
    ) {
        require(suggestions[_suggestionId].exists, "Suggestion does not exist");
        Suggestion memory s = suggestions[_suggestionId];
        return (s.title, s.description, s.author, s.networkId, s.votes);
    }
}
