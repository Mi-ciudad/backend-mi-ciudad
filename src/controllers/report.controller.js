const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "password",
    database: "miCiudad2",
});

const reportController = new (class ReportController {
    async getReport(req, res) {
        try {
            const result = await pool.query("SELECT * FROM reportes");
            return res.json({
                reportes: result.rows.map(r => (
                    {
                        id: r.id,
                        descripcion: r.descripcion,
                        estado: r.estado,
                        direccion: r.direccion,
                        username : r.username
                    }
                ))
                ,
                status: 200
            });
        } catch (err) {
            return res.json({
                status: 500,
                error: err
            });
        }
    };


    async createReport(req, res) {
        try {
            const user = req.body;
            const response = await pool.query(`INSERT INTO reportes (descripcion,direccion,estado,ci,username) VALUES('${user.descripcion}','${user.direccion}','${user.estado}',${user.ci}, ${user.username})`);

            if (response.rowCount === 1) {

                return res.send({
                    status: 201,
                    message: "Reporte creado",
                    data: user
                });
            }
        } catch (error) {
            console.log(error);
            console.log(response.rows);
            return res.send({
                status: 400,
                message: "Reporte no creado",
                data: user
            });

        }
    };

    async deleteReport(req, res) {
        const id = req.params.id;
        const result = await pool.query('DELETE FROM reportes WHERE id = $1', [id]);
        return res.status(200).json({
            data: {
                message: `El reporte con id ${id} se ha eliminado exitosamente.`
            }
        });
    };


    async history(req, res) {
        try {
            const user = req.body;
            const response = await pool.query(`select * from reportes where ci = ${user.ci}`);
            return res.json({
                reportes: response.rows.map(r => (
                    {
                        id: r.id,
                        descripcion: r.descripcion,
                        estado: r.estado,
                        direccion: r.direccion
                    }
                ))
                ,
                status: 200
            });

        } catch (error) {
            res.send({
                status: 403,
                statusMessage: "Internal Error",
                message: "Error al traer reportes para historial"
            });
        }

    }
});

module.exports = {
    reportController
}