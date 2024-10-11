// Tab Switching Logic
document.getElementById('htmlTab').addEventListener('click', () => {
    switchTab('html');
});

document.getElementById('cssTab').addEventListener('click', () => {
    switchTab('css');
});

document.getElementById('jsTab').addEventListener('click', () => {
    switchTab('js');
});

function switchTab(tab) {
    document.getElementById('htmlEditor').classList.add('hidden');
    document.getElementById('cssEditor').classList.add('hidden');
    document.getElementById('jsEditor').classList.add('hidden');

    document.getElementById(`${tab}Editor`).classList.remove('hidden');

    document.getElementById('htmlTab').classList.remove('active');
    document.getElementById('cssTab').classList.remove('active');
    document.getElementById('jsTab').classList.remove('active');

    document.getElementById(`${tab}Tab`).classList.add('active');
}

// Load saved files on page load
document.addEventListener('DOMContentLoaded', loadFileList);

// Save the current file
document.getElementById('saveFileBtn').addEventListener('click', () => {
    const fileName = prompt('Enter a name for your project:');
    if (fileName) {
        const fileData = {
            html: document.getElementById('htmlEditor').value,
            css: document.getElementById('cssEditor').value,
            js: document.getElementById('jsEditor').value
        };
        localStorage.setItem(fileName, JSON.stringify(fileData));
        alert('Project saved successfully!');
        loadFileList(); // Refresh the file list
    }
});

// Delete selected file
document.getElementById('deleteFileBtn').addEventListener('click', () => {
    const selectedFile = document.getElementById('savedFilesList').value;
    if (selectedFile !== "Select saved project" && confirm(`Delete project '${selectedFile}'?`)) {
        localStorage.removeItem(selectedFile);
        alert('Project deleted successfully!');
        loadFileList(); // Refresh the file list
    }
});

// Run the code
document.getElementById('runBtn').addEventListener('click', () => {
    const html = document.getElementById('htmlEditor').value;
    const css = document.getElementById('cssEditor').value;
    const js = document.getElementById('jsEditor').value;

    const outputFrame = document.getElementById('outputFrame');
    const output = outputFrame.contentDocument || outputFrame.contentWindow.document;
    output.open();
    output.write(html + `<style>${css}</style>` + `<script>${js}<\/script>`);
    output.close();
});

// Load the file list from local storage
function loadFileList() {
    const fileList = document.getElementById('savedFilesList');
    fileList.innerHTML = '<option>Select saved project</option>'; // Reset options

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = key;
            fileList.appendChild(option);
        }
    }
}

// Load the selected file
document.getElementById('savedFilesList').addEventListener('change', (event) => {
    const selectedFile = event.target.value;
    if (selectedFile !== "Select saved project") {
        const fileData = JSON.parse(localStorage.getItem(selectedFile));
        document.getElementById('htmlEditor').value = fileData.html;
        document.getElementById('cssEditor').value = fileData.css;
        document.getElementById('jsEditor').value = fileData.js;
    }
});

// Resizable Editor Logic
const resizer = document.querySelector('.resizer');
const editorSection = document.querySelector('.editor-section');
const outputSection = document.querySelector('.output-section');

resizer.addEventListener('mousedown', (event) => {
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
});

function resize(event) {
    const newWidth = event.clientX - editorSection.getBoundingClientRect().left;
    if (newWidth > 100) { // Minimum width of 100px
        editorSection.style.width = `${newWidth}px`;
    }
}

function stopResize() {
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
}
