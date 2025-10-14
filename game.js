// Game Constants and Configuration
const CONFIG = {
    LIVES: 7,
    RECOVERY_TIME: 5,
    CHAPTERS: 22,
    PLAYER_SPEED: 4,
    OPPONENT_SPEED: 2,
    BALL_SPEED: 8
};

// Game State
let game = {
    canvas: null,
    ctx: null,
    player: null,
    opponents: [],
    ball: null,
    lives: CONFIG.LIVES,
    chapter: 1,
    recoveryTimer: CONFIG.RECOVERY_TIME,
    ballLost: false,
    gameStarted: false,
    isMobile: false,
    lastTime: 0,
    animationId: null
};

// Player Class
class Player {
    constructor(x, y, isUser = false) {
        this.x = x;
        this.y = y;
        this.radius = 25;
        this.speed = isUser ? CONFIG.PLAYER_SPEED : CONFIG.OPPONENT_SPEED;
        this.isUser = isUser;
        this.color = isUser ? '#3498db' : '#e74c3c';
        this.hasBall = isUser;
        
        // Movement states
        this.moveUp = false;
        this.moveDown = false;
        this.moveLeft = false;
        this.moveRight = false;
        
        // Animation
        this.animationFrame = 0;
        this.kicking = false;
        this.kickFrame = 0;
    }

    update() {
        this.animationFrame++;
        
        // Handle movement for user player
        if (this.isUser) {
            let moveX = 0, moveY = 0;
            
            if (this.moveUp) moveY -= 1;
            if (this.moveDown) moveY += 1;
            if (this.moveLeft) moveX -= 1;
            if (this.moveRight) moveX += 1;
            
            // Normalize diagonal movement
            if (moveX !== 0 && moveY !== 0) {
                moveX *= 0.707;
                moveY *= 0.707;
            }
            
            this.x += moveX * this.speed;
            this.y += moveY * this.speed;
        } else {
            // AI for opponents - chase ball
            if (!game.ball.possessedBy || game.ball.possessedBy === this) {
                const dx = game.ball.x - this.x;
                const dy = game.ball.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance > 10) {
                    this.x += (dx / distance) * this.speed * 0.7;
                    this.y += (dy / distance) * this.speed * 0.7;
                }
            }
        }
        
        // Boundary checks
        this.x = Math.max(this.radius, Math.min(game.canvas.width - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(game.canvas.height - this.radius, this.y));
        
        // Update ball position if player has it
        if (this.hasBall && game.ball.possessedBy === this) {
            game.ball.x = this.x + (this.isUser ? 30 : -30);
            game.ball.y = this.y;
        }
        
        // Handle kicking animation
        if (this.kicking) {
            this.kickFrame++;
            if (this.kickFrame > 10) {
                this.kicking = false;
                this.kickFrame = 0;
            }
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // Draw body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw outline for user player
        if (this.isUser) {
            ctx.strokeStyle = '#f1c40f';
            ctx.lineWidth = 3;
            ctx.stroke();
        }
        
        // Draw head
        ctx.fillStyle = '#FFDBAC';
        ctx.beginPath();
        ctx.arc(0, -8, 12, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw eyes
        ctx.fillStyle = '#2C3E50';
        ctx.beginPath();
        ctx.arc(-5, -10, 3, 0, Math.PI * 2);
        ctx.arc(5, -10, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw mouth
        ctx.strokeStyle = '#2C3E50';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, -5, 5, 0.1, Math.PI - 0.1);
        ctx.stroke();
        
        // Draw arms with animation
        const armSwing = Math.sin(this.animationFrame * 0.2) * 15;
        ctx.fillStyle = this.color;
        
        // Left arm
        ctx.save();
        ctx.rotate((armSwing * Math.PI) / 180);
        ctx.fillRect(-25, -5, 15, 8);
        ctx.restore();
        
        // Right arm
        ctx.save();
        ctx.rotate((-armSwing * Math.PI) / 180);
        ctx.fillRect(10, -5, 15, 8);
        ctx.restore();
        
        // Draw legs with animation
        const legSwing = Math.sin(this.animationFrame * 0.2) * 20;
        ctx.fillStyle = '#2C3E50';
        
        // Left leg
        ctx.save();
        ctx.rotate((legSwing * Math.PI) / 180);
        ctx.fillRect(-8, 20, 6, 25);
        ctx.restore();
        
        // Right leg
        ctx.save();
        ctx.rotate((-legSwing * Math.PI) / 180);
        ctx.fillRect(2, 20, 6, 25);
        ctx.restore();
        
        // Kicking animation
        if (this.kicking) {
            ctx.fillStyle = '#2C3E50';
            ctx.save();
            ctx.rotate((45 * Math.PI) / 180);
            ctx.fillRect(5, 15, 6, 30);
            ctx.restore();
        }
        
        // Ball possession indicator
        if (this.hasBall) {
            ctx.fillStyle = '#f1c40f';
            ctx.beginPath();
            ctx.arc(this.isUser ? 35 : -35, 0, 8, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
    }

    shoot() {
        if (this.hasBall && this.isUser) {
            // Calculate direction towards opponent's goal
            const goalX = game.canvas.width;
            const goalY = game.canvas.height / 2;
            
            const dx = goalX - this.x;
            const dy = goalY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            game.ball.speedX = (dx / distance) * CONFIG.BALL_SPEED;
            game.ball.speedY = (dy / distance) * CONFIG.BALL_SPEED;
            game.ball.possessedBy = null;
            this.hasBall = false;
            this.kicking = true;
        }
    }

    steal() {
        if (!this.hasBall && this.isUser && game.ball.possessedBy && !game.ball.possessedBy.isUser) {
            const dx = game.ball.possessedBy.x - this.x;
            const dy = game.ball.possessedBy.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 50 && Math.random() < 0.7) {
                game.ball.possessedBy.hasBall = false;
                game.ball.possessedBy = this;
                this.hasBall = true;
                game.ballLost = false;
                game.recoveryTimer = CONFIG.RECOVERY_TIME;
            }
        }
    }
}

// Ball Class
class Ball {
    constructor() {
        this.x = 100;
        this.y = game.canvas.height / 2;
        this.radius = 12;
        this.speedX = 0;
        this.speedY = 0;
        this.possessedBy = game.player;
        this.rotation = 0;
    }

    update() {
        // Apply friction
        this.speedX *= 0.98;
        this.speedY *= 0.98;
        
        // Update position
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Update rotation
        this.rotation += this.speedX * 0.1;
        
        // Boundary collision
        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.speedX *= -0.7;
        }
        if (this.x + this.radius > game.canvas.width) {
            this.x = game.canvas.width - this.radius;
            this.speedX *= -0.7;
        }
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.speedY *= -0.7;
        }
        if (this.y + this.radius > game.canvas.height) {
            this.y = game.canvas.height - this.radius;
            this.speedY *= -0.7;
        }
        
        // Stop ball if moving very slowly
        if (Math.abs(this.speedX) < 0.1) this.speedX = 0;
        if (Math.abs(this.speedY) < 0.1) this.speedY = 0;
        
        // Check for possession by opponents
        if (!this.possessedBy) {
            for (let opponent of game.opponents) {
                const dx = opponent.x - this.x;
                const dy = opponent.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 30 && Math.random() < 0.05) {
                    this.possessedBy = opponent;
                    opponent.hasBall = true;
                    this.speedX = 0;
                    this.speedY = 0;
                    
                    if (!game.ballLost) {
                        game.ballLost = true;
                        game.recoveryTimer = CONFIG.RECOVERY_TIME;
                    }
                    break;
                }
            }
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Draw ball
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw pentagon pattern
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let i = 0; i < 5; i++) {
            const angle = (i * 2 * Math.PI) / 5;
            const x = Math.cos(angle) * this.radius * 0.7;
            const y = Math.sin(angle) * this.radius * 0.7;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.stroke();
        
        ctx.restore();
    }
}

// Initialize the game
function init() {
    game.canvas = document.getElementById('gameCanvas');
    game.ctx = game.canvas.getContext('2d');
    
    // Set canvas size based on device
    setupCanvas();
    
    // Check if mobile
    game.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (game.isMobile) {
        document.getElementById('mobileControls').style.display = 'flex';
        setupMobileControls();
    } else {
        setupKeyboardControls();
    }
    
    setupEventListeners();
    resetGame();
    
    // Start game loop
    game.animationId = requestAnimationFrame(gameLoop);
}

function setupCanvas() {
    // Set canvas size to match window
    game.canvas.width = window.innerWidth;
    game.canvas.height = window.innerHeight;
}

function setupEventListeners() {
    document.getElementById('startBtn').addEventListener('click', startGame);
    document.getElementById('replayBtn').addEventListener('click', replayChapter);
    document.getElementById('nextChapterBtn').addEventListener('click', nextChapter);
    document.getElementById('restartBtn').addEventListener('click', restartGame);
    
    window.addEventListener('resize', setupCanvas);
}

function setupKeyboardControls() {
    document.addEventListener('keydown', (e) => {
        if (!game.gameStarted) return;
        
        switch(e.key) {
            case 'ArrowUp': game.player.moveUp = true; break;
            case 'ArrowDown': game.player.moveDown = true; break;
            case 'ArrowLeft': game.player.moveLeft = true; break;
            case 'ArrowRight': game.player.moveRight = true; break;
            case ' ': game.player.shoot(); break;
            case 's': game.player.steal(); break;
        }
    });
    
    document.addEventListener('keyup', (e) => {
        switch(e.key) {
            case 'ArrowUp': game.player.moveUp = false; break;
            case 'ArrowDown': game.player.moveDown = false; break;
            case 'ArrowLeft': game.player.moveLeft = false; break;
            case 'ArrowRight': game.player.moveRight = false; break;
        }
    });
}

function setupMobileControls() {
    const joystickBase = document.querySelector('.joystick-base');
    const joystickHandle = document.querySelector('.joystick-handle');
    const shootBtn = document.querySelector('.control-btn.shoot');
    const stealBtn = document.querySelector('.control-btn.steal');
    
    let joystickActive = false;
    const joystickRect = joystickBase.getBoundingClientRect();
    const joystickCenter = {
        x: joystickRect.left + joystickRect.width / 2,
        y: joystickRect.top + joystickRect.height / 2
    };
    const maxDistance = joystickRect.width / 2 - 25;
    
    // Touch events for joystick
    joystickBase.addEventListener('touchstart', handleJoystickStart);
    document.addEventListener('touchmove', handleJoystickMove);
    document.addEventListener('touchend', handleJoystickEnd);
    
    // Button events
    shootBtn.addEventListener('touchstart', () => game.player.shoot());
    stealBtn.addEventListener('touchstart', () => game.player.steal());
    
    function handleJoystickStart(e) {
        joystickActive = true;
        e.preventDefault();
    }
    
    function handleJoystickMove(e) {
        if (!joystickActive || !game.gameStarted) return;
        
        const touch = e.touches[0];
        const touchX = touch.clientX;
        const touchY = touch.clientY;
        
        const deltaX = touchX - joystickCenter.x;
        const deltaY = touchY - joystickCenter.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        const angle = Math.atan2(deltaY, deltaX);
        const limitedDistance = Math.min(distance, maxDistance);
        
        // Update joystick handle position
        joystickHandle.style.transform = `translate(calc(-50% + ${Math.cos(angle) * limitedDistance}px), calc(-50% + ${Math.sin(angle) * limitedDistance}px))`;
        
        // Calculate movement direction (normalized)
        const moveX = Math.cos(angle) * (limitedDistance / maxDistance);
        const moveY = Math.sin(angle) * (limitedDistance / maxDistance);
        
        // Update player movement
        game.player.moveUp = moveY < -0.3;
        game.player.moveDown = moveY > 0.3;
        game.player.moveLeft = moveX < -0.3;
        game.player.moveRight = moveX > 0.3;
    }
    
    function handleJoystickEnd(e) {
        joystickActive = false;
        joystickHandle.style.transform = 'translate(-50%, -50%)';
        game.player.moveUp = game.player.moveDown = game.player.moveLeft = game.player.moveRight = false;
    }
}

function resetGame() {
    // Create player
    game.player = new Player(100, game.canvas.height / 2, true);
    
    // Create opponents based on current chapter
    game.opponents = [];
    const opponentsCount = game.chapter;
    
    // Position opponents in formation
    const rows = Math.ceil(Math.sqrt(opponentsCount));
    const cols = Math.ceil(opponentsCount / rows);
    
    for (let i = 0; i < opponentsCount; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        
        const x = game.canvas.width - 200 - col * 60;
        const y = 100 + row * 80;
        
        const opponent = new Player(x, y, false);
        
        // Make opponents slightly faster in higher chapters
        opponent.speed = CONFIG.OPPONENT_SPEED + (game.chapter * 0.1);
        
        game.opponents.push(opponent);
    }
    
    // Create ball
    game.ball = new Ball();
    
    // Reset game state
    game.lives = CONFIG.LIVES;
    game.recoveryTimer = CONFIG.RECOVERY_TIME;
    game.ballLost = false;
    
    updateLivesDisplay();
    updateChapterDisplay();
}

function startGame() {
    document.getElementById('startOverlay').style.display = 'none';
    game.gameStarted = true;
}

function replayChapter() {
    document.getElementById('winOverlay').style.display = 'none';
    resetGame();
    game.gameStarted = true;
}

function nextChapter() {
    document.getElementById('winOverlay').style.display = 'none';
    game.chapter = Math.min(game.chapter + 1, CONFIG.CHAPTERS);
    resetGame();
    game.gameStarted = true;
}

function restartGame() {
    document.getElementById('loseOverlay').style.display = 'none';
    game.chapter = 1;
    resetGame();
    game.gameStarted = true;
}

function gameLoop(timestamp) {
    const deltaTime = timestamp - game.lastTime;
    game.lastTime = timestamp;
    
    if (game.gameStarted) {
        update(deltaTime);
        render();
    }
    
    game.animationId = requestAnimationFrame(gameLoop);
}

function update(deltaTime) {
    // Update player and opponents
    game.player.update();
    game.opponents.forEach(opponent => opponent.update());
    game.ball.update();
    
    // Handle ball recovery timer
    if (game.ballLost && game.ball.possessedBy && !game.ball.possessedBy.isUser) {
        game.recoveryTimer -= deltaTime / 1000;
        document.getElementById('recoveryTimer').textContent = Math.ceil(game.recoveryTimer);
        
        if (game.recoveryTimer <= 0) {
            loseLife();
            game.recoveryTimer = CONFIG.RECOVERY_TIME;
        }
    }
    
    // Check for goals
    checkGoals();
}

function checkGoals() {
    // User scores (ball enters right side)
    if (game.ball.x > game.canvas.width - 50 && 
        game.ball.y > game.canvas.height / 2 - 100 && 
        game.ball.y < game.canvas.height / 2 + 100) {
        
        showGoalMessage();
        showWinOverlay();
        return;
    }
    
    // Opponents score (ball enters left side)
    if (game.ball.x < 50 && 
        game.ball.y > game.canvas.height / 2 - 100 && 
        game.ball.y < game.canvas.height / 2 + 100) {
        
        loseLife();
        // Reset ball position
        game.ball.x = game.canvas.width / 2;
        game.ball.y = game.canvas.height / 2;
        game.ball.speedX = game.ball.speedY = 0;
        game.ball.possessedBy = null;
    }
}

function loseLife() {
    game.lives--;
    updateLivesDisplay();
    
    if (game.lives <= 0) {
        showLoseOverlay();
    } else {
        // Reset recovery timer
        game.recoveryTimer = CONFIG.RECOVERY_TIME;
        game.ballLost = false;
    }
}

function showGoalMessage() {
    const goalMsg = document.createElement('div');
    goalMsg.className = 'goal-message';
    goalMsg.textContent = 'GOALLLL!!!!!';
    document.getElementById('gameContainer').appendChild(goalMsg);
    
    setTimeout(() => {
        goalMsg.remove();
    }, 2000);
}

function showWinOverlay() {
    document.getElementById('winOpponents').textContent = game.chapter;
    document.getElementById('winOverlay').style.display = 'flex';
    game.gameStarted = false;
}

function showLoseOverlay() {
    document.getElementById('loseChapter').textContent = game.chapter;
    document.getElementById('loseOpponents').textContent = game.chapter;
    document.getElementById('loseOverlay').style.display = 'flex';
    game.gameStarted = false;
}

function updateLivesDisplay() {
    const lives = document.querySelectorAll('.life');
    lives.forEach((life, index) => {
        if (index < game.lives) {
            life.classList.remove('lost');
        } else {
            life.classList.add('lost');
        }
    });
}

function updateChapterDisplay() {
    document.getElementById('chapterDisplay').textContent = game.chapter;
    document.getElementById('opponentsDisplay').textContent = game.chapter;
}

function render() {
    const ctx = game.ctx;
    
    // Clear canvas
    ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    
    // Draw field
    drawField(ctx);
    
    // Draw goals
    drawGoals(ctx);
    
    // Draw players and ball
    game.opponents.forEach(opponent => opponent.draw(ctx));
    game.player.draw(ctx);
    game.ball.draw(ctx);
}

function drawField(ctx) {
    // Draw grass
    ctx.fillStyle = '#27ae60';
    ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
    
    // Draw grass pattern
    ctx.strokeStyle = '#229954';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < game.canvas.width; i += 40) {
        for (let j = 0; j < game.canvas.height; j += 40) {
            ctx.beginPath();
            ctx.moveTo(i, j);
            ctx.lineTo(i + 20, j + 20);
            ctx.stroke();
        }
    }
    
    // Draw center line and circle
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    
    // Center line
    ctx.beginPath();
    ctx.moveTo(game.canvas.width / 2, 0);
    ctx.lineTo(game.canvas.width / 2, game.canvas.height);
    ctx.stroke();
    
    // Center circle
    ctx.beginPath();
    ctx.arc(game.canvas.width / 2, game.canvas.height / 2, 80, 0, Math.PI * 2);
    ctx.stroke();
}

function drawGoals(ctx) {
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    
    // Left goal (user's defense)
    ctx.strokeRect(0, game.canvas.height / 2 - 80, 30, 160);
    
    // Right goal (opponent's defense)
    ctx.strokeRect(game.canvas.width - 30, game.canvas.height / 2 - 80, 30, 160);
}

// Start the game when page loads
window.addEventListener('load', init);