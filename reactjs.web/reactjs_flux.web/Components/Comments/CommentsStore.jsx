    /* CommentStore - main api and event handler for the comment store items */

/* Includes */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

/* Defines */
var CHANGE_EVENT = 'change';

/* Member variables */
var _comments = {}; //wouldnt be maintained in a normal application?  Call's to server to get the list?

        /**********************************************************************
         * Store's intenral functions 
         *********************************************************************/

        /*
         *  Add a new item into the comment list
         */
        function add(text) {
            //HACK - unique ID generate
            var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

            _comments[id] = {
                id: id,
                text: text
            };
        }

        /*
         * Delete the comment
         */
        function remove(id) {
            delete _comments[id];
        }


        /**********************************************************************
         * Actual API and class definition, class publicly availible functions
         *********************************************************************/
        var CommentsStore = assign({}, EventEmitter.prototype, {

            /*
             * Raise a change event
             */
            emitChange: function() {
                this.emit(CHANGE_EVENT);  //not sure what event library calls this is using -- need to pick one. assuming sample from bog standard flux example
            },
            
            /**
             * Returns a list of all the comment items
             */
            list: function list() {
                return _comments;
            },

            /**
             * @param {function} callback
             */
            addChangeListener: function (callback) {
                this.on(CHANGE_EVENT, callback);
            },

            /**
             * @param {function} callback
             */
            removeChangeListener: function (callback) {
                this.removeListener(CHANGE_EVENT, callback);
            }
        });

        /*
         * Big ass Event handler switch statement to respond to the dispatcher events, old school MVC
         */
        AppDispatcher.register(function(action) {

            switch(action.actionType) {
                case CommentConstants.COMMENT_ADD:
                    text = action.text.trim();
                    if (text !== '') {
                        add(action.text);               //add it to the list - waitfor when its an ajax call?
                        CommentsStore.emitChange();     //let everyone know!
                    }
                    break;

                case CommentConstants.COMMENT_DELETE:
                    remove(action.id);                  //remove it from our listing - waitfor when its an ajax call?
                    CommentsStore.emitChange();         //let every one know


                default:
                    // this space intentionally left blank
            }
        });


        //export call
        module.exports = CommentsStore;