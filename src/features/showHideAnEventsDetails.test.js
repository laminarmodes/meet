import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

    test('An event element is collapsed by default.', ({ given, when, then }) => {
        given('the user is on the app landing page', () => {

        });

        when('at least one event is displayed', () => {

        });

        then('the event details will be collapsed', () => {

        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {
        given('the main page displays a list of events', () => {

        });

        when('the user clicks on an event\'s details button', () => {

        });

        then('the event details will be displayed', () => {

        });
    });

    test('User can collapse an event to hide its details', ({ given, when, then }) => {
        given('The user has clicked on an event\'s details button', () => {

        });

        when('the user clicks on the hide-details button', () => {

        });

        then('the event details will be hidden', () => {

        });
    });

});