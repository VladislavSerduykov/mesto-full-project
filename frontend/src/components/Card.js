import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardDelete, onCardLike}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((person) => person._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `gallery__like ${isLiked && 'gallery__like_active'}` 
  );

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick () {
    onCardLike(card);
  }

  function handleCardDelete () {
    onCardDelete(card)
  }

  return (
    <article className="gallery__element">
      <img
        className="gallery__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="gallery__description">
        <h2 className="gallery__caption">{card.name}</h2>
        <div className="gallery__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="gallery__like-counter">{card.likes.length}</p>
        </div>
      </div>
{isOwn && <button
          className="gallery__delete"
          type="button"
          onClick={handleCardDelete}
        ></button>}
        

    </article>
  );
}
export default Card;
