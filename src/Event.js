import React, { Component } from 'react';
import './Event.css';

class Event extends Component {

    state = {
        isCollapsed: true,
        htmlLink: ''
    }

    handleClick = () => {
        this.setState(
            {// toggle isCollapsed state
                isCollapsed: !this.state.isCollapsed,
            }
        );
    };

    render() {

        const { event } = this.props;


        return (
            <div className="event">

                <div className="summary">
                    <h2>{event.summary}</h2>
                </div>

                <div className="location">
                    <h3>{event.location}</h3>
                </div>

                <div className="status">
                    <p><b>Status:</b> {event.status}</p>
                </div>

                {
                    this.state.isCollapsed ?
                        <div>
                            <button className="show-details" onClick={this.handleClick}>
                                SHOW DETAILS
                            </button>
                        </div>
                        :
                        <div>
                            <button className="hide-details" onClick={this.handleClick}>
                                HIDE DETAILS
                            </button>
                            <div className="details">
                                <h3>Description</h3>
                                <div className="description">
                                    <p>
                                        {event.description}
                                    </p>
                                </div>
                                <div className="htmlLink">
                                    <p>
                                        <a href={event.htmlLink} target="_blank">Link to event</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                }


            </div>
        )
    }
}

export default Event;