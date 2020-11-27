const router = require('express').Router();
let MenuItem = require('../models/menuItem.model');

router.route('/').get((req, res) => {
  MenuItem.find().sort({'command':1})
    .then(menuItems => res.json(menuItems))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const command = Number(req.body.command);
  const commandType = req.body.commandType;
  const messageText = req.body.messageText;

  const newMenuItem = new MenuItem({
    command,
    commandType,
    messageText,
  });

  newMenuItem.save()
  .then(() => res.json('Menu Item added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  MenuItem.findById(req.params.id)
      .then(menuItem => res.json(menuItem))
      .catch(err => res.status(400).json('Error: ' + err));
});
  
router.route('/:id').delete((req, res) => {
  MenuItem.findByIdAndDelete(req.params.id)
      .then(() => res.json('Menu Item deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
});
  
router.route('/update/:id').post((req, res) => {
  MenuItem.findById(req.params.id)
      .then(menuItem => {
        menuItem.command = Number(req.body.command);
        menuItem.commandType = req.body.commandType;
        menuItem.messageText = req.body.messageText;
  
        menuItem.save()
          .then(() => res.json('Menu updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;