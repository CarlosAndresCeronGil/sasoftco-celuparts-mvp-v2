import moment from "moment";
import { API_URL } from "./settings";

export default function putHomeServiceByIdRequest(data) {
    const apiURL = `${API_URL}/HomeService/byIdRequest`;

    data.deliveryDate = moment(data.deliveryDate).format("YYYY-MM-DD HH:mm:ss")

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