const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user-profile.routes');
const vendorRoutes = require('./vendors.routes');
const platformRoutes = require('./platforms.routes');

router.use('/auth', authRoutes);
router.use('/user-profile', userRoutes);
router.use('/vendor', vendorRoutes);
router.use('/platform', platformRoutes);

module.exports = router;
