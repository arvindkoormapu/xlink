const PlatformModel = require('../models/platform.model');

const getPlatformProfiles = async (req, res) => {
    try {
        const platforms = await PlatformModel.getPlatformProfiles();
        res.json({ success: true, data: platforms });
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message });
    }
};

const addPlatform = async (req, res) => {
    try {
        const { name, emailaddress1, contactnumber, url, city } = req.body;
        const image = req.file.path
        const newObj = await PlatformModel.addPlatform(name, emailaddress1, contactnumber, url, city, image);
        res.status(201).json({ success: true, data: newObj });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: err.message });
    }
};

const updatePlatform = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, emailaddress1, contactnumber, url, city } = req.body;
        const image = req.file ? req.file.path : null
        await PlatformModel.updatePlatform(id, name, emailaddress1, contactnumber, url, city, image);

        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: err.message });
    }
};

const deletePlatform = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await PlatformModel.deletePlatform(id);
        if (deleted) {
            res.status(200).json({ success: true, message: 'Platform deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Platform not found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    addPlatform,
    getPlatformProfiles,
    updatePlatform,
    deletePlatform
};