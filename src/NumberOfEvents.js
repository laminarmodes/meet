import React, { Component } from 'react';

class NumberOfEvents extends Component {

    state = {
        numberOfEvents: 0
    }

    handleInputChanged = (numberInput) => {
        //const value = numberInput.target.value;
        this.setState({
            numberOfEvents: numberInput.target.value
        })

    }

    render() {
        return (
            <div className="number-of-events">
                <input type="text" className="number-of-events-input" value={this.state.numberOfEvents} onChange={this.handleInputChanged} />
            </div>
        )
    }
}

export default NumberOfEvents;