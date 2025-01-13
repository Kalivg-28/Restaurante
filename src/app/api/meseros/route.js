import {createMesero, deleteMesero, getMeseros} from "../../../../lib/querys";

export function GET() {
    try {
        const meseros = getMeseros();

        return new Response(
            JSON.stringify({ message: 'Se encontraron los meseros.', meseros }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    }catch (e) {
        console.error(e);
    }
}

export async function POST(req) {
    try {
        // Parsear el cuerpo de la solicitud
        const { correo, contrasenia, nombre, apellidos, tipoUsuario } = await req.json();

        // Validar que los parámetros requeridos existan
        if (!correo || !contrasenia || !nombre || !apellidos) {
            return new Response(
                JSON.stringify({ error: "Todos los campos son obligatorios: correo, contraseña, nombre, apellidos." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Llamar a la función para creNoar un mesero en la base de datos
        const respuesta = createMesero(correo, contrasenia, nombre, apellidos, tipoUsuario || 1);

        // Retornar éxito con la respuesta
        return new Response(
            JSON.stringify({
                message: "Se registró el mesero correctamente.",
                mesero: {
                    correo,
                    nombre,
                    apellidos,
                    tipoUsuario: tipoUsuario || 1,
                },
                respuesta,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error interno del servidor:", error.message);

        // Manejo de errores del servidor
        return new Response(
            JSON.stringify({
                error: "Error interno del servidor.",
                details: error.message,
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

export async function DELETE(req) {
    try {
        // Parsear el cuerpo de la solicitud
        const { correo } = await req.json();

        // Validar que el correo exista
        if (!correo) {
            return new Response(
                JSON.stringify({ error: "El correo del mesero es obligatorio." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Llamar a la función para eliminar el mesero
        const respuesta = deleteMesero(correo);

        // Retornar éxito
        return new Response(
            JSON.stringify({
                message: "Mesero eliminado correctamente.",
                respuesta,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error interno del servidor:", error.message);

        // Manejo de errores del servidor
        return new Response(
            JSON.stringify({
                error: "Error interno del servidor.",
                details: error.message,
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}