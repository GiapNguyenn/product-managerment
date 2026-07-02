const express = require('express');
const router= express.Router();
const multer = require("multer")
const upload = multer()
const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares")
const controller = require("../../controllers/admin/account.controller")
const accountValidate = require("../../validates/admin/accounts.validate")


router.get('/',controller.index);
router.get('/create',controller.create);
router.post('/create', upload.single("avatar"), uploadCloud.upload, accountValidate.createPost, controller.createPost);

module.exports = router