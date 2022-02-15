import React, { Component } from 'react';

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
                    <p>{event.summary}</p>
                </div>

                <div className="location">
                    <p>{event.location}</p>
                </div>

                {
                    this.state.isCollapsed ?
                        <div>
                            <button className="show-details" onClick={this.handleClick}>
                                Show Details
                            </button>
                        </div>
                        :
                        <div>
                            <button className="hide-details" onClick={this.handleClick}>
                                Hide Details
                            </button>
                            <div className="details">
                                <div className="htmlLink">
                                    <p>
                                        {event.htmlLink}
                                    </p>
                                </div>
                                <div className="description">
                                    <p>
                                        {event.description}
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