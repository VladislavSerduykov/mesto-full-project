function ImagePopup(props) {
  return (
    <div className={`popup popup_value_image` + (props.card !== null && " popup_opened")}>
      <figure className="popup__scale-container">
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card !== null ? props.card.link : "#"} alt={props.card !== null ? props.card.name : "#"} />
        <figcaption className="popup__image-caption">{props.card !== null ? props.card.name : "#"}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;