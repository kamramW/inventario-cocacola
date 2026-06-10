require("dotenv").config();

const express = require("express");
const cors = require("cors");

const sequelize = require("./config/database");
                  require("./models/asociaciones");
const productoRoutes = require("./routes/productoRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const ventaRoutes = require("./routes/ventaRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/productos", productoRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    mensaje: "API funcionando"
  });
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a MySQL exitosa");
  })
  .catch((err) => {
    console.error("Error MySQL:", err);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});