import {createPlatillo} from "../../../../lib/querys";

export async function POST(req) {
    try {
        // Parsear el cuerpo de la solicitud
        const { nombre, precio, direccion, tipo, descripcion } = await req.json();

        // Validar que los parámetros requeridos existan
        if (!nombre || !precio || !direccion || !tipo || !descripcion) {
            return new Response(
                JSON.stringify({
                    error: "Todos los campos son obligatorios: nombre, precio, dirección, tipo, descripción.",
                }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Llamar a la función para crear un platillo en la base de datos
        const respuesta = createPlatillo(nombre, precio, direccion, tipo, descripcion);

        // Retornar éxito con la respuesta
        return new Response(
            JSON.stringify({
                message: "Se registró el platillo correctamente.",
                platillo: {
                    nombre,
                    precio,
                    direccion,
                    tipo,
                    descripcion,
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