const { Router } = require('express');
const router = Router();

const { getUsers, createUser, getReport, createReport, updateStateReport, deleteReport } = require('../controllers/index.controller');

router.get('/users/getUsers', getUsers);
router.post('/users/createUser', createUser);

router.get('/report/getReports', getReport);
router.post('/report/createReport', createReport);
router.put('/report/putReport'. updateStateReport);
router.delete('/report/deleteReports', deleteReport);



module.exports = router;