 import sql from "better-sqlite3";
import {console} from "next/dist/compiled/@edge-runtime/primitives";

const db = sql("base.db");

const obtenerFechaSimple = () => {
    const ahora = new Date(Date.now()); // También puedes usar simplemente new Date()

    return ahora.toISOString().replace('T', ' ').split('.')[0];
};

export function getPlatillos() {
    const res = db.prepare("SELECT * FROM MPlatillo").all();

    return res;
}

export function getUsuarios(correo, contrasenia) {
    try {
        const query = 'SELECT * FROM MUsuario WHERE correo = ? AND contrasenia = ?';
        const user = db.prepare(query).get(correo, contrasenia);
        return user || null;
    }catch (error) {
        console.error(error);
        throw new Error(`Error al buscar usuario: ${error.message}`);
    }
}

export function getTickets() {
    const res = db.prepare("SELECT * FROM MTicket").all();

    return res;
}

export function createTicket(idPlatillo, costo, idMesero) {
    const query = db.prepare("INSERT INTO MTicket (costo, fechaApertura) VALUES (?, ?)");
    query.run(costo, obtenerFechaSimple());

    const busca = db.prepare("SELECT * FROM MTicket").all();

    const query2 = db.prepare("INSERT INTO DTicket (IdTicket, IdPlatillo, correoUsuario) VALUES (?, ?, ?)");
    query2.run(busca.length, idPlatillo, idMesero);

    return query2;
}

export function createDetalleTicket(idTicket, idPlatillo, costo, correoUsuario) {
    const query = db.prepare("INSERT INTO DTicket (IdTicket, IdPlatillo, correoUsuario) VALUES (?, ?, ?)");
    query.run(idTicket, idPlatillo, correoUsuario);

    const query2 = db.prepare("SELECT costo FROM MTicket WHERE idTicket = ?");
    const result = query2.get(idTicket);

    console.log(result.costo);

    const nuevoCosto = result.costo + costo;

    const updateTicket = db.prepare("UPDATE MTicket SET costo = ? WHERE idTicket = ?");
    updateTicket.run(nuevoCosto, idTicket);

    return updateTicket;
}

export function closeTicket(idTicket, fechaCierre) {
    const updateTicket = db.prepare("UPDATE MTicket SET fechaCierre = ? WHERE idTicket = ?");
    updateTicket.run(fechaCierre, idTicket);

    return updateTicket;
}

export function getMeseros() {
    const meseros = db.prepare("SELECT * FROM MUsuario WHERE tipoUsuario = 2").all();

    return meseros;
}

export function createMesero(correo, contrasenia, nombre, apellidos, tipoUsuario) {
    const registrar = db.prepare("INSERT INTO MUsuario VALUES (?, ?, ?, ?, ?)");
    registrar.run(correo, contrasenia, nombre, apellidos, tipoUsuario);

    return registrar;
}

export function deleteMesero(correo) {
    try {
        const query = "DELETE FROM MUsuario WHERE correo = ?";
        const statement = db.prepare(query);
        const result = statement.run(correo);

        if (result.changes === 0) {
            throw new Error("No se encontró un mesero con ese correo.");
        }

        return { success: true };
    } catch (error) {
        console.error("Error al eliminar mesero:", error.message);
        throw new Error("Error al eliminar el mesero de la base de datos.");
    }
}


export function createPlatillo(nombre, precio, direccion, tipo, descripcion) {
    try {
        const query = `
            INSERT INTO MPlatillo (nombre, precio, direccion, tipo, descripcion)
            VALUES (?, ?, ?, ?, ?)
        `;
        const stmt = db.prepare(query);
        const info = stmt.run(nombre, precio, direccion, tipo, descripcion);

        return {
            success: true,
            id: info.lastInsertRowid, // ID del nuevo platillo insertado
        };
    } catch (error) {
        console.error("Error al crear el platillo:", error.message);
        throw new Error("Error al crear el platillo.");
    }
}

export function getAllTickets() {
    const query = `
        SELECT
            MTicket.idTicket,
            MTicket.costo AS ticketCosto,
            MTicket.fechaApertura,
            MTicket.fechaCierre,
            DTicket.correoUsuario,
            MPlatillo.idPlatillo,
            MPlatillo.nombre AS platilloNombre,
            MPlatillo.precio AS platilloPrecio,
            MPlatillo.direccion AS platilloDireccion,
            MPlatillo.tipo AS platilloTipo,
            MPlatillo.descripcion AS platilloDescripcion
        FROM
            MTicket
                INNER JOIN
            DTicket ON MTicket.idTicket = DTicket.idTicket
                INNER JOIN
            MPlatillo ON DTicket.idPlatillo = MPlatillo.idPlatillo
        ORDER BY
            MTicket.fechaApertura DESC
    `;

    const res = db.prepare(query).all();
    return res;
}