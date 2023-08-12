import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup ({isOpen, onClose, onAddPlace}) {
    const nameRef = React.useRef();
    const linkRef = React.useRef();

    React.useEffect(()=>{
        nameRef.current.value = ''
        linkRef.current.value = ''
    },[isOpen])


    function handleSubmit(e){
        e.preventDefault();

        onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value
        })
    }
    return (
<PopupWithForm
          name="add"
          title="Новое место"
          buttonText="Создать"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <label className="popup__input-fields">
            <input
              id="place-input"
              className="popup__text popup__text_value_name-place"
              type="text"
              name="name"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              ref={nameRef}
              required
            />
            <span className="place-input-error popup__input-error"></span>
          </label>
          <label className="popup__input-fields">
            <input
              id="link-input"
              className="popup__text popup__text_value_link"
              type="url"
              name="link"
              placeholder="Ссылка на картинку"
              ref={linkRef}
              required
            />
            <span className="link-input-error popup__input-error"></span>
          </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;