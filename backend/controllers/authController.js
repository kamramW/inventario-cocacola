const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
const LogAcceso = require("../models/LogAcceso");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const usuario = await Usuario.findOne({
      where: { correo },
    });

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }

    const passwordValida = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!passwordValida) {
      return res.status(401).json({
        mensaje: "Contraseña incorrecta",
      });
    }

    await LogAcceso.create({
      usuario_id: usuario.id,
      ip:
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress,

      navegador:
        req.headers["user-agent"],

      evento: "Ingreso",

      fecha_hora: new Date(),
    });

    const token = jwt.sign(
      {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      }
    );

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol,
      },
    });

  } catch (error) {
    res.status(500).json({
      mensaje: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {

    const { usuario_id } = req.body;

    await LogAcceso.create({
      usuario_id,
      ip:
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress,

      navegador:
        req.headers["user-agent"],

      evento: "Salida",

      fecha_hora: new Date(),
    });

    res.json({
      mensaje: "Sesión cerrada",
    });

  } catch (error) {
    res.status(500).json({
      mensaje: error.message,
    });
  }
};

module.exports = {
  login,
  logout,
};