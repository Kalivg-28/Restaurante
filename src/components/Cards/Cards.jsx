 "use client";

import styles from "./Cards.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Cards = ({ platillos }) => {
    const router = useRouter();

    const [usuario, setUsuario] = useState({});
    const [showModal, setShowModal] = useState(false); // Modal para añadir a ticket
    const [showCloseModal, setShowCloseModal] = useState(false); // Modal para cerrar ticket
    const [selectedPlatillo, setSelectedPlatillo] = useState(null); // Platillo seleccionado
    const [tickets, setTickets] = useState([]); // Todos los tickets (activos y cerrados)
    const [showMeserosModal, setShowMeserosModal] = useState(false); // Modal para ver meseros
    const [meseros, setMeseros] = useState([]); // Lista de meseros
    const [showAddMeseroModal, setShowAddMeseroModal] = useState(false);
    const [newMesero, setNewMesero] = useState({
        correo: "",
        contrasenia: "",
        nombre: "",
        apellidos: "",
        tipoUsuario: 2, // Valor predeterminado
    });
    const [showAddPlatilloModal, setShowAddPlatilloModal] = useState(false); // Modal para añadir platillo
    const [newPlatillo, setNewPlatillo] = useState({
        nombre: "",
        precio: 0,
        direccion: "",
        tipo: "",
        descripcion: "",
    });
    const [showTicketsModal, setShowTicketsModal] = useState(false); // Modal para ver tickets
    const [ticketDetalles, setTicketDetalles] = useState([]); // Detalles del ticket

    const fetchTickets = async () => {
        try {
            const response = await fetch("/api/tickets", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();

                console.log(data);

                // Agrupar platillos por idTicket
                const groupedTickets = data.tickets.reduce((acc, ticket) => {
                    if (!acc[ticket.idTicket]) {
                        acc[ticket.idTicket] = {
                            idTicket: ticket.idTicket,
                            ticketCosto: ticket.costo,
                            fechaApertura: ticket.fechaApertura,
                            fechaCierre: ticket.fechaCierre,
                            correoUsuario: ticket.correoUsuario,
                            platillos: [],
                        };
                    }
                    acc[ticket.idTicket].platillos.push({
                        idPlatillo: ticket.idPlatillo,
                        nombre: ticket.nombre,
                        precio: ticket.precio,
                    });
                    return acc;
                }, {});

                // Convertir objeto a array para renderizar fácilmente
                const groupedTicketsArray = Object.values(groupedTickets);

                setTickets(groupedTicketsArray); // Actualiza los tickets agrupados}
                console.log(groupedTicketsArray);
                setShowTicketsModal(true); // Mostrar el modal de tickets
            } else {
                console.error("Error al obtener los tickets:", response.statusText);
            }
        } catch (error) {
            console.error("Error al realizar la petición:", error);
        }
    };

    const handleAddPlatilloInputChange = (e) => {
        const { name, value } = e.target;
        setNewPlatillo({ ...newPlatillo, [name]: value });
    };

    const handleAddPlatillo = async (e) => {
        e.preventDefault(); // Prevenir recarga del formulario
        try {
            const response = await fetch("/api/platillos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPlatillo),
            });

            if (response.ok) {
                alert("Platillo añadido correctamente.");
                const data = await response.json();
                setShowAddPlatilloModal(false); // Cerrar el modal
                router.refresh(); // Refrescar la página para mostrar el nuevo platillo
            } else {
                alert("Error al añadir el platillo.");
            }
        } catch (error) {
            console.error("Error de red al añadir el platillo:", error);
            alert("Error de red al añadir el platillo.");
        }
    };

    useEffect(() => {
        try {
            const storedUser = JSON.parse(localStorage.getItem("usuario"));
            setUsuario(storedUser);

            if (storedUser?.tipoUsuario !== 2 && storedUser?.tipoUsuario !== 1) {
                router.push("/");
            } else {
                const fetchTickets = async () => {
                    try {
                        const response = await fetch("/api/tickets", {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });

                        if (response.ok) {
                            const data = await response.json();
                            setTickets(data.tickets); // Guardar todos los tickets en el estado
                        } else {
                            console.error("Error al obtener los tickets:", response.statusText);
                        }
                    } catch (error) {
                        console.error("Error al realizar la petición:", error);
                    }
                };

                fetchTickets();
            }
        } catch (error) {
            router.push("/");
        }
    }, [router]);


    const closeModal = () => {
        setShowModal(false);
        setShowCloseModal(false);
        setShowMeserosModal(false);
        setSelectedPlatillo(null);
        setShowAddMeseroModal(false);
        setShowAddPlatilloModal(false);
        setShowTicketsModal(false);
    };

    const handleAddToTicket = (platillo) => {
        setSelectedPlatillo(platillo); // Guardar el platillo seleccionado
        setShowModal(true); // Mostrar el modal para añadir a ticket
    };

    const handleTicketSelection = async (ticketId) => {
        try {
            const costo = selectedPlatillo.precio || 0;

            const response = await fetch("/api/detalle-ticket", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idTicket: ticketId,
                    idPlatillo: selectedPlatillo.idPlatillo,
                    correoUsuario: usuario.correo,
                    costo: costo,
                }),
            });

            if (response.ok) {
                alert(`Platillo ${selectedPlatillo.nombre} añadido al ticket ${ticketId}`);
                closeModal();
            } else {
                const errorData = await response.json();
                console.error("Error al añadir detalle al ticket:", errorData);
                alert("Error al añadir el detalle al ticket");
            }
        } catch (error) {
            console.error("Error de red al añadir detalle al ticket:", error);
            alert("Error de red al añadir detalle al ticket");
        }
    };

    const handleCloseTicket = async (ticketId) => {
        try {
            const response = await fetch("/api/close-ticket", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idTicket: ticketId,
                    fechaCierre: new Date().toISOString(),
                }),
            });

            if (response.ok) {
                alert(`El ticket con ID ${ticketId} ha sido cerrado.`);
                setTickets((prevTickets) =>
                    prevTickets.filter((ticket) => ticket.idTicket !== ticketId) // Remover el ticket cerrado
                );
            } else {
                const errorData = await response.json();
                console.error("Error al cerrar el ticket:", errorData);
                alert("Error al cerrar el ticket");
            }
        } catch (error) {
            console.error("Error de red al cerrar el ticket:", error);
            alert("Error de red al cerrar el ticket");
        }
    };

    const handleAddNewTicket = async () => {
        try {
            const costo = selectedPlatillo.precio || 0;

            const response = await fetch("/api/tickets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idPlatillo: selectedPlatillo.idPlatillo,
                    costo: costo,
                    idMesero: usuario.correo,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setTickets(data.tickets);
                router.refresh(); // Refresca la ruta actual
            } else {
                const errorData = await response.json();
                console.error("Error al crear el ticket:", errorData);
                alert("Error al crear el ticket");
            }
        } catch (error) {
            console.error("Error de red al crear el ticket:", error);
            alert("Error de red al crear el ticket");
        }
    };

    const fetchMeseros = async () => {
        try {
            const response = await fetch("/api/meseros", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setMeseros(data.meseros); // Guardar la lista de meseros
                setShowMeserosModal(true); // Mostrar el modal
            } else {
                console.error("Error al obtener los meseros:", response.statusText);
            }
        } catch (error) {
            console.error("Error al realizar la petición:", error);
        }
    };

    const handleAddMesero = async (e) => {
        e.preventDefault(); // Evitar recarga de la página al enviar el formulario
        try {
            const response = await fetch("/api/meseros", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newMesero),
            });

            if (response.ok) {
                alert("Mesero añadido correctamente.");
                const data = await response.json();
                setMeseros((prevMeseros) => [...prevMeseros, data.mesero]); // Actualizar lista de meseros
                setShowAddMeseroModal(false); // Cerrar el modal
            } else {
                alert("Error al añadir el mesero.");
            }
        } catch (error) {
            console.error("Error de red al añadir el mesero:", error);
            alert("Error de red al añadir el mesero.");
        }
    };

    const handleMeseroInputChange = (e) => {
        const { name, value } = e.target;
        setNewMesero({ ...newMesero, [name]: value });
    };

    const handleDeleteMesero = async (correo) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este mesero?")) {
            return;
        }

        try {
            const response = await fetch("/api/meseros", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ correo }), // Enviar el correo del mesero a eliminar
            });

            if (response.ok) {
                alert("Mesero eliminado correctamente.");
                setMeseros((prevMeseros) => prevMeseros.filter((mesero) => mesero.correo !== correo)); // Actualizar la lista
            } else {
                const errorData = await response.json();
                console.error("Error al eliminar el mesero:", errorData);
                alert("Error al eliminar el mesero.");
            }
        } catch (error) {
            console.error("Error de red al eliminar el mesero:", error);
            alert("Error de red al eliminar el mesero.");
        }
    };

    return (
        <>
            <ul className={styles.grid}>
                {platillos.map((platillo) => (
                    <li className={styles.base} key={platillo.idPlatillo}>
                        <h1 className={styles.nombre}>{platillo.nombre}</h1>
                        <Image
                            src={`/platillos${platillo.direccion}`}
                                alt="Imagen de comida"
                                width={270}
                                height={120}
                                />
                                <p className={styles.tipo}>{platillo.tipo}</p>
                        <p className={styles.descripcion}>{platillo.descripcion}</p>
                        <p className={styles.precio}>${platillo.precio}</p>
                        {usuario && (usuario.tipoUsuario === 1 || usuario.tipoUsuario === 2) && (
                        <button
                            className={styles.boton}
                            onClick={() => handleAddToTicket(platillo)}
                        >
                            Añadir a ticket
                        </button>)}
                    </li>
                ))}
            </ul>


            {/* Modal para añadir a ticket */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className={styles.closeButton} onClick={closeModal}>
                            X
                        </button>
                        <h2>Selecciona un Ticket</h2>
                        {selectedPlatillo && (
                            <>
                                <p><strong>Platillo:</strong> {selectedPlatillo.nombre}</p>
                                <p><strong>Precio:</strong> ${selectedPlatillo.precio}</p>
                                <p><strong>Descripción:</strong> {selectedPlatillo.descripcion}</p>
                                <div className={styles.ticketButtons}>
                                    {tickets
                                        .filter((ticket) => !ticket.fechaCierre) // Mostrar solo tickets activos
                                        .map((ticket) => (
                                            <button
                                                key={ticket.idTicket}
                                                className={styles.ticketButton}
                                                onClick={() => handleTicketSelection(ticket.idTicket)}
                                            >
                                                Ticket: {ticket.idTicket}
                                            </button>
                                        ))}
                                </div>
                                <button
                                    className={styles.newTicketButton}
                                    onClick={handleAddNewTicket}
                                >
                                    Añadir a un nuevo ticket
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Modal para cerrar tickets */}
            {showCloseModal && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className={styles.closeButton} onClick={closeModal}>
                            X
                        </button>
                        <h2>Cerrar Ticket</h2>
                        <div className={styles.ticketButtons}>
                            {tickets
                                .filter((ticket) => !ticket.fechaCierre) // Solo tickets activos
                                .map((ticket) => (
                                    <button
                                        key={ticket.idTicket}
                                        className={styles.ticketButton}
                                        onClick={() => handleCloseTicket(ticket.idTicket)}
                                    >
                                        Cerrar Ticket: {ticket.idTicket}
                                    </button>
                                ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Botón para cerrar tickets */}
            {usuario && (usuario.tipoUsuario === 1 || usuario.tipoUsuario === 2) && (
                <button
                    className={styles.closeTicketButton}
                    onClick={() => setShowCloseModal(true)}
                >
                    Cerrar Ticket
                </button>
            )}

            {/* Modal para ver meseros */}
            {showMeserosModal && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className={styles.closeButton} onClick={closeModal}>
                            X
                        </button>
                        <h2>Lista de Meseros</h2>
                        <ul className={styles.meseroList}>
                            {meseros.map((mesero) => (
                                <li key={mesero.correo} className={styles.meseroListItem}>
                        <span>
                            {mesero.nombre} {mesero.apellidos} ({mesero.correo})
                        </span>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => handleDeleteMesero(mesero.correo)}
                                    >
                                        Eliminar
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button
                            className={styles.newTicketButton}
                            onClick={() => setShowAddMeseroModal(true)}
                        >
                            Añadir Mesero
                        </button>
                    </div>
                </div>
            )}
            {/* Modal para añadir mesero */}
            {showAddMeseroModal && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className={styles.closeButton} onClick={closeModal}>
                            X
                        </button>
                        <h2>Añadir Mesero</h2>
                        <form onSubmit={handleAddMesero} method="post">
                            <label className={styles.formLabel}>
                                Correo:
                                <input
                                    type="email"
                                    name="correo"
                                    className={styles.formInput}
                                    value={newMesero.correo}
                                    onChange={handleMeseroInputChange}
                                    required
                                />
                            </label>
                            <label className={styles.formLabel}>
                                Contraseña:
                                <input
                                    type="password"
                                    name="contrasenia"
                                    className={styles.formInput}
                                    value={newMesero.contrasenia}
                                    onChange={handleMeseroInputChange}
                                    required
                                />
                            </label>
                            <label className={styles.formLabel}>
                                Nombre:
                                <input
                                    type="text"
                                    name="nombre"
                                    className={styles.formInput}
                                    value={newMesero.nombre}
                                    onChange={handleMeseroInputChange}
                                    required
                                />
                            </label>
                            <label className={styles.formLabel}>
                                Apellidos:
                                <input
                                    type="text"
                                    name="apellidos"
                                    className={styles.formInput}
                                    value={newMesero.apellidos}
                                    onChange={handleMeseroInputChange}
                                    required
                                />
                            </label>
                            <button type="submit" className={styles.confirmButton}>
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Botón para ver meseros */}
            {usuario && (usuario.tipoUsuario === 1) && (
                <button
                    className={styles.viewMeserosButton}
                    onClick={fetchMeseros}
                >
                    Ver Meseros
                </button>
            )}

            {showAddPlatilloModal && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className={styles.closeButton} onClick={closeModal}>
                            X
                        </button>
                        <h2>Añadir Platillo</h2>
                        <form onSubmit={handleAddPlatillo}>
                            <label className={styles.formLabel}>
                                Nombre:
                                <input
                                    type="text"
                                    name="nombre"
                                    className={styles.formInput}
                                    value={newPlatillo.nombre}
                                    onChange={handleAddPlatilloInputChange}
                                    required
                                />
                            </label>
                            <label className={styles.formLabel}>
                                Precio:
                                <input
                                    type="number"
                                    name="precio"
                                    className={styles.formInput}
                                    value={newPlatillo.precio}
                                    onChange={handleAddPlatilloInputChange}
                                    required
                                />
                            </label>
                            <label className={styles.formLabel}>
                                Imagen (URL):
                                <input
                                    type="text"
                                    name="direccion"
                                    className={styles.formInput}
                                    value={newPlatillo.direccion}
                                    onChange={handleAddPlatilloInputChange}
                                    required
                                />
                            </label>
                            <label className={styles.formLabel}>
                                Tipo:
                                <input
                                    type="text"
                                    name="tipo"
                                    className={styles.formInput}
                                    value={newPlatillo.tipo}
                                    onChange={handleAddPlatilloInputChange}
                                    required
                                />
                            </label>
                            <label className={styles.formLabel}>
                                Descripción:
                                <textarea
                                    name="descripcion"
                                    className={styles.formTextarea}
                                    value={newPlatillo.descripcion}
                                    onChange={handleAddPlatilloInputChange}
                                    required
                                />
                            </label>
                            <button type="submit" className={styles.confirmButton}>
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Botón para añadir platillo (solo si el usuario es tipo 1 o 2 y no es null) */}
            {usuario && (usuario.tipoUsuario === 1) && (
                <button
                    className={styles.addPlatilloButton}
                    onClick={() => setShowAddPlatilloModal(true)}
                >
                    Añadir Platillo
                </button>
            )}

            {showTicketsModal && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >

                        <button className={styles.closeButton} onClick={closeModal}>
                            X
                        </button>


                        <h2> Lista de Tickets </h2>
                        <ul className={styles.ticketList}>
                            {tickets.map((ticket) => (
                                <li key={ticket.idTicket} className={styles.ticketListItem}>
                                    <p><strong>ID Ticket:</strong> {ticket.idTicket}</p>
                                    <p><strong>Costo Total:</strong> ${ticket.ticketCosto}</p>
                                    <p><strong>Fecha Apertura:</strong> {ticket.fechaApertura}</p>
                                    {ticket.fechaCierre && (
                                        <p><strong>Fecha Cierre:</strong> {ticket.fechaCierre}</p>
                                    )}
                                    <p><strong>Platillos:</strong> {platillos.nombre}</p>
                                    <ul>
                                        {ticket.platillos.map((platillo) => (
                                            <li key={platillo.idPlatillo + Math.random()}>
                                                {platillo.nombre}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}




            {usuario && (usuario.tipoUsuario === 1 || usuario.tipoUsuario === 2) && (
                <button
                    className={styles.viewTicketsButton}
                    onClick={fetchTickets}
                >
                    Ver Tickets
                </button>
            )}
        </>
    );
};

export default Cards;