import { config } from "./apiConfig";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInfo() {
    const url = `${this._baseUrl}/users/me`;
    return fetch(url, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getCardList() {
    const url = `${this._baseUrl}/cards`;

    return fetch(url, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeUserInfo({ name, about }) {
    const url = `${this._baseUrl}/users/me`;

    return fetch(url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  addNewCard({ name, link }) {
    const url = `${this._baseUrl}/cards`;

    return fetch(url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  _addLikes(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}/likes`;

    return fetch(url, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  _deleteLikes(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}/likes`;

    return fetch(url, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  toggleLikes(cardId, isLiked) {
    if (isLiked) {
      return this._deleteLikes(cardId);
    } else {
      return this._addLikes(cardId);
    }
  }

  deleteCard(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}`;

    return fetch(url, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) return Promise.resolve();
      return res.json();
    });
  }

  setUserImage(link) {
    const url = `${this._baseUrl}/users/me/avatar`;

    return fetch(url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponse);
  }
}

const api = new Api(config);

export default api;
