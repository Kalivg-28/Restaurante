import { getUsuarios } from "../../../../lib/querys";

export async function POST(req) {
    try {
        // Obtener datos del cuerpo de la solicitud
        const { correo, contrasenia } = await req.json();

        if (!correo || !contrasenia) {
            return new Response(
                JSON.stringify({ error: 'Correo y contraseña son requeridos.' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Consultar la base de datos
        const usuarios = getUsuarios(correo, contrasenia);
        // Verificar si el usuario existe

        if (!usuarios) {
            return new Response(
                JSON.stringify({ error: 'Credenciales inválidas.' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Si el usuario es válido, responder con éxito
        return new Response(
            JSON.stringify({ message: 'Inicio de sesión exitoso.', usuarios }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.log(error.message);
        // Manejo de errores del servidor
        return new Response(
            JSON.stringify({ error: `Error interno del servidor.`, details: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}