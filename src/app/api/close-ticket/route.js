import {closeTicket} from "../../../../lib/querys";

export async function POST(req) {
    try {
        // Parsear el cuerpo de la solicitud
        const { idTicket, fechaCierre } = await req.json();

        // Validar que los parámetros requeridos existan
        if (!idTicket || !fechaCierre) {
            return new Response(
                JSON.stringify({ error: "idTicket y fechaCierre son requeridos." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Llamar a la función para cerrar el ticket
        const respuesta = closeTicket(idTicket, fechaCierre);

        // Retornar éxito con la respuesta
        return new Response(
            JSON.stringify({
                message: `El ticket con ID ${idTicket} fue cerrado correctamente.`,
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