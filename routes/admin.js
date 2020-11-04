const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const isAuth = require('../middleware/is-auth')

const router = express.Router();

// /admin/add-product => GET
router.get('/add-profile', isAuth,adminController.getAddProduct);

// /admin/products => GET
router.get('/profiles', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-profile', isAuth, adminController.postAddProduct);

router.get('/edit-profile/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-profile',isAuth, adminController.postEditProduct);

router.post('/delete-profile',isAuth, adminController.postDeleteProduct);

module.exports = router;
