import { API_URL } from './settings';

export default function putRequestUpdateTechnician(data) {
  const apiURL = `${API_URL}/Repair/repairTecnhnician/byIdRequest/${data.id}/${data.idTechnician}`;

  return fetch(apiURL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
}
