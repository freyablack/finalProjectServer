const router = require('express').Router();
const {PinModel} = require('../models');
const {validateSession} = require('../middleware')

router.post('/add', validateSession, async (req, res) => {
  const {pinName, artist, description, size, pinType, condition} = req.body.pin
  const {username} = req.user
  const pinEntry = {
    pinName,
    artist,
    description,
    size,
    pinType,
    condition,
    owner: username
  }
  try {
    const newPin = await PinModel.create(pinEntry)
    res.status(200).json(newPin);
  } catch (err) {
    res.status(500).json({error: err})
  }
})

router.get('/:username', validateSession, async (req, res) => {
  const username = req.user.username
  try {
      const query = {
          where: {
              owner: username
          }
      };
      
      const userPins = await PinModel.findAll(query);
      res.status(200).json(userPins);
  } catch (err) {
      res.status(500).json({
          error: err
      })
  }
})

router.delete('/delete/:id', validateSession, async (req, res) => {
  const username = req.user.username;
  const pinId = req.params.id;

  try {
    const query = {
      where: {
        id: pinId,
        owner: username
      }
    };

    await PinModel.destroy(query);
    res.status(200).json({
      message: 'Pin deleted'
    });
  } catch (err) {
    res.status(500).json({error: err})
  }
});

router.put('/edit/:id', validateSession, async (req, res) => {
  const {pinName, artist, description, size, pinType, condition} = req.body.pin;
  const username = req.user.username;
  const pinId = req.params.id;

  try {
    await PinModel.update({
      pinName, artist, description, size, pinType, condition},
      {where: {id: pinId, owner: username}, returning: true}
    ).then((result) => {
      res.status(200).json({
        message: 'Pin updated',
        updatedPin: result,
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to update Pin ${err}`
    })
  }
})


module.exports = router;