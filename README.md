# Meet

Foobar is an app that allows users to view upcoming events in different cieites

## Running

THe app can be found at https://laminarmodes.github.io/meet/

## Features, User Stories and Scenarios

### Feature 1 - It must be able to filter events by city
#### ***Story: As a user, I should be able to filter events by city, so that I scan see a list of events for my preferred city***

        *Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.*
            - Given user hasn’t searched for any city
            - When the user opens the app
            - Then the user should see a list of all upcoming events

        *Scenario 2: User should see a list of suggestions when they search for a city.
            - Given the main page is open
            - When user starts typing in the city textbox
            - Then the user should see a list of cities (suggestions) that match what they’ve typed

        *Scenario 3: User can select a city from the suggested list.
            - Given the user was typing “Berlin” in the city textboxAnd the list of suggested cities is showing
            - When the user selects a city (e.g., “Berlin, Germany”) from the list
            - Then their city should be changed to that city (i.e., “Berlin, Germany”)And the user should receive a list of upcoming events in that city
            - And the list of suggestions should disappear.
            - And the user should receive a list of upcoming events in that city.

### Feature 2: It must be able to show/hide an event’s details
 #### ***Story: As a user, I should be able to show/hide even details so that I can learn more about an event***

        *Scenario 1: An event element is collapsed by default.*
            - Given the user has opened an event
            - When looking at the event
            - The details are collapsed and not visible in the UI

        *Scenario 2: User can expand an event to see its details.*
            - Give the user has opened an event
            - When the user expands the details
            - The details are visible in the UI

        *Scenario 3: User can collapse an event to hide its details.*
            - Given the user has expanded the event details
            - When the user collapses the even details
            - The details are no longer visible in the UI

### Feature 3: It must specify the number of events
#### ***Story: As a user, I want to know the number of events, so that I know how many events are going on during a period of time***

        *Scenario 1: When user hasn’t specified a number, 32 is the default number.*
            - Given the user has not specified the number of events
            - When the user looks at a list of events
            - At most, 32 events should be displayed

        *Scenario 2: User can change the number of events they want to see.*
            - Give the user is looking at a list of events
            - When the user changes the number of events
            - They should see their specified number of events displayed

### Feature 4: It must be available offline
#### ***Story: As a user, I want to be able to access the information online, so that I can obtain information about events even when I do not have a network connection***

        *Scenario 1: Show cached data when there’s no internet connection.*
            - Given the user has no internet connection
            - When the user tries to access events
            - They will be able to see the events saved from the cached data

        *Scenario 2: Show error when user changes the settings (city, time range).*
            - Given the user has no internet connection
            - When the user changes city or time range
            - They should see an error (because there is no cached data for those filter settings)


### Feature 5: It must display a chart showing the upcoming events by city so that I know which events are organised in each city
#### ***Story: I want to see upcoming events by city so that I can compare different cities***

        *Scenario 1: Show a chart with the number of upcoming events in each city.*
            - Given the main page is open 
            - When they select an option to see number of events by city 
            - A chart showing number of events by city is displayed

### Non-Feature: It must add an app shortcut to the user’s home screen (handled by the OS so no scenario has been created since no test will be written)
#### ***Story: As a want a shortcut on my home screen so that I can access the app directly***

## Running serverless test

Inside the auth-serfer folder, deploy function to AWS Lambda

```bash
serverless deploy
```

Obtain the new endpoints and update test-auth-server.html

To get the endpoint information again 

```bash
serverless info
```

Inside static-site-test folder (contianing test-auth-server.html)

```bash
http-server
```

Open http://127.0.0.1:8080/test-auth-server.html and copy code after 'code=" and before "&scope"

In root folder, to deploy to github

```bash
npm run deploy
```

Don't forget to also update master

## Dependencies

```bash
npm install --save-dev enzyme
```

Since having npm 7+

```bash
npm install --save-dev --legacy-peer-deps @wojtekmaj/enzyme-adapter-react-17
```

```bash
npm install axios --save
```

```bash
npm install --save nprogress
```

## Running tests

```bash
npm run test
```

```bash
npm test -- --coverage
```

## To see the UI

Stop current tests and run 

```bash
npm run start
```

## BDD Tests

```bash
npm i jest-cucumber --save-dev
```

## End to end tests

```bash
npm i --save-dev puppeteer
```

Before running test, app needs to be running

```bash
npm run start
```

Then to run end-to-end test

```bash
npm run test
```