const { Router } = require("express");
const router = Router();


const {indexController} = require( '../controllers/index.controller');
const {reportController} = require ('../controllers/report.controller')

//Rutas de usuarios

router.post("/users/login",indexController.login)
router.post('/users/signUp', indexController.register);
router.get('/users', indexController.getUsers);


//Rutas de reportes

router.post('/reports',reportController.getReport);
router.put('/reports/:id',reportController.updateStateReport);
router.delete('/reports/:id',reportController.deleteReport);



module.exports = router;

