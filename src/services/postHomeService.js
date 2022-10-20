/* eslint-disable */
import moment from "moment";
import { date } from "yup";
import { API_URL } from "./settings";

export default function postHomeService(data) {

    const apiURL = `${API_URL}/HomeService`;

    data.pickUpDate = moment(data.pickUpDate).format("YYYY-MM-DD HH:mm:ss")
    data.deliveryDate = moment(data.deliveryDate).format("YYYY-MM-DD HH:mm:ss")

    return fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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