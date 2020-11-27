const mongoose = require('mongoose');

const menuItemSchema = mongoose.Schema({
  command: { 
    type: Number, 
    required: true,
    unique: true
  },
  commandType: {
    type: String,
    enum: ['Text message'],
    default: 'Text message'
  },
  messageText: { 
    type: String, 
    required: true 
  },
}, {
  timestamps: true,
});

const menuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = menuItem;