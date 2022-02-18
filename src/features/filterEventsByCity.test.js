// Step Definitions

import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import { renderIntoDocument } from 'react-dom/cjs/react-dom-test-utils.production.min';
import CitySearch from '../CitySearch';
import { extractLocations } from '../api';

const feature = loadFeature('./src/features/filterEventsByCity.feature');
const locations = extractLocations(mockData);

defineFeature(feature, test => {

    test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
        given('user hasn’t searched for any city', () => {

        });

        let AppWrapper;
        when('the user opens the app', () => {
            AppWrapper = mount(<App />);
        });

        then('the user should see the list of upcoming events.', () => {
            // Update the app component to display changes
            AppWrapper.update();
            expect(AppWrapper.find('.event').hostNodes()).toHaveLength(mockData.length);
        });
    });

    test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {

        let CitySearchWrapper;
        given('the main page is open', () => {
            // Don't need to render CitySearch's children, so can use shallow() instead of mount
            CitySearchWrapper = shallow(<CitySearch updateEvents={() => { }} locations={locations} />);
        });

        when('the user starts typing in the city textbox', () => {
            CitySearchWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
        });

        let numberOfNockDataEntries = 2;
        then('the user should receive a list of cities (suggestions) that match what they’ve typed', () => {
            expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(numberOfNockDataEntries)
        });
    });

    test('User can select a city from the suggested list', ({ given, and, when, then }) => {

        let AppWrapper;
        given('user was typing “Berlin” in the city textbox', async () => {
            // given function is an async function to allow App component to properly
            // load the events and locations
            AppWrapper = await mount(<App />);
            AppWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
        });

        and('the list of suggested cities is showing', () => {

            // Ensure the App component is updated after receivng the list of suggestions
            AppWrapper.update();
            // Check whether the suggestions are being displayed in the app
            expect(AppWrapper.find('.suggestions li')).toHaveLength(2);
        });

        when('the user selects a city (e.g., “Berlin, Germany”) from the list', () => {
            AppWrapper.find('.suggestions li').at(0).simulate('click');
        });

        then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
            // Check whether the query state of CitySearch is "Berlin, Germany"
            const CitySearchWrapper = AppWrapper.find(CitySearch);
            expect(CitySearchWrapper.state('query')).toBe('Berlin, Germany');
        });

        and('the user should receive a list of upcoming events in that city', () => {
            // Check whether the number of events rendered in the App component are
            // the same as those included in "mock-events.js"
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });
    });

});