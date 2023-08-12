import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__input-fields">
        <input
          id="image-input"
          className="popup__text popup__text_value_link"
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          ref={avatarRef}
          required
        />
        <span className="image-input-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
