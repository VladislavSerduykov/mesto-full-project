import React from "react";

function ToolTipPopup({ message, onClose }) {
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose(e);
  }

  return (
    <div className={`popup popup_value_info` + (message && " popup_opened")} onClick={handleOverlayClick}>
      <div className="popup__container">
        <p
          className={
            "popup__info-message" +
            (message
              ? message.isSuccess
                ? " popup__info-message_type_success"
                : " popup__info-message_type_fail"
              : "")
          }
        >
          {message ? message.text : " "}
        </p>
        <button className="popup__close" type="button" onClick={onClose} />
      </div>
    </div>
  );
}
export default ToolTipPopup;
