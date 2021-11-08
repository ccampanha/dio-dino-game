const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const botaoInicio = document.querySelector('.btn');
const divScore = document.querySelector('.score');
//const titulo = document.querySelector('.titulo');

let isGameOver = false;
let isJumping = false;
let position = 0;
let score = 0;
let cactusPosition = 1000;

function handleKeyUp(event) {
	if (event.keyCode === 32) {
		if (!isJumping) {
			jump();
		}
	}
}

function jump() {
	isJumping = true;

	let upInterval = setInterval(() => {
		if (position >= 150) {
			// Descendo
			clearInterval(upInterval);

			let downInterval = setInterval(() => {
				if (position <= 0) {
					clearInterval(downInterval);
					isJumping = false;
				} else {
					position -= 20;
					dino.style.bottom = position + 'px';
				}
			}, 20);
		} else {
			// Subindo
			position += 20;
			dino.style.bottom = position + 'px';
		}
	}, 20);
}

function createCactus() {
	const cactus = document.createElement('div');
	let randomTime = Math.random() * 6000 + 1000;
	cactusPosition = 1000;

	if (isGameOver) return;

	cactus.classList.add('cactus');
	background.appendChild(cactus);
	cactus.style.left = cactusPosition + 'px';

	let leftTimer = setInterval(() => {
		if (cactusPosition < -60) {
			// Saiu da tela
			clearInterval(leftTimer);
			background.removeChild(cactus);
			score = score + 10;
			divScore.innerHTML = 'Score = ' + score;
		} else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
			// Game over
			clearInterval(leftTimer);
			isGameOver = true;
			background.removeChild(cactus);

			document.body.innerHTML = '<h2 class="game-over">Game Over!</h2>';

			setTimeout(function () {
				window.location.reload(1);
			}, 2000); // carrega o inicio em 2 segundos
		} else {
			cactusPosition -= 10;
			cactus.style.left = cactusPosition + 'px';
		}
	}, 20);

	setTimeout(createCactus, randomTime);
}

function Inicio() {
	isGameOver = false;
	botaoInicio.style.visibility = 'hidden';
	createCactus();
	document.addEventListener('keyup', handleKeyUp);
	divScore.innerHTML = 'Score = ' + score;
}
