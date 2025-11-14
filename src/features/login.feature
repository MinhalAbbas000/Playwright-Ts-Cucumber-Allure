Feature: Login to application
    As a user
    I want to login to the application
    So that I can access the inventory

    Background:
        Given I navigate to the application

    Scenario: Successful login with valid credentials
        When I enter username "standard_user"
        And I enter password "secret_sauce"
        And I click the login button
        Then I should see the inventory page

    Scenario: Failed login with invalid credentials
        When I enter username "invalid_user"
        And I enter password "wrong_password"
        And I click the login button
        Then I should see an error message "Username and password do not match any user in this service"

    Scenario: Failed login with empty username
        When I enter password "secret_sauce"
        And I click the login button
        Then I should see an error message "Username is required"