const express = require('express');
const router = express.Router();
const inventoryModel = require('../models/inventory');
const resourceModel = require('../models/resource');
const craftModel = require('../models/craft');
const mapItemModel = require('../models/mapItem');
const maxInventorySlot = 16;

router.get('/:userId', async (req, res) => {
  if(req.params) {
    const { userId } = req.params;
    if(!userId) {
      return res.sendStatus(400);
    }

    // If no query params => simple get
    if (!Object.keys(req.query).length) {
      const inventory = await getInventory(userId);
      if (!inventory) {
        return res.sendStatus(404);
      }
      return res.status(200).send(inventory);
    }

    const { action, type, id, quantity } = req.query;        
    if(!action, !type, !id) {
      return res.sendStatus(400);
    }
    if(action === "add") {
      if (!quantity) {
        return res.sendStatus(400);
      }
      let resourceOrCraft = await getItem(id, type);
      if (!resourceOrCraft) {
        return res.status(400).send('Item not found');
      }
      let inventory = await getInventory(userId);              
      let newItem = {
        resourceId: id,
        qty: parseInt(quantity, 10),
        // type: type
      };

      if(inventory.length === 16) {
        return res.status(400).send('Inventory full');
      }
      inventory.push(newItem);                
      inventoryModel.findOneAndUpdate({userId: userId}, {$set:{inventory: inventory}}, {new: true}, (err, inventory) => {
        if(err) {
          return res.sendStatus(400);
        }
        return res.status(200).send(`${resourceOrCraft.name} X ${quantity} has been add to your inventory`);
      });

    } else if (action === "remove") {
      const inventory = await getInventory(userId);
      if(type === "resource") {
        if (!quantity) {
          return res.sendStatus(400);
        }
        const resourceOrCraft = await getItem(id, type);
        if (!resourceOrCraft) {
          return res.status(400).send('Item not found');
        }
        const newInventory = await removeResourceFromInventory(inventory, resourceOrCraft._id, parseInt(quantity))                
        inventoryModel.findOneAndUpdate({userId: userId}, {$set:{inventory: newInventory}}, {new: true}, (err) => {
          if(err) {
            return res.sendStatus(400);
          }
          return res.status(200).send(`${resourceOrCraft.name} X ${quantity} has been removed to your inventory`);
        });
      } else if (type === "item") {
        const newInventory = inventory.filter(item => {
          if(item.resourceId !== null) {
            item._id.toString() !== id;
          }
        });
        inventoryModel.findOneAndUpdate({ userId }, { $set: { inventory: newInventory } }, { new: true }, (err) => {
          if (err) {
            return res.sendStatus(400);
          }
          return res.sendStatus(204);
        });           
      } else {
        return res.status(400).send('Type not found');
      }
    }
  }
});

router.post('/:userId/collect/:itemId', async (req, res) => {
  if (!req.params) {
    return res.sendStatus(400);
  }

  const { userId, itemId } = req.params;
  if(!userId || !itemId) {
    return res.sendStatus(400);
  }

  // Get inventory and item from db
  const inventory = await inventoryModel.findOne({ userId });
  const item = await mapItemModel.findOne({ _id: itemId });

  // Modify the inventory and save to db
  const newItem = {
    _id: item._id,
  };
  if (item.qty && item.resourceId) {
    newItem.qty = item.qty;
    newItem.resourceId = item.resourceId;
  } else {
    newItem.hash = item.hash;
    newItem.name = item.name;
    newItem.description = item.description;
  }
  inventory.inventory.push(newItem);
  try {
    await inventory.save();    
  } catch (error) {
    return res.sendStatus(400);
  }

  // // Then delete the item from map 
  try {
    await mapItemModel.deleteOne({ _id: itemId });
  } catch (error) {
    // TODO: Reverse inventory modification
    return res.sendStatus(400);
  }
  return res.status(200).send(newItem);  
});

const removeResourceFromInventory = async (inventory, resourceId, quantityHaveToRemove) => {
  let newInventory = [...inventory];
  inventory.forEach((item, index) => {
    if(item.resourceId) {      
      if(item.resourceId.toString() === resourceId.toString()) {        
        if(parseInt(item.qty) > quantityHaveToRemove) {          
          newInventory[index].qty = parseInt(item.qty) - quantityHaveToRemove;
          quantityHaveToRemove = 0;
          return;
        } else if (parseInt(item.qty) === quantityHaveToRemove) {          
          quantityHaveToRemove = 0;
          newInventory[index] = { resourceId: null, qty: null }
          return;
        } else if (parseInt(item.qty) < quantityHaveToRemove) {          
          quantityHaveToRemove = quantityHaveToRemove - parseInt(item.qty);
          newInventory[index] = { resourceId: null, qty: null }
        }
      }
    }
  });
  return newInventory.filter((item) => item.qty);
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
};

const getInventory = async (userId) => {
  let inventory =  await inventoryModel.find({userId: userId});
  return inventory[0].inventory;
};

module.exports = router;