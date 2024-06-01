// Grab elements from the HTML document
const ballArea = document.querySelector('.ball-area');
const score = document.querySelector('.score');

let thresholdX = 20.5;
let scoreCount = 0;

// Initial setting of ball position
let initialBallPositionX = 1;
let initialBallPositionY = 8;

// Create a class for the bar
class Bar {
    constructor(width, height, left, right) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.right = right;
        this.element = document.createElement('div');
        this.element.setAttribute('class', 'bar');
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.left = left + 'em';
        this.element.style.right = right + 'em';
        ballArea.appendChild(this.element);
    }
}

const topBar = new Bar(10, 270, "", 1);
const rightBar = new Bar(350, 10, 1, "");

// Create a class for the balls
class Ball {
    constructor(left, right, top, bottom) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
        this.element = document.createElement('div');
        this.element.setAttribute('class', 'ball');
        this.element.style.left = left + "em";
        this.element.style.right = right + "em";
        this.element.style.top = top + "em";
        this.element.style.bottom = bottom + "em";
        ballArea.appendChild(this.element);
    }

    moveBall() {
        this.myInterval = setInterval(() => {
            const currentBallPositionX = parseFloat(this.element.style.left);
            if (currentBallPositionX < thresholdX) {
                this.element.style.left = currentBallPositionX + 0.5 + "em";
            } else {
                this.resetBall();
            }
        }, 100);
    }

    moveBallRed() {
        this.myInterval = setInterval(() => {
            const redBallPosition = parseFloat(this.element.style.bottom);
            if (redBallPosition < 15) {
                this.element.style.bottom = redBallPosition + 0.5 + "em";
            } else {
                this.element.style.bottom = 1 + 'em';
            }
        }, 100);
    }

    resetBall() {
        this.element.style.left = initialBallPositionX + "em";
        scoreCount++;
        score.textContent = 'Score: ' + scoreCount;
    }

    static intersectBalls(ball1, ball2) {
        const rect1 = ball1.element.getBoundingClientRect();
        const rect2 = ball2.element.getBoundingClientRect();

        return !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
    }

    static changeColorOnIntersection(ball1, ball2) {
        if (Ball.intersectBalls(ball1, ball2)) {
            ball1.element.style.backgroundColor = "green";
            ball2.element.style.backgroundColor = "green";
        } else {
            ball1.element.style.backgroundColor = "blue";
            ball2.element.style.backgroundColor = "red";
        }
    }

    static update(ball1, ball2) {
        setInterval(() => {
            ball1.moveBall();
            ball2.moveBallRed();
            Ball.changeColorOnIntersection(ball1, ball2);
        }, 100);
    }
}

const balls = [];
balls.push(new Ball(initialBallPositionX, "", initialBallPositionY, "")); // Blue ball
balls.push(new Ball("", initialBallPositionX, initialBallPositionY + 4, "")); // Red ball

// Set the second ball to red
balls[1].element.style.backgroundColor = "red";

// Start the ball movements and updates
Ball.update(balls[0], balls[1]);
