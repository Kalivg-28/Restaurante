const sql = require("better-sqlite3");
const db = sql("base.db");

const obtenerFechaSimple = () => {
    const ahora = new Date(Date.now()); // También puedes usar simplemente `new Date()`

    return ahora.toISOString().replace('T', ' ').split('.')[0];
};

const resultado = db.prepare("SELECT * FROM MPlatillo").all();
const data = db.prepare("SELECT * FROM MUsuario").all();
const tickets = db.prepare("SELECT * FROM MTicket").all();
const dTickets = db.prepare("SELECT * FROM DTicket").all();

console.log(tickets);
console.log(dTickets);
console.log(data);