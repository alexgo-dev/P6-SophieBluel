function createFilterButton(text) {
    const filter = document.createElement("div");
    filter.classList.add("filter");
    filter.innerText = text;
    return filter;
}

async function generateFilters() {
    const filterSection = document.querySelector(".filters");
    const filtersArray = [];

    const allFilter = createFilterButton("Tous");
    allFilter.setAttribute("id", "selected");
    filterSection.appendChild(allFilter);
    filtersArray.push(allFilter);

    const works = await fetch('http://localhost:5678/api/works').then(response => response.json());

    const categoriesSet = new Set();
    works.forEach(item => {
        const { name } = item.category;
        categoriesSet.add(name);
    });

    const categories = Array.from(categoriesSet);

    categories.forEach(category => {
        const filter = createFilterButton(category);
        filterSection.appendChild(filter);
        filtersArray.push(filter);
    });

    return filtersArray;
}

function updateFilterSelection(filtersArray, index) {
    filtersArray.forEach((filter, i) => {
        if (i === index) {
            filter.setAttribute("id", "selected");
        } else {
            filter.removeAttribute("id");
        }
    });
}

function filterWorksByCategory(selectedCategory) {
    const works = document.querySelectorAll('.gallery figure');

    works.forEach(work => {
        const workCategory = work.getAttribute('data-category');

        if (selectedCategory === 'Tous' || workCategory === selectedCategory) {
            work.style.display = 'initial';
        } else {
            work.style.display = 'none';
        }
    });
}

generateFilters().then(filtersArray => {
    const filterSection = document.querySelector(".filters");

    filterSection.addEventListener("click", function (event) {
        const selectedFilter = event.target;

        if (selectedFilter.classList.contains('filter')) {
            const index = filtersArray.indexOf(selectedFilter);
            if (index !== -1) {
                updateFilterSelection(filtersArray, index);

                const selectedCategory = selectedFilter.innerText;
                filterWorksByCategory(selectedCategory);
            }
        }
    });
});