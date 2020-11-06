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
            const response = await pool.query("SELECT * FROM reportes");
            return res.json({
                status: res.statuCode,
                data: response.rows
            });
        } catch (err) {
            console.log(result.rows)
            return res.status(500).json({
                status: 500,
                error: err
            });
        }
    };


    async createReport(req, res) {
        try {
        const user = req.body;
        console.log(user)
        const response = await pool.query(`INSERT INTO reportes (descripcion,direccion,estado,ci) VALUES('${user.descripcion}','${user.direccion}','${user.estado}',${user.ci})`);
        console.log(response.rows)
        
        if(response.rowCount === 1) {
            return res.send({
                status: 201,
                message : "Reporte creado",
                data: user
            });
        }
        } catch (error) {
            console.log(error);
            return res.send({
                status: 400,
                message : "Reporte no creado"
            });
            
        }
    };

    async updateStateReport(req, res) {
        const id = req.params.id;
        const { estado } = req.body;
        const id_exists_result = await pool.query('SELECT * FROM reportes WHERE id = $1', [id]);

        if (id_exists_result.rows.length === 0) {
            return res.status(404).json({
                data: {
                    message: `No existe ningún reporte con el id ${id}.`
                }
            });
        }
        const result = await pool.query('UPDATE reportes SET estado = $1 WHERE id = $2', [
            estado,
            id
        ]);
        return res.status(200).json({
            data: {
                report: {
                    id: query_result.rows[0].id,
                    descripcion: query_result.rows[0].descripcion,
                    estado: query_result.rows[0].estado,
                    imagen: query_result.rows[0].imagen,
                    direccion: query_result.rows[0].direccion
                }
            }
        });
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
    qq
    async history(req, res) {
        try {
            const user = req.body;
            const response = await pool.query(
                `select * from reportes r inner join usuarios u on r.ci = ci and u.ci = ${user.ci}`
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

    }
});

module.exports = {
    reportController
  }