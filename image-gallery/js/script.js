import createModal from "./Modal.js";
import data from "./test.js";

const baseUrl = 'https://api.unsplash.com/search/photos?client_id=_C9lYz0LEa3vmBkfjXuYqebUnR7sRFJRMX3KKYvY-Ic';

const params = (...args) => [...args].map((arg) => `&${arg[0]}=${arg[1]}`).join('');

const container = document.querySelector('.gallery-content');

//--------------
const showImg = (el, target) => {
    const elWidth = target.offsetWidth;
    const elHeight = target.offsetHeight;
    createModal(el);
    const modal = document.querySelector('.modal-inner');
    const rect = target.getBoundingClientRect();
    console.log(rect)
    modal.style.cssText = `
        scale: 0.5;

        `;
    setTimeout(() => {
        modal.classList.add('animate')
        modal.style.cssText = `
        `
    }, 100);
};
//-----------
let pageCounter = 1; //счетчик страниц
let imgesPerPage = 28;
let totalPages = null;
let query = 'halloween';
let rateLimit = 50;
let rateLimitRemaning = rateLimit;

let url = `${baseUrl}${params(['page', pageCounter], ['per_page', imgesPerPage], ['query', query], ['orientation', 'landscape'])}`;

const ShowMoreBtn = document.querySelector('[data-show-more]');
const hideShowMoreBtn = (button) => {
    if ((pageCounter + 1) > totalPages) {
        button.classList.remove('shown');
    } else {
        button.classList.add('shown');
    };
};

const rateLimitHtml = document.querySelector('[data-ratelimit');
const rateLimitRemaningHtml = document.querySelector('[data-ratelimit-remaining');
const updateLimits = () => {
    rateLimitHtml.textContent = rateLimit;
    rateLimitRemaningHtml.textContent = rateLimitRemaning;
};
updateLimits();

async function getData(url) {
    const res = await fetch(url);
    rateLimitRemaning = Array.from(res.headers).reduce((acc, item) => item[0] === 'x-ratelimit-remaining' ? item[1] : acc, null);
    const data = await res.json();
    
    totalPages = Math.floor(Number(data.total) / imgesPerPage);

    hideShowMoreBtn(ShowMoreBtn);
    updateLimits();

    const links = data.results.map(el => {
        const img = document.createElement('img');
        const link = document.createElement('a');
        const path = el.urls.regular;
        link.setAttribute('href', `${path}`);
        img.setAttribute('src', `${el.urls.small}`);
        img.classList.add('img');
        img.setAttribute('alt', el.alt_description);
        img.setAttribute('title', el.description);
        link.append(img);
        link.addEventListener('click', (event) => {
            event.preventDefault();
            showImg(el, event.target);
        });
        return link;     
    });
    console.log(links)
    if (pageCounter === 1) {
        container.replaceChildren(...links);
    } else {
        container.append(...links);        
    }
};

getData(url);

const form = document.querySelector('form');

form.focus();
const input = document.querySelector('input');
const iconClose = document.querySelector('[data-icon-close]');
const iconLoop = document.querySelector('[data-icon-loop]');
input.addEventListener('input', (event) => {
    if(input.value !== '') {
        iconClose.classList.add('shown');
        iconLoop.classList.remove('shown');
    } else {
        iconClose.classList.remove('shown');
        iconLoop.classList.add('shown');
    }
});

iconClose.addEventListener('click', () => {
    form.reset();
    iconClose.classList.remove('shown');
    iconLoop.classList.add('shown');
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    query = formData.get('input');
    console.log(query);
    pageCounter = 1;
    url = `${baseUrl}${params(['page', pageCounter], ['per_page', imgesPerPage], ['query', query], ['orientation', 'landscape'])}`;
    console.log(url);
    getData(url);
    ShowMoreBtn.classList.add('shown');
});

ShowMoreBtn.addEventListener('click', () => {
    console.log('click')
    pageCounter = 10;
    url = `${baseUrl}${params(['page', pageCounter], ['per_page', imgesPerPage], ['query', query], ['orientation', 'landscape'])}`;
    getData(url);
    console.log('counter:', pageCounter);
    console.log('counter:', url);
});



// `https://api.unsplash.com/search/photos?page=5&per_page=30&query=${inputValue}&client_id=${API_KEY}`
// landscape, portrait, and squarish