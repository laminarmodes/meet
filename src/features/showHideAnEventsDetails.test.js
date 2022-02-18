import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

    test('An event element is collapsed by default.', ({ given, when, then }) => {

        let AppWrapper;
        given('the user is on the app landing page', async () => {
            AppWrapper = await mount(<App />);
        });

        when('at least one event is displayed', () => {
            AppWrapper.update();
        });

        then('the event details will be collapsed', () => {
            expect(AppWrapper.find('.details')).toHaveLength(0);
        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {

        let AppWrapper;
        given('the main page displays a list of events', async () => {
            AppWrapper = await mount(<App />);

        });

        when('the user clicks on an event\'s details button', () => {
            AppWrapper.update();
            AppWrapper.find('.show-details').at(0).simulate('click');
        });

        then('the event details will be displayed', () => {
            expect(AppWrapper.find('.details')).toBeDefined();
        });
    });

    test('User can collapse an event to hide its details', ({ given, when, then }) => {

        let AppWrapper;
        given('The user has clicked on an event\'s details button', async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.update();
            AppWrapper.find('.show-details').at(0).simulate('click');
            expect(AppWrapper.find('.details')).toBeDefined();
        });

        when('the user clicks on the hide-details button', () => {
            AppWrapper.find('.hide-details').at(0).simulate('click');
        });

        then('the event details will be hidden', () => {
            expect(AppWrapper.find('.details')).toHaveLength(0);
        });
    });

});