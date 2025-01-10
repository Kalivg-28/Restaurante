import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin: 0;
    font-family: 'Arial', sans-serif;
    background-color: orange;
    background-image: url('https://media.istockphoto.com/id/1338891013/es/vector/conjunto-de-comida-tradicional-mexicana-grabado-vectorial-vintage-negro-aislado-sobre-blanco.jpg?s=612x612&w=0&k=20&c=rw5M3ofBAWzbmnNGXtSpUMwbEk5fJ3zEwpi-pfcLvoo=');
    background-size: 980px 980; 
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    border: 10px solid transparent; 
    box-sizing: border-box;
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

const SecondaryButton = styled.button`
    background-color: #ffffff;
    color: #333333;
    border: 1px solid #333333;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px; 
    margin-left: 10px; 
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
        background-color: #333333;
        color: #ffffff;
    }
`;

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [position, setPosition] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ username, position });
    };

    const handleCreateAccount = () => {
        alert('Redirigiendo al formulario de creación de cuenta...');
    };

    return (
        <Container>
            <LoginContainer>
                <LoginForm onSubmit={handleSubmit}>
                    <h2>Bienvenido a Antojitos Mexicanos</h2>
                    <InputGroup>
                        <InputLabel>Usuario</InputLabel>
                        <InputField
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Ingrese su usuario"
                            required
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLabel>Contraseña</InputLabel>
                        <InputField
                            type="text"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            placeholder="Ingrese su contraseña"
                            required
                        />
                    </InputGroup>
                    <SubmitButton type="submit">Ingresar</SubmitButton>
                    <SecondaryButton type="button" onClick={handleCreateAccount}> 
                        Crear nueva cuenta
                    </SecondaryButton>
                </LoginForm>
            </LoginContainer>
        </Container>
    );
};

const Registro = ({ onSwitch }) => {
    const [formData, setFormData] = useState({
        nombreCompleto: "",
        usuario: "",
        contrasena: "",
        correoTelefono: "",
        fechaNacimiento: "",
    });

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const manejarEnvio = (e) => {
        e.preventDefault();
        console.log("Datos del formulario enviados:", formData);
    };

    return (
        <LoginContainer>
            <LoginForm onSubmit={manejarEnvio}>
                <h2>Crear Cuenta</h2>
                <InputGroup>
                    <InputLabel>Nombre completo</InputLabel>
                    <InputField
                        type="text"
                        name="nombreCompleto"
                        value={formData.nombreCompleto}
                        onChange={manejarCambio}
                        placeholder="Ingrese su nombre completo"
                        required
                    />
                </InputGroup>
                <InputGroup>
                    <InputLabel>Usuario</InputLabel>
                    <InputField
                        type="text"
                        name="usuario"
                        value={formData.usuario}
                        onChange={manejarCambio}
                        placeholder="Ingrese su usuario"
                        required
                    />
                </InputGroup>
                <InputGroup>
                    <InputLabel>Contraseña</InputLabel>
                    <InputField
                        type="password"
                        name="contrasena"
                        value={formData.contrasena}
                        onChange={manejarCambio}
                        placeholder="Ingrese su contraseña"
                        required
                    />
                </InputGroup>
                <InputGroup>
                    <InputLabel>Correo o Teléfono</InputLabel>
                    <InputField
                        type="text"
                        name="correoTelefono"
                        value={formData.correoTelefono}
                        onChange={manejarCambio}
                        placeholder="Ingrese su correo o teléfono"
                        required
                    />
                </InputGroup>
                <InputGroup>
                    <InputLabel>Fecha de Nacimiento</InputLabel>
                    <InputField
                        type="date"
                        name="fechaNacimiento"
                        value={formData.fechaNacimiento}
                        onChange={manejarCambio}
                        required
                    />
                </InputGroup>
                <SubmitButton type="submit">Registrar</SubmitButton>
                <SecondaryButton type="button" onClick={() => onSwitch("login")}>
                    Volver
                </SecondaryButton>
            </LoginForm>
        </LoginContainer>
    );
};

const App = () => {
    const [currentView, setCurrentView] = useState("login");

    return (
        <Container>
            {currentView === "login" ? (
                <Login onSwitch={setCurrentView} />
            ) : (
                <Registro onSwitch={setCurrentView} />
            )}
        </Container>
    );
};

export default Login;
