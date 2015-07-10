var DisplayPanel = React.createClass({
    render: function() {
        return ( 
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title">
                      {this.props.display}
                    </h3>
                  </div>
                  <div className="panel-body">
                    {this.props.children}
                  </div>
                </div>
        );
    }
});
