import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaGenerado, setCaptchaGenerado] = useState("");

  const generarCaptcha = () => {
    const caracteres =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let codigo = "";

    for (let i = 0; i < 5; i++) {
      codigo += caracteres.charAt(
        Math.floor(
          Math.random() * caracteres.length
        )
      );
    }

    setCaptchaGenerado(codigo);
  };

  useEffect(() => {
    generarCaptcha();
  }, []);

  const iniciarSesion = async (e) => {
    e.preventDefault();

    if (
      captcha.toUpperCase() !==
      captchaGenerado.toUpperCase()
    ) {
      alert("CAPTCHA incorrecto");
      setCaptcha("");
      generarCaptcha();
      return;
    }

    try {
      const res = await api.post(
        "/auth/login",
        {
          correo,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "usuario",
        JSON.stringify(
          res.data.usuario
        )
      );

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.mensaje ||
        "Error al iniciar sesión"
      );
    }
  };

  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{
        background:
          "linear-gradient(135deg,#0d6efd,#198754)",
      }}
    >
      <div
        className="card shadow-lg"
        style={{
          width: "450px",
          borderRadius: "15px",
        }}
      >
        <div className="card-header bg-primary text-white text-center">
          <h3>
            🥤 Distribuidora Coca-Cola
          </h3>
        </div>

        <div className="card-body">
          <form onSubmit={iniciarSesion}>

            <div className="mb-3">
              <label>Correo</label>

              <input
                type="email"
                className="form-control"
                value={correo}
                onChange={(e) =>
                  setCorreo(e.target.value)
                }
                required
              />
            </div>

            <div className="mb-3">
              <label>Contraseña</label>

              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>

            <div className="mb-3">

              <label>CAPTCHA</label>

              <div
                className="border rounded p-3 text-center mb-2"
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  letterSpacing: "5px",
                  backgroundColor: "#f8f9fa",
                }}
              >
                {captchaGenerado}
              </div>

              <input
                type="text"
                className="form-control"
                placeholder="Ingrese el código"
                value={captcha}
                onChange={(e) =>
                  setCaptcha(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="btn btn-secondary mt-2"
                onClick={generarCaptcha}
              >
                Generar otro código
              </button>

            </div>

            <button
              className="btn btn-success w-100"
            >
              Ingresar
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;