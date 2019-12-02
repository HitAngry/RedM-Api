# West Laws API
<hr>
## Routes
<hr>
### Users
- **GET** _users/:steamId_
- **POST** _users/_ 
  ```json
  steamId: String,
  isAlive: Boolean,
  firstName: String,
  lastName: String,
  groupId: String,
  money: Array,
  jobs: Array,
  skin: Object
  ```
<<<<<<< HEAD
### Inventories
- **GET** _inventories/:id_
- **GET** _inventories/:id?action=?type=?id=?quantity=_
  List of query avaiable
  - **action** : type of action (**add** or **remove**)
  - **type** : type of what i want add in my inventory (**resource** or **craft**)
  - **id** : id of the resource or craft
  - **quantity** : number of the quantity i want
### Resources
 - **GET** _resources/_
 - **GET** _resources/:id_
 - **DELETE** _resources/:id_
 - **POST** _resources/_
    ```json
    name: String,
    icon: String,
    description: String
    ```
### Whitelist
 - **GET** _whitelist/:id_
 - **DELETE** _whitelist/:id_
 - **POST** _whitelist_
    ```json
    steamId: String
    ```
## Authors
* **Simon Philouze** - *Initial work* - [HitAngry](https://github.com/HitAngry)
=======
- <span style="color:green">inventories/:id **GET**</span>
  ```json
  userId: String,
  inventory: [{
    resourceId: Number,
    quantity: Number,
    type: String
  }]
  ```
 - <span style="color:green">resources/ | **GET**</span>
 - <span style="color:green">resources/:id | **GET** **DELETE**</span>
 - <span style="color:green">resources | **POST**</span>
  ```json
  name: String,
  icon: String,
  description: String
  ```

 - <span style="color:green">whitelist/:id | **GET** **DELETE**</span>
 - <span style="color:green">whitelist | **POST**</span>
  ```json
  steamId: String
  ```
### Todo
 - inventories/:id/ | PUT
  ```json
  userId: String,
  inventory: [{
    resourceId: Number,
    quantity: Number,
    type: String
  }]
  ```
 - resource/:id | PUT
  ```json
  name: String,
  icon: String,
  description: String
  ```
 - craft | POST
  ```json
  name: String,
  hash: String,
  icon: String,
  type: String,
  delay: Number,
  description: String,
  resources: [{
    id: Number,
    quantity: Number
  }]
  ```
  - craft/:id | GET DELETE
  - craft/:id | PUT
  ```json
  name: String,
  hash: String,
  icon: String,
  type: String,
  delay: Number,
  description: String,
  resources: [{
    id: Number,
    quantity: Number
  }]
  ```
>>>>>>> f9d5cafb4c54c6207bdae23184a326823eb383aa
