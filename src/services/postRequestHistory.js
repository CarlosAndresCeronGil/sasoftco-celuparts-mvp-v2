import moment from "moment";
import { API_URL } from "./settings";

export default function postRequestHistory(data) {
    const apiURL = `${API_URL}/RequestHistory`;

    data.date = moment(data.date).format("YYYY-MM-DD HH:mm:ss")

    return fetch(apiURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data2 => {
            return data2;
        })
        .catch(error => {
            console.log(error);
            return error;
        }
        );    
}