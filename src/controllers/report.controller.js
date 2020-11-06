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
      return res.status(200).json({
        data: {
          reportes: result.rows.map(r => (
            {
              id: r.id,
              descripcion: r.descripcion,
              estado: r.estado,
              imagen: r.imagen,
              direccion: r.direccion
            }
          ))
        }
      });
    } catch (err) {
        return res.status(500).json({
          status: 500,
          error: err
        });
      }
  };

  async namePerson(req, res){
    try {
      const result = await pool.query("SELECT nombre FROM usuarios RIGHT JOIN reportes ON usuarios.ci = reportes.ci");
      return res.json({
        data: {
          nombre: user.nombre
        }
      })
    } catch (err) {
        return res.status(500).json({
          status: 500,
          error: err
        });
      }  
  };

  async createReport(req, res) {
    try {
      const user = req.body;
      const response = await pool.query(`INSERT INTO reportes (descripcion,direccion,estado,ci) VALUES('${user.description}','${user.direction}','${user.state}',${user.ci})`);

      if(response.rowCount === 1) {
        return res.send({
          status: 201,
          message : "Reporte creado",
          data: user
        });
      }
      } catch (error) {
          console.log(error);
          console.log(response.rows);
          return res.send({
            status: 400,
            message : "Reporte no creado",
            data: user
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
  }
});

module.exports = {
  reportController
}
