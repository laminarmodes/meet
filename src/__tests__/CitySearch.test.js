import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySearch';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';

describe('<CitySearch /> component', () => {

    let locations, CitySearchWrapper;

    beforeAll(() => {
        locations = extractLocations(mockData);
        CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={() => { }} />);
    });

    // Does an element of the class name city exists within the CitySearchWrapper
    test('render text input', () => {

        expect(CitySearchWrapper.find('.city')).toHaveLength(1);
    });

    // Does an element of the class name suggestions exist within the CitySearchWrapper
    test('renders list of suggestions', () => {

        expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
    });

    // Test if the event list text is rendered
    test('renders text input correctly', () => {

        // query element from the CitySearch state (the query the user types into the textbox)
        const query = CitySearchWrapper.state('query');
        // Compare 
        // 1: value prop of each element that has the class city found within CitySearch component (input field)
        // 2: What is in the CitySearch query state
        expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
    });

    test('change state when text input changes', () => {


        CitySearchWrapper.setState({
            query: 'Munich'
        });

        // Tell it to change it's value to 'Berlin'
        const eventObject = { target: { value: 'Berlin' } };

        // Simulate is being run ont he element found within CitySearch
        // Simulates a change on the city (changing it to Berlin)
        CitySearchWrapper.find('.city').simulate('change', eventObject);

        // If city now has the value Berlin, the test will pass
        expect(CitySearchWrapper.state('query')).toBe('Berlin');

    });

    // Verify the list of suggestions rendered matches the list of suggestions in the component state
    test('render list of suggestions correctly', () => {

        // Will contain a set of locations from the mockData events list
        const locations = extractLocations(mockData);

        // Set suggestions state to the full list of mock locations
        CitySearchWrapper.setState({ suggestions: locations });

        const suggestions = CitySearchWrapper.state('suggestions');

        // Compare number of rendered suggestions to the number of suggestions in the state of CitySearch plus one
        // Note: minimum length of the li's will be 1
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1);

        // The actual rendered text is checked to ensure it has also been taken from state
        // Loop through all suggestions and compare items one by one
        for (let i = 0; i < suggestions.length; i += 1) {
            expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i]);
        }

    });

    // Verify that suggestions are filtered based on what's been typed in the search field
    test('suggestion list matches the query when changed', () => {

        // Empty the state for 'query' and 'suggestions'
        CitySearchWrapper.setState({ query: '', suggestions: [] });

        // Change value of Berlin though simulated change event on .city input field
        CitySearchWrapper.find('.city').simulate('change', {
            target: { value: "Berlin" },
        });
        const query = CitySearchWrapper.state('query');

        // Filtering locations prop against what is in the state of query
        const filteredLocations = locations.filter((location) => {
            return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
        });
        expect(CitySearchWrapper.state('suggestions')).toEqual(filteredLocations);

    });

    // Verify the user can select a city from the suggest list
    test('selecting a suggestion should change query state', () => {
        CitySearchWrapper.setState({
            query: 'Berlin'
        });

        const suggestions = CitySearchWrapper.state('suggestions');

        CitySearchWrapper.find('.suggestions li').at(0).simulate('click');

        expect(CitySearchWrapper.state('query')).toBe(suggestions[0]);
    });

    test('selecting CitySearch input reveals the suggestion list', () => {
        CitySearchWrapper.find('.city').simulate('focus');
        expect(CitySearchWrapper.state('showSuggestions')).toBe(true);
        expect(CitySearchWrapper.find('.suggestions').prop('style')).not.toEqual({ display: 'none' });
    });

    test("selecting a suggestion should hide the suggestions list", () => {
        CitySearchWrapper.setState({
            query: 'Berlin',
            showSuggestions: undefined
        });
        CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
        expect(CitySearchWrapper.state('showSuggestions')).toBe(false);
        expect(CitySearchWrapper.find('.suggestions').prop('style')).toEqual({ display: 'none' });
    });

});