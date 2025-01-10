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

const EliminarTicket = ({ onAdd, onClose }) => {
    const [EMP_id, setTicId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/tickets/${EMP_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el ticket');
            }

            alert('Empleado eliminado correctamente');
            setTicId('');
            onClose(); 
            onAdd(); 

        } catch (error) {
            console.error('Error al eliminar el ticket:', error);
            alert('Hubo un problema al eliminar el ticket');
        }
    };

    return (
        <Container>
            <LoginContainer>
                <LoginForm onSubmit={handleSubmit}>
                    <h1>Formulario Eliminar</h1>
                    <InputGroup>
                        <InputLabel htmlFor="EMP_id">ID:</InputLabel>
                        <InputField
                            type="number"
                            id="EMP_id"
                            value={EMP_id}
                            onChange={(e) => setTicId(e.target.value)}
                            required
                        />
                    </InputGroup>
                    <SubmitButton type="submit">Eliminar</SubmitButton>
                </LoginForm>
            </LoginContainer>
        </Container>
    );
};

export default EliminarTicket;
