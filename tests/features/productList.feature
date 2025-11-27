Feature: Product list visibility
    As a logged-in user
    I want to see products on the product list
    So that I can select items to purchase

    Background:
        Given I navigate to the application and login

    Scenario Outline: See multiple products on the list
        When I navigate to the product list page
        Then I should see the product "<productName>" on the list

        Examples:
            | productName              |
            | Sauce Labs Backpack      |
            | Sauce Labs Bike Light    |
            | Sauce Labs Bolt T-Shirt  |

    Scenario Outline: Validate prices for each of the products
        When I navigate to the product list page
        Then I should see the "<price>" for the product "<productName>" is correct

        Examples:
            | productName             | price |
            | Sauce Labs Backpack     | 29.99 |
            | Sauce Labs Bike Light   | 9.99  |
            | Sauce Labs Bolt T-Shirt | 15.99 |

    Scenario Outline: Validate description for each of the products
        When I navigate to the product list page
        Then I should see the description for the product "<productName>" is correct

        Examples:
            | productName             |
            | Sauce Labs Backpack     | 
            | Sauce Labs Bike Light   |
            | Sauce Labs Bolt T-Shirt | 

    Scenario: Validate currency symbol for all product prices 
        When I navigate to the product list page
        Then I should see all product prices in currency defined in the config  
