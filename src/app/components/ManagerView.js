import React, { useState } from 'react';

const ManagerView = ({ employees, sales, dishes, addEmployee }) => {
  const [newEmployee, setNewEmployee] = useState({ name: '', age: '', position: '' });

  const handleAddEmployee = () => {
    const id = `EMP-${Date.now()}`;
    addEmployee({ ...newEmployee, id });
    setNewEmployee({ name: '', age: '', position: '' });
  };

  const mostSoldDish = dishes.reduce((max, dish) => (dish.quantitySold > max.quantitySold ? dish : max), dishes[0]);

  return (
    <div>
      <h2>Vista del Gerente</h2>
      <h3>Empleados</h3>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>{employee.name} - {employee.position}</li>
        ))}
      </ul>
      <h3>Añadir Empleado</h3>
      <input
        type="text"
        placeholder="Nombre"
        value={newEmployee.name}
        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Edad"
        value={newEmployee.age}
        onChange={(e) => setNewEmployee({ ...newEmployee, age: e.target.value })}
      />
      <input
        type="text"
        placeholder="Puesto"
        value={newEmployee.position}
        onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
      />
      <button onClick={handleAddEmployee}>Añadir Empleado</button>

      <h3>Ventas</h3>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>{sale.employeeName} vendió {sale.dishName} por ${sale.price}</li>
        ))}
      </ul>

      <h3>Platillo más vendido</h3>
      {mostSoldDish && (
        <div>
          <p>Platillo: {mostSoldDish.name}</p>
          <p>Cantidad vendida: {mostSoldDish.quantitySold}</p>
        </div>
      )}
    </div>
  );
};

export default ManagerView;
