# West Laws API
## Routes

### Done
- <span style="color:green">users/:steamId **GET**</span>
- <span style="color:green">users/ **POST**</span>
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
###Todo
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
