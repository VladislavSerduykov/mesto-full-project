import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import auth from "../utils/auth";
import api from '../utils/api'

function Login({ handleInfoMessage, onLogin }) {
  const defaultInputs = {
    email: "",
    password: "",
  };

  const [inputs, setInputs] = React.useState(defaultInputs);

  const navigate = useNavigate();

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    setInputs((state) => ({ ...state, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    auth
      .authorize(inputs)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          api.setToken(res.token);
        }
        resetForm();
        onLogin();
        navigate("/");
      })
      .catch((err) => {
        const text = err.message || "Что-то пошло не так! Попробуйте еще раз.";
        handleInfoMessage({
          text: text,
          isSuccess: false,
        });
      });
  }

  function resetForm() {
    setInputs({ ...defaultInputs });
  }

  return (
    <>
      <Header>
        <div className="header__nav">
          <Link style={{color: '#fff'}} className="header__nav_button" to="/sign-up">
            Регистрация
          </Link>
        </div>
      </Header>
      <main>
        <div className="register">
          <h2 className="register__title">Вход</h2>
          <form
            className="register__container"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              className="register__input"
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              required
            ></input>
            <input
              type="password"
              className="register__input"
              placeholder="Пароль"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              required
            ></input>
            <button type="submit" className="register__button">
              Войти
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Login;
