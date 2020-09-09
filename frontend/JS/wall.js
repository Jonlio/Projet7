const content = document.getElementById('content');
const fileField = document.querySelector('input[type=file]')
const btn = document.getElementById('btn');

const url = 'http://localhost:3000/api/post';
const token = 'Bearer ' + sessionStorage.getItem('token');

// Création post
const createPost = async () => {
    btn.addEventListener('click', async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            const post = { content: content.value }
            formData.append('post', JSON.stringify(post))
            if (fileField.files[0]) {
                formData.append('image', fileField.files[0])
                const response = await fetch(url, {
                    headers: { 'Authorization': token },
                    method: 'POST',
                    body: formData
                })
                if (response.status !== 201) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: 'Format non valide!',
                        showConfirmButton: false,
                        timer: 1500
                      })
                } else {
                    window.location.reload()
                    return await response.json()
                }
            }
        } catch (err) {
            throw new Error(err)
        }
    })
}

// Récupération datas posts
const getPosts = async (url) => {
    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        return await response.json()
    } catch (err) {
        throw new Error(err)
    }
}

// Affichage des posts
const displayPosts = async () => {
    const posts = await getPosts(url);
    for (let i = posts.length - 1; i >= 0; i--) {
        const { User, content, imageUrl, id } = posts[i]
        renderPost(User, imageUrl, content, id)
    }
}

const renderPost = (User, imageUrl, postContent, postId) => {

    const section = document.getElementById('post');
    const div = document.createElement('div');
    div.classList.add("postDisplay");
    const name = document.createElement('h3');
    const link = document.createElement('a');
    const textContent = document.createElement('p');
    const img = document.createElement('img');

    name.innerHTML += User.firstName + ' à publié:';
    textContent.innerHTML += postContent;
    img.src = imageUrl;
    img.classList.add('imgPost');
    img.alt = "image du post";

    section.appendChild(div);
    div.appendChild(name)
    div.appendChild(link)
    link.appendChild(textContent)
    link.appendChild(img)
    div.appendChild(link)

    link.addEventListener('click', function (e) {
        sessionStorage.setItem('post', postId);
        document.location.href = 'post.html'
    })
}

createPost();
displayPosts();