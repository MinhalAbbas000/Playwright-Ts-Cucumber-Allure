Feature: Login to application
    As a user
    I want to login to the application
    So that I can access the inventory

    Background:
        Given I navigate to the application

    Scenario: Successful login with valid credentials
        Given I use login data set "validUser"
        When I enter username
        And I enter password
        And I click the login button
        Then I should see the inventory page

    Scenario: Failed login with invalid credentials
        Given I use login data set "invalidUser"
        When I enter username
        And I enter password
        And I click the login button
        Then I should see an error message "Username and password do not match any user in this service"

    Scenario: Failed login with empty username
        Given I use login data set "emptyUser"
        And I enter password
        And I click the login button
        Then I should see an error message "Username is required"