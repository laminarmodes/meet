import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { OfflineAlert } from './Alert';


class App extends Component {

  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all',
    networkStatusText: ''
  }


  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events,
          locations: extractLocations(events)
        });
      }
    });
    if (!navigator.onLine) {
      this.setState({
        networkStatusText: 'You are offline'
      })
    } else {
      this.setState({
        networkStatusText: ''
      })
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);

      this.setState({
        events: locationEvents.slice(0, this.state.numberOfEvents),
        currentLocation: location
      });
      console.log('in updateEvents, numberOfEvents=' + this.state.numberOfEvents)
    });
  }

  updateNumberOfEvents = (newNumber) => {

    this.setState({
      numberOfEvents: newNumber
    });
    console.log('in updateNumberOfEvents, numberOfEvents=' + this.state.numberOfEvents)
    this.updateEvents(this.state.currentLocation);
  }

  render() {

    return (
      <div className="App">
        {/* Pass in updateEvents method as a prop to CitySearch so that
        you can call it inside handleItemClicked */}
        <p>Search City</p>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <br /><br /><br />
        <p>Number of Events</p>
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents} />
        <br /><br /><br />
        <OfflineAlert text={this.state.networkStatusText} />
        <br />
        <p> Events List</p>
        <EventList events={this.state.events} />
      </div>
    );

  }
}

export default App;