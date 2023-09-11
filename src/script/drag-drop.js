export function dragdrop(){

    function allowDrop(ev) {
        ev.preventDefault();
    }
        
    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        var droppedElement = document.getElementById(data);

        // Utilisez la fonction pour récupérer la tâche par son ID
        var task = getTaskById(data);

        if (!task) {
            console.error("Tâche non trouvée.");
            return;
        }

        // Mettre à jour la propriété "state" de l'objet 'task' ici
        if (task.state === "aFaire" && ev.target === enCoursItemsDiv) {
            task.state = "enCours";
        } else if (task.state === "aFaire" && ev.target === termineItemsDiv) {
            task.state = "termine";
        } else if (task.state === "enCours" && ev.target === aFaireItemsDiv) {
            task.state = "aFaire";
        } else if (task.state === "enCours" && ev.target === termineItemsDiv) {
            task.state = "termine";
        } else if (task.state === "termine" && ev.target === aFaireItemsDiv) {
            task.state = "aFaire";
        } else if (task.state === "termine" && ev.target === enCoursItemsDiv) {
            task.state = "enCours";
        }

        // Réaffecter l'objet mis à jour dans le stockage local
        localStorage.setItem(data, JSON.stringify(task));

        ev.target.appendChild(droppedElement);
    }
}