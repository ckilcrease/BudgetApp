# WalletFriend

## Overview

Finding out that your bank account balance is lower than you expected is about as fun as a root canal, but keeping track of your expenses can be annoying.

WalletFriend is a web app that will allow users to set budgets for (optional) categories and keep track of their expenses. Users can register and login, at which point they can set (or alter) their spending categories and budgets (e.g. groceries, transportation, etc.) and enter actual purchases they have made. The app will provide them with an overview of their recent spending, as well as a comparison of their overall budget to their actual spending habits. Users will be able to request more detailed comparisons (e.g. per category)


## Data Model


The application will store Users, Purchases, and Categories.
* Users can have multiple categories and multiple purchases
* each category can have multiple purchases but one associated user
* each purchase can have one category


An Example User:

```javascript
{
  username: "iShouldStopBuyingThings",
  hash: // a password hash,
  categs: // an array of references to category documents
  purchases: //array of references to purchase documents
}
```

An example Purchase:
```javascript
{
  user: // a reference to a User object
  cost: 20.0 //signifies 20.00 USD
  items: "Completely unnecessary shirt from H&M",
  categ: //embedded category document
  date: //date of purchase (optional)
}
```

An example Category:
```javascript
{
  user: // a reference to a User object
  budget: 200.0 //signifies 200.00 USD,
  name: "Groceries"
}
```


## [Link to Commented First Draft Schema](db.js) 

## Wireframes

/ - Homepage: users can see overviews of their spending

![home](documentation/home.png)

/addPurchase - : users can add purchase information

![add purchase](documentation/spend.png)

/update - Homepage: users can update budget information

![update](documentation/update.png)


## [Site map](documentation/sitemap.png)


## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create and update budget information, both overall and for specific (but optional) categories of spending
4. as a user, I can view all of the purchases/transactions I have added to the app (by viewing "detailed" sections)
5. as a user, I can add purchases/transactions as spending information
6. as a user, I can see a general overview of my spending information compared to the budget I have set on the app

## Research Topics

I'm planning on researching and using the following for my project:

* (5 points) Integrate user authentication
* (2 points) Use a CSS framework
* (2 points) Use a CSS preprocessor

9 points total out of 8 required points **<br> 
** I'm also considering the External API option as a research topic, maybe to replace the second or third option listed above (specifically, I'm looking into currencylayer for exchange rates)

## [Link to Initial Main Project File](app.js) 

## Annotations / References Used

* None used yet

