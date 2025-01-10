import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin: 0;
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const LoginContainer = styled.div`
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    max-width: 400px;
    width: 100%;
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 18px;
    color: #333333;
    cursor: pointer;

    &:hover {
        color: #ff0000;
    }
`;

const LoginForm = styled.form`
    padding: 40px;
    text-align: center;
`;

const InputGroup = styled.div`
    margin-bottom: 20px;
    text-align: left;
`;

const InputLabel = styled.label`
    display: block;
    color: #333333;
    margin-bottom: 5px;
`;

const InputField = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box;
`;

const SubmitButton = styled.button`
    background-color: #333333;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #555555;
    }
`;

const FormularioAñadir = ({ onAdd, onClose }) => {
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [puesto, setPuesto] = useState('');
    const [sucursal, setSucursal] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    EMP_nombre: nombre,
                    EMP_edad: edad,
                    EMP_puesto: puesto,
                    RES_sucursal: sucursal,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al insertar datos');
            }

            alert('Datos insertados correctamente');
            setNombre('');
            setEdad('');
            setPuesto('');
            setSucursal('');
            onClose(); // Cierra el formulario
            onAdd(); // Llama a la función para actualizar la tabla de datos

        } catch (error) {
            console.error('Error al insertar datos:', error);
            alert('Hubo un problema al insertar los datos');
        }
    };

    return (
        <Container>
            <LoginContainer>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <LoginForm onSubmit={handleSubmit}>
                    <h1>Formulario de Añadir Datos</h1>
                    <InputGroup>
                        <InputLabel htmlFor="nombre">Nombre:</InputLabel>
                        <InputField
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLabel htmlFor="edad">Edad:</InputLabel>
                        <InputField
                            type="number"
                            id="edad"
                            value={edad}
                            onChange={(e) => setEdad(e.target.value)}
                            required
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLabel htmlFor="puesto">Puesto:</InputLabel>
                        <InputField
                            type="text"
                            id="puesto"
                            value={puesto}
                            onChange={(e) => setPuesto(e.target.value)}
                            required
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLabel htmlFor="sucursal">Sucursal:</InputLabel>
                        <InputField
                            type="text"
                            id="sucursal"
                            value={sucursal}
                            onChange={(e) => setSucursal(e.target.value)}
                            required
                        />
                    </InputGroup>
                    <SubmitButton type="submit">Añadir</SubmitButton>
                </LoginForm>
            </LoginContainer>
        </Container>
    );
};

export default FormularioAñadir;
