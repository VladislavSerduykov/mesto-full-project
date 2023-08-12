import React from "react";
import logo from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      {props.children}
    </header>
  );
}
export default Header;
