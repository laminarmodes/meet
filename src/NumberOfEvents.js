import React, { Component } from 'react';
import { ErrorAlert } from './Alert';
import './NumberOfEvents.css'

class NumberOfEvents extends Component {

    state = {
        numberOfEvents: 32
    }

    handleInputChanged = (numberInput) => {
        if (numberInput.target.value < 0) {
            this.setState({
                numberOfEvents: numberInput.target.value,
                infoText: 'Please enter a number between 1 and 32'
            });
        } else {
            this.props.updateNumberOfEvents(numberInput.target.value);
            return (
                this.setState({
                    numberOfEvents: numberInput.target.value,
                    infoText: ''
                })
            )
        }
    }

    render() {
        return (
            <div className="number-of-events">
                <input type="text" className="number-of-events-input" value={this.state.numberOfEvents} onChange={this.handleInputChanged} />
                <div className="number-of-events-alert">
                    <ErrorAlert text={this.state.infoText} />
                </div>
            </div>
        )
    }
}

export default NumberOfEvents;