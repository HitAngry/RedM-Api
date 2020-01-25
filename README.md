# West Laws API

## Routes
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
### Inventories
- **GET** _inventories/:id_
- **GET** _inventories/:id&action=&type=&id=&quantity=_
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
    discordId: String
    ```
## Authors
* **Simon Philouze** - *Initial work* - [HitAngry](https://github.com/HitAngry)
* **Sornin de Laubier** - *Contributor* - [SorninL](https://github.com/SorninL)
