const sql = require("better-sqlite3");
const db = sql("base.db");

const obtenerFechaSimple = () => {
    const ahora = new Date(Date.now()); // También puedes usar simplemente `new Date()`

    return ahora.toISOString().replace('T', ' ').split('.')[0];
};

const platillosBase = [
    {
        nombre: "Pozole",
        precio: 105.0,
        direccion: "/1.png",
        tipo: "Comida",
        descripcion: "Pozole rojo de maciza."
    },
    {
        nombre: "Enchiladas",
        precio: 105.0,
        direccion: "/2.png",
        tipo: "Comida",
        descripcion: "Totilla rellena con pollo bañada en salsa con cubierta de aguacate. (Orden de 3)"
    },
    {
        nombre: "Chilaquiles",
        precio: 97.0,
        direccion: "/3.png",
        tipo: "Comida",
        descripcion: "Tortilla bañada en salsa cubierta de crema, queso y cebolla."
    },
    {
        nombre: "Sope",
        precio: 69.0,
        direccion: "/4.png",
        tipo: "Comida",
        descripcion: "Pieza de tortilla con frijoles, queso, crema y rellena de pollo. (Orden de 3)"
    },
    {
        nombre: "Quesadilla",
        precio: 35.0,
        direccion: "/5.png",
        tipo: "Comida",
        descripcion: "Pieza de tortilla frita rellena de queso."
    },
    {
        nombre: "Flautas",
        precio: 110.0,
        direccion: "/6.png",
        tipo: "Comida",
        descripcion: "Tortilla frita rellena de pollo cubierta de queso, crema y lechuga. (Orden de 3)"
    },
    {
        nombre: "Tacos de suadero",
        precio: 105.0,
        direccion: "/7.png",
        tipo: "Comida",
        descripcion: "Tortilla rellena de suadero. (Orden de 3)"
    },
    {
        nombre: "Tostada",
        precio: 50.0,
        direccion: "/8.png",
        tipo: "Comida",
        descripcion: "Tortilla tostada cubierta con pollo, crema, queso y lechuga. (Orden de 3)"
    },
    {
        nombre: "Molletes",
        precio: 85.0,
        direccion: "/9.png",
        tipo: "Comida",
        descripcion: "Pieza de pan cubierta de frijoles, queso y pico de gallo. (Orden de 3)"
    },
    {
        nombre: "Enfrijoladas",
        precio: 105.0,
        direccion: "/10.png",
        tipo: "Comida",
        descripcion: "Tortilla frita rellana de pollo y cubierta con salsa de frijol, crema, queso y lechuga. (Orden de 3)"
    },
    {
        nombre: "Agua de horchata",
        precio: 29.0,
        direccion: "/11.png",
        tipo: "Bebida",
        descripcion: "Vaso de concentracion de arroz con canela y azucar. (500ml)"
    },
    {
        nombre: "Agua de jamaica",
        precio: 29.0,
        direccion: "/12.png",
        tipo: "Bebida",
        descripcion: "Vaso de concentrado de jamaica y azucar. (500ml)"
    },
    {
        nombre: "Pastel de chocolate",
        precio: 45.0,
        direccion: "/13.png",
        tipo: "Postre",
        descripcion: "Rebanada de pastel de chocolate con cubierta de chocolate. (250g)"
    },
    {
        nombre: "Helado de vainilla",
        precio: 39.0,
        direccion: "/14.png",
        tipo: "Postre",
        descripcion: "Vaso de helado de vainilla. (150ml)"
    },
    {
        nombre: "Helado napolitano",
        precio:39.0,
        direccion:"/15.png",
        tipo: "Postre",
        descripcion:"Vaso de helado napolitano. (150ml)"
    }
];

const usuariosBase = [
    {
        correo: "emiliano@gmail.com",
        contrasenia: "asdf",
        nombre: "Gael Emiliano",
        apellidos: "Casillas Guapo Aviña",
        tipoUsuario: 1
    },
    {
        correo: "karen@gmail.com",
        contrasenia: "12345",
        nombre: "Karen Lilian",
        apellidos: "Valdes Garcia",
        tipoUsuario: 2

    },
    {
        correo: "francisco@gmail.com",
        contrasenia: "abcdefg",
        nombre: "Francisco",
        apellidos: "Orozco Rojas",
        tipoUsuario: 1
    }
    ];

const ticketsBase =[
    {
        costo: 0,
        fechaApertura: obtenerFechaSimple(),
    }
];

db.prepare(
    `CREATE TABLE IF NOT EXISTS MPlatillo(
        idPlatillo INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(150) NOT NULL,
        precio FLOAT NOT NULL,
        direccion VARCHAR(150) NOT NULL,
        tipo VARCHAR(150) NOT NULL,
        descripcion VARCHAR(150) NOT NULL
    )`
).run();

db.prepare(`CREATE TABLE IF NOT EXISTS MUsuario(
                correo VARCHAR(150) NOT NULL PRIMARY KEY,
                contrasenia VARCHAR(15) NOT NULL,
                nombre VARCHAR(150) NOT NULL,
                apellidos VARCHAR(150) NOT NULL,
                tipoUsuario INT NOT NULL)`  // 1:mesero  2:Admin
).run();

db.prepare(`CREATE TABLE IF NOT EXISTS MTicket(
                idTicket INTEGER PRIMARY KEY AUTOINCREMENT,
                costo FLOAT NOT NULL,
                fechaApertura VARCHAR(150) NOT NULL,
                fechaCierre VARCHAR(150)
            )`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS DTicket(
                idTicket INTEGER NOT NULL,
                idPlatillo INTEGER NOT NULL,
                correoUsuario VARCHAR(150) NOT NULL,
                FOREIGN KEY (idTicket) REFERENCES MTicket(idTicket) ON DELETE CASCADE,
                FOREIGN KEY (idPlatillo) REFERENCES MPlatillo(idPlatillo) ON DELETE CASCADE,
                FOREIGN KEY (correoUsuario) REFERENCES MUsuario(correo) ON DELETE CASCADE
            )`).run();

function initData() {
    // Inserción explícita de columnas (excluyendo idPlatillo)
    const stmt = db.prepare(`
        INSERT INTO MPlatillo (nombre, precio, direccion, tipo, descripcion)
        VALUES (@nombre, @precio, @direccion, @tipo, @descripcion)
    `);

    const insertTransaction = db.transaction((platillos) => {
        for (const platillo of platillos) {
            stmt.run(platillo);
        }
    });

    insertTransaction(platillosBase);

    const stmt2 = db.prepare(`
        INSERT INTO MUsuario (correo, contrasenia, nombre, apellidos, tipoUsuario)
        VALUES (@correo, @contrasenia, @nombre, @apellidos, @tipoUsuario)
    `);

    const insertTransaction2 = db.transaction((usuarios) => {
        for (const usuario of usuarios) {
            stmt2.run(usuario);
        }
    })

    insertTransaction2(usuariosBase);

    const stmt3 = db.prepare(`
        INSERT INTO MTicket (costo, fechaApertura)
        VALUES (@costo, @fechaApertura)
    `);

    const insertTransaction3 = db.transaction((tickets) => {
        for (const ticket of tickets) {
            stmt3.run(ticket);
        }
    })

    insertTransaction3(ticketsBase);

    console.log("Datos iniciales insertados en la base de datos.");
}

initData();