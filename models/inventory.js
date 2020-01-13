let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const MAX_AVAILABLE_SLOTS = 16;

let inventorySchema = new Schema([{
  userId: String,
  steamId: String,
  inventory: [Object]
}]);

const isSlotAvailableForItem = (slot, item) => {
  // empty slot
  if (!slot._id || (slot.resourceId && slot.qty === 0)) return true;
  
  // slot with same resource
  if (slot.resourceId && item.resourceId && item.resourceId.toString() === slot.resourceId.toString()) {
    return true;
  }

  // Slot not available for this item
  return false;
};

const updateSlotFromItem = (slot, item) => {
  if (item.resourceId && item.qty) {
    if (slot.resourceId.toString() !== item.resourceId) {
      throw new Error('trying to mix different resources together');
    }
    slot.qty += item.qty;
    return slot;
  } else {
    // if item has a name (not a resource), replace slot with item data
    return item;
  }
};

inventorySchema.methods.addItem = function(item) {
  if (this.inventory.length < MAX_AVAILABLE_SLOTS) {
    this.inventory.push(newItem);
    return this.save();
  }
  const indexToModify = this.inventory.findIndex(slot => isSlotAvailableForItem(slot, item));
  if (!indexToModify) {
    throw new Error('inventory full');
  }
  this.inventory[indexToModify] = updateSlotFromItem(this.inventory[indexToModify], item);
  return this.save();
};


inventorySchema.methods.removeItem = function({ resourceId, qty, _id }) {
  if (_id) {
    // Simply remove the provided id
    this.inventory.splice(this.inventory.findIndex(slot => slot._id === _id), 1);
    return this.save();
  }
  if (resourceId && qty) {
    let remainingQty = qty;
    for (let i = 0; i < this.inventory.length; i++) {
      const slot = this.inventory[i];
      // Slot is of same resource
      if (slot.resourceId.toString() === resourceId.toString()) {
        const qtyToRemove = Math.min(slot.qty, remainingQty);
        remainingQty -= qtyToRemove;
        slot.qty -= qtyToRemove;

        if (slot.qty === 0) {
          slot.resourceId = null;
        }
        // Escape loop if all has been removed
        if (!remainingQty) break;
      }
    }
    if (remainingQty) {
      throw new Error('not enough qty available');
    }
    return this.save();
  }
  // else cannot remove
  throw new Error('cannot remove');
};


module.exports = mongoose.model('inventories', inventorySchema);