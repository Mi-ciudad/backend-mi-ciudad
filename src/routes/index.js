const { Router } = require("express");
const router = Router();


const {indexController} = require( '../controllers/index.controller');
const {reportController} = require ('../controllers/report.controller')

//Rutas de usuarios

router.post("/login",indexController.login)
router.post('/register', indexController.register);
router.get('/users', indexController.getUsers);
router.post('/password' , indexController.changePassword)

//Rutas de reportes

router.get('/reports',reportController.getReport);
router.post('/createReport', reportController.createReport)
router.delete('/reports/:id',reportController.deleteReport);
router.post('/history', reportController.history)



module.exports = router;

