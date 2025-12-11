Feature: Product Details Page
    As a logged-in user
    I want to see product Details of the selected product 
    This includes product name, price and description.
    So that I can see product info before purchasing.
Background:
    Given I navigate to the product list page

Scenario: Verfiy details of the selected product
    When I click on "Sauce Labs Backpack" title
    Then product details page should be opened
    And I should see product name
    And I should see product description
    And I should see product price
    And I should see correct currency symbol


    