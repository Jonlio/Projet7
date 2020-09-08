//Inscription profil utilisateur
const imageUrl = document.querySelector("#imageUrl")
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const email = document.getElementById('email')
const password = document.getElementById('password')
const form = document.getElementById('form')

// Création du profil
form.addEventListener("submit", async (e) => {
    try {
        e.preventDefault()

        const user = { firstName: firstName.value, lastName: lastName.value, email: email.value }
        const formData = new FormData()
        formData.append('image', imageUrl.files[0])
        formData.append('user', JSON.stringify(user))
        formData.append('password', password.value)
        
        const response = await fetch('http://localhost:3000/api/user/signup', {
            method: 'POST',
            body: formData
        })     

        if (response.status == 201) {
        window.location = 'index.html';
        }
        if (response.status == 400) {
            Swal.fire({
                title: 'Format non valide!',
                text: 'Veuillez vérifier le format de vos données',
                icon: 'warning',
                confirmButtonText: 'Ok'
          })
        } 
        if (response.status == 401) {
            Swal.fire({
                title: 'Inscription impossible!',
                text: 'Adresse email déjà utilisée',
                icon: 'warning',
                confirmButtonText: 'Ok'
          })
        } 
        if (response.status == 500) {
            Swal.fire({
                title: 'Format image non valide!',
                text: 'Formats supportés: JPG/JPEG/PNG',
                icon: 'warning',
                confirmButtonText: 'Ok'
          })
        }       
    } catch (err) {
        throw new Error(err)
    }
})

