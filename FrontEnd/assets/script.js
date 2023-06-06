const token = localStorage.getItem("token") 


if (token) {
    document.querySelector("#portfolio h2").insertAdjacentHTML("afterend", '<button id="myBtn">Ouvrir la modale</button>')
}

fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
        const html = document.querySelector("#portfolio .gallery")
        html.innerHTML = data.map((work) => `
            <figure data-category="${work.categoryId}">
                <img src="${work.imageUrl}" alt="${work.title}">
                <figcaption>${work.title}</figcaption>
            </figure>
        `).join("")
        const modal = document.querySelector("#myModal .gallery")
        modal.innerHTML = data.map((work) => `
            <figure data-category="${work.categoryId}">
                <img src="${work.imageUrl}" alt="${work.title}">
                <button class="delete" data-id="${work.id}">X</button>                
                <a href="editer?id=${work.id}">éditer</a>
            </figure>
        `).join("")
        deleteWork()
    })

function deleteWork() {
    const deleteButtons = document.querySelectorAll(".delete")
    deleteButtons.forEach((button)=> {
    
        button.addEventListener("click", () => {
            const workId = button.dataset.id; // remplacer par l'identifiant de l'objet à supprimer
        const url = `http://localhost:5678/api/works/${workId}`;
        
        fetch(url, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                
            }
        })
            .then(response => {
            if (!response.ok, response.ok === false) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
            })
            .then(data => {
            console.log("Object deleted:", data);
            })
            .catch(error => {
            console.error("Error deleting object:", error);
            });
        });

    })
}



function addWork() {
    
    const formulaireAjout = document.getElementById("ajout_photo")
    
    const formData = new FormData(formulaireAjout)
    
    formulaireAjout.addEventListener("submit", (event) => {
        event.preventDefault()
        console.log(formulaireAjout)
        fetch("http://localhost:5678/api/works", {
            
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`, 
            }, 
            body: formData
        })       
    })
    
}
addWork()




// Fait une requête à l'API et génère les boutons de filtre
fetch("http://localhost:5678/api/categories")
    .then(r => r.json())
    .then((data) => {
        console.log(data)
        const filtersHtml = `
            <button data-category="all" class="filter filter-all">
                Tous
            </button>
            ${data.map((category) => `
                <button class="filter" data-category="${category.id}">
                    ${category.name}
                </button>
            `).join("")}
        `;

        const filtersEl = document.querySelector(".filters");

        // Ajoute les boutons de filtre à l'élément avec la classe .filters
        filtersEl.innerHTML = filtersHtml;

         
        // Récupère tous les boutons de filtre
        const filterBtns = document.querySelectorAll(".filter");

        // Ajoute un événement "click" à chaque bouton de filtre
        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                // Supprime la classe "active" de tous les boutons de filtre
                filterBtns.forEach(btn => {
                    btn.classList.remove("active");
                });

                // Ajoute la classe "active" au bouton de filtre cliqué
                btn.classList.add("active");

                // Récupère la catégorie sélectionnée
                const category = btn.dataset.category;
        
                // Filtre les éléments en fonction de la catégorie sélectionnée
                setCategory(category);
            });
        });
    });


 

function setCategory(category) {
    // Récupère tous les éléments à filtrer
    const elements = document.querySelectorAll("#portfolio .gallery figure");

    // Affiche tous les éléments si la catégorie sélectionnée est "all"
    if (category === "all") {
        elements.forEach(element => {
            element.style.display = "block";
        });
    } else {
        // Cache tous les éléments qui n'appartiennent pas à la catégorie sélectionnée
        elements.forEach(element => {
            if (element.dataset.category !== category) {
                element.style.display = "none";
            } else {
                element.style.display = "block";
            }
        });
    }
}

// Récupération des éléments HTML 
var modal = document.getElementById("myModal"); 
var btn = document.getElementById("myBtn"); 
var span = document.getElementsByClassName("close")[0]; 
// Ouvrir la modale lorsqu'on clique sur le bouton 
btn.onclick = function() { modal.style.display = "block"; 
} 
// Fermer la modale lorsqu'on clique sur la croix ou la zone ombrée 
span.onclick = function() { 
    modal.style.display = "none"; 
} 
window.onclick = function(event) 
{ if (event.target == modal) 
    { modal.style.display = "none"; 
} }


// Ouvrir la modale d'ajout de photo lors du clic sur le bouton
const btnAjoutPhoto = document.getElementById("ajoutPhoto") 

btnAjoutPhoto.addEventListener("click", function() {
    
    document.getElementById("ajout_photo").style.display = "block";
    document.querySelector(".gallery").style.display = "none";
    addWork()
  });
//   pour le bouton retour
 
document.getElementById("laflecheretour").addEventListener("click", function() {
    document.getElementById("ajout_photo").style.display = "none";
    document.querySelector(".gallery").style.display = "block";
});


// Masquer les éléments du formulaire par défaut
var formElements = document.getElementById("ajout_photo").elements;
var formElementsArray = Array.from(formElements);
formElementsArray.forEach(function(element) {
  element.style.display = "none";
});

// Gérer le clic sur le bouton "Ajouter Photo"
document.getElementById("ajoutPhoto").addEventListener("click", function() {
  // Afficher les éléments du formulaire
  formElementsArray.forEach(function(element) {
    element.style.display = "block";
  });
});

// Masquer le formulaire "ajout_photo" par défaut
document.getElementById("ajout_photo").style.display = "none";

// Gérer le clic sur le bouton "Ajouter Photo"
document.getElementById("ajoutPhoto").addEventListener("click", function() {
    // Afficher le formulaire "ajout_photo"
    document.getElementById("ajout_photo").style.display = "block";
});


// Récupération des éléments HTML
var modal = document.getElementById("myModal");
var closeButton = document.getElementsByClassName("close")[0];
var gallery = document.querySelector(".gallery");
var form = document.getElementById("ajout_photo");

// Masquer les éléments du formulaire par défaut
form.style.display = "none";

// Ouvrir la modale lorsqu'on clique sur les éléments correspondants
gallery.addEventListener("click", function() {
    modal.style.display = "block";
});

// Fermer la modale lorsqu'on clique sur la croix
closeButton.addEventListener("click", function() {
    modal.style.display = "none";
});

// Gérer le clic sur le bouton "Ajouter Photo"
document.getElementById("ajoutPhoto").addEventListener("click", function() {
    // Afficher les éléments du formulaire et masquer la galerie
    form.style.display = "block";
    gallery.style.display = "none";
});

// Gérer le clic sur le bouton "Retour"
document.getElementById("laflecheretour").addEventListener("click", function() {
    // Afficher la galerie et masquer le formulaire
    form.style.display = "none";
    gallery.style.display = "block";
});
