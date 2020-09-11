const { Router } = require("express");
const router = Router();


const {indexController} = require( '../controllers/index.controller');
const {getReport,createReport,deleteReport,updateStateReport} = require ('../controllers/report.controller')

router.post("/users/login",indexController.login)
router.get('/users', indexController.getUsers);
//router.post('/users',);

router.get('/reports', indexController.getReport);
router.post('/reports', getReport);
//router.put('/reports/:id'. updateStateReport);
//router.delete('/reports/:id', deleteReport);

router.post('/register/signUp', indexController.register);

module.exports = router;
