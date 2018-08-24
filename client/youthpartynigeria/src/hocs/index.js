import React from 'react';
import states from '../modules/SignUp/states';


export default (Component) => {
  states.shift();
  let selectedEntries;
  const statesFilterObject = states.map(item => item.state.name);
  const locals = states.reduce((a, b) => {
    a[`${b.state.name}`] = b.state.locals.map(lga => lga.name);
    return a;
  }, {});

  return class FilterableComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        entries: [],
        state: '',
        keys: ['Level', 'State', 'Local']
      };
    }

    componentDidMount = () => this.setState({ entries: this.props.entries })

    handleSubmitFederal = (value) => {
      const { navigator, entries } = this.props;
      let { keys } = this.state
      navigator.dismissLightBox({});
      if (value === 'All') {
        keys = ['Level', 'State', 'Local' ];
        this.setState({ entries, keys });
        return;
      }
      keys = [`Showing only ${value}`];
      selectedEntries = entries.filter(item => item.meta && item.meta.type === value);
      this.setState({ entries: selectedEntries, keys });
    };

     handleSubmitLocal = (value) => {
       const { keys } = this.state;
       const { navigator, entries } = this.props;
       navigator.dismissLightBox({});
       if (value === 'None') {
         keys[2] = 'Select Lga';
         this.setState({ entries, keys });
         return;
       }
       keys[2] = value;
       selectedEntries = entries.filter(item => item.meta && item.meta.lga === value);
       this.setState({ entries: selectedEntries, keys });
     };

     handleSubmitState = (value) => {
       const { keys } = this.state;
       const { navigator, entries } = this.props;
       navigator.dismissLightBox({});
       if (value === 'None') {
         keys[2] = 'lga';
         keys[1] = 'State';
         this.setState({ entries, keys });
         return;
       }
       keys[1] = value;
       keys[2] = 'Select Lga';
       selectedEntries = entries.filter(item => item.meta && item.meta.state === value);
       this.setState({ entries: selectedEntries, state: value, keys });
     };

    renderStates = () => this.props.navigator.showLightBox({ screen: 'Select.Entries', passProps: { data: ['None', ...statesFilterObject], handleSelect: this.handleSubmitState, _navigator: this.props.navigator } });

    renderLocals = () => this.state.state.length && this.props.navigator.showLightBox({ screen: 'Select.Entries', passProps: { data: ['None', ...locals[this.state.state]], handleSelect: this.handleSubmitLocal, _navigator: this.props.navigator } });

    renderFederal = () => this.props.navigator.showLightBox({ screen: 'Select.Entries', passProps: { data: ['All', 'Federal', 'State', 'Local'], handleSelect: this.handleSubmitFederal, _navigator: this.props.navigator } });

        render = () => (
          <Component
            renderFunctionMap={[this.renderFederal, this.renderStates, this.renderLocals]}
            _entries={this.state.entries}
            value={this.state.state}
            keys={this.state.keys}
            {...this.props}
          />
        )
  };
};
