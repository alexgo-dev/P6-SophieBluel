async function admin() {
    const editBar = document.querySelector(".editBar");
    const login = document.getElementById("login");
    const editFilters = document.querySelector(".filters");

    if (localStorage.getItem("token")) {
        editBar.style.display = "flex";
        login.textContent = "logout";
        editFilters.style.display = "none";

        //logout

        login.addEventListener("click", function (event) {
            event.preventDefault();

            localStorage.removeItem("token");
            window.location.href = "index.html";
        });
    } else {
        console.log("problème lors de l'authentification");
    }
}

function openModal() {
    document.querySelector('.overlay').style.display = "block";
    document.querySelector('.modalContainer').style.display = "flex";
}

function closeModal() {
    document.querySelector('.overlay').style.display = "none";
    document.querySelector('.modalContainer').style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    admin();
});
