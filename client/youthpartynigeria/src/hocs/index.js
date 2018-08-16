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
        state: ''
      };
    }

    componentDidMount = () => this.setState({ entries: this.props.entries })

    handleSubmitFederal = (value) => {
      const { navigator, entries } = this.props;
      navigator.dismissLightBox({});
      if (value === 'All') {
        this.setState({ entries });
        return;
      }
      selectedEntries = entries.filter(item => item.meta && item.meta.type === value);
      this.setState({ entries: selectedEntries });
    };

     handleSubmitLocal = (value) => {
       const { navigator, entries } = this.props;
       navigator.dismissLightBox({});
       if (value === 'None') {
         this.setState({ entries });
         return;
       }
       selectedEntries = entries.filter(item => item.meta && item.meta.lga === value);
       this.setState({ entries: selectedEntries });
     };

     handleSubmitState = (value) => {
       const { navigator, entries } = this.props;
       navigator.dismissLightBox({});
       if (value === 'None') {
         this.setState({ entries });
         return;
       }
       selectedEntries = entries.filter(item => item.meta && item.meta.state === value);
       this.setState({ entries: selectedEntries, state: value });
     };

    renderStates = () => this.props.navigator.showLightBox({ screen: 'Select.Entries', passProps: { data: ['None', ...statesFilterObject], handleSelect: this.handleSubmitState, _navigator: this.props.navigator } });

    renderLocals = () => this.state.state.length && this.props.navigator.showLightBox({ screen: 'Select.Entries', passProps: { data: ['None', ...locals[this.state.state]], handleSelect: this.handleSubmitLocal,  _navigator: this.props.navigator  } });

    renderFederal = () => this.props.navigator.showLightBox({ screen: 'Select.Entries', passProps: { data: ['All', 'Federal', 'State', 'Local'], handleSelect: this.handleSubmitFederal, _navigator: this.props.navigator  } });

        render = () => (
          <Component
            renderFunctionMap={[this.renderFederal, this.renderStates, this.renderLocals]}
            _entries={this.state.entries}
            value={this.state.state}
            {...this.props}
          />
        )
  };
};
