import React from 'react';
import states from '../modules/SignUp/states';


export default (Component, map = ['Federal', 'State', 'Local'], key = 'meta') => {
  states.shift();
  let selectedEntries;
  const statesFilterObject = states.map(item => item.state.name);
  const locals = states.reduce((a, b) => {
    a[`${b.state.name}`] = b.state.locals.map(lga => lga.name);
    return a;
  }, {});

  return class FilterableComponent extends React.Component {
    static navigatorStyle = {
      tabBarHidden: true,
      drawContentUnderTabBar: true
    }

    constructor(props) {
      super(props);
      this.state = {
        entries: [],
        state: '',
        keys: map
      };
    }

    componentDidMount = () => this.setState({ entries: this.props.entries })


    handleSubmitFederal = (value) => {
      const { navigator, entries } = this.props;
      let { keys } = this.state;
      navigator && navigator.dismissLightBox({});
      if (value === 'All') {
        keys = map;
        this.setState({ entries, keys });
        return;
      }
      keys = [`Showing only ${value}`];
      selectedEntries = entries.filter(item => (item[key] && item[key].level === value) || (item.meta && item.meta.level === value) || (item.level && item.level === value));
      this.setState({ entries: selectedEntries, keys });
    };

     handleSubmitLocal = (value) => {
       const { keys } = this.state;
       const { navigator, entries } = this.props;
       navigator && navigator.dismissLightBox({});
       if (value === 'None') {
         keys[2] = 'Select Lga';
         selectedEntries = entries.filter(item => (item[key] && item[key].state === this.state.keys[1]) || (item.meta && item.meta.state === this.state.keys[1]) || (item.state && item.state === this.state.keys[1]));
         this.setState({ entries: selectedEntries, keys });
         return;
       }
       keys[2] = value;
       selectedEntries = entries.filter(item => (item[key] && item[key].lga === value) || (item.meta && item.meta.lga === value) || (item.lga && item.lga === value));
       this.setState({ entries: selectedEntries, keys });
     };

     handleSubmitState = (value) => {
       const { keys } = this.state;
       const { navigator, entries } = this.props;
       navigator && navigator.dismissLightBox({});
       if (value === 'None') {
         if (keys[2]) {
           keys[2] = 'lga';
         }
         keys[1] = 'State';
         this.setState({ entries, keys });
         return;
       }
       keys[1] = value;
       if (keys[2]) {
         keys[2] = 'Select Lga';
       }
       selectedEntries = entries.filter(item => (item[key] && item[key].state === value) || (item.meta && item.meta.state === value) || (item.state && item.state === value));
       this.setState({ entries: selectedEntries, state: value, keys });
     };

    renderStates = () => {
      this.props.navigator.showLightBox({ screen: 'Select.Entries', passProps: { data: ['None', ...statesFilterObject], handleSelect: this.handleSubmitState } });
    }

    renderLocals = () => this.state.state.length && this.props.navigator.showLightBox({ screen: 'Select.Entries', passProps: { data: ['None', ...locals[this.state.state]], handleSelect: this.handleSubmitLocal } });

    renderFederal = () => this.props.navigator.showLightBox({ screen: 'Select.Entries', passProps: { data: ['All', 'Federal', 'State', 'Local'], handleSelect: this.handleSubmitFederal } });

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
