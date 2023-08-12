import React from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../utils/auth";
import Header from "./Header";

function Register({ handleInfoMessage }) {
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
      .register(inputs)
      .then((res) => {
        handleInfoMessage({
          text: "Вы успешно зарегистрировались!",
          isSuccess: true,
        });
        resetForm();
        navigate("/sign-in");
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
          <Link style={{color: '#fff'}} className="header__nav_button" to="/sign-in">
            Войти
          </Link>
        </div>
      </Header>
      <main>
        <div className="register">
          <h2 className="register__title">Регистрация</h2>
          <form
            className="register__container"
            onSubmit={handleSubmit}
          >
            <input
              id="email-input"
              className="register__input"
              type="email"
              name="email"
              placeholder="Email"
              value={inputs.email}
              onChange={handleChange}
              minLength="2"
              maxLength="40"
              required
            ></input>
            <input
              id="password-input"
              className="register__input"
              type="password"
              name="password"
              placeholder="Пароль"
              minLength="8"
              maxLength="40"
              value={inputs.password}
              onChange={handleChange}
              required
            ></input>
            <button type="submit" className="register__button">
              Зарегистрироваться
            </button>
            <p className="register__text">
              Уже зарегистрированы?{" "}
              <Link to="/sign-in" className="register__text">
                Войти
              </Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
}

export default Register;
