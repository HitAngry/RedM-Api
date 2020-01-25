const express = require('express');
const router = express.Router();
const inventoryModel = require('../models/inventory');
const resourceModel = require('../models/resource');
const craftModel = require('../models/craft');
const maxInventorySlot = 16;

router.get('/:userId', async (req, res) => {
  if(req.params) {
    const { userId } = req.params;
    if(!userId) {
      res.sendStatus(400);
    } else {
      if(Object.keys(req.query).length > 0) {
        const { action, type, id, quantity } = req.query;
        if(!action, !type, !id, !quantity) {
          res.sendStatus(400);
        } else {
          if(action === "add") {
            let item = await getItem(id, type);
            if(item) {
              let inventory = await getInventory(userId);
              let newItem = {
                resourceId: id,
                quantity: quantity,
                type: type
              };
              if(await playerHaveFreeSlotInventory(userId)) {
                inventory = replaceFirstFreeSlotByItem(inventory, newItem);
                inventoryModel.findOneAndUpdate({userId: userId}, {$set:{inventory: inventory}}, {new: true}, (err, inventory) => {
                  if(err) {
                    res.sendStatus(400);
                  } else {
                    res.status(200).send(`${item.name} X ${quantity} has been add to your inventory`);
                  }
                })
              } else {
                res.status(400).send('Inventory full');
              }
            } else {
              res.status(400).send('Item not found');
            }
          } else if (action === "remove") {
            let item = await getItem(id, type);
            let inventory = await getInventory(userId);
            if(item) {
              if(type === "resource") {
                let newInventory = await removeResourceFromInventory(inventory, item._id, parseInt(quantity))
                inventoryModel.findOneAndUpdate({userId: userId}, {$set:{inventory: newInventory}}, {new: true}, (err, inventory) => {
                  if(err) {
                    res.sendStatus(400);
                  } else {
                    res.status(200).send(`${item.name} X ${quantity} has been removed to your inventory`);
                  }
                })
              } else if (type === "type") {
                res.sendStatus(200);
                // remove juste by search id item in inventory
              } else {
                res.status(400).send('Type not found');
              }
            } else {
              res.status(400).send('Item not found');
            }
          }
        }
      } else {
        let inventory = await getInventory(userId);
        if(inventory) {
          res.status(200).send(inventory);
        } else {
          res.sendStatus(404);
        }
      }
    }
  }
});

const removeResourceFromInventory = async (inventory, itemId, quantityHaveToRemove) => {
  let newInventory = [...inventory];

  inventory.forEach((item, index) => {
    if(item.resourceId) {
      if(item.resourceId.toString() === itemId.toString()) {
        if(parseInt(item.quantity) > quantityHaveToRemove) {
          newInventory[index].quantity = parseInt(item.quantity) - quantityHaveToRemove;
          quantityHaveToRemove = 0;
          return;
        } else if (parseInt(item.quantity) === quantityHaveToRemove) {
          quantityHaveToRemove = 0;
          newInventory[index] = { resourceId: null, quantity: null, type: null }
          return;
        } else if (parseInt(item.quantity) < quantityHaveToRemove) {
          quantityHaveToRemove = quantityHaveToRemove - parseInt(item.quantity);
          newInventory[index] = { resourceId: null, quantity: null, type: null }
        }
      }
    }
  })

  return newInventory;
}

const replaceFirstFreeSlotByItem = (inventory, item) => {
  let newInventory = [...inventory];
  let indexFreeSlot = newInventory.findIndex(item => item.resourceId === null)
  newInventory[indexFreeSlot] = item;
  console.log(newInventory)
  return newInventory;
}

const getItem = async (itemId, type) => {
  let typeModel = null;
  if(type === "resource") {
    typeModel = resourceModel;
  } else if(type === "craft") {
    typeModel = craftModel;
  }

  let item = await typeModel.find({_id: itemId});

  if(item.length > 0) {
    return item[0];
  } else {
    return false;
  }
}; //;

const playerHaveFreeSlotInventory = async (userId) => {
  let inventory = await getInventory(userId);
  let freeSpace = false;

  inventory.forEach(item => {
    if(!item.resourceId) {
      freeSpace = true;
      return;
    }
  }); //;

  return freeSpace;
};

const getInventory = async (userId) => {
  let inventory =  await inventoryModel.find({userId: userId});
  return inventory[0].inventory
};  //;

module.exports = router;