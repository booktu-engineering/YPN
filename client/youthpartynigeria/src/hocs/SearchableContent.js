import React from 'react';
import { View, TextInput } from 'react-native';
import { width, height, Selectors, defaultGreen } from '../mixins';
import Iterator from '../modules/iterator';


export default Component => Component2 => config => {
    const SearchInput = ({ handleChange }) => (
        <TextInput 
            style={{
                height: 36,
                width: '100%',
                borderWidth: 1,
                borderColor: '#D7DBDD',
                borderRadius: 2,
                color: defaultGreen,
                fontSize: 14,
                fontWeight: '500',
                paddingLeft: 10
            }}
            placeholder="Type to search"
            onChangeText={handleChange}
            autoCapitalize="none"
            autoCorrect={false}
        />
    )


    
    class SearchableComponent extends React.Component {
        constructor(props){
            super(props);
            this.state = {...config.directories, wantsToViewMain: true }
        }
        componentDidMount = () => {
            this.mounted = true;
        }
        handleTextChange = (text) => {
            if(!text.length) return this.setState({ Posts: config.directories.Posts, Users: config.directories.Users, })
            if(text.length < 3) return; 
            if(!config.directories) return;
            // debouncing 
            this.timeout = setTimeout(() => {
                config.keys.forEach(key => {
                   this.mounted && this.searchDirectory(config.directories[key], text, key)
                })  
            }, 500)
            
        }

        componentWillUnmount = () => {
            this.mounted = false
            clearTimeout(this.timeout);
        }

        searchDirectory = (directory, text, key) => {
            const results = directory.filter(item => JSON.stringify(item).search(text) !== -1)
            this.setState({ [key]: results })  
        }

        
        render = () => (
                <View style={{ flex: 1 }}>
                <SearchInput handleChange={this.handleTextChange} />
                { config.keys.length > 1 && (<Selectors keys={config.keys} functionMap={[ () => {this.setState({ wantsToViewMain: true })}, () => {this.setState({ wantsToViewMain: false })}]}/>)}
                { config.keys.length === 1 && (Iterator(Component)(this.state[config.keys[0]])(config.props))}
                { config.keys.length > 1 && this.state.wantsToViewMain && (Iterator(Component)(this.state.Posts)({ ...config.props, data: this.state.Posts }))}
                { config.keys.length > 1 && !this.state.wantsToViewMain && (Iterator(Component2)(this.state.Users)({ ...config.props, data: this.state.Users }))}
                </View>
            )
        
    }

    return React.createElement(SearchableComponent, config.props, null)

}
