import { API_URL } from "./settings";

export default function putRequestRetomaUpdateTechnician(data) {
  const apiURL = `${API_URL}/Retoma/retomaTecnhnician/byIdRequest/${data.id}/${data.idTechnician}`;

  return fetch(apiURL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .catch(error => console.log(error));
}
