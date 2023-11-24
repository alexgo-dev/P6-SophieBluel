async function admin() {
    const editBar = document.querySelector(".editBar");
    const login = document.getElementById("login");
    const editButton = document.querySelector(".editButton")
    const editFilters = document.querySelector(".filters");

    if (localStorage.getItem("token")) {
        editBar.style.display = "flex";
        login.textContent = "logout";
        editButton.style.display = "flex";
        editFilters.style.display = "none";

        login.addEventListener("click", function (event) {
            event.preventDefault();
            localStorage.removeItem("token");
            window.location.href = "index.html";
        });
    } else {
        console.log("Problème lors de l'authentification");
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

function toggleModals() {
    const modalContainer = document.querySelector('.modalContainer');
    const modal = document.querySelector('.modal');
    const addPictureModal = document.querySelector('.addPictureModal');

    modal.style.display = 'none';
    addPictureModal.style.display = 'flex';
}

function backModals() {
    const modalContainer = document.querySelector('.modalContainer');
    const modal = document.querySelector('.modal');
    const addPictureModal = document.querySelector('.addPictureModal');

    modal.style.display = 'block';
    addPictureModal.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function () {
    const categorySelect = document.getElementById('category');

    fetch('http://localhost:5678/api/categories')
        .then(response => {
            if (!response.ok) {
                throw new Error('Problème de réseau');
            }
            return response.json();
        })
        .then(categories => {
            let optionsHTML = '';
            categories.forEach(category => {
                optionsHTML += `<option value="${category.id}">${category.name}</option>`;
            });
            categorySelect.innerHTML = optionsHTML;
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des catégories :', error);
        });
});

function displayImage() {
    const imageInput = document.getElementById('imageUpload');
    const icon = document.querySelector('.fa-image');
    const label = document.querySelector('.uploadButton');
    const paragraph = document.getElementById('imageFormat');
    const selectedImage = document.getElementById('selectedImage');

    const noFilesSelected = imageInput.files.length === 0;

    icon.style.display = noFilesSelected ? 'block' : 'none';
    label.style.display = noFilesSelected ? 'block' : 'none';
    paragraph.style.display = noFilesSelected ? 'block' : 'none';
    selectedImage.style.display = noFilesSelected ? 'none' : 'block';

    if (!noFilesSelected) {
        const selectedFile = imageInput.files[0];
        const imageUrl = URL.createObjectURL(selectedFile);
        selectedImage.src = imageUrl;
    }
}

function completeForm() {
    const imageInput = document.getElementById('imageUpload');
    const titleInput = document.getElementById('title');
    const categoryInput = document.getElementById('category');

    const isFormComplete = imageInput.files.length > 0 && titleInput.value.trim() !== '' && categoryInput.value.trim() !== '';

    return isFormComplete;
}

function enableValidateBtn() {
    const validateButtonState = document.getElementById('validateButton');
    validateButton.disabled = !completeForm();

    if (!validateButton.disabled) {
        validateButton.style.backgroundColor = 'rgba(29, 97, 84, 1)'; 
}
}

const newProjectForm = document.querySelector('.addPictureModal');
newProjectForm.addEventListener('input', () => {
    enableValidateBtn();
});

const validateButton = document.getElementById('validateButton');
validateButton.addEventListener('click', addNewProject);

function addNewProject(event) {
    const title = document.getElementById('title').value;
    const categoryId = parseInt(document.getElementById('category').value);
    const imageInput = document.getElementById('imageUpload');
    const imageFile = imageInput.files[0];
    let token = localStorage.getItem("token");

    if (!imageFile) {
        console.log('Aucun fichier image sélectionné');
        return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', categoryId);
    formData.append('image', imageFile);

    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                console.error('Échec de l\'ajout d\'un nouveau projet');
                throw new Error('Échec de l\'ajout d\'un nouveau projet');
            }
            return response.json();
        })
        .then(data => {
            updateGalleryWithNewProject(data);
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout d\'un nouveau projet :', error);
        });
}

function updateGalleryWithNewProject(projectData) {
    const newProjectCard = document.createElement('div');
    newProjectCard.classList.add('project-card');

    const titleElement = document.createElement('h3');
    titleElement.textContent = projectData.title;
    titleElement.classList.add('project-title');

    const imageElement = document.createElement('img');
    imageElement.src = projectData.imageUrl;

    newProjectCard.appendChild(titleElement);
    newProjectCard.appendChild(imageElement);

    const gallery = document.querySelector('.gallery');
    gallery.appendChild(newProjectCard);
}

document.addEventListener("DOMContentLoaded", admin);