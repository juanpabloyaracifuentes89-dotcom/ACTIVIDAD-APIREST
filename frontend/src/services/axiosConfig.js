import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://actividad-apirest-production.up.railway.app',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response) {
            const { status } = error.response;
            if (status === 404) {
                console.error("El recurso solicitado no fue encontrado. (404)");
            } else if (status >= 500) {
                console.error("Ocurrió un error en el servidor. (500+)");
            }
        } else if (error.request) {
            console.error("Error al conectar con el servidor. No hubo respuesta.");
        } else {
            console.error("Error en la solicitud: ", error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
