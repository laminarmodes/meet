import React, { Component } from 'react';

class CitySearch extends Component {

    // Another way to define a class component's state (alternatively can use constructor() { super(); this.state=...})
    state = {
        query: '',
        suggestions: []
    }

    // Event handler for <input> for the chang event
    // Will update the state after changing the text input
    handleInputChanged = (event) => {
        const value = event.target.value;
        // filter the state of suggestions and use the result as the new value
        // Using this.props.locations because will be passing it from the App component 
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        this.setState({
            query: value,
            suggestions
        });
    }

    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion
        });

        // You have passed in updateEvents as a prop and can now call it
        this.props.updateEvents(suggestion);

    }

    render() {
        return (
            <div className="CitySearch">
                <input type="text" className="city" value={this.state.query} onChange={this.handleInputChanged} />
                <ul className="suggestions">
                    {
                        this.state.suggestions.map((suggestion) => (
                            <li key={suggestion} onClick={() => this.handleItemClicked(suggestion)}>
                                {suggestion}
                            </li>
                        ))}
                    <li key='all' onClick={() => this.handleItemClicked("all")}>
                        <b>See all cities</b>
                    </li>
                </ul>
            </div>
        )
    }
}

export default CitySearch;