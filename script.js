restoreBodyContent();
const createBtn = document.querySelector("button");
const deleteBtn = document.querySelector("i");
const textareas = document.querySelectorAll('textarea');

textareas.forEach(textarea => {
    textarea.oninput = () => {
        saveBodyContent();
    }
})

function saveBodyContent() {
    // Save the entire body content
    const bodyContent = document.body.innerHTML;
    localStorage.setItem('savedBodyContent', bodyContent);

    // Save the values of textareas
    const textareas = document.querySelectorAll('textarea');
    const textareaValues = Array.from(textareas).map(textarea => textarea.value);
    localStorage.setItem('savedTextareaValues', JSON.stringify(textareaValues));
}

function restoreBodyContent() {
    const retrievedBodyContent = localStorage.getItem('savedBodyContent');
    const retrievedTextareaValues = localStorage.getItem('savedTextareaValues');

    if (retrievedBodyContent) {
        document.body.innerHTML = retrievedBodyContent;
    }

    if (retrievedTextareaValues) {
        const textareaValues = JSON.parse(retrievedTextareaValues);
        const textareas = document.querySelectorAll('textarea');

        textareas.forEach((textarea, index) => {
            textarea.value = textareaValues[index] || '';
        });
    }
}

createBtn.onclick = () => {
    createBtn.innerHTML = '<div class="animation"><div></div><div></div><div></div></div>';

    setTimeout(() => {
        let taskBar = document.createElement("textarea");
        taskBar.setAttribute('cols', '32');
        taskBar.setAttribute('rows', '6');
        taskBar.setAttribute('placeholder', 'Add your note');

        let taskBarContainer = document.createElement("div");
        taskBarContainer.classList.add("task-area");
        taskBarContainer.appendChild(taskBar);

        let trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid", "fa-trash", "delete");
        taskBarContainer.appendChild(trashIcon);

        document.querySelector("#main").appendChild(taskBarContainer);
        createBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>Create Notes';

        saveBodyContent();
    }, 1000);
}

document.onclick = (e) => {
    let parentContainer = e.target.parentElement;
    if (e.target.classList[2] === "delete") {
        parentContainer.classList.add("removed");
    }
    saveBodyContent();
}
