const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-33",
  headers: {
    authorization: "a30c4dd5-aa98-4163-8377-1568d481e5de",
    "Content-Type": "application/json",
  },
};

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const getAboutUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(getResponse);
};

export const getCardList = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(getResponse);
};

export const editProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  })
  .then(getResponse);
};

export const handleaddCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  })
  .then(getResponse);
};

export const putLike = (cardId) => {  
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {  
    method: "PUT",  
    headers: config.headers,  
  }).then(getResponse);  
};  

export const deleteLike = (cardId) => {  
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {  
    method: "DELETE",  
    headers: config.headers,  
  }).then(getResponse);  
};  

export const deleteCardApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(getResponse);
};

export const createAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  })
  .then(getResponse);
};
