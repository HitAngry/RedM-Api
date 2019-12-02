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
                inventory = [...inventory, newItem];
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

module.exports = router;

// inventories/5de0519c143bff125573339c?action=add&type=craft&id=5de260b6b253caa309998e60&quantity=1
// inventories/5de0519c143bff125573339c?action=add&type=resource&id=5de260b6b253caa309998e60&quantity=12

// inventories/5de0519c143bff125573339c?action=remove&type=craft&id=5de260b6b253caa309998e60&quantity=12
// inventories/5de0519c143bff125573339c?action=remove&type=resource&id=5de260b6b253caa309998e60&quantity=12

//http://localhost:8050/inventories/5de0519c143bff125573339c?action=add&type=resource&id=5de260b6b253caa309998e60&quantity=53

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
}

const playerHaveFreeSlotInventory = async (userId) => {
  let inventory = await getInventory(userId);
  return inventory.length >= maxInventorySlot ? false : true;
}

const getInventory = async (userId) => {
  let inventory =  await inventoryModel.find({userId: userId});
  return inventory[0].inventory
}