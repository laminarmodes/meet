import React from 'react';
import { shallow } from 'enzyme';
import { mockData } from '../mock-data';
import NumberOfEvents from '../NumberOfEvents';
import EventsList from '../EventList';

describe('<NumberOfEvents /> component', () => {

    let NumberOfEventsWrapper;

    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents numberOfEvents={3} />);
    });

    // Ensure textbox is rendered correctly
    test('render number-of-events element', () => {
        expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
    });

    // Ensure when changing number of events, that number of events is changed to 5
    test('test state when number-of-events-input is changed', () => {

        // Given the number of events is set to 2
        NumberOfEventsWrapper.setState({ numberOfEvents: 2 })

        // When the user enters the number of events
        let newNumber = 5;
        const numberObject = { target: { value: newNumber } };
        NumberOfEventsWrapper.find('.number-of-events-input').simulate('change', numberObject);

        // That number of events is displayed
        // console.log(numberShown);
        // console.log(newNumber);
        const numberShown = NumberOfEventsWrapper.state('numberOfEvents');
        expect(numberShown).toBe(newNumber)

    })

    // Ensure when changing number of events, that number of events is changed to 10
    test('test state when number-of-events-input is changed', () => {

        // Given the number of events is set to 2
        NumberOfEventsWrapper.setState({ numberOfEvents: 2 })

        // When the user enters the number of events
        let newNumber = 10;
        const numberObject = { target: { value: newNumber } };
        NumberOfEventsWrapper.find('.number-of-events-input').simulate('change', numberObject);

        // That number of events is displayed
        // console.log(numberShown);
        // console.log(newNumber);
        const numberShown = NumberOfEventsWrapper.state('numberOfEvents');
        expect(numberShown).toBe(newNumber)

    })

});