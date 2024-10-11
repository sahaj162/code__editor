document.getElementById('goToEditor').onclick = function () {
    window.location.href = 'editor.html';
};

document.getElementById('goToChatbot').onclick = function () {
    window.location.href = 'chatbot.html';
};
document.getElementById('toggle').addEventListener('change', function() {
    document.body.classList.toggle('dark');
});
