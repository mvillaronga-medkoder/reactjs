﻿
/* Comment Entry area */
    var CommentsEntry = React.createClass({
        handleAdd: function(e) {

        //retrieve the submitted values
        e.preventDefault();
        var text = React.findDOMNode(this.refs.comment).value.trim();
        if (!text) {
            return;
        }

        //send the request to the parent to be sent to the server
        this.props.onCommentSubmit({text: text});

        //clear it 
        React.findDOMNode(this.refs.comment).value = '';
        return;
    },

  render: function() {
    return (
            <div className="comment-entry row">
                <div className="col-xs-12">
                    <textarea maxlength="400" className="comment-text-area" ref="comment"></textarea>
                </div>
                <div className="col-xs-12">
                    <div className="row">
                        <div className="col-xs-8"></div>
                        <div className="col-xs-2">400 remaining</div>
                        <div className="col-xs-2">
                            <button className="btn btn-primary" role="button" onClick={this.handleAdd}>Add Comment</button>
                        </div>
                    </div>
                </div>
            </div>
    );
  }
});

/* Comment List Area */
var CommentsList = React.createClass({

  render: function() {
    var commentNodes = this.props.commentList.map(function (comment) {
      return (
        <CommentsListItem commentText={comment.commentText} author={comment.author} createdDate={comment.createdDate} />
      );
    });

    return (
      <div className="list-group">
        {commentNodes}
      </div>
    );
  }
});

/* Comment List Item */
var CommentsListItem = React.createClass({
  render: function() {
    return (
                    <a href="#" className="list-group-item">
                        <div className="row">
                            <div className="col-xs-8">
                                <div className="comment-list-item-text">{this.props.commentText}</div>
                            </div>
                            <div className="col-xs-4">
                                <div className="row">
                                    <button className="btn btn-primary" role="button">Delete</button>
                                </div>
                                <div className="row">
                                    <div>{this.props.author}</div>
                                </div>
                                <div className="row">
                                    <div>{this.props.createdDate}</div>
                                </div>
                            </div>
                        </div>
                    </a>
    );
  }
});

    /* Top level Comment container class */
    var Comments = React.createClass({
        /* Setup initial state */
        getInitialState: function () {
            return {commentListItems: []};
        },

        /* handles the submit of the comment at the top level of the control */
        handleCommentSubmit: function(comment) {
            // TODO: submit to the server and refresh the list
            console.log(comment);
            console.log(comment.text);

            $.ajax({
                url: '/Components/Comment/Add',
                dataType: 'json',
                type: 'POST',
                data: {text: comment.text},
                success: function(data) {
                    this.setState({commentListItems: data});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },

        /* Loads the new state of the comments from the server */
        loadCommentsFromServer: function() {
            $.ajax({
                url: '/Components/Comment/List', //Controller that loads the comments
                dataType: 'json',
                cache: false,
                success: function(data) {
                    console.log(data);
                    console.log(data[0]);
                    this.setState({commentListItems: data});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },

        /* the ON load function */
        componentDidMount: function() {
            this.loadCommentsFromServer();
        },

        /* Display the comment box listing */
        render: function() {
            return (
                <div>
                    <CommentsEntry onCommentSubmit={this.handleCommentSubmit} />
                    <CommentsList commentList={this.state.commentListItems} />
                </div>
        );}
    });
