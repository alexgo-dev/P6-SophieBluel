async function login(event) {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#pwd").value;

    const user = {
        email,
        password,
    };

    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (response.status === 200) {
            const result = await response.json();
            if (result && result.token) {
                localStorage.setItem("token", result.token);
                window.location.href = "./index.html";
            } else {
                console.log("Échec de l'authentification");
            }
        } else {
            throw new Error("Échec lors de la requête d'authentification.");
        }
    } catch (error) {
        console.error("Erreur lors de la requête d'authentification :", error);
    }
}

function setupLoginForm() {
    const loginForm = document.querySelector("#login-form");
    loginForm.addEventListener("submit", login);
}

document.addEventListener("DOMContentLoaded", setupLoginForm);