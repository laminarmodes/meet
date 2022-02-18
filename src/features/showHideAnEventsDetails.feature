Feature: Show/Hide an event's details

Scenario: An event element is collapsed by default.
Given the user is on the app landing page
When at least one event is displayed
Then the event details will be collapsed

Scenario: User can expand an event to see its details
Given the main page displays a list of events
When the user clicks on an event's details button
Then the event details will be displayed

Scenario: User can collapse an event to hide its details
Given The user has clicked on an event's details button
When the user clicks on the hide-details button
Then the event details will be hidden