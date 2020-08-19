const { Router } = require('express');
const router = Router();

const { getUsers, createUser, getReport, createReport, updateStateReport, deleteReport } = require('../controllers/index.controller');

router.get('/users', getUsers);
router.post('/users', createUser);

router.get('/reports', getReport);
router.post('/reports', createReport);
router.put('/reports/:id'. updateStateReport);
router.delete('/reports/:id', deleteReport);



module.exports = router;