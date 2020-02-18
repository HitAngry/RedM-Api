const express = require('express');
const router = express.Router();
const inventoryModel = require('../models/inventory');
const resourceModel = require('../models/resource');
const craftModel = require('../models/craft');
const mapItemModel = require('../models/mapItem');


router.get('/:steamId', async (req, res) => {
  if (!req.params) {
    return res.sendStatus(400);
  }
  const { steamId } = req.params;
  if(!steamId) {
    return res.sendStatus(400);
  }
  const inventory = await inventoryModel.findOne({ steamId });
  if (!inventory || !inventory.inventory) {
    return res.sendStatus(404);
  }

  // If no query params => simple get
  if (!Object.keys(req.query).length) {
    return res.status(200).send(inventory.inventory);
  }

  const { action, type, id, quantity, name, hash, description, icon } = req.query;
  if(!action, !type) {
    return res.sendStatus(400);
  }
  switch (action) {
    case 'add': {
      if (type === 'resource') {
        if (!quantity) {
          return res.sendStatus(400);
        }
        const newItem = {
          resourceId: id,
          qty: parseInt(quantity, 10),
        };

        try {
          await inventory.addItem(newItem);
        } catch (error) {
          return res.sendStatus(400);
        }
        return res.status(200).send(inventory.inventory);

      } else if (type === 'item') {
        if (!name || !hash) {
          return res.sendStatus(400);
        }
        const newItem = {
          name,
          hash,
          description,
          icon,
        };

        try {
          await inventory.addItem(newItem);
        } catch (error) {
          return res.sendStatus(400);
        }
        return res.status(200).send(inventory.inventory);
      } else {
        return res.status(400).send('no type');
      }
    }
    case 'remove': {
      if(type === "resource") {
        if (!quantity) {
          return res.sendStatus(400);
        }
        try {
          await inventory.removeItem({ resourceId: id, qty: parseInt(quantity) });
        } catch (error) {
          return res.sendStatus(400);
        }
        return res.sendStatus(204);
      } else if (type === "item") {
        try {
          await inventory.removeItem({ _id: id });
        } catch (error) {
          return res.sendStatus(400);
        }
        return res.sendStatus(204);
      } else {
        return res.status(400).send('no type');
      }
    }
    default:
      return res.status(400).send('no action');
  }

});

router.post('/:steamId/collect/:itemId', async (req, res) => {
  if (!req.params) {
    return res.sendStatus(400);
  }

  const { steamId, itemId } = req.params;
  if(!steamId || !itemId) {
    return res.sendStatus(400);
  }

  // Get inventory and item from db

  const inventory = await inventoryModel.findOne({ steamId });
  const item = await mapItemModel.findOne({ _id: itemId });

  if (!inventory || !item) {
    return res.sendStatus(404);
  }

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

  try {
    await inventory.addItem(newItem);
  } catch (error) {
    return res.status(400).send('inventory is full');
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

const getResourceOrCraft = async (itemId, type) => {
  let typeModel = null;
  if(type === "resource") {
    typeModel = resourceModel;
  } else if(type === "craft") {
    typeModel = craftModel;
  }
  let item = await typeModel.find({ _id: itemId });
  if(item.length > 0) {
    return item[0];
  } else {
    return false;
  }
};

module.exports = router;