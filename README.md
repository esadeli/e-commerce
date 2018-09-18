# e-commerce

## E Belanja
##### Website Belanja Produk - produk wanita

### List of users routes:

Route     |  HTTP  |       Description           |     input         |     output
-------------- | ------ | --------------------- | ----------------------- | ---------------
````/users/register```` | POST | Register a new user | name,username,password, email (req.body)  | jwt token     |
````/users/login```` | POST | Login to site | email,password (req.body) |  jwt token    |
````/users/edit/id```` | PUT | Edit user data | name,username,password, email (req.body), jwt token (req.headers)  |     |
````/users/lists```` | GET | Display list of users | jwt token (req.headers) |  list of users    |
````/users/details```` | GET | Display list of users | jwt token (req.headers) |  detail of user    |


### List of categories routes:

Route     |  HTTP  |       Description           |     input         |     output
-------------- | ------ | --------------------- | ----------------------- | ---------------
````/categories/lists```` | GET | Get list of all categories |    | JSON     |
````/categories/add```` | POST | Create new categories | name (req.body), jwt token (req.headers)  |      |
````/categories/edit/id```` | PUT | Update categories | name,groupItem (req.body), jwt token (req.headers)  |      |
````/categories/delete/id```` | DELETE | Delete categories | jwt token (req.headers)  |      |


### List of items routes:

Route     |  HTTP  |       Description           |     input         |     output
-------------- | ------ | --------------------- | ----------------------- | ---------------
````/items/lists```` | GET | Get list of all items |    | JSON     |
````/items/add```` | POST | Create new item | name,price (req.body), jwt token (req.headers)  |      |
````/items/edit/id```` | PUT | Update item | name,price,categoryInfo (req.body), jwt token (req.headers)  |      |
````/items/delete/id```` | DELETE | Delete item | jwt token (req.headers)  |      |


### List of transactions routes:

Route     |  HTTP  |       Description           |     input         |     output
-------------- | ------ | --------------------- | ----------------------- | ---------------
````/transactions/add```` | POST | Create new transaction |    | JSON     |
