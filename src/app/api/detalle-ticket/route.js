import {createDetalleTicket} from "../../../../lib/querys";

export async function POST(req) {
    try {
        // Parsear el cuerpo de la solicitud
        const { idTicket, idPlatillo, costo, correoUsuario } = await req.json();

        // Validar que los parámetros requeridos existan
        if (!idTicket || !idPlatillo || !correoUsuario) {
            return new Response(
                JSON.stringify({ error: "idTicket, idPlatillo y correoUsuario son requeridos." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Llamar a la función para crear un detalle de ticket
        const respuesta = createDetalleTicket(idTicket, idPlatillo, costo, correoUsuario);
        // Retornar éxito con la respuesta
        return new Response(
            JSON.stringify({
                message: "Se registró el detalle del ticket correctamente.",
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