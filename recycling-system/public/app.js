let forumPosts = [];

// Manejar el registro de usuarios
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    if (response.ok) {
        document.getElementById('registerMessage').textContent = 'Registro exitoso.';
    } else {
        document.getElementById('registerMessage').textContent = 'Error en el registro: ' + result.message;
    }

    document.getElementById('registerForm').reset();
});

// Manejar el inicio de sesión
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    if (response.ok) {
        document.getElementById('loginMessage').textContent = 'Inicio de sesión exitoso.';
        document.getElementById('authenticatedSection').style.display = 'block';
        document.getElementById('userEmail').textContent = `Usuario: ${email}`;
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('registerSection').style.display = 'none';
    } else {
        document.getElementById('loginMessage').textContent = 'Error en el inicio de sesión: ' + result.message;
    }

    document.getElementById('loginForm').reset();
});

// Manejar las publicaciones en el foro
document.getElementById('forumPostForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const content = document.getElementById('postContent').value;
    const response = await fetch('/api/forum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
    });

    if (response.ok) {
        loadForumPosts();
    }

    document.getElementById('forumPostForm').reset();
});

// Cargar publicaciones en el foro
async function loadForumPosts() {
    const response = await fetch('/api/forum');
    const posts = await response.json();

    const postsList = document.getElementById('forumPosts');
    postsList.innerHTML = '';

    posts.forEach((post, index) => {
        const li = document.createElement('li');
        li.textContent = post.content;

        // Botón de editar
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => editPost(index);

        // Botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => deletePost(index);

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        postsList.appendChild(li);
    });
}

function editPost(index) {
    const newContent = prompt("Editar comentario:", forumPosts[index].content);
    if (newContent) {
        forumPosts[index].content = newContent; // Editar en el array local
        loadForumPosts(); // Recargar la lista
    }
}

function deletePost(index) {
    if (confirm("¿Estás seguro de que deseas eliminar este comentario?")) {
        forumPosts.splice(index, 1); // Eliminar del array local
        loadForumPosts(); // Recargar la lista
    }
}

// Cerrar sesión
document.getElementById('logoutButton').addEventListener('click', () => {
    document.getElementById('authenticatedSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('registerSection').style.display = 'block';
    document.getElementById('userEmail').textContent = '';
});

// Cargar las publicaciones del foro al iniciar
loadForumPosts();
