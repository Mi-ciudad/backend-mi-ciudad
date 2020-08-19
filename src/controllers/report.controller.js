const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "root",
    database: "miCiudad2",
});

const getReport = async (req, res) => {
    const response = await pool.query("SELECT * FROM reportes");
    res.json(response.rows);
};

const createReport = async (req, res) => {
    const { descripcion, estado, imagen, direccion } = req.body;
    const response = await pool.query(
        "INSERT INTO reportes (descripcion,estado,imagen,direccion) VALUES($1,$2,$3,$4,$5)",
        [id, descripcion, estado, imagen, direccion]
    );
    res.json({
        body: {
            reporte: { descripcion, estado, imagen, direccion },
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
    res.json(response)
};

const deleteReport = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM reportes WHERE id = $1', [id]);
    res.json(`Report ${id} deleted successfully`);
};

module.exports = {
    getReport,
    createReport,
    updateStateReport,
    deleteReport
};