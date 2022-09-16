import { API_URL } from "./settings";

export default function getSiigoVouchers() {
    const apiURL = `${API_URL}/SiigoVoucher`;
    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        }
    )
}