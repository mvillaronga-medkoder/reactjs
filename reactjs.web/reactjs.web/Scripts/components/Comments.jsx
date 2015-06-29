/* Top level Comment container class */
var Comments = React.createClass({
  render: function() {
    return (
        <div>
            <CommentsEntry />
            <CommentsList commentList={this.props.commentList}>
            </CommentsList>
        </div>
    );
  }
});

/* Comment Entry area */
var CommentsEntry = React.createClass({
  render: function() {
    return (
            <div className="comment-entry row">
                <div className="col-xs-12">
                    <textarea maxlength="400" className="comment-text-area"></textarea>
                </div>
                <div className="col-xs-12">
                    <div className="row">
                        <div className="col-xs-8"></div>
                        <div className="col-xs-2">400 remaining</div>
                        <div className="col-xs-2">
                            <button className="btn btn-primary" role="button">Add Comment</button>
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

