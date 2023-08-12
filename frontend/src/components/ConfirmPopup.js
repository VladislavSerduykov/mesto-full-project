import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup ({isOpen, onClose, onConfirm}) {
    
    function handleEventSubmit(e) {
        e.preventDefault();
        onConfirm();
    }

    return (
        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          buttonText="Да"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleEventSubmit}
        ></PopupWithForm>
    )
}

export default ConfirmPopup;