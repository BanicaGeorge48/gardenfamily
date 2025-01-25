const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("Todos los campos son obligatorios.");
  }

  // Configuración del transportador de nodemailer
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "gardenfamily.ro@gmail.com", // Reemplázalo con tu correo
      pass: "nlhx dsuv totv egaz", // Contraseña del correo
    },
  });

  // Configuración del correo
  let mailOptions = {
    from: email,
    to: "gardenfamily.ro@gmail.com", // Correo de destino
    subject: `Nuevo mensaje de ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Correo enviado correctamente.");
  } catch (error) {
    console.error("Error enviando el correo:", error);
    res.status(500).send("Error enviando el correo.");
  }
});

// Arrancar el servidor
const PORT = 4321; // El puerto donde escuchará el backend
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}/contact`);
});
// b.george.geoo@gmail.com
