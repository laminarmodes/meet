import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents'

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