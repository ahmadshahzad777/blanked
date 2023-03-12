const link = document.getElementById('link');
const clean = document.getElementById('clean');
const cleanit = document.getElementById('cleanit');

clean.addEventListener('submit', (e) => {
    e.preventDefault();
});

cleanit.addEventListener('click', (e) => {
    e.preventDefault();
    if (isValidUrl(link.value)) {
        alert('GG');
    } else {
        alert(
            'Please enter a valid URL of the format: http(s)://(www.)example.com',
        );
    }
});

// https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url
const isValidUrl = (urlString) => {
    var inputElement = document.createElement('input');
    inputElement.type = 'url';
    inputElement.value = urlString;

    if (!inputElement.checkValidity()) {
        return false;
    } else {
        return true;
    }
};
