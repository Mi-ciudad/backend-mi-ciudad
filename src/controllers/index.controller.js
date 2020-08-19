const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "root",
  database: "miCiudad2",
});

const getUsers = async (req, res) => {
  const response = await pool.query("SELECT * FROM usuarios");
  res.json({
    body: {
      usuario: { telefono }
    }
  });
};

const createUser = async (req, res) => {
  const { tel, email, passwd, ci, nombre, apellido, tipoUsuario } = req.body;
  const response = await pool.query(
    "INSERT INTO usuarios (tel,email,passwd,ci,nombre,apellido,tipoUsuario) VALUES($1,$2,$3,$4,$5,$6,$7)",
    [tel, email, passwd, ci, nombre, apellido, tipoUsuario]
  );
  res.json({
    body: {
      usuario: { tel, email, passwd, ci, nombre, apellido, tipoUsuario },
    },
  });
};

module.exports = {
  getUsers,
  createUser,
};
