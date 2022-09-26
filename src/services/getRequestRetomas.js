import { API_URL } from './settings'

export default function getRequestRetomas({page, initialDate = '0001-1-1', finalDate = '0001-1-1'} = {}) {
    const apiURL = `${API_URL}/Request/Retomas/${page}/RequestDate?InitialDate=${initialDate}&FinalDate=${finalDate}`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            // console.log(response)
            return response;
        })
        .catch(error => {
            console.log(error)
            return error;
        })
}
