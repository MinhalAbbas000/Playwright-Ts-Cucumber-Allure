Feature: Add items to cart 
    As a logged-in user I want to add items to cart from product list page
    So that I can purchase them

Background:
    Given I navigate to the product list page

Scenario Outline: Adding products to cart should show badge icon on the cart
    When I add <quantity> "<productName>" item to cart
    Then badge on the cart should display <quantity>

Examples: 
   | productName                | quantity |
   | Sauce Labs Backpack        |  1       |
