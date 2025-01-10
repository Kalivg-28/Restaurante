import React, { useState } from "react";

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    usuario: "",
    contrasena: "",
    correoTelefono: "",
    fechaNacimiento: "",
  });

  const [errores, setErrores] = useState({});

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!formData.nombreCompleto.trim()) {
      nuevosErrores.nombreCompleto = "El nombre completo es obligatorio.";
    }
    if (!formData.usuario.trim()) {
      nuevosErrores.usuario = "El usuario es obligatorio.";
    }
    if (!formData.contrasena) {
      nuevosErrores.contrasena = "La contraseña es obligatoria.";
    } else if (formData.contrasena.length < 6) {
      nuevosErrores.contrasena =
        "La contraseña debe tener al menos 6 caracteres.";
    }
    if (!formData.correoTelefono.trim()) {
      nuevosErrores.correoTelefono = "El correo o teléfono es obligatorio.";
    }
    if (!formData.fechaNacimiento) {
      nuevosErrores.fechaNacimiento = "La fecha de nacimiento es obligatoria.";
    }
    return nuevosErrores;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    const nuevosErrores = validarFormulario();
    if (Object.keys(nuevosErrores).length === 0) {
      console.log("Datos del formulario enviados:", formData);
      alert("Formulario enviado correctamente.");
    } else {
      setErrores(nuevosErrores);
    }
  };

  return (
    <form onSubmit={manejarEnvio}>
      <div>
        <label>
          Nombre completo:
          <input
            type="text"
            name="nombreCompleto"
            value={formData.nombreCompleto}
            onChange={manejarCambio}
          />
        </label>
        {errores.nombreCompleto && <p>{errores.nombreCompleto}</p>}
      </div>
      <div>
        <label>
          Usuario:
          <input
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={manejarCambio}
          />
        </label>
        {errores.usuario && <p>{errores.usuario}</p>}
      </div>
      <div>
        <label>
          Contraseña:
          <input
            type="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={manejarCambio}
          />
        </label>
        {errores.contrasena && <p>{errores.contrasena}</p>}
      </div>
      <div>
        <label>
          Correo o Teléfono:
          <input
            type="text"
            name="correoTelefono"
            value={formData.correoTelefono}
            onChange={manejarCambio}
          />
        </label>
        {errores.correoTelefono && <p>{errores.correoTelefono}</p>}
      </div>
      <div>
        <label>
          Fecha de nacimiento:
          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={manejarCambio}
          />
        </label>
        {errores.fechaNacimiento && <p>{errores.fechaNacimiento}</p>}
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Formulario;
