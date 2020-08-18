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

const getReport = async (req,res) => {
  const response = await pool.query("SELECT * FROM reportes");
  console.log(response.rows);
  res.json(response.rows);
}

const createReport = async (req, res) => {
  const { id, descripcion, estado, imagen, direccion } = req.body;
  const response = await pool.query(
    "INSERT INTO reportes (id,descripcion,estado,imagen,direccion) VALUES($1,$2,$3,$4,$5)",
    [id, descripcion, estado, imagen, direccion]
  );
  res.json({
    body: {
      reporte: { id, descripcion, estado, imagen, direccion },
    },
  });
};

const updateStateReport = async (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;
  const response = await pool.query('UPDATE reportes SET estado = $1 WHERE id = $2', [
    estado,
    id
  ]);
  console.log(response);
  res.json('Report updated')
}

const deleteReport = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query('DELETE FROM reportes WHERE id = $1', [id]);
  console.log(response);
  res.json(`Report ${id} deleted successfully`);
}


module.exports = {
  getUsers,
  createUser,
  getReport,
  createReport,
  updateStateReport,
  deleteReport
};
