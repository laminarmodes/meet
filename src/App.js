import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import axios from 'axios';


class App extends Component {

  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all'
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
        Search City
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <br /><br /><br />
        Events List
        <EventList events={this.state.events} />
        <br /><br /><br />
        Number of Events
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents} />
      </div>
    );

  }
}

export default App;