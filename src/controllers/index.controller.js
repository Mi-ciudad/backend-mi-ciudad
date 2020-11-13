const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const { query } = require("express");
const jwtService = require("../services/jwt");



const pool = new Pool({
  host: "10.1.14.80",
  user: "postgres",
  password: "password",
  database: "miciudad"
});

const indexController = new (class IndexController {
  async getUsers(req, res) {
    try {
      const response = await pool.query("SELECT * FROM usuarios");

      res.json({
        body: {
          usuario: response.rows
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
        `INSERT INTO usuarios(email,password,ci,nombre,apellido,tipoUsuario) VALUES('${user.email}','${user.passwd}',${user.ci},'${user.nombre}','${user.apellido}','${user.tipoUsuario}')`
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
        const x = await bcrypt.compare(user.passwd, response.rows[0].password)
          .then((result) => result)
          .catch("Error comparando passwords");

        const ci = response.rows[0].ci;
        const email = response.rows[0].email;
        const nombre = response.rows[0].nombre
        const apellido = response.rows[0].apellido

        const token = await jwtService.jwtService.createToken({ ci, email, nombre, apellido }).then(res => res);

        console.log(ci, email)
        if (x) {
          res.send({
            status: 200,
            statusMessage: "ACA",
            message: "ANDUVIO",
            token: token
          });

        } else throw Error();
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

  async changePassword(req, res) {
    try {
      const user = req.body

      await bcrypt
        .hash(user.password, 8)
        .then((hashedPassword) => {
          user.password = hashedPassword;
        })

      const response = await pool.query(`update usuarios set password = '${user.password}' where ci = ${user.ci}`)

      if (response.rowCount === 1) {
        res.send({
          status: 200,
          message: "Funcionando",
          data: user,
        });
      }

    } catch (error) {
      console.log(error)
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