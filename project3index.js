// To-Do List Functionality
function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskList = document.getElementById('tasks');
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => taskItem.remove();
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
    taskInput.value = '';
}

// Calculator Functionality
let calcExpression = '';

function appendCalc(value) {
    calcExpression += value;
    document.getElementById('calc-display').value = calcExpression;
}

function clearCalc() {
    calcExpression = '';
    document.getElementById('calc-display').value = calcExpression;
}

function calculate() {
    try {
        calcExpression = eval(calcExpression).toString();
        document.getElementById('calc-display').value = calcExpression;
    } catch {
        calcExpression = 'Error';
        document.getElementById('calc-display').value = calcExpression;
    }
}

// Image Gallery Functionality
function uploadImage() {
    const imageInput = document.getElementById('image-upload');
    const file = imageInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            document.getElementById('gallery').appendChild(imgElement);
        };
        reader.readAsDataURL(file);
    }
}
let tasks = [];

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskDesc = document.getElementById('task-desc');
    const taskText = taskInput.value.trim();
    const descriptionText = taskDesc.value.trim();
    const priority = document.getElementById('priority').value;
    const dueDate = document.getElementById('due-date').value;

    if (taskText === '') return;

    const task = {
        text: taskText,
        description: descriptionText,
        priority: priority,
        dueDate: dueDate,
    };

    tasks.push(task);
    renderTasks();
    clearInputs();
}

function renderTasks() {
    const taskList = document.getElementById('tasks');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');

        const taskContent = document.createElement('span');
        taskContent.textContent = task.text;
        taskContent.contentEditable = "true";
        taskContent.onblur = () => editTask(index, taskContent.textContent, task.description);

        const taskDescription = document.createElement('span');
        taskDescription.className = 'description';
        taskDescription.textContent = task.description;
        taskDescription.contentEditable = "true";
        taskDescription.onblur = () => editTask(index, task.text, taskDescription.textContent);

        const taskPriority = document.createElement('span');
        taskPriority.className = 'priority';
        taskPriority.textContent = `[${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}]`;

        const taskDate = document.createElement('span');
        taskDate.className = 'date';
        taskDate.textContent = task.dueDate ? `Due: ${task.dueDate}` : '';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);

        taskItem.appendChild(taskPriority);
        taskItem.appendChild(taskContent);
        taskItem.appendChild(taskDescription);
        taskItem.appendChild(taskDate);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}

function clearInputs() {
    document.getElementById('new-task').value = '';
    document.getElementById('task-desc').value = '';
    document.getElementById('priority').value = 'low';
    document.getElementById('due-date').value = '';
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function editTask(index, newText, newDescription) {
    tasks[index].text = newText;
    tasks[index].description = newDescription;
}

function sortTasks() {
    const sortBy = document.getElementById('sort-options').value;
    if (sortBy === 'date') {
        tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortBy === 'priority') {
        const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3 };
        tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }
    renderTasks();
}
let images = [];

function previewImage() {
    const fileInput = document.getElementById('image-upload');
    const preview = document.getElementById('image-preview');
    const file = fileInput.files[0];

    const reader = new FileReader();
    reader.onloadend = function () {
        preview.src = reader.result;
        preview.style.display = 'block';
    };
    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
        preview.style.display = 'none';
    }
}

function addImage() {
    const imageInput = document.getElementById('image-upload');
    const captionInput = document.getElementById('image-caption');
    const imageFile = imageInput.files[0];
    const captionText = captionInput.value.trim();

    if (!imageFile) return;

    const reader = new FileReader();
    reader.onloadend = function () {
        const image = {
            src: reader.result,
            caption: captionText,
            date: new Date()
        };

        images.push(image);
        renderGallery();
        clearImageInputs();
    };
    reader.readAsDataURL(imageFile);
}

function renderGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    images.forEach((image, index) => {
        const imageItem = document.createElement('div');
        imageItem.className = 'gallery-item';

        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.onclick = () => openModal(image);

        const captionElement = document.createElement('div');
        captionElement.className = 'caption';
        captionElement.textContent = image.caption;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteImage(index);

        imageItem.appendChild(imgElement);
        imageItem.appendChild(captionElement);
        imageItem.appendChild(deleteButton);

        gallery.appendChild(imageItem);
    });
}

function clearImageInputs() {
    document.getElementById('image-upload').value = '';
    document.getElementById('image-caption').value = '';
    document.getElementById('image-preview').src = '';
    document.getElementById('image-preview').style.display = 'none';
}

function deleteImage(index) {
    images.splice(index, 1);
    renderGallery();
}

function openModal(image) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');

    modal.style.display = 'block';
    modalImg.src = image.src;
    modalCaption.textContent = image.caption;
}

function closeModal() {
    document.getElementById('image-modal').style.display = 'none';
}

function sortImages() {
    const sortBy = document.getElementById('sort-options-gallery').value;
    if (sortBy === 'date') {
        images.sort((a, b) => b.date - a.date);
    } else if (sortBy === 'caption') {
        images.sort((a, b) => a.caption.localeCompare(b.caption));
    }
    renderGallery();
}
