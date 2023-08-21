const appDiv = document.getElementById("app");

const header = document.createElement("header");
header.classList.add("header");

const logo = document.createElement("img");
logo.src = "src/image/logo.svg";
logo.alt = "Logo";
logo.width = 100;
logo.height = 100;

const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Rechercher une tâche...";
searchInput.classList.add("search-input");

const searchInputLabel = document.createElement("label");
searchInputLabel.textContent = "Nom de la tâche";
searchInputLabel.classList.add("search-input-label");
searchInputLabel.appendChild(searchInput);

const modeSwitcher = document.createElement("div");
modeSwitcher.classList.add("mode-switcher");

const modeImage = document.createElement("img");
modeImage.src = "src/image/light-mode.svg";
modeImage.alt = "Mode Switcher";
modeImage.width = 32;
modeImage.height = 32;
modeImage.classList.add("mode-image");

modeSwitcher.appendChild(modeImage);

header.appendChild(logo);
header.appendChild(searchInputLabel);
modeSwitcher.appendChild(modeImage);
header.appendChild(modeSwitcher);

appDiv.appendChild(header);

let isDarkMode = false;

modeSwitcher.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        modeImage.src = "src/image/dark-mode.svg";
        document.body.classList.add("dark-mode");
    } else {
        modeImage.src = "src/image/light-mode.svg";
        document.body.classList.remove("dark-mode");
    }
});

const main = document.createElement("main");
main.classList.add("main");

// Créer une div sans classe
const emptyDiv = document.createElement("div");
emptyDiv.classList.add("app");

// Créer trois div pour les différentes étapes
const aFaireDiv = document.createElement("div");
aFaireDiv.id = "aFaire";

// Ajouter un paragraphe et une div à la div "aFaireDiv"
const aFaireName = document.createElement("p");
aFaireName.textContent = "À faire";
aFaireDiv.appendChild(aFaireName);

const aFaireItemsDiv = document.createElement("div");
aFaireItemsDiv.classList.add("toDo");
aFaireDiv.appendChild(aFaireItemsDiv);

const enCoursDiv = document.createElement("div");
enCoursDiv.id = "enCours";

const enCoursName = document.createElement("p");
enCoursName.textContent = "En cours";
enCoursDiv.appendChild(enCoursName);

const enCoursItemsDiv = document.createElement("div");
enCoursItemsDiv.classList.add("toDo");
enCoursDiv.appendChild(enCoursItemsDiv);

const termineDiv = document.createElement("div");
termineDiv.id = "terminé";

const termineName = document.createElement("p");
termineName.textContent = "Terminé";
termineDiv.appendChild(termineName);

const termineItemsDiv = document.createElement("div");
termineItemsDiv.classList.add("toDo");
termineDiv.appendChild(termineItemsDiv);

emptyDiv.appendChild(aFaireDiv);
emptyDiv.appendChild(enCoursDiv);
emptyDiv.appendChild(termineDiv);

appDiv.appendChild(emptyDiv);

const addTask = document.createElement("p");
addTask.textContent = "+";
addTask.classList.add("add-task"); 

appDiv.appendChild(addTask);