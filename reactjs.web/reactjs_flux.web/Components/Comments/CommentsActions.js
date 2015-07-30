
/* Defines the action messages and functions for the comments component - helper calls*/

var AppDispatcher = require('../../scripts/flux/dispatcher');
var CommentsConstants = require('./CommentsConstants');

var CommentsActions = {

    /**
     * Adds a comment
     * @param  {string} text - text to add
     */
    add: function (text) {
        AppDispatcher.dispatch({
            actionType: CommentsConstants.COMMENTS_ADD,
            text: text
        });
    },

    /**
     * Deletes a comment
     * @param  {int} id - id of the comment to remove
     */
    remove: function(id) {
        AppDispatcher.dispatch({
            actionType: CommentsConstants.COMMENTS_DELETE,
            id: id
        });
    }
};

module.exports = CommentsActions;