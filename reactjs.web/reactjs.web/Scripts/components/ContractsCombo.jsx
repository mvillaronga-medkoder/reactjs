
    /******************************************************************************
     *  Contracts Combo box
     * 
     *  Simple render of a contracts combo box that lists all contracts for the 
     *  currently selected organization in descending order of start date and 
     *  Selects the first contract by default
     *
     *  Required event handlers
     *  
     *****************************************************************************/
    var ContractsCombobox = React.createClass({
        /* Setup initial state */
        getInitialState: function () {
            //console.log('get intial state');
            return {
                contracts: [],
                selectedIndex: -1
            };
        },

        /* Loads the new state of the contracts from the server */
        loadCommentsFromServer: function() {
            $.ajax({
                url: '/Components/ContractCombo/List', //Controller that loads the Contracts
                dataType: 'json',
                cache: false,
                success: function(data) {
                    console.log(data);
                    //console.log(data[0]);
                    var selIndex = (data.length > 0) ? 0 : -1;
                    console.log(selIndex)
                    this.setState({contracts: data, selectedIndex: selIndex});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },

        /* the ON load function */
        componentDidMount: function() {
            //console.log('componentDidMount');
            this.loadCommentsFromServer();
        },

        
        /* handles the selection of a contract */
        handleContractSelected: function(idx) {
            //console.log('handleContractSelected');
            //console.log(contract);
            this.setState({selectedIndex: idx});
        },

        render: function() {

            //map the child objects
            //console.log(this.props);
            var idx = -1;
            var contractNodes = this.state.contracts.map(function (contract, idx) {
                //console.log(contract.value);
                return (
                  <ContractsComboboxListItem description={contract.description} 
                                             index={idx++}
                                             key={contract.value}
                                             handleSelected={this.handleContractSelected} />
                );
            }.bind(this)); 

            return (
                <div className="btn-group">
                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                        {(-1 == this.state.selectedIndex) ? '' : this.state.contracts[this.state.selectedIndex].description} <span className="caret"></span>
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
        handleClicked: function(e) {
            e.preventDefault();

            //raise the selection event
            //console.log('item selected: ' + this.props.description);
            //console.log('item selected: ' + this.props.itemid);
            //console.log(contract);
            this.props.handleSelected(this.props.index);
        },

        render: function() {
            return (
                <li>
                    <a href="#" onClick={this.handleClicked}>{this.props.description}</a>
                </li>
                );
        }
    })