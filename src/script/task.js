export function task(){
    function displaySavedTask(taskId, task) {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.setAttribute('draggable', 'true');
        taskDiv.setAttribute('ondragstart', 'drag(event)');
        taskDiv.addEventListener('dragstart', (ev) => {
            drag(ev, taskId);
        });
        taskDiv.id = taskId;
    
        const titleParagraph = document.createElement("p");
    
        // Limitez le nombre de caractères à afficher (par exemple, 30 caractères)
        const maxLength = 22;
        let truncatedTitle = task.title;
    
        if (task.title.length > maxLength) {
            truncatedTitle = task.title.substring(0, maxLength) + "...";
        }
    
        titleParagraph.textContent = truncatedTitle;
    
        const labelDiv = document.createElement("div");
    
        const infoIcon = document.createElement("img");
        infoIcon.src = "src/image/information.svg";
        infoIcon.alt = "Information";
        infoIcon.style.height = "20px"
        infoIcon.style.width = "20px"
        infoIcon.classList.add("icon","info");
        infoIcon.addEventListener("click", () => {
            openInfoInterface(taskId ,task);
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
    
        // Récupérez la bonne div en fonction de l'état de la tâche (à faire, en cours, terminée) et ajoutez-la là-bas.
        const taskState = task.state;
        let targetDiv;
    
        if (taskState === "aFaire") {
            targetDiv = aFaireItemsDiv;
        } else if (taskState === "enCours") {
            targetDiv = enCoursItemsDiv;
        } else if (taskState === "termine") {
            targetDiv = termineItemsDiv;
        }
    
        if (targetDiv) {
            targetDiv.appendChild(taskDiv);
    
            // Créer un nouvel objet avec toutes les propriétés de 'task' et mettre à jour 'state'
            const updatedTask = {
                ...task,  // Copier toutes les propriétés de l'objet task
                state: `${taskState}`  // Mettre à jour la propriété "state" selon votre besoin
            };
    
            // Réaffecter cet objet complet dans le stockage local
            const taskId = taskDiv.id;
            localStorage.setItem(taskId, JSON.stringify(updatedTask));
        }
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
            overlay.style.display = "none"; // Cacher l'overlay
        });
    
        editInterface.appendChild(editedTitleLabel);
        editInterface.appendChild(editedTitleInput);
        editInterface.appendChild(editedDescriptionLabel);
        editInterface.appendChild(editedDescriptionInput);
    
        editInterface.appendChild(saveButton);
    
        document.body.appendChild(editInterface);
    
        // Afficher l'overlay sombre
        overlay.style.display = "block";
        
        // Afficher l'interface d'informations
        editInterface.style.display = "grid";
    }
    
    function openInfoInterface(taskId, task) {
        const keyToRetrieve = taskId;
        const storedData = localStorage.getItem(keyToRetrieve);
    
        const infoInterface = document.createElement("div");
        infoInterface.classList.add("info-interface");
    
        let infoTitleDisplay = document.querySelector(".taskTitle-display");
        let infoDescriptionDisplay = document.querySelector(".taskDescription-display");
    
        if (!infoTitleDisplay) {
            infoTitleDisplay = document.createElement("p");
            infoTitleDisplay.classList.add("taskTitle-display");
            infoTitleDisplay.textContent = task.title;
        }
    
        if (!infoDescriptionDisplay) {
            infoDescriptionDisplay = document.createElement("p");
            infoDescriptionDisplay.classList.add("taskDescription-display");
            infoDescriptionDisplay.textContent = task.description;
        }
    
        // Ajouter les éléments d'affichage à l'élément "info-interface"
        infoInterface.appendChild(infoTitleDisplay);
        infoInterface.appendChild(infoDescriptionDisplay);
    
        // Ajouter le bouton de fermeture
        const closeButton = document.createElement("button");
        closeButton.textContent = "X";
        closeButton.classList.add("close-button");
        closeButton.addEventListener("click", () => {
            infoInterface.remove();
            overlay.style.display = "none"; // Cacher l'overlay
        });
        infoInterface.appendChild(closeButton);
    
        // Ajouter l'interface d'informations au body
        document.body.appendChild(infoInterface);
    
        // Afficher l'overlay sombre
        overlay.style.display = "block";
    
        // Afficher l'interface d'informations
        infoInterface.style.display = "grid"; // Utiliser "grid" pour afficher l'interface
    
        const infoTitleLabel = document.createElement("label");
        infoTitleLabel.textContent = "Titre:";
        infoTitleLabel.classList.add("titleLabel");
    
        const infoDescriptionLabel = document.createElement("label");
        infoDescriptionLabel.textContent = "Description:";
        infoDescriptionLabel.classList.add("descriptionLabel");
    
        const infoLabelLabel = document.createElement("label");
        infoLabelLabel.textContent = "Étiquettes:";
        infoLabelLabel.classList.add("labelEtiquette");
    
        const infoLabelDisplay = document.createElement("div");
        infoLabelDisplay.classList.add("label-display");
    
        infoInterface.appendChild(infoTitleLabel);
        infoInterface.appendChild(infoTitleDisplay);
        infoInterface.appendChild(infoDescriptionLabel);
        infoInterface.appendChild(infoDescriptionDisplay);
        infoInterface.appendChild(infoLabelLabel);
        infoInterface.appendChild(infoLabelDisplay);
        infoInterface.appendChild(closeButton);
    
        document.body.appendChild(infoInterface);
    
        // Afficher l'overlay sombre
        overlay.style.display = "block";
    
        // Afficher l'interface d'informations
        infoInterface.style.display = "grid"; // Utiliser "grid" pour afficher l'interface
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
    
    function deleteTask(taskId) {
        // Demander une confirmation avant de supprimer
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?");
    
        if (confirmation) {
            // Supprimer la tâche du localStorage
            localStorage.removeItem(taskId);
    
            // Mettre à jour l'affichage en supprimant la tâche de l'interface
            const taskElement = document.getElementById(taskId);
            if (taskElement) {
                taskElement.remove();
            }
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
    
    // Ajoutez un gestionnaire d'événement pour la saisie dans la barre de recherche
    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.toLowerCase(); // Obtenez le texte saisi par l'utilisateur en minuscules
        const taskContainer = document.getElementById("app");
    
        // Supprimez toutes les tâches actuellement affichées
        const tasks = document.querySelectorAll(".task");
        tasks.forEach((task) => {
            task.remove();
        });
    
        // Parcourez les éléments stockés localement et affichez uniquement les tâches correspondant à la recherche
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("task-")) {
                const taskData = JSON.parse(localStorage.getItem(key));
    
                // Vérifiez si la valeur du titre correspond à la recherche
                if (taskData.title.toLowerCase().includes(searchText)) {
                    // Si une correspondance est trouvée, affichez la tâche
                    displaySavedTask(key, taskData);
                }
            }
        }
    });
}