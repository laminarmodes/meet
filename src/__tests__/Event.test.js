import React from 'react';
import { shallow } from 'enzyme';
import { mockData } from '../mock-data';
import Event from '../Event'

// To Do: Test basic information (i.e., to verify whether all the necessary elements have been rendered).

describe('<Event /> component', () => {

    let EventWrapper;

    beforeAll(() => {
        EventWrapper = shallow(<Event event={mockData[0]} />);
    });

    // Renders event
    test('render event element', () => {
        // There should be one element inside the Event component
        expect(EventWrapper.find('.event')).toHaveLength(1);
    });

    // Renders Summary
    test('renders event summary', () => {
        expect(EventWrapper.find('.summary')).toHaveLength(1);
    });

    // Renders location
    test('renders location', () => {
        expect(EventWrapper.find('.location')).toHaveLength(1);
    })

    // When show details button is clicked, shows details
    test('when show-details button is clicked, show-details state becomes active', () => {

        // Given initial state to hide-details
        EventWrapper.setState({ isCollapsed: true });

        // When Simulate button click
        EventWrapper.find('.show-details').simulate('click');

        // Then new state is show-details
        expect(EventWrapper.state('isCollapsed')).toBe(false);
    });

    // When hide-details button is clicked, hides details
    test('when hide-details button is clicked, hide details state becomes active', () => {

        // Given initial state is show-details
        EventWrapper.setState({ isCollapsed: false });

        // When Simulate button click
        EventWrapper.find('.hide-details').simulate('click');

        // Then new state is hide-details
        expect(EventWrapper.state('isCollapsed')).toBe(true);
    });

    // When show details button is clicked, details element is rendered
    test('render details', () => {

        // Given initial state to hide-details
        EventWrapper.setState({ isCollapsed: true });

        // When Simulate button click
        EventWrapper.find('.show-details').simulate('click');

        // Then details element is rendered
        expect(EventWrapper.find('.details')).toHaveLength(1);
    });

    test('render htmlLink correctly', () => {

        // Given initial state is show-details
        EventWrapper.setState({ isCollapsed: false });

        // When the details are displayed
        const htmlLink = mockData[0].htmlLink;
        const htmlLinkRendered = String(EventWrapper.find('.htmlLink p').text());

        // DEBUG (these two strings match)
        // console.log(htmlLink);
        // console.log(htmlLinkRendered);

        // Then details are displayed correctly
        expect(htmlLinkRendered).toBe(htmlLink);

    });


    test('render description correctly', () => {

        // Given initial state is show-details
        EventWrapper.setState({ isCollapsed: false });

        // When the details are displayed
        const descrlption = mockData[0].description;
        const descriptionRendered = String(EventWrapper.find('.description p').text());

        // DEBUG (these two strings match)
        // console.log(htmlLink);
        // console.log(htmlLinkRendered);

        // Then details are displayed correctly
        expect(descriptionRendered).toBe(descrlption);

    });

});

export default Event;