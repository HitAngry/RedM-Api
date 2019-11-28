# West Laws API
## Routes
 - user | POST
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
 - user/:id/:token | GET DELETE
 - user/:id/:token |
 - inventory/:id/:token | GET
 - inventory/:id/:token | PUT
  ```json
   userId: String,
   inventory: [{
     resourceId: Number, 
     quantity: Number,
     type: String
   }]
  ```
 - resource/:id | GET DELETE
 - resource | POST
  ```json
   name: String,
   icon: String,
   description: String
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
