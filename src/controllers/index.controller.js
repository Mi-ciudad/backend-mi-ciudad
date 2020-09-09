const { Pool } = require("pg");
const bcrypt = require("bcrypt");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "root",
  database: "miCiudad2"
});

const indexController = new (class IndexController {
  async getUsers(req, res) {
    try {
      const response = await pool.query("SELECT * FROM usuarios");
      res.json({
        body: {
          usuario: { telefono },
        },
      });
    } catch (error) {
      res.send({
        status: 403,
        statusMessage: "Internal Error",
        message: "Error al traer usuarios"
      });
    }
  }

  async register(req, res) {
    try {
      const user = req.body;
    await bcrypt
        .hash(user.passwd, 8)
        .then((hashedPassword) => {
          user.passwd = hashedPassword;
        })
        .catch(function (error) {
          console.log("Error saving user: " + error);
          next();
        });

      const response = await pool.query(
        `INSERT INTO usuarios(email,passwd,ci,nombre,apellido,tipoUsuario) VALUES('${user.email}','${user.passwd}',${user.ci},'${user.nombre}','${user.apellido}','${user.tipoUsuario}')`
      );

      if (response.rowCount === 1) {
        res.send({
          status: 200,
          message: "anduvio",
          data: user,
        });
      }
    } catch (error) {
      res.send({
        status: 403,
        statusMessage: "Internal Error",
        message: "Error al registrar usuario"
      });
    };
  };

  async getReport(req, res) {
    try {
      const response = await pool.query("select * from reportes");
      console.log(response.rows);
      res.json(response.rows);

    } catch (error) {
      res.send({
        status: 403,
        statusMessage: "Internal Error",
        message: "Error al traer reportes"
      });
    }
  };

  async history(req, res) {

    try {
      const { ci } = req.body;
      const response = await pool.query(
        "select * from reportes r inner join usuarios u on r.ci = ci and u.ci = ci",
        [ci]
      );
      console.log(response.rows);
      res.json(response.rows);
    } catch (error) {
      res.send({
        status: 403,
        statusMessage: "Internal Error",
        message: "Error al traer reportes para historial"
      });
    }
  };

  async login(req, res) {

    try {
      const { email, passwd } = req.body;
      const response = await pool.query(
        "SELECT * FROM usuarios where email = $1 and passwd = $2",
        [email, passwd]
      );
      console.log(response.rows);
      res.send(response.rows);
    } catch (error) {
      res.send({
        status: 403,
        statusMessage: "Internal Error",
        message: "Error en el logueo"
      });
    }
  };

  async comparePassword (req, res){

    try {
      const { email } = req.body;
    const response = await pool.query(
      "SELECT passwd from usuarios WHERE email = $1",
      [email]
    );
    if (response.rows == 0) {
      console.log("No datos en la base");
    } else {
      console.log("Hay datos en la base");
      console.log(response.rows);
      bcrypt.compare();
    }
    } catch (error) {
      res.send({
        status: 403,
        statusMessage: "Internal Error",
        message: "Error en la comparacion de password"
      });
    }

  };
  
});
module.exports={
  indexController
}
  
