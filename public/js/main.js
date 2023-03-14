const link = document.getElementById('link');
const clean = document.getElementById('clean');
const cleanit = document.getElementById('cleanit');
const newlink = document.getElementById('newlink');
const thelink = document.getElementById('thelink');
const copier = document.getElementById('copy');
const closelink = document.getElementById('closelink');

clean.addEventListener('submit', (e) => {
    e.preventDefault();
});

cleanit.addEventListener('click', async (e) => {
    e.preventDefault();
    if (isValidUrl(link.value) && link.value !== '') {
        const response = await fetch('/clean', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ link: link.value }),
        });

        const data = await response.json();

        if (data.status === true) {
            thelink.innerText = `https://blanked.link/${data.alias}`;
            newlink.classList.remove('hidden');
        }
    } else {
        alert(
            'Please enter a valid URL of the format: http(s)://(www.)example.com',
        );
    }
});

copier.addEventListener('click', () => {
    navigator.clipboard.writeText(thelink.innerText);
    alert('Successfully copied the link to your clipboard.');
});

closelink.addEventListener('click', () => {
    newlink.classList.add('hidden');
    link.value = '';
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
