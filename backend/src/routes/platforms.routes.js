const express = require('express');
const router = express.Router();
const { Upload } = require('../../config');

const platformController = require('../controllers/platform.controller');

router.get('/', platformController.getPlatformProfiles);
router.post('/', Upload.single('image'), platformController.addPlatform);
router.put('/:id', Upload.single('image'), platformController.updatePlatform);
router.delete('/:id', platformController.deletePlatform);

module.exports = router;