// Usando Axios global carregado via CDN
export const API_URL = "http://131.107.1.18:3000/api";

export const api = axios.create({
    baseURL: API_URL
});