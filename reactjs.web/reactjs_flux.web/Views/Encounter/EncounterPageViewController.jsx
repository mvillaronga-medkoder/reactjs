/*  */
class EncounterPageViewController extends React.Component {

    // Normal Flux store listening
    componentDidMount() {
        PatientCommentsStore.on('change', this.onStoreChange);
        EncounterCommentsStore.on('change', this.onStoreChange);
    }

    onStoreChange() {
        this.setState({
            data1: PatientCommentsStore.getData(),
            data2: EncounterCommentsStore.getData()
        });
    }

    render() {
        // <HomePage /> has no internal state!
        return <HomePage
            data1={this.state.data1}
            data2={this.state.data2} />;
    }

}