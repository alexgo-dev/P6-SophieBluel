async function admin() {
    const editBar = document.querySelector(".editBar");
    const login = document.getElementById("login");

    if (localStorage.getItem("token")) {
        editBar.style.display = "flex";
        login.textContent = "logout";
    }
    else {
        console.log("problème lors de l'authentification");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    admin();
});