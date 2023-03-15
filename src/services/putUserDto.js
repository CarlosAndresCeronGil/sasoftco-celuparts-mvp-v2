import { API_URL } from "./settings";

export default function putUserDto(data) {
  const apiURL = `${API_URL}/UserDto`;

  return fetch(apiURL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(error => console.log(error));
}
