const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const { query } = require("express");

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
      console.log(error)
      console.log(response.rows)

      res.send({
        status: 403,
        statusMessage: "Internal Error",
        message: "Error al registrar usuario"
      });
    };
  };

  async login(req, res) {
    try {
      const user = req.body;

      const response = await pool.query(`SELECT * FROM usuarios WHERE email = '${user.email}'`);

      if (response.rowCount == 1 && response.rows[0]) {
        const x =
          await bcrypt.compare(user.passwd, response.rows[0].passwd)
            .then((result) => result)
            .catch("Error comparando passwords");

        if (x) {
          res.send({
            status: 200,
            statusMessage: "ACA",
            message: "ANDUVIO",
            data: x
          });
        }else throw Error();

      } else if (response.rowCount == 0) throw Error()

    } catch (error) {
      console.log(error)
      res.send({
        status: 403,
        statusMessage: "Internal Error",
        message: "Error en el logueo"
      });
    }
  };

  async updateUser (req,res){
    try {
      const user = req.body;

      const response = `UPDATE from usuarios set email= '${user.email}', passwd = '${user.passwd}', direc = '${user.direc}'`

      
    } catch (error) {
      res.send({
        status: 403,
        statusMessage: "Internal Error",
        message: "Error en el logueo"
      });
    }
  }


});

module.exports = {
  indexController
}

