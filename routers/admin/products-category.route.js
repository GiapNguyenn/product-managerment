const express = require('express');
const router = express.Router();
const multer = require("multer")
const upload = multer()
const controller = require("../../controllers/admin/products-category.controller")
const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares")
const CategoryValidate = require("../../validates/admin/products-category.validate")



router.get('/', controller.index);
router.get('/create', controller.create);
router.post(
    '/create', upload.single("thumbnail"),
    uploadCloud.upload,
    CategoryValidate.createPost,
    controller.createPost);

module.exports = router  
