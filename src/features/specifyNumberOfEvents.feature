Feature: Specify the number of events

Scenario: When the user has not specified a number of events, the default number displayed is 32
Given the user is on the app main page
When the user has not specified the number of events
Then the number of events displayed will be 32, and 2 for mock data

Scenario: The user can change the number of events to display
Given the user is on the app main page
When the user has specified the number of events
Then the number of events will be displayed