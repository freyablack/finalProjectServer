const router = require('express').Router();
const {PatchModel} = require('../models');
const {validateSession} = require('../middleware')

router.post('/add', validateSession, async (req, res) => {
  const {patchName, artist, description, size, patchType, condition} = req.body.patch
  const {username} = req.user
  const patchEntry = {
    patchName,
    artist,
    description,
    size,
    patchType,
    condition,
    owner: username
  }
  try {
    const newPatch = await PatchModel.create(patchEntry)
    res.status(200).json(newPatch);
  } catch (err) {
    res.status(500).json({error: err})
  }
})

router.delete('/delete/:id', validateSession, async (req, res) => {
  const username = req.user.username;
  const patchId = req.params.id;

  try {
    const query = {
      where: {
        id: patchId,
        owner: username
      }
    };

    await PatchModel.destroy(query);
    res.status(200).json({
      message: 'Patch deleted'
    });
  } catch (err) {
    res.status(500).json({error: err})
  }
});

router.put('/edit/:id', validateSession, async (req, res) => {
  const {patchName, artist, description, size, patchType, condition} = req.body.patch;
  const username = req.user.username;
  const patchId = req.params.id;

  try {
    await PatchModel.update({
      patchName, artist, description, size, patchType, condition},
      {where: {id: patchId, owner: username}, returning: true}
    ).then((result) => {
      res.status(200).json({
        message: 'Patch updated',
        updatedPatch: result,
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to update Patch ${err}`
    })
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
      
      const userPatches = await PatchModel.findAll(query);
      res.status(200).json(userPatches);
  } catch (err) {
      res.status(500).json({
          error: err
      })
  }
})



module.exports = router;