const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user-profile.routes');
const vendorRoutes = require('./vendors.routes');
const platformRoutes = require('./platforms.routes');
const platformApiKeysRoutes = require('./platform-api-keys.routes');
const taxesRoutes = require('./taxes.routes');
const addonsRoutes = require('./addons.routes');

router.use('/auth', authRoutes);
router.use('/user-profile', userRoutes);
router.use('/vendor', vendorRoutes);
router.use('/platform', platformRoutes);
router.use('/platform-api-keys', platformApiKeysRoutes);
router.use('/taxes', taxesRoutes);
router.use('/addons', addonsRoutes);

module.exports = router;
