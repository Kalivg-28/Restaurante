"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const Header = () => {
    const router = useRouter();
    const pathname = usePathname(); // Obtén la ruta actual
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ correo: '', contrasenia: '' });
    const [message, setMessage] = useState('');
    const [iniciado, setIniciado] = useState(0);
    const [usuario, setUsuario] = useState({});

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogout = () => {
        localStorage.removeItem("usuario");
        setUsuario({});
        setIniciado(0);
        router.push("/"); // Redirigir al inicio
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                alert(`Bienvenido, ${result.usuarios.nombre}`);
                localStorage.setItem("usuario", JSON.stringify(result.usuarios));
                if (result.usuarios.tipoUsuario === 1) {
                    router.push('/administrador'); // Cambiar ruta
                } else {
                    router.push('/mesero'); // Cambiar ruta
                }
                toggleModal();
            } else {
                setMessage(result.error);
            }
        } catch (error) {
            setMessage(`Error de red. Intenta nuevamente. ${error}`);
        }
    };

    useEffect(() => {
        try {
            const storedUser = JSON.parse(localStorage.getItem("usuario"));
            setUsuario(storedUser);
            if (storedUser?.tipoUsuario === 2) {
                setIniciado(2);
            } else if (storedUser?.tipoUsuario === 1) {
                setIniciado(1);
            } else {
                setIniciado(0);
            }
        } catch (error) {
            setIniciado(0);
        }
    }, [pathname]); // Reacciona a cambios en la ruta

    return (
        <>
            <header className={styles.contenedor}>
                <Image src="/img.png" alt="Imagen del logo" width={80} height={100} />
                {(iniciado === 2 || iniciado === 1) ? (
                    <Link href="/mesero" className={styles.titulo}>
                        Antojitos Mexicanos
                    </Link>
                ) : (
                    <Link href="/" className={styles.titulo}>
                        Antojitos Mexicanos
                    </Link>
                )}
                {(iniciado === 2 || iniciado === 1) ? (
                    <div className={styles.userInfo}>
                        <p className={styles.negro}>
                            Bienvenid@, {usuario?.nombre || "Usuario"}
                        </p>
                        <button
                            className={styles.logoutButton}
                            onClick={handleLogout}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                ) : (
                    <button className={styles.boton} onClick={toggleModal}>
                        Iniciar sesión
                    </button>
                )}
            </header>

            {/* Modal */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={toggleModal}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className={styles.closeButton} onClick={toggleModal}>
                            X
                        </button>
                        <h2 className={styles.tituloForm}>Iniciar Sesión</h2>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <label className={styles.label}>
                                Correo electrónico:
                                <input
                                    type="text"
                                    className={styles.input}
                                    name="correo"
                                    value={formData.correo}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className={styles.label}>
                                Contraseña:
                                <input
                                    type="password"
                                    className={styles.input}
                                    name="contrasenia"
                                    value={formData.contrasenia}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <button type="submit" className={styles.submitButton}>
                                Iniciar Sesión
                            </button>
                        </form>
                        {message && <p className={styles.message}>{message}</p>}
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;