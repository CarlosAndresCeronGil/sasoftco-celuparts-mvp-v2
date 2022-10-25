import { API_URL } from "./settings";

export default function getRetomaInvoice({ id }) {
    const apiURL = `${API_URL}/RetomaPayment/downloadFile/${id}`;
    return fetch(apiURL)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = "factura.pdf";
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();    
            a.remove();  //afterwards we remove the element again         
        });
}
