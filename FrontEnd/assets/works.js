async function getWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();
    return data;
}

function createWorkFigure(work) {
    const figureElement = document.createElement('figure');
    const imageElement = document.createElement('img');
    imageElement.src = work.imageUrl;
    const captionElement = document.createElement('figcaption');
    captionElement.innerText = work.title;

    figureElement.appendChild(imageElement);
    figureElement.appendChild(captionElement);
    figureElement.setAttribute('data-category', work.category.name);
    figureElement.setAttribute('data-id', work.id);

    return figureElement;
}

async function displayWorks() {
    const gallery = document.querySelector('.gallery');
    const works = await getWorks();

    gallery.innerHTML = '';

    works.forEach((work) => {
        const figureElement = createWorkFigure(work);
        gallery.appendChild(figureElement);
    });
}

async function displayWorksGallery() {
    const gallery = document.querySelector('.galleryModal');
    const works = await getWorks();

    gallery.innerHTML = '';

    works.forEach((work) => {
        const figureElement = createWorkFigure(work);
        gallery.appendChild(figureElement);

        const iconeElement = document.createElement("i");
        iconeElement.classList.add("fa-regular", "fa-trash-can");
        figureElement.appendChild(iconeElement);
    });
}

const token = localStorage.getItem("token");

function deleteWork(token) {
    const galleryModal = document.querySelector('.galleryModal');
    galleryModal.addEventListener("click", function (event) {
        if (event.target.classList.contains("fa-trash-can")) {
            event.preventDefault();
            const figure = event.target.closest("figure");
            const workID = figure.dataset.id;

            fetch(`http://localhost:5678/api/works/${workID}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(function (response) {
                if (response.ok) {
                    figure.remove();
                } else {
                    console.error("Erreur dans la suppression du projet");
                }
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    displayWorks();
    displayWorksGallery();
    deleteWork(token);
});