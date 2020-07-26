var convertbutton = document.querySelector('.convert-button');
var URLinput = document.querySelector('.URL-input');
convertbutton.addEventListener('click', () => {
    console.log(`URL: ${URLinput.value}`);
    sendURL(URLinput.value);
});
function sendURL(URL) {
    window.location.href = `http://localhost:4000/download?URL=${URL}`;
}