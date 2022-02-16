import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents'
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';


// Group (scope)
describe('<App /> component', () => {

    let AppWrapper;

    beforeAll(() => {
        // Constant for rendering component using shallow rendering API
        // Calls the shallow-rendered App component
        AppWrapper = shallow(<App />);

    });

    // Test to see that the EventList Component Exists
    test('render list of events', () => {

        // Shallow rendered app component
        // Checks how many EventList components there are in the AppWrapper
        // Ensures there exists only one EventList component with the App component
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    // Test to see that the CitySearch Component Exists
    test('render CitySearch', () => {

        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });

    // Ensure textbox is rendered correctly
    // Test that number of events textbox exists
    test('render number-of-events rendered', () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
    });

});

// Integration tests
// Group (scope)
describe('<App /> integration', () => {

    // Make sure that EventList gets events as a prop from App
    // Will initially fail because EventsList.js file does not contain this.props.events, because
    // it has not been passed in yet
    test('App passes "events" state as a prop to EventList', () => {

        // Render the App component and set it to a new constant
        const AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state('events');

        // Important to preveent an (undefined = undefined)
        expect(AppEventsState).not.toEqual(undefined);

        // Compare tate of App's events with the EventList's events prop to ensure it has
        // been passed in correctly
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);

        // Tests using the same DOM will affect each other so important to clean up after each test
        AppWrapper.unmount();
    });

    test('App passes locations state as a prop to CitySearch', () => {
        const AppWrapper = mount(<App />);
        const AppLocationState = AppWrapper.state('locations');
        expect(AppLocationState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationState);
        AppWrapper.unmount();
    });

    // Test if a user clicks on a specific city, events from that city are listed
    // If a user clicks on "See all cities", all events should be listed
    /* await is also the reason async is added right before test’s callback function in the test 
    above. Always add async to a test’s callback function if it contains async code.
    */
    test('get list of events matching the city selected by the user', async () => {

        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);

        // Given the list of suggested locations
        // Here the CitySearch suggestions state is set to haveh all available cities
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');

        // When the user selects a city
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClicked(selectedCity)

        // await has been added when handleItemClicked() is called because it’s expected 
        // that it will have async code that involves fetching the full list of events before 
        // filtering them down to the list of events that match the selected city.

        /* get all the events from the API asynchronously (and from the mock data 
            when it’s used in tests).*/
        const allEvents = await getEvents();
        // Find events that have the same location
        const eventsToShow = allEvents.filter(event => event.location == selectedCity);
        // Compare whether the state of events actually takes the same array as the events that
        // resulted from the filtering process in the previous step
        expect(AppWrapper.state('events')).toEqual(eventsToShow);

        AppWrapper.unmount();
    });

    // Test 'see all cities' option
    // Simulate a click on the last item
    test('get list of all events when user selects "See all cities"', async () => {
        const AppWrapper = mount(<App />);
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        // Check if the event state of the App component equals the list of all events
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });
});