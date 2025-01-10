const express = require('express');
const router = express.Router();
const connection = require('../server/conexion'); // Importa la conexión a la base de datos

// Obtener los datos de la tabla
router.get('/data', (req,res) => {
    // Realiza la consulta SQL para obtener los registros
    connection.query('SELECT * FROM Empleados', (error, results) => {
        if (error) {
            console.error('Error al obtener datos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.json(results); 
        }
    });
});
router.post('/data', (req, res) => {
    const {EMP_nombre, EMP_edad, EMP_puesto, RES_sucursal } = req.body;
    const query = 'INSERT INTO empleados (EMP_nombre, EMP_edad, EMP_puesto, RES_sucursal) VALUES (?, ?, ?, ?)';
    connection.query(query, [EMP_nombre, EMP_edad, EMP_puesto, RES_sucursal], (error, results) => {
        if (error) {
            res.status(500).send('Error al insertar datos');
            throw error;
        }
        res.status(201).send('Datos insertados correctamente');
    });
});
router.post('/order', (req, res) => {
    const orders = req.body;
  
    if (!orders || !Array.isArray(orders) || orders.length === 0) {
      return res.status(400).send('Datos del pedido inválidos');
    }
  
    const checkEmployeeQuery = 'SELECT COUNT(*) AS count FROM empleados WHERE EMP_id = ?';
    const insertQuery = 'INSERT INTO Ticket (TIC_mesa, TIC_sucursal, PLA_id, EMP_id) VALUES ?';
  
    const values = orders.map(order => [order.TIC_mesa, order.TIC_sucursal, order.PLA_id, order.EMP_id]);
  
    connection.query(checkEmployeeQuery, [orders[0].EMP_id], (error, results) => {
      if (error) {
        console.error('Error al verificar el empleado:', error);
        return res.status(500).send('Error al verificar el empleado');
      }
  
      if (results[0].count === 0) {
        return res.status(400).send('El ID del empleado no existe');
      }
  
      connection.query(insertQuery, [values], (error, results) => {
        if (error) {
          console.error('Error al insertar datos:', error);
          return res.status(500).send('Error al insertar datos');
        } else {
          return res.status(201).send('Datos insertados correctamente');
        }
      });
    });
  });

  router.get('/tickets', (req,res) => {
    // Consulta SQL para obtener los registros de la tabla
    connection.query('SELECT * FROM Ticket', (error, results) => {
        if (error) {
            console.error('Error al obtener datos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.json(results); 
        }
    });
});

router.delete('/tickets/:id', (req, res) => {
  const ticketId = req.params.id;
  const deleteQuery = 'DELETE FROM Empleados WHERE EMP_id = ?';

  connection.query(deleteQuery, [ticketId], (error, results) => {
      if (error) {
          console.error('Error al eliminar el ticket:', error);
          res.status(500).json({ message: 'Error interno del servidor' });
      } else if (results.affectedRows === 0) {
          res.status(404).json({ message: 'Ticket no encontrado' });
      } else {
          res.status(200).json({ message: 'Ticket eliminado correctamente' });
      }
  });
});

module.exports = router;
