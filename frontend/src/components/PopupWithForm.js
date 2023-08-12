function PopupWithForm({ title, name, children, buttonText, isOpen, onClose, onSubmit }) {

  
  return (
    <div className={`popup popup_value_${name}` +  (isOpen && " popup_opened")}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button className="popup__button popup__button_add" type="submit">
          {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
