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

const emptyDiv = document.createElement("div");
emptyDiv.classList.add("app");

const aFaireDiv = document.createElement("div");
aFaireDiv.id = "aFaire";

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

const taskInterface = document.createElement("div");
taskInterface.classList.add("task-interface");

const titleLabel = document.createElement("label");
titleLabel.textContent = "Titre:";
titleLabel.classList.add("titleLabel");
const titleInput = document.createElement("input");
titleInput.type = "text";
titleInput.classList.add("taskTitle-input");

const descriptionLabel = document.createElement("label");
descriptionLabel.textContent = "Description:";
descriptionLabel.classList.add("descriptionLabel");
const descriptionInput = document.createElement("textarea");
descriptionInput.classList.add("taskDescription-input");

const labelLabel = document.createElement("label");
labelLabel.textContent = "Étiquettes:";
labelLabel.classList.add("labelEtiquette");
const labelDisplay = document.createElement("div");
labelDisplay.classList.add("label-display");

const addLabelButton = document.createElement("button");
addLabelButton.textContent = "+ Étiquette";
addLabelButton.classList.add("add-label-button");

const closeButton = document.createElement("button");
closeButton.textContent = "X";
closeButton.classList.add("close-button");

const saveButton = document.createElement("button");
const saveImage = document.createElement("img");
saveImage.src = "src/image/validate.svg";
saveImage.alt = "Enregistrer";
saveImage.width = 16;
saveImage.height = 16;
saveButton.appendChild(saveImage);
saveButton.classList.add("save-button");

taskInterface.appendChild(titleLabel);
taskInterface.appendChild(titleInput);
taskInterface.appendChild(descriptionLabel);
taskInterface.appendChild(descriptionInput);
taskInterface.appendChild(labelLabel);
taskInterface.appendChild(labelDisplay);
taskInterface.appendChild(addLabelButton);
taskInterface.appendChild(closeButton);
saveButton.appendChild(saveImage);
taskInterface.appendChild(saveButton);
appDiv.appendChild(taskInterface);

// Créer un fond d'obscurcissement
const overlay = document.createElement("div");
overlay.classList.add("overlay");
appDiv.appendChild(overlay);

addTask.addEventListener("click", () => {
    overlay.style.display = "block";
    taskInterface.style.display = "grid";
});

closeButton.addEventListener("click", () => {
    overlay.style.display = "none";
    taskInterface.style.display = "none";
});

saveButton.addEventListener("click", () => {
    const newTask = {
        title: titleInput.value,
        description: descriptionInput.value,
    };

    const taskId = saveTaskToLocalStorage(newTask);

    titleInput.value = "";
    descriptionInput.value = "";
    taskInterface.style.display = "none";
    overlay.style.display = "none";

    displaySavedTask(taskId, newTask);
});

// Fonction pour sauvegarder la tâche dans le localStorage
function saveTaskToLocalStorage(task) {
    const taskId = `task-${Date.now()}`;
    localStorage.setItem(taskId, JSON.stringify(task));
    return taskId;
}

// Fonction pour afficher une tâche enregistrée
function displaySavedTask(taskId, task) {
    const taskDiv = document.createElement("div");
    taskDiv.id = taskId;
    taskDiv.classList = "task";

    const titleParagraph = document.createElement("p");
    titleParagraph.textContent = task.title;

    const labelDiv = document.createElement("div");
    // ... (ajouter les étiquettes à labelDiv)

    taskDiv.appendChild(titleParagraph);
    taskDiv.appendChild(labelDiv);

    aFaireItemsDiv.appendChild(taskDiv);
}

// Fonction pour charger et afficher les tâches enregistrées au chargement de la page
function loadSavedTasks() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("task-")) {
            const taskId = key;
            const taskData = JSON.parse(localStorage.getItem(key));
            displaySavedTask(taskId, taskData);
        }
    }
}

// Appeler la fonction pour charger les tâches au chargement de la page
loadSavedTasks();