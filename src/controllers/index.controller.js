const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "root",
  database: "miCiudad2"
});

const getUsers = async (req, res) => {
  const response = await pool.query("SELECT * FROM usuarios");
  res.json({
    body: {
      usuario: { telefono }
    }
  });
};

const history = async (req,res) => {
  const {ci} = req.body
  const response = await pool.query("select * from reportes r inner join usuarios u on r.ci = ci and u.ci = ci", [ci]);
  console.log(response.rows);
  res.json(response.rows);
}

const login = async (req,res) => {
  const {email,passwd} = req.body;
  const response = await pool.query("SELECT * FROM usuarios where email = $1 and passwd = $2" ,[email,passwd])
  console.log(response.rows)
  res.send(response.rows);
}

const register = async (req,res) => {
  const {tel,email,passwd,ci,nombre,apellido,tipoUsuario} = req.body;
  const response = await pool.query("INSERT INTO usuarios(tel,email,passwd,ci,nombre,apellido,tipoUsuario) VALUES($1,$2,$3,$4,$5,$6,$7)",[tel,email,passwd,ci,nombre,apellido,tipoUsuario]);
  console.log(response.rows)
}

module.exports = {
  getUsers,
  login,
  history,
  register
};
