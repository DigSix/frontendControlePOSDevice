import { api } from "../api/api.js";

export async function checkLogin() {
    const loginData = {
        login: sessionStorage.getItem("username"),
        password: sessionStorage.getItem("password")
    };

    try {
        let res = await api.post("/login", loginData);
        if (!res.data.success) {
            loginData.login = localStorage.getItem("username");
            loginData.password = localStorage.getItem("password");
            res = await api.post("/login", loginData);

            if (!res.data.success) window.location.href = "login.html";
        }
    } catch (err) {
        console.error("Erro de login", err);
        alert("Erro ao fazer login.");
    }
}