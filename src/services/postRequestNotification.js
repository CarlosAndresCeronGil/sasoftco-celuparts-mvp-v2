import { API_URL } from "./settings";

export default function postRequestNotification(data) {
  const apiURL = `${API_URL}/RequestNotification`;

  return fetch(apiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(error => {
      //Estaba botando error del post cuando no lo hay
      // Swal.fire({
      //     icon: 'error',
      //     title: 'Oops...',
      //     text: 'Parece que algo falló!',
      // })
      console.log(error);
      return error;
    });
}
