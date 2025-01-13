import {createTicket, getTickets} from "../../../../lib/querys";

export function GET() {
    try {
        const tickets = getTickets();

        return new Response(
            JSON.stringify({ message: 'Se encontraron los tickets.', tickets }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (e) {
        console.error(e);
    }
}

export async function POST(req) {
    try {
        // Parsear el cuerpo de la solicitud
        const { idPlatillo, costo, idMesero } = await req.json();

        // Validar que los parámetros requeridos existan
        if (!idPlatillo || !idMesero) {
            return new Response(
                JSON.stringify({ error: "idPlatillo y idMesero son requeridos." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Llamar a la función para crear un ticket
        const respuesta = createTicket(idPlatillo, costo, idMesero);

        const tickets = getTickets();
        // Retornar éxito con la respuesta
        return new Response(
            JSON.stringify({
                message: "Se registró el ticket correctamente.",
                tickets
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