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
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 1000px;
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

const TablaDatos = ({ onClose }) => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDatos = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/api/data');
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
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader>ID</TableHeader>
                            <TableHeader>Nombre</TableHeader>
                            <TableHeader>Edad</TableHeader>
                            <TableHeader>Puesto</TableHeader>
                            <TableHeader>Sucursal</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datos.map((dato) => (
                            <TableRow key={dato.EMP_id}>
                                <TableCell>{dato.EMP_id}</TableCell>
                                <TableCell>{dato.EMP_nombre}</TableCell>
                                <TableCell>{dato.EMP_edad}</TableCell>
                                <TableCell>{dato.EMP_puesto}</TableCell>
                                <TableCell>{dato.RES_sucursal}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button onClick={onClose}>Cerrar</Button>
            </ContentContainer>
        </Container>
    );
};

export default TablaDatos;
