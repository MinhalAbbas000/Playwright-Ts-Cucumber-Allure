Feature: I want to add items to cart from product details page
    As a logged-in user I want to add items to cart from the product details page
    So that I can make purchases

Background:
    Given I navigate to the application and login
    And I navigate to the product list page


Scenario Outline: User should be able to add items to cart form product details page and cart should show count of the items added.
   When I click on "<productName>" title
   Then product details page should be opened
   When I add "<quantity>" "<productName>" item to carts from product details page.
   Then badge on the cart should display "<quantity>"

Examples: 
   | productName                | quantity |
   | Sauce Labs Backpack        |  1       |
   | Sauce Labs Bike Light      |  1       |