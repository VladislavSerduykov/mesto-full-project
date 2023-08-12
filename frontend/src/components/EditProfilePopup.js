import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleName(e) {
    setName(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__input-fields">
        <input
          value={name ?? ""}
          onChange={handleName}
          id="name-input"
          className="popup__text popup__text_value_name"
          type="text"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="name-input-error popup__input-error"></span>
      </label>
      <label className="popup__input-fields">
        <input
          value={description ?? ""}
          onChange={handleDescription}
          id="profession-input"
          className="popup__text popup__text_value_profession"
          type="text"
          name="profession"
          placeholder="Профессия"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="profession-input-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
