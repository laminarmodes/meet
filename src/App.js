import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import { OfflineAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EventGenre from './EventGenre';


class App extends Component {

  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all',
    networkStatusText: '',
    showWelcomeScreen: undefined
  }


  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });

    if ((code || isTokenValid && this.mounted)) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events,
            locations: extractLocations(events)
          });
        }
      });
    }
    if (!navigator.onLine) {
      this.setState({
        networkStatusText: 'You are offline, loading data from last connection'
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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length;
      const city = location.split(',').shift();
      return { city, number };
    })
    return data;
  };

  render() {

    const { locations, numberOfEvents, networkStatusText, events, showWelcomeScreen } = this.state;

    if (this.state.showWelcomeScreen === undefined) return <div className="App" />

    return (
      <div className="App">
        {/* Pass in updateEvents method as a prop to CitySearch so that
        you can call it inside handleItemClicked */}
        <h1 className='title'>Meet</h1>

        <div className="city-search">
          <b>Search City</b>
          <CitySearch locations={locations} updateEvents={this.updateEvents} />
        </div>

        <br />

        <div className="number-of-events">
          <b>Number of Events</b>
          <NumberOfEvents numberOfEvents={numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents} />
        </div>

        <br /><br /><br />
        <OfflineAlert text={networkStatusText} />
        <br />
        <div className="data-vis-wrapper">
          <EventGenre className="pie-chart" events={events} />
          <ResponsiveContainer height={400} >
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }} >
              <CartesianGrid stroke="#888" strokeDasharray="5 5" />
              <XAxis type="category" dataKey="city" name="City" />
              <YAxis type="number" dataKey="number" label={{ value: 'Number of Events', angle: -90, position: 'insideLeft' }} name="Number of events" allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter
                data={this.getData()}
                fill="#0373fc" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="events-list-container">
          <h2 className="events-list-text"> Events List</h2>
          <EventList events={events} />
        </div>
        <WelcomeScreen showWelcomeScreen={showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );

  }
}

export default App;