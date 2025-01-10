import React, { useState } from 'react';

const EmployeeView = ({ sales, dishes, addSale, currentUser }) => {
  const initialSelectedDish = dishes.length > 0 ? dishes[0].id : '';
  const [selectedDish, setSelectedDish] = useState(initialSelectedDish);

  const handleAddSale = () => {
    const dish = dishes.find(dish => dish.id === selectedDish);
    if (dish) {
      // Realiza acciones para agregar la venta
      addSale({
        employeeId: currentUser.id,
        dishId: dish.id,
        dishName: dish.name,
        amount: dish.objective,
      });
    }
  };

  return (
    <div>
      <h2>Mis Ventas</h2>
      <select value={selectedDish} onChange={(e) => setSelectedDish(e.target.value)}>
        {dishes.map((dish) => (
          <option key={dish.id} value={dish.id}>
            {dish.name}
          </option>
        ))}
      </select>
      <button onClick={handleAddSale}>Generar Venta</button>
      {/*ventas realizadas del empleado */}
    </div>
  );
};

export default EmployeeView;
