import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";
import { Link } from "react-router-dom";

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  email,
  onLogout,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (<>
    <Header>
      <div className="header__nav">
      <p className="header__nav_text">{currentUser.email}</p>
      <Link to="/sign-in" onClick={onLogout} className='header__nav_button'>Выйти</Link>
      </div>
    </Header>
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__image" src={currentUser.avatar} alt="Фото профиля" />
          <button
            className="profile__avatarbtn"
            onClick={onEditAvatar}
            type="button"
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__info-name">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit"
              onClick={onEditProfile}
              type="button"
            ></button>
          </div>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button
          className="profile__add"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="gallery">
        {cards.map((card) => (
          <Card 
          card={card} 
          key={card._id} 
          onCardClick={onCardClick} 
          onCardLike={onCardLike} 
          onCardDelete={onCardDelete} 
          />
        ))}
      </section>
    </main>
    </>
  );
}
export default Main;
