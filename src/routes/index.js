const { Router } = require("express");
const router = Router();

const {getUsers,createReport,getReport,login} = require("../controllers/index.controller");

router.get("/users/getUsers", getUsers);
router.post("/users/createReport", createReport);

router.get("/report/getReports", getReport);
router.post("/report/createReport");

router.get("/users/login",login)

module.exports = router;
