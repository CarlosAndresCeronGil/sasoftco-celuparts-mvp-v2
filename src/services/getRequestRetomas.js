import { API_URL } from './settings'

export default function getRequestRetomas({page, initialDate = '0001-1-1', finalDate = '0001-1-1', requestStatus = "", userDtoIdNumber = "", userDtoName = "", userDtoSurname = "", equipmentBrand = "", equipmentModel = ""} = {}) {
    const apiURL = `${API_URL}/Request/Retomas/${page}/RequestDate?InitialDate=${initialDate}&FinalDate=${finalDate}&RequestStatus=${requestStatus}&UserDtoIdNumber=${userDtoIdNumber}&UserDtoName=${userDtoName}&UserDtoSurname=${userDtoSurname}&EquipmentBrand=${equipmentBrand}&EquipmentModel=${equipmentModel}`;

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
