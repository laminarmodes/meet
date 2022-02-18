import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

    test('When the user has not specified a number of events, the default number displayed is 32', ({ given, when, then }) => {

        let AppWrapper;
        given('the user is on the app main page', async () => {
            AppWrapper = await mount(<App />);
        });

        when('the user has not specified the number of events', () => {
            AppWrapper.update();
        });

        then('the number of events displayed will be 32, and 2 for mock data', () => {
            expect(AppWrapper.find('.event')).toHaveLength(5);
        });
    });


    test('The user can change the number of events to display', ({ given, when, then }) => {

        let AppWrapper;
        let newNumber = 3;
        given('the user is on the app main page', async () => {
            AppWrapper = await mount(<App />);
        });

        when('the user has specified the number of events', () => {
            AppWrapper.update();
            AppWrapper.find('.number-of-events-input').simulate('change', { target: { value: newNumber } });
        });

        then('the number of events will be displayed', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(newNumber);
        });
    });

});