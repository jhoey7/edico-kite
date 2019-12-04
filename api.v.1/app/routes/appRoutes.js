const express = require('express');
const router = express.Router();
const appCtrl = require('../controllers/appController');
const authCtrl = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

router.get('/', (req, res) => {
	res.send('Welcome to Node-API!')
});

//module auth jwst
router.post('/api/auth', authCtrl.auth);

//module users
router.get('/api/users', verifyToken, appCtrl.getAllUsers);
router.post('/api/users', verifyToken, appCtrl.createUser);
router.get('/api/users/:userId', verifyToken, appCtrl.getUsersById);
router.put('/api/users/:userId', verifyToken, appCtrl.updateUser);
router.delete('/api/users/:userId', verifyToken, appCtrl.deleteUser);

//module referensi supplier
router.get('/api/referensi/supplier', verifyToken, appCtrl.getAllSuppliers);
router.get('/api/referensi/supplier/:id', verifyToken, appCtrl.getSupplierById);
router.post('/api/referensi/supplier', verifyToken, appCtrl.createSupplier);
router.put('/api/referensi/supplier/:id', verifyToken, appCtrl.updateSupplier);
router.delete('/api/referensi/supplier/:id', verifyToken, appCtrl.deleteSupplier);

//module referensi warehouse
router.get('/api/referensi/warehouse', verifyToken, appCtrl.getAllWarehouse);
router.get('/api/referensi/warehouse/:id', verifyToken, appCtrl.getWarehouseById);
router.post('/api/referensi/warehouse', verifyToken, appCtrl.createWarehouse);
router.put('/api/referensi/warehouse/:id', verifyToken, appCtrl.updateWarehouse);
router.delete('/api/referensi/warehouse/:id', verifyToken, appCtrl.deleteWarehouse);

//module inventory barang
router.get('/api/inventory/barang', verifyToken, appCtrl.getAllItem);
router.get('/api/inventory/barang/:id', verifyToken, appCtrl.getItemById);
router.post('/api/inventory/barang', verifyToken, appCtrl.createItem);

//module grn
router.post('/api/grn/create-all-element', verifyToken, appCtrl.createGrnAllElement);
router.post('/api/grn/create', verifyToken, appCtrl.createGrn);
router.post('/api/grn/realisasi', verifyToken, appCtrl.realisasiGrn);

//module gdn
router.post('/api/gdn/create-all-element', verifyToken, appCtrl.createGdnAllElement);

//module warehouse
router.post('/api/produksi/create', verifyToken, appCtrl.createProduksi);

module.exports = router