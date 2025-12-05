Feature: Cart should display all products user added along with their quantity and prices.
    As a logged-in user I want to see all products added to cart
    So that I can make purchases

Background: 
    Given I navigate to the application and login
    And I navigate to the product list page

Scenario: On the cart all products added to the cart should be displayed
    When I add "1" "Sauce Labs Fleece Jacket" item to cart
    And I add "1" "Sauce Labs Bolt T-Shirt" item to cart
    And I add "1" "Sauce Labs Bike Light" item to cart 
    And I click on add to cart icon
    Then I should see the cart page listing all added items

Scenario: On the cart all products added to the cart should be display correct qauntities
    When I add "1" "Sauce Labs Fleece Jacket" item to cart
    And I add "1" "Sauce Labs Bolt T-Shirt" item to cart
    And I add "1" "Sauce Labs Bike Light" item to cart 
    And I click on add to cart icon
    Then I should see the cart page listing all added items with correct qantities

Scenario: On the cart all products added to the cart should be display correct price
    When I add "1" "Sauce Labs Fleece Jacket" item to cart
    And I add "1" "Sauce Labs Bolt T-Shirt" item to cart
    And I add "1" "Sauce Labs Bike Light" item to cart 
    And I click on add to cart icon
    Then I should see the cart page listing all added items with correct price