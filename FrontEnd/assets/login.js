
const url = 'http://localhost:5678/api/users/login'; // Remplacer avec l'URL de votre API


const form = document.getElementById("formlogin")
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(e.target)
  console.log(Object.fromEntries(data));
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.fromEntries(data))
  })
  .then(response => {
    if (response.ok) {
      // Si la réponse est OK (status 200), on retourne le token
      return response.json();
    } else {
      // Si la réponse est un erreur, on lance une exception avec le message d'erreur
      throw new Error('Nom d\'utilisateur ou mot de passe incorrect.');
    }
  })
  .then(data => {
    // Utilisation du token retourné
    const token = data.token;
    console.log('token', token);
    localStorage.setItem('token', token)
    window.location.href = "/FrontEnd/index.html"
  })

  .catch(error => {
    // Gestion des erreurs
    console.error('Erreur : ', error.message);
  });
  
} )


