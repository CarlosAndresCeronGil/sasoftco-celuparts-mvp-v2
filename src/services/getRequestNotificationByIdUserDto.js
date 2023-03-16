import { API_URL } from "./settings";

export default function getRequestNotificationByIdUserDto({ idUserDto }) {
  const apiURL = `${API_URL}/RequestNotification/Request/${idUserDto}`;

  return fetch(apiURL)
    .then(response => response.json())
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
    });
}
