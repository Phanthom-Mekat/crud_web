document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('itemForm');
    const itemList = document.getElementById('itemList');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        fetch('http://localhost:3000/items', {  // Updated URL
            method: 'POST',
            body: new URLSearchParams(formData)
        }).then(() => {
            loadItems();
            form.reset();
        }).catch(err => console.error(err));
    });

    function loadItems() {
        fetch('http://localhost:3000/items')  // Updated URL
            .then(response => response.json())
            .then(data => {
                itemList.innerHTML = '';
                data.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = `${item.name}: ${item.description}`;
                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.onclick = () => editItem(item);
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.onclick = () => deleteItem(item.id);
                    li.appendChild(editButton);
                    li.appendChild(deleteButton);
                    itemList.appendChild(li);
                });
            }).catch(err => console.error(err));
    }

    function editItem(item) {
        const name = prompt('Enter new name', item.name);
        const description = prompt('Enter new description', item.description);
        if (name && description) {
            fetch(`http://localhost:3000/items/${item.id}`, {  // Updated URL
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description })
            }).then(() => loadItems()).catch(err => console.error(err));
        }
    }

    function deleteItem(id) {
        fetch(`http://localhost:3000/items/${id}`, { method: 'DELETE' })  // Updated URL
            .then(() => loadItems())
            .catch(err => console.error(err));
    }

    loadItems();
});
