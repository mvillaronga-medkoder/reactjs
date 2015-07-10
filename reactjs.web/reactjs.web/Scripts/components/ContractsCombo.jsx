
    /******************************************************************************
     *  Contracts Combo box
     * 
     *  Simple render of a contracts combo box that lists all contracts for the 
     *  currently selected organization in descending order of start date and 
     *  Selects the first contract by default
     *****************************************************************************/
    var ContractsCombobox = React.createClass({
        /* Setup initial state */
        getInitialState: function () {
            console.log('get intial state');
            return {contracts: []};
        },

        /* Loads the new state of the contracts from the server */
        loadCommentsFromServer: function() {
            $.ajax({
                url: '/Components/ContractCombo/List', //Controller that loads the Contracts
                dataType: 'json',
                cache: false,
                success: function(data) {
                    console.log(data);
                    console.log(data[0]);
                    this.setState({contracts: data});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },

        /* the ON load function */
        componentDidMount: function() {
            console.log('componentDidMount');
            this.loadCommentsFromServer();
        },

        render: function() {

            //map the child objects
            console.log(this.props);
            var contractNodes = this.state.contracts.map(function (contract) {
                return (
                  <ContractsComboboxListItem description={contract.description} 
                                            key={contract.id} />
                );
            }.bind(this)); 

            return (
                <div className="btn-group">
                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                        ORC 215 <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                        {contractNodes}
                    </ul>
                </div>
            );
        }
    });

    /******************************************************************************
     *  Contracts Combo box List item
     * 
     *  The list item for the combo box
     *****************************************************************************/
    var ContractsComboboxListItem = React.createClass({
        render: function() {
            return (
                <li>
                    <a href="#">{this.props.description}</a>
                </li>
                );
        }
    })