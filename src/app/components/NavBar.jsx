import React, { useState } from 'react';
import styled from 'styled-components';
import FormularioAñadir from './Post';
import Link from 'next/link';
import TablaDatos from './funcionbase';
import TablaTicket from './geticket';

import EliminarTicket from './Deleteemp';
const NavBarContainer = styled.nav`
  position: fixed;
  width: 100%;
  background-color: black;
  overflow: hidden;
  z-index: 999;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const NavItem = styled.div`
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
    color: black;
  }

  @media (max-width: 768px) {
    float: none;
    text-align: left;
  }
`;

const CartButton = styled.button`
  float: right;
  background-color: blue;
  color: white;
  text-align: center;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    float: none;
    text-align: center;
  }
`;

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto; /* Permitir desplazamiento */
  z-index: 100; /* Asegurar que esté por encima de otros elementos */
`;

const RegistrarUsuarioButton = styled.div`
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  cursor: pointer;

  @media (max-width: 768px) {
    float: none;
    text-align: left;
  }
`;

const NavBar = ({ toggleCartVisibility, isCartVisible }) => {
  const [showEmpleados, setShowEmpleados] = useState(false);
  const [showFormulario, setShowFormulario] = useState(false);
  const [showTickets, setShowTickets] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const toggleEmpleados = () => {
    setShowEmpleados(!showEmpleados);
  };

  const toggleTickets = () => {
    setShowTickets(!showTickets);
  };

  const toggleFormulario = () => {
    setShowFormulario(!showFormulario);
  };

  const closeFormulario = () => {
    console.log('Cerrando Formulario...');
    setShowFormulario(false);
  };
  const toogleDelete =() =>{
    setShowDelete(!showDelete);
  };

  return (
    <NavBarContainer>
      <NavItem>Inicio</NavItem>
      <RegistrarUsuarioButton onClick={toggleTickets}>
        {showTickets ? 'Ocultar Tickets' : 'Mostrar Tickets'}
      </RegistrarUsuarioButton>
      <RegistrarUsuarioButton onClick={toggleEmpleados}>
        {showEmpleados ? 'Ocultar Empleados' : 'Mostrar Empleados'}
      </RegistrarUsuarioButton>
      <RegistrarUsuarioButton onClick={toggleFormulario}>Registrar Usuario</RegistrarUsuarioButton>
  
      <CartButton onClick={toggleCartVisibility}>
        {isCartVisible ? 'Cerrar Carrito' : 'Abrir Carrito'}
      </CartButton>

      {showFormulario && (
        <StyledOverlay>
          <FormularioAñadir
            onAdd={() => {
              closeFormulario(); 
            }}
            onClose={closeFormulario}
          />
        </StyledOverlay>
      )}
      {showEmpleados && (
        <StyledOverlay>
          <TablaDatos onClose={toggleEmpleados} />
        </StyledOverlay>
      )}
      {showTickets && (
        <StyledOverlay>
          <TablaTicket onClose={toggleTickets} />
        </StyledOverlay>
      )}
      {showDelete &&(
        <StyledOverlay>
         <EliminarTicket onClose={toogleDelete}></EliminarTicket>
        </StyledOverlay>
      )}
    </NavBarContainer>
  );
};

export default NavBar;
