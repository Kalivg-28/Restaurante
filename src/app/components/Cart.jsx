"use client";

import { useState } from "react";
import styled from "styled-components";

const CartContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 20px;
  background: white;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 999;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")}; /* Mostrar u ocultar el carrito */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const OrderButton = styled.button`
  background-color: black;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: #218838;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  max-width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Cart = ({ cartItems, removeFromCart }) => {
  const [isCartVisible, setIsCartVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mesa, setMesa] = useState("");
  const [sucursal, setSucursal] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleOrder = async () => {
    if (!mesa || !sucursal || !employeeId) {
      alert("Por favor, complete todos los campos antes de enviar el pedido");
      return;
    }

    const orderData = cartItems.map((item) => ({
      TIC_mesa: mesa,
      TIC_sucursal: sucursal,
      PLA_id: item.id,
      EMP_id: employeeId,
    }));

    try {
      const response = await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el pedido");
      }

      alert("Pedido enviado correctamente");
      setIsModalOpen(false);
      setMesa("");
      setSucursal("");
      setEmployeeId("");
    } catch (error) {
      console.error("Error al enviar el pedido:", error);
      alert("Hubo un error al enviar el pedido");
    }
  };

  return (
    <CartContainer isVisible={isCartVisible}>
      <CloseButton onClick={() => setIsCartVisible(false)}>✖</CloseButton>
      <h2>Pedido</h2>
      {cartItems.length === 0 ? (
        <p>No hay Productos en el pedido</p>
      ) : (
        cartItems.map((item, index) => (
          <CartItem key={index}>
            <span>{item.name}</span>
            <span>${item.price}</span>
            <RemoveButton onClick={() => removeFromCart(index)}>Eliminar</RemoveButton>
          </CartItem>
        ))
      )}
      <h3>Total: ${total.toFixed(2)}</h3>
      <OrderButton onClick={() => setIsModalOpen(true)}>Hacer Pedido</OrderButton>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <h3>Detalles del Pedido</h3>
            <Input
              type="text"
              placeholder="Numero del cliente"
              value={mesa}
              onChange={(e) => setMesa(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Sucursal"
              value={sucursal}
              onChange={(e) => setSucursal(e.target.value)}
            />
            <Input
              type="text"
              placeholder="ID del Empleado"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
            <OrderButton onClick={handleOrder}>Enviar Pedido</OrderButton>
            <RemoveButton onClick={() => setIsModalOpen(false)}>Cancelar</RemoveButton>
          </ModalContainer>
        </ModalOverlay>
      )}
    </CartContainer>
  );
};

export default Cart;
