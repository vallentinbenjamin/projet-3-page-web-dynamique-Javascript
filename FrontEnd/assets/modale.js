

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