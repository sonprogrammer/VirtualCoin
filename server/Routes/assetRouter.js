const express = require('express');
const { getAssetData } = require('../Controller/assetController');


const assetRouter = express.Router()


assetRouter.get('/', getAssetData)
module.exports = assetRouter