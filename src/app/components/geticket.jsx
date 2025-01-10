import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin: 0;
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`;

const ContentContainer = styled.div`
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    max-width: 800px;
    width: 100%;
    padding: 20px;
    min-height: 80vh;
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

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    display: block;
`;

const TableHead = styled.thead`
    background-color: #333333;
    color: #ffffff;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

const TableHeader = styled.th`
    padding: 12px;
`;

const TableCell = styled.td`
    padding: 12px;
`;

const Button = styled.button`
    background-color: #333333;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 20px;

    &:hover {
        background-color: #555555;
    }
`;

// Componente principal
const TablaTicket = ({ onClose }) => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDatos = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/api/tickets');
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            const data = await response.json();
            console.log('Datos recibidos:', data);
            setDatos(data);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDatos();
    }, []);

    if (loading) {
        return <Container>Cargando datos...</Container>;
    }

    if (error) {
        return <Container>Error al cargar datos: {error.message}</Container>;
    }

    return (
        <Container>
            <ContentContainer>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader>ID</TableHeader>
                            <TableHeader>Cliente</TableHeader>
                            <TableHeader>Fecha</TableHeader>
                            <TableHeader>Sucursal</TableHeader>
                            <TableHeader>ID Del platillo</TableHeader>
                            <TableHeader>ID Empleado</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datos.map((dato) => (
                            <TableRow key={dato.TIC_id}>
                                <TableCell>{dato.TIC_id}</TableCell>
                                <TableCell>{dato.TIC_mesa}</TableCell>
                                <TableCell>{new Date(dato.TIC_fecha).toLocaleString()}</TableCell>
                                <TableCell>{dato.TIC_sucursal}</TableCell>
                                <TableCell>{dato.PLA_id}</TableCell>
                                <TableCell>{dato.EMP_id}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button onClick={onClose}>Cerrar</Button>
            </ContentContainer>
        </Container>
    );
};

export default TablaTicket;
