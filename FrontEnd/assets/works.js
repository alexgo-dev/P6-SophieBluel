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

    return figureElement;
}

async function displayWorks() {
    const gallery = document.querySelector('.gallery');
    const works = await getWorks();

    works.forEach((work) => {
        const figureElement = createWorkFigure(work);
        gallery.appendChild(figureElement);
    });
}

displayWorks();
