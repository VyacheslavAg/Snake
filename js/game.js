const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/ground.png"

const foodImg = new Image();
foodImg.src = "img/mouse.png"

const biscuitImg = new Image();
biscuitImg.src = "img/biscuit.png"

const cakeImg = new Image();
cakeImg.src = "img/cake.png"

const chocolateImg = new Image();
chocolateImg.src = "img/chocolate.png"
/*
var snakeSound = new Audio();
snakeSound.preload = 'auto';
snakeSound.src = "audio/snakeSound.m4a";
*/
/*
var snakeBadSound = new Audio();
snakeBadSound.preload = 'auto';
snakeBadSound.src = "audio/snakeBadSound.m4a";*/
/*
var snakeBadSound = new Audio();
snakeBadSound.preload = 'auto';
snakeBadSound.src = "audio/Monica.m4a";*/

var snakeSound = new Audio();
snakeSound.preload = 'auto';
snakeSound.src = "audio/NyamNyam.m4a";

var snakeBadSound = new Audio();
snakeBadSound.preload = 'auto';
snakeBadSound.src = "audio/Fuu.m4a";

let box = 32;

let score = 0;

let food = {
	x: Math.floor((Math.random() * 17 + 1)) * box,
	y: Math.floor((Math.random() * 3 + 3)) * box,
};

let biscuit = {
	x: Math.floor((Math.random() * 17 + 1)) * box,
	y: Math.floor((Math.random() * 7 + 3)) * box,
};

let cake = {
	x: Math.floor((Math.random() * 17 + 1)) * box,
	y: Math.floor((Math.random() * 11 + 3)) * box,
};

let chocolate = {
	x: Math.floor((Math.random() * 17 + 1)) * box,
	y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
	x: 9 * box,
	y: 10 * box
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
	if(event.keyCode == 37 && dir != "right")
		dir = "left";
	else if(event.keyCode == 38 && dir != "down")
		dir = "up";
	else if(event.keyCode == 39 && dir != "left")
		dir = "right";
	else if(event.keyCode == 40 && dir != "up")
		dir = "down";
}

function eatTail(head, arr) {
	for(let i = 0; i < arr.length; i++) {
		if(head.x == arr[i].x && head.y == arr[i].y)
			clearInterval(game);
	}
}

function drawGame() {
	ctx.drawImage(ground, 0, 0);

	ctx.drawImage(foodImg, food.x, food.y);
	ctx.drawImage(biscuitImg, biscuit.x, biscuit.y);
	ctx.drawImage(cakeImg, cake.x, cake.y);
	ctx.drawImage(chocolateImg, chocolate.x, chocolate.y);

	for(let i = 0; i < snake.length; i++) {
		ctx.fillStyle = i == 0 ? "green" : "red";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
	}

	ctx.fillStyle = "white";
	ctx.font = "50px Arial";
	ctx.fillText(score, box * 2.5, box * 1.7);

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if (snakeX == food.x && snakeY == food.y) {
		snakeSound.play();
		score++;
		food = {
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 15 + 3)) * box,
		};		
	} else
			snake.pop();

	if (snakeX == biscuit.x && snakeY == biscuit.y) {
		snakeBadSound.play();
		score--;
		biscuit = {
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 7 + 3)) * box,
		};
		snake.pop();
	}
	else if (snakeX == cake.x && snakeY == cake.y ) {
		snakeBadSound.play();
		score--;
		cake = {
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 11 + 3)) * box,
		};
		snake.pop();
	}
	else if (snakeX == chocolate.x && snakeY == chocolate.y) {
		snakeBadSound.play();
		score--;
		chocolate = {
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 15 + 3)) * box,
		};
		snake.pop();	
	}	
/*
 * Конец игры при соприкосновении с барьером
 *
	if(snakeX < box || snakeX > box * 17 
		|| snakeY < 3 * box || snakeY > box * 17)
		clearInterval(game);
*/
/*
 * При соприкосновении игра не заканчивается - координаты меняются
 */
	if(snakeX < box) {
		snakeX = 576;
	}
	else if (snakeX > box * 17) {
		snakeX = 32;
	}
	else if (snakeY < 3 * box) {
		snakeY = 576;
	}
	else if (snakeY > box * 17) {
		snakeY = 64;
	}

	if(dir == "left") snakeX -= box;
	if(dir == "right") snakeX += box;
	if(dir == "up") snakeY -= box;
	if(dir == "down") snakeY += box;

	let newHead = {
		x: snakeX,
		y: snakeY
	};

	eatTail(newHead, snake);

	snake.unshift(newHead);
}

let game = setInterval(drawGame, 100);
