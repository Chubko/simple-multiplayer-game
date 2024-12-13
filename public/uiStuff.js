//set height and width of canvas = window
let wHeight = window.innerHeight;
let wWidth = window.innerWidth;

const canvas = document.querySelector('#the-canvas');
const context = canvas.getContext('2d');
canvas.height = wHeight;
canvas.width = wWidth;
const player = {};
let orbs = []; //this is the global for all non-player orbs
let players = []; //this is an array of all players

const loginModal = new bootstrap.Modal(document.querySelector('#loginModal'));
const spawnModal = new bootstrap.Modal(document.querySelector('#spawnModal'));

window.addEventListener('load', () => {
    //on page load open the login modal
    loginModal.show();
});

document.querySelector('.name-form').addEventListener('submit', e => {
    e.preventDefault();

    player.name = document.querySelector('#name-input').value;
    document.querySelector('.player-name').innerHTML = player.name;

    loginModal.hide();
    spawnModal.show();
});

document.querySelector('.start-game').addEventListener('click', e => {
    spawnModal.hide();

    const elArray = Array.from(document.querySelectorAll('.hiddenOnStart'));
    elArray.forEach(el => el.removeAttribute('hidden'));
    init();//init is iniside of socketStuff.js
});




