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
taskInterface.appendChild(saveButton);
appDiv.appendChild(taskInterface);

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

function saveTaskToLocalStorage(task) {
    const taskId = `task-${Date.now()}`;
    localStorage.setItem(taskId, JSON.stringify(task));
    return taskId;
}

function displaySavedTask(taskId, task) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task", "draggable-element");
    taskDiv.id = taskId;

    const titleParagraph = document.createElement("p");
    titleParagraph.textContent = task.title;

    const labelDiv = document.createElement("div");

    const infoIcon = document.createElement("img");
    infoIcon.src = "src/image/information.svg";
    infoIcon.alt = "Information";
    infoIcon.style.height = "20px"
    infoIcon.style.width = "20px"
    infoIcon.classList.add("icon","info");
    infoIcon.addEventListener("click", () => {
        openInfoInterface(task);
    });


    const editIcon = document.createElement("img");
    editIcon.src = "src/image/pencil.svg";
    editIcon.alt = "Edit";
    editIcon.style.height = "20px"
    editIcon.style.width = "20px"
    editIcon.classList.add("icon","edit");
    editIcon.addEventListener("click", () => {
        openEditInterface(taskId, task);
    });

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "src/image/trash_close.png";
    deleteIcon.alt = "Delete";
    deleteIcon.style.height = "20px"
    deleteIcon.style.width = "20px"
    deleteIcon.classList.add("icon","trash");
    deleteIcon.addEventListener("click", () => {
        deleteTask(taskId);
    });

    taskDiv.appendChild(titleParagraph);
    taskDiv.appendChild(labelDiv);
    taskDiv.appendChild(infoIcon);
    taskDiv.appendChild(editIcon);
    taskDiv.appendChild(deleteIcon);

    aFaireItemsDiv.appendChild(taskDiv);
}

closeButton.addEventListener("click", () => {
    infoInterface.remove();
    overlay.style.display = "none"; // Cacher l'overlay
});

function openEditInterface(taskId, task) {
    // Créer l'interface d'édition
    const editInterface = document.createElement("div");
    editInterface.classList.add("edit-interface");

    const editedTitleLabel = document.createElement("label");
    editedTitleLabel.textContent = "Titre:";
    const editedTitleInput = document.createElement("input");
    editedTitleInput.type = "text";
    editedTitleInput.value = task.title;
    editedTitleInput.classList.add("edited-title-input");

    const editedDescriptionLabel = document.createElement("label");
    editedDescriptionLabel.textContent = "Description:";
    const editedDescriptionInput = document.createElement("textarea");
    editedDescriptionInput.value = task.description;
    editedDescriptionInput.classList.add("edited-description-input");

    const saveButton = document.createElement("button");
    const saveImage = document.createElement("img");
    saveImage.src = "src/image/validate.svg";
    saveImage.alt = "Enregistrer";
    saveImage.width = 16;
    saveImage.height = 16;
    saveButton.appendChild(saveImage);
    saveButton.classList.add("save-button");
    saveButton.addEventListener("click", () => {
        // Mettre à jour les propriétés de la tâche
        const updatedTask = {
            ...task, // Conserver les propriétés existantes
            title: editedTitleInput.value,
            description: editedDescriptionInput.value,
        };

        updateTask(taskId, updatedTask); // Appeler la fonction pour mettre à jour la tâche
        editInterface.remove();
    });

    editInterface.appendChild(editedTitleLabel);
    editInterface.appendChild(editedTitleInput);
    editInterface.appendChild(editedDescriptionLabel);
    editInterface.appendChild(editedDescriptionInput);

    editInterface.appendChild(saveButton);

    document.body.appendChild(editInterface);
}

function updateTask(taskId, updatedTask) {
    // Mettre à jour la tâche dans le localStorage (à compléter)
    localStorage.setItem(taskId, JSON.stringify(updatedTask));

    // Mettre à jour l'affichage en supprimant la tâche de l'interface et en la recréant (à compléter)
    const taskElement = document.getElementById(taskId);
    if (taskElement) {
        taskElement.remove();
        displaySavedTask(taskId, updatedTask);
    }
}

function openInfoInterface(task) {
    // Créer l'interface d'informations similaire à celle de la création de tâche
    const infoInterface = document.createElement("div");
    infoInterface.classList.add("info-interface");

    const closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.classList.add("close-button");
    closeButton.addEventListener("click", () => {
        infoInterface.remove();
        overlay.style.display = "none"; // Cacher l'overlay
    });

    infoInterface.appendChild(titleLabel);
    infoInterface.appendChild(titleInput);
    infoInterface.appendChild(descriptionLabel);
    infoInterface.appendChild(descriptionInput);
    infoInterface.appendChild(labelLabel);
    infoInterface.appendChild(labelDisplay);
    infoInterface.appendChild(closeButton);

    document.body.appendChild(infoInterface);

    // Afficher l'overlay sombre
    overlay.style.display = "block";

    // Afficher l'interface d'informations
    infoInterface.style.display = "grid"; // Utiliser "grid" pour afficher l'interface
}

function deleteTask(taskId) {
    // Supprimer la tâche du localStorage
    localStorage.removeItem(taskId);

    // Mettre à jour l'affichage en supprimant la tâche de l'interface
    const taskElement = document.getElementById(taskId);
    if (taskElement) {
        taskElement.remove();
    }
}

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

loadSavedTasks();