import { API_URL } from "../api/api.js";


document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", async function(e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const rememberMe = document.getElementById("rememberMe").checked;

        try {
            const response = await axios.post(`${API_URL}/login`, {
                login: username,
                password: password
            });

            if (response.data.success) {
                if(rememberMe){
                    localStorage.setItem("username", username);
                    localStorage.setItem("password", password);
                }else{
                    sessionStorage.setItem("username", username);
                    sessionStorage.setItem("password", password);
                }
                window.location.href = "index.html";
            } else {
                alert("Usuário ou senha incorretos!");
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Erro ao fazer login. Por favor, tente novamente.");
        }
    });
}); 