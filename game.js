// Enhanced Football Game with Obstacle Course and Lives System

// First, let's update the canvas to be responsive
const canvas = document.getElementById('gameCanvas');
if (canvas) {
    // Set a larger base size for better gameplay
    canvas.width = 1200;
    canvas.height = 800;
    
    // Make canvas responsive
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.maxWidth = '100vw';
    canvas.style.maxHeight = '100vh';
    canvas.style.objectFit = 'contain';
}

// Enhanced Football Clubs Data
const footballClubs = [
    {
        id: 1,
        name: "Red Dragons FC",
        shortName: "Dragons",
        color: "#e74c3c",
        secondaryColor: "#c0392b",
        logo: "🐉",
        formation: "4-4-2",
        playStyle: "attacking"
    },
    {
        id: 2,
        name: "Blue Eagles United",
        shortName: "Eagles",
        color: "#3498db",
        secondaryColor: "#2980b9",
        logo: "🦅",
        formation: "4-3-3",
        playStyle: "balanced"
    }
];

// NEW: Obstacle Course Formations for opposing team
const obstacleFormations = {
    'defensive_wall': {
        name: 'Defensive Wall',
        description: 'Solid defensive line formation',
        positions: {
            'DEF1': { x: 800, y: 200 },
            'DEF2': { x: 800, y: 300 },
            'DEF3': { x: 800, y: 400 },
            'DEF4': { x: 800, y: 500 },
            'DEF5': { x: 800, y: 600 },
            'MID1': { x: 600, y: 250 },
            'MID2': { x: 600, y: 400 },
            'MID3': { x: 600, y: 550 },
            'ATT1': { x: 400, y: 350 },
            'ATT2': { x: 400, y: 450 }
        }
    },
    'diamond_block': {
        name: 'Diamond Block',
        description: 'Diamond-shaped defensive formation',
        positions: {
            'DEF1': { x: 700, y: 400 },
            'DEF2': { x: 800, y: 300 },
            'DEF3': { x: 800, y: 500 },
            'DEF4': { x: 900, y: 200 },
            'DEF5': { x: 900, y: 600 },
            'MID1': { x: 600, y: 400 },
            'MID2': { x: 500, y: 300 },
            'MID3': { x: 500, y: 500 },
            'ATT1': { x: 300, y: 400 }
        }
    },
    'zigzag_defense': {
        name: 'Zigzag Defense',
        description: 'Staggered defensive line',
        positions: {
            'DEF1': { x: 850, y: 150 },
            'DEF2': { x: 750, y: 250 },
            'DEF3': { x: 850, y: 350 },
            'DEF4': { x: 750, y: 450 },
            'DEF5': { x: 850, y: 550 },
            'DEF6': { x: 750, y: 650 },
            'MID1': { x: 550, y: 200 },
            'MID2': { x: 450, y: 400 },
            'MID3': { x: 550, y: 600 }
        }
    },
    'pyramid_formation': {
        name: 'Pyramid Formation',
        description: 'Concentrated central defense',
        positions: {
            'DEF1': { x: 900, y: 400 },
            'DEF2': { x: 800, y: 300 },
            'DEF3': { x: 800, y: 500 },
            'DEF4': { x: 700, y: 200 },
            'DEF5': { x: 700, y: 400 },
            'DEF6': { x: 700, y: 600 },
            'MID1': { x: 600, y: 400 },
            'MID2': { x: 500, y: 300 },
            'MID3': { x: 500, y: 500 }
        }
    }
};

// Game Mode Selection
let selectedGameMode = 'obstacle-course';
let selectedObstacleFormation = 'defensive_wall';

// Enhanced Real Football Players Database
const footballPlayers = [
    { id: 1, name: "Lionel Messi", position: "RW", rating: 93, team: "Inter Miami", speed: 85, shooting: 92, passing: 91 },
    { id: 2, name: "Cristiano Ronaldo", position: "ST", rating: 92, team: "Al Nassr", speed: 87, shooting: 94, passing: 82 },
    { id: 3, name: "Kylian Mbappé", position: "ST", rating: 91, team: "Paris Saint-Germain", speed: 96, shooting: 89, passing: 80 },
    { id: 4, name: "Kevin De Bruyne", position: "CAM", rating: 91, team: "Manchester City", speed: 76, shooting: 86, passing: 94 },
    { id: 5, name: "Erling Haaland", position: "ST", rating: 91, team: "Manchester City", speed: 89, shooting: 94, passing: 65 }
];

// NEW: Power-ups system
const powerUps = [
    {
        id: 1,
        name: "Speed Boost",
        type: "speed",
        color: "#FF6B6B",
        duration: 300,
        effect: { speed: 2.0 }
    },
    {
        id: 2,
        name: "Super Pass",
        type: "passing",
        color: "#4ECDC4",
        duration: 180,
        effect: { passing: 1.5 }
    },
    {
        id: 3,
        name: "Magnetic Ball",
        type: "control",
        color: "#45B7D1",
        duration: 240,
        effect: { control: 2.0 }
    },
    {
        id: 4,
        name: "Shield",
        type: "shield",
        color: "#96CEB4",
        duration: 200,
        effect: { invulnerable: true }
    }
];

// NEW: ObstaclePlayer class for opposing team
class ObstaclePlayer {
    constructor(config) {
        this.x = config.x;
        this.y = config.y;
        this.color = config.color;
        this.secondaryColor = config.secondaryColor;
        this.radius = 20;
        this.speed = 2;
        this.aggression = config.aggression || 0.7;
        this.tacklingSkill = config.tacklingSkill || 0.6;
        this.vision = config.vision || 0.5;
        this.animationFrame = 0;
        this.hasBall = false;
        this.isObstacle = true;
        this.patrolPoints = this.generatePatrolPoints();
        this.currentPatrolIndex = 0;
        this.patrolSpeed = 0.5 + Math.random() * 1;
        this.defensiveRadius = 120;
    }

    generatePatrolPoints() {
        const points = [];
        const baseX = this.x;
        const baseY = this.y;
        
        // Create small patrol area around initial position
        for (let i = 0; i < 4; i++) {
            points.push({
                x: baseX + (Math.random() - 0.5) * 100,
                y: baseY + (Math.random() - 0.5) * 80
            });
        }
        return points;
    }

    update(ball, game) {
        this.animationFrame++;

        // Patrol behavior when ball is far
        const ballDistance = Math.sqrt((ball.x - this.x) ** 2 + (ball.y - this.y) ** 2);
        
        if (ballDistance > this.defensiveRadius) {
            this.patrolBehavior();
        } else {
            this.defensiveBehavior(ball, game);
        }

        // Boundary checks
        this.x = Math.max(this.radius, Math.min(1200 - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(800 - this.radius, this.y));
    }

    patrolBehavior() {
        const target = this.patrolPoints[this.currentPatrolIndex];
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 10) {
            this.currentPatrolIndex = (this.currentPatrolIndex + 1) % this.patrolPoints.length;
        } else {
            this.x += (dx / distance) * this.patrolSpeed;
            this.y += (dy / distance) * this.patrolSpeed;
        }
    }

    defensiveBehavior(ball, game) {
        // Move towards ball but maintain defensive position
        const dx = ball.x - this.x;
        const dy = ball.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 40 && !ball.possessedBy && Math.random() < this.tacklingSkill * 0.1) {
            // Attempt to take possession
            ball.possessedBy = this;
            this.hasBall = true;
            ball.speedX = 0;
            ball.speedY = 0;
        } else if (distance < 80) {
            // Move to intercept
            const interceptX = ball.x + ball.speedX * 2;
            const interceptY = ball.y + ball.speedY * 2;
            const interceptDx = interceptX - this.x;
            const interceptDy = interceptY - this.y;
            const interceptDist = Math.sqrt(interceptDx * interceptDx + interceptDy * interceptDy);

            if (interceptDist > 5) {
                this.x += (interceptDx / interceptDist) * this.speed * 0.7;
                this.y += (interceptDy / interceptDist) * this.speed * 0.7;
            }
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        // Obstacle player appearance (more intimidating)
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Pattern to distinguish from user players
        ctx.strokeStyle = this.secondaryColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-this.radius, 0);
        ctx.lineTo(this.radius, 0);
        ctx.moveTo(0, -this.radius);
        ctx.lineTo(0, this.radius);
        ctx.stroke();

        // Aggression indicator
        ctx.fillStyle = this.aggression > 0.8 ? '#FF0000' : '#FFA500';
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fill();

        // Vision radius indicator (subtle)
        if (this.animationFrame % 60 < 30) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.arc(0, 0, this.defensiveRadius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        ctx.restore();
    }
}

// NEW: PowerUp class
class PowerUp {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.radius = 15;
        this.active = true;
        this.animationFrame = 0;
        this.powerUpData = powerUps.find(p => p.type === type);
        this.collected = false;
    }

    update() {
        this.animationFrame++;
    }

    draw(ctx) {
        if (!this.active) return;

        ctx.save();
        ctx.translate(this.x, this.y);

        // Pulsating effect
        const scale = 1 + Math.sin(this.animationFrame * 0.1) * 0.2;
        ctx.scale(scale, scale);

        ctx.fillStyle = this.powerUpData.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Inner glow
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(0, 0, this.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();

        // Symbol based on type
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        let symbol = '?';
        switch(this.type) {
            case 'speed': symbol = '⚡'; break;
            case 'passing': symbol = '🎯'; break;
            case 'control': symbol = '🧲'; break;
            case 'shield': symbol = '🛡️'; break;
        }
        
        ctx.fillText(symbol, 0, 0);

        ctx.restore();
    }

    collect(player) {
        this.active = false;
        this.collected = true;
        return this.powerUpData;
    }
}

// Enhanced FootballBall class
class FootballBall {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 15;
        this.speedX = 0;
        this.speedY = 0;
        this.friction = 0.98;
        this.rotation = 0;
        this.spin = 0;
        this.possessedBy = null;
        this.lastTouchedBy = null;
    }

    update() {
        this.speedX *= this.friction;
        this.speedY *= this.friction;
        
        this.x += this.speedX;
        this.y += this.speedY;
        
        this.rotation += this.speedX * 0.1;
        this.spin += this.speedY * 0.1;

        // Boundaries
        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.speedX *= -0.7;
        }
        if (this.x + this.radius > 1200) {
            this.x = 1200 - this.radius;
            this.speedX *= -0.7;
        }
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.speedY *= -0.7;
        }
        if (this.y + this.radius > 800) {
            this.y = 800 - this.radius;
            this.speedY *= -0.7;
        }

        if (Math.abs(this.speedX) < 0.1) this.speedX = 0;
        if (Math.abs(this.speedY) < 0.1) this.speedY = 0;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#000000';
        ctx.fillStyle = '#000000';
        ctx.lineWidth = 2;
        
        // Modern football ball pattern
        ctx.beginPath();
        ctx.moveTo(0, -this.radius);
        ctx.lineTo(this.radius * 0.7, -this.radius * 0.3);
        ctx.lineTo(this.radius * 0.5, this.radius * 0.7);
        ctx.lineTo(-this.radius * 0.5, this.radius * 0.7);
        ctx.lineTo(-this.radius * 0.7, -this.radius * 0.3);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    }
}

// NEW: Main Game Class for Obstacle Course Mode
class ObstacleCourseGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        if (!this.canvas) {
            console.error('Canvas element not found!');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.fieldWidth = this.canvas.width;
        this.fieldHeight = this.canvas.height;
        
        this.userTeam = null;
        this.opponentTeam = null;
        this.ball = null;
        this.userPlayers = [];
        this.obstaclePlayers = [];
        this.powerUps = [];
        this.userControlledPlayer = null;
        
        // NEW: Lives system
        this.lives = 5;
        this.score = 0;
        this.level = 1;
        this.maxLevel = 5;
        
        // Game state
        this.gameStarted = false;
        this.gameOver = false;
        this.levelComplete = false;
        this.celebrationTime = 0;
        
        // Power-up system
        this.activePowerUps = [];
        this.powerUpSpawnTimer = 0;
        
        // Controls
        this.isMobile = this.detectMobile();
        this.touchControls = null;
        this.keyboardControls = null;
        
        this.setupGame();
        this.startGame();
    }

    setupGame() {
        this.setupField();
        this.loadTeams();
        this.setupLevel(this.level);
        this.setupControls();
    }

    setupField() {
        this.field = {
            width: this.fieldWidth,
            height: this.fieldHeight,
            center: { x: this.fieldWidth / 2, y: this.fieldHeight / 2 },
            goalWidth: 120,
            goalHeight: 40
        };
    }

    loadTeams() {
        this.userTeam = footballClubs[0];
        this.opponentTeam = footballClubs[1];
    }

    setupLevel(level) {
        // Clear previous level
        this.userPlayers = [];
        this.obstaclePlayers = [];
        this.powerUps = [];
        this.activePowerUps = [];
        
        // Setup user team (smaller team for challenge)
        this.setupUserPlayers();
        
        // Setup obstacle players based on level
        this.setupObstaclePlayers(level);
        
        // Setup ball
        this.ball = new FootballBall(200, 400);
        
        // Setup power-ups
        this.setupPowerUps(level);
        
        // Reset level state
        this.levelComplete = false;
        this.celebrationTime = 0;
    }

    setupUserPlayers() {
        // User has fewer players for challenge (3 players + GK)
        const userFormation = [
            { position: 'GK', x: 100, y: 400 },
            { position: 'DEF', x: 250, y: 400 },
            { position: 'MID', x: 400, y: 300 },
            { position: 'MID', x: 400, y: 500 },
            { position: 'ATT', x: 550, y: 400 }
        ];

        userFormation.forEach((pos, index) => {
            const playerData = footballPlayers[index] || {
                name: `Player ${index + 1}`,
                speed: 70 + Math.random() * 20,
                shooting: 60 + Math.random() * 30,
                passing: 60 + Math.random() * 30
            };

            const player = new AnimatedPlayer({
                x: pos.x,
                y: pos.y,
                color: this.userTeam.color,
                secondaryColor: this.userTeam.secondaryColor,
                number: index + 1,
                position: pos.position,
                isHomeTeam: true,
                teamName: this.userTeam.name,
                isUserControlled: index === 4, // Control the attacker initially
                isCurrentUserControlled: index === 4,
                playerData: playerData
            });

            this.userPlayers.push(player);
            
            if (index === 4) {
                this.userControlledPlayer = player;
            }
        });
    }

    setupObstaclePlayers(level) {
        const formation = obstacleFormations[selectedObstacleFormation];
        const aggressionMultiplier = 0.5 + (level * 0.1);
        const speedMultiplier = 0.8 + (level * 0.15);

        Object.entries(formation.positions).forEach(([position, pos], index) => {
            const obstacle = new ObstaclePlayer({
                x: pos.x,
                y: pos.y,
                color: this.opponentTeam.color,
                secondaryColor: this.opponentTeam.secondaryColor,
                aggression: Math.min(0.9, 0.3 + (Math.random() * 0.6 * aggressionMultiplier)),
                tacklingSkill: Math.min(0.8, 0.2 + (Math.random() * 0.5 * aggressionMultiplier)),
                speed: 1.5 * speedMultiplier
            });

            this.obstaclePlayers.push(obstacle);
        });
    }

    setupPowerUps(level) {
        // Spawn power-ups based on level
        const powerUpCount = 2 + Math.floor(level / 2);
        
        for (let i = 0; i < powerUpCount; i++) {
            const type = powerUps[Math.floor(Math.random() * powerUps.length)].type;
            const x = 300 + Math.random() * 600;
            const y = 100 + Math.random() * 600;
            this.powerUps.push(new PowerUp(x, y, type));
        }
    }

    setupControls() {
        if (this.isMobile) {
            this.touchControls = new TouchControls(this.canvas, this);
        } else {
            this.keyboardControls = new KeyboardControls(this);
        }
    }

    startGame() {
        this.gameStarted = true;
        this.startGameLoop();
        this.updateUI();
    }

    startGameLoop() {
        const gameLoop = () => {
            if (this.gameStarted && !this.gameOver) {
                this.update();
                this.render();
                this.updateUI();
            }
            requestAnimationFrame(gameLoop);
        };
        gameLoop();
    }

    update() {
        if (this.levelComplete) {
            this.celebrationTime--;
            if (this.celebrationTime <= 0) {
                this.nextLevel();
            }
            return;
        }

        // Get user input
        let userInput;
        if (this.isMobile) {
            userInput = this.touchControls.getUserInput();
        } else {
            userInput = this.keyboardControls.getUserInput();
        }

        // Update user players
        this.userPlayers.forEach(player => {
            if (player.isCurrentUserControlled) {
                player.update(this.ball, userInput, this);
            } else {
                player.update(this.ball, null, this);
            }
        });

        // Update obstacle players
        this.obstaclePlayers.forEach(obstacle => {
            obstacle.update(this.ball, this);
        });

        // Update ball
        this.ball.update();

        // Update power-ups
        this.powerUps.forEach(powerUp => {
            powerUp.update();
            this.checkPowerUpCollision(powerUp);
        });

        // Spawn new power-ups periodically
        this.powerUpSpawnTimer++;
        if (this.powerUpSpawnTimer > 600 && this.powerUps.length < 3) {
            this.spawnRandomPowerUp();
            this.powerUpSpawnTimer = 0;
        }

        // Update active power-ups
        this.updateActivePowerUps();

        // Check ball possession
        this.checkBallPossession();

        // Check for goals
        this.checkGoals();

        // Check for life loss conditions
        this.checkLifeLoss();

        // Check for level completion
        this.checkLevelCompletion();
    }

    checkPowerUpCollision(powerUp) {
        if (!powerUp.active) return;

        this.userPlayers.forEach(player => {
            const dx = player.x - powerUp.x;
            const dy = player.y - powerUp.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < player.radius + powerUp.radius) {
                const powerUpData = powerUp.collect(player);
                this.activatePowerUp(player, powerUpData);
            }
        });
    }

    activatePowerUp(player, powerUpData) {
        this.activePowerUps.push({
            type: powerUpData.type,
            player: player,
            duration: powerUpData.duration,
            effect: powerUpData.effect
        });

        // Apply immediate effect
        this.applyPowerUpEffect(player, powerUpData.effect);

        // Show power-up message
        this.showPowerUpMessage(powerUpData.name);
    }

    applyPowerUpEffect(player, effect) {
        if (effect.speed) {
            player.baseSpeed *= effect.speed;
        }
        if (effect.passing) {
            player.passing *= effect.passing;
        }
        if (effect.control) {
            player.control *= effect.control;
        }
        if (effect.invulnerable) {
            player.invulnerable = true;
        }
    }

    removePowerUpEffect(player, effect) {
        if (effect.speed) {
            player.baseSpeed /= effect.speed;
        }
        if (effect.passing) {
            player.passing /= effect.passing;
        }
        if (effect.control) {
            player.control /= effect.control;
        }
        if (effect.invulnerable) {
            player.invulnerable = false;
        }
    }

    updateActivePowerUps() {
        for (let i = this.activePowerUps.length - 1; i >= 0; i--) {
            const powerUp = this.activePowerUps[i];
            powerUp.duration--;

            if (powerUp.duration <= 0) {
                this.removePowerUpEffect(powerUp.player, powerUp.effect);
                this.activePowerUps.splice(i, 1);
            }
        }
    }

    spawnRandomPowerUp() {
        const type = powerUps[Math.floor(Math.random() * powerUps.length)].type;
        const x = 300 + Math.random() * 600;
        const y = 100 + Math.random() * 600;
        this.powerUps.push(new PowerUp(x, y, type));
    }

    checkBallPossession() {
        if (Math.abs(this.ball.speedX) > 5 || Math.abs(this.ball.speedY) > 5) {
            if (this.ball.possessedBy) {
                this.ball.possessedBy.hasBall = false;
                if (this.ball.possessedBy.isCurrentUserControlled) {
                    this.ball.possessedBy.isCurrentUserControlled = false;
                }
                this.ball.possessedBy = null;
            }
            return;
        }

        if (!this.ball.possessedBy) {
            // Check user players first
            let closestPlayer = null;
            let closestDistance = Infinity;

            this.userPlayers.forEach(player => {
                const dx = player.x - this.ball.x;
                const dy = player.y - this.ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 35 && distance < closestDistance) {
                    closestDistance = distance;
                    closestPlayer = player;
                }
            });

            // Check obstacle players if no user player is close
            if (!closestPlayer) {
                this.obstaclePlayers.forEach(obstacle => {
                    const dx = obstacle.x - this.ball.x;
                    const dy = obstacle.y - this.ball.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 35 && distance < closestDistance && Math.random() < 0.3) {
                        closestDistance = distance;
                        closestPlayer = obstacle;
                    }
                });
            }

            if (closestPlayer && closestDistance < 35) {
                this.ball.possessedBy = closestPlayer;
                closestPlayer.hasBall = true;
                this.ball.speedX = 0;
                this.ball.speedY = 0;

                // Give user control if it's a user player
                if (closestPlayer.isHomeTeam) {
                    this.switchUserControl(closestPlayer);
                }
            }
        }
    }

    switchUserControl(newPlayer) {
        if (this.userControlledPlayer) {
            this.userControlledPlayer.isCurrentUserControlled = false;
        }
        
        this.userControlledPlayer = newPlayer;
        this.userControlledPlayer.isCurrentUserControlled = true;
    }

    checkGoals() {
        // Check for goal on the right side (user scores)
        if (this.ball.x + this.ball.radius > 1150 && 
            this.ball.y > 320 && this.ball.y < 480) {
            
            if ((this.ball.speedX > 3 || this.ball.x > 1180)) {
                this.handleGoal();
                return;
            }
        }
    }

    handleGoal() {
        this.score++;
        this.celebrationTime = 120;
        this.levelComplete = true;
        
        this.userPlayers.forEach(player => {
            player.celebrate();
        });
        
        this.showGoalMessage();
    }

    checkLifeLoss() {
        // Lose a life if obstacle players take the ball and score
        if (this.ball.x - this.ball.radius < 50 && 
            this.ball.y > 320 && this.ball.y < 480) {
            
            if (this.ball.speedX < -3 || this.ball.x < 20) {
                this.loseLife();
                return;
            }
        }

        // Lose a life if ball is possessed by obstacle players for too long
        if (this.ball.possessedBy && this.ball.possessedBy.isObstacle) {
            // You could add a timer here for possession time
        }
    }

    loseLife() {
        this.lives--;
        this.resetPlay();
        
        if (this.lives <= 0) {
            this.gameOver = true;
            this.showGameOver();
        } else {
            this.showLifeLostMessage();
        }
    }

    checkLevelCompletion() {
        // Level is completed by scoring a goal (handled in checkGoals)
    }

    nextLevel() {
        this.level++;
        if (this.level > this.maxLevel) {
            this.showVictory();
            this.gameOver = true;
        } else {
            this.setupLevel(this.level);
            this.showLevelMessage();
        }
    }

    resetPlay() {
        this.ball.x = 200;
        this.ball.y = 400;
        this.ball.speedX = 0;
        this.ball.speedY = 0;
        this.ball.possessedBy = null;
        
        this.userPlayers.forEach(player => {
            player.hasBall = false;
            if (player.isCurrentUserControlled) {
                player.isCurrentUserControlled = false;
            }
        });

        // Reset to initial positions
        this.setupUserPlayers();
    }

    userShoot() {
        if (this.userControlledPlayer && this.userControlledPlayer.hasBall) {
            const direction = Math.atan2(
                this.userControlledPlayer.speedY,
                this.userControlledPlayer.speedX
            ) || 0;
            
            this.userControlledPlayer.kickBall(this.ball, 12, direction);
        }
    }

    userPass() {
        if (this.userControlledPlayer && this.userControlledPlayer.hasBall) {
            let bestTeammate = null;
            let bestScore = -1;

            this.userPlayers.forEach(player => {
                if (player !== this.userControlledPlayer) {
                    const dx = player.x - this.userControlledPlayer.x;
                    const dy = player.y - this.userControlledPlayer.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 250 && distance > 30) {
                        let score = 100 - distance;
                        
                        const progress = (player.x - this.userControlledPlayer.x);
                        if (progress > 0) score += 50;
                        
                        let opponentCount = 0;
                        this.obstaclePlayers.forEach(opponent => {
                            const oppDist = Math.sqrt(
                                Math.pow(opponent.x - player.x, 2) + 
                                Math.pow(opponent.y - player.y, 2)
                            );
                            if (oppDist < 60) opponentCount++;
                        });
                        score -= opponentCount * 30;
                        
                        if (score > bestScore) {
                            bestScore = score;
                            bestTeammate = player;
                        }
                    }
                }
            });

            if (bestTeammate) {
                this.userControlledPlayer.passBall(this.ball, bestTeammate, this);
            }
        }
    }

    userTackle() {
        if (this.userControlledPlayer && !this.userControlledPlayer.hasBall) {
            this.userControlledPlayer.attemptTackle(this.ball, this);
        }
    }

    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.fieldWidth, this.fieldHeight);
        
        // Draw field
        this.drawGrass();
        this.drawField();
        
        // Draw power-ups
        this.powerUps.forEach(powerUp => powerUp.draw(this.ctx));
        
        // Draw obstacle players
        this.obstaclePlayers.forEach(obstacle => obstacle.draw(this.ctx));
        
        // Draw user players
        this.userPlayers.forEach(player => player.draw(this.ctx));
        
        // Draw ball
        this.ball.draw(this.ctx);

        // Draw controls if on mobile
        if (this.isMobile && this.gameStarted) {
            this.touchControls.draw(this.ctx);
        }

        // Draw game info
        this.drawGameInfo();

        // Draw celebration effect
        if (this.celebrationTime > 0) {
            this.ctx.fillStyle = `rgba(255, 215, 0, ${0.3 + Math.sin(Date.now() * 0.01) * 0.2})`;
            this.ctx.fillRect(0, 0, this.fieldWidth, this.fieldHeight);
        }
    }

    drawGrass() {
        this.ctx.fillStyle = '#27ae60';
        this.ctx.fillRect(0, 0, this.fieldWidth, this.fieldHeight);

        // Add grass pattern
        this.ctx.strokeStyle = '#229954';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < this.fieldWidth; i += 25) {
            for (let j = 0; j < this.fieldHeight; j += 25) {
                this.ctx.beginPath();
                this.ctx.moveTo(i, j);
                this.ctx.lineTo(i + 12, j + 12);
                this.ctx.stroke();
            }
        }
    }

    drawField() {
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 3;
        
        this.ctx.strokeRect(30, 30, this.fieldWidth - 60, this.fieldHeight - 60);
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.fieldWidth / 2, 30);
        this.ctx.lineTo(this.fieldWidth / 2, this.fieldHeight - 30);
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.arc(this.field.center.x, this.field.center.y, 75, 0, Math.PI * 2);
        this.ctx.stroke();

        // Goals
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(30, this.fieldHeight / 2 - 60, 5, 120);
        this.ctx.fillRect(this.fieldWidth - 35, this.fieldHeight / 2 - 60, 5, 120);

        // Goal areas
        this.ctx.strokeRect(30, this.fieldHeight / 2 - 120, 60, 240);
        this.ctx.strokeRect(this.fieldWidth - 90, this.fieldHeight / 2 - 120, 60, 240);
    }

    drawGameInfo() {
        if (!this.gameStarted) return;

        // Draw game stats box
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(10, 10, 250, 100);
        
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'left';
        
        this.ctx.fillText(`Level: ${this.level}/${this.maxLevel}`, 20, 30);
        this.ctx.fillText(`Score: ${this.score}`, 20, 50);
        this.ctx.fillText(`Lives: ${this.lives}`, 20, 70);
        this.ctx.fillText(`Formation: ${selectedObstacleFormation}`, 20, 90);

        // Draw active power-ups
        if (this.activePowerUps.length > 0) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(this.fieldWidth - 160, 10, 150, 30 * this.activePowerUps.length);
            
            this.activePowerUps.forEach((powerUp, index) => {
                this.ctx.fillStyle = powerUp.effect.type === 'speed' ? '#FF6B6B' :
                                   powerUp.effect.type === 'passing' ? '#4ECDC4' :
                                   powerUp.effect.type === 'control' ? '#45B7D1' : '#96CEB4';
                this.ctx.fillText(`${powerUp.type}: ${Math.ceil(powerUp.duration/60)}s`, 
                                this.fieldWidth - 150, 30 + (index * 25));
            });
        }
    }

    updateUI() {
        // Update any UI elements if needed
    }

    showGoalMessage() {
        this.showMessage("GOAL! 🎉", 2000);
    }

    showLifeLostMessage() {
        this.showMessage(`Life Lost! ${this.lives} lives remaining`, 2000);
    }

    showLevelMessage() {
        this.showMessage(`Level ${this.level} - Get Ready!`, 2000);
    }

    showPowerUpMessage(powerUpName) {
        this.showMessage(`${powerUpName} Activated!`, 1500);
    }

    showGameOver() {
        this.showMessage(`Game Over! Final Score: ${this.score}`, 5000);
    }

    showVictory() {
        this.showMessage(`Victory! You completed all levels! Score: ${this.score}`, 5000);
    }

    showMessage(text, duration) {
        const msgElement = document.createElement('div');
        msgElement.className = 'game-message';
        msgElement.textContent = text;
        msgElement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 20px 40px;
            border-radius: 15px;
            font-size: 24px;
            font-weight: bold;
            z-index: 1000;
            border: 3px solid gold;
            text-align: center;
        `;
        
        document.body.appendChild(msgElement);
        
        setTimeout(() => {
            if (document.body.contains(msgElement)) {
                document.body.removeChild(msgElement);
            }
        }, duration);
    }

    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
}

// Keep the existing AnimatedPlayer class but add power-up effects
// Add these properties to the AnimatedPlayer constructor:
// this.invulnerable = false;
// this.powerUpEffects = {};

// Modified TouchControls and KeyboardControls classes for the new game
class TouchControls {
    constructor(canvas, game) {
        this.canvas = canvas;
        this.game = game;
        this.joystick = {
            x: 120, y: 600, radius: 50, baseX: 120, baseY: 600, isActive: false, touchId: null
        };
        this.shootButton = { x: 1080, y: 600, radius: 45, isActive: false };
        this.passButton = { x: 1080, y: 520, radius: 45, isActive: false };
        this.tackleButton = { x: 1080, y: 440, radius: 45, isActive: false };
        this.userInput = { x: 0, y: 0 };
        
        this.setupEventListeners();
    }

    // ... (keep existing touch control implementation)

    getUserInput() {
        return { x: this.userInput.x, y: this.userInput.y };
    }
}

class KeyboardControls {
    constructor(game) {
        this.game = game;
        this.keys = {
            ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false,
            ' ': false, 'x': false, 'c': false,
            'w': false, 's': false, 'a': false, 'd': false
        };
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            const key = e.key;
            if (this.keys.hasOwnProperty(key)) {
                this.keys[key] = true;
                e.preventDefault();
            }
            
            if (key === ' ') this.game.userShoot();
            if (key === 'x') this.game.userPass();
            if (key === 'c') this.game.userTackle();
        });

        document.addEventListener('keyup', (e) => {
            const key = e.key;
            if (this.keys.hasOwnProperty(key)) {
                this.keys[key] = false;
                e.preventDefault();
            }
        });
    }

    getUserInput() {
        let x = 0, y = 0;
        
        if (this.keys.ArrowUp || this.keys.w) y -= 1;
        if (this.keys.ArrowDown || this.keys.s) y += 1;
        if (this.keys.ArrowLeft || this.keys.a) x -= 1;
        if (this.keys.ArrowRight || this.keys.d) x += 1;
        
        if (x !== 0 && y !== 0) {
            x *= 0.707;
            y *= 0.707;
        }
        
        return { x, y };
    }
}

// NEW: Formation Selection for Obstacle Course
class ObstacleFormationOverlay {
    constructor(game) {
        this.game = game;
        this.isVisible = true;
        this.createOverlay();
    }

    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'formation-overlay';
        this.overlay.innerHTML = `
            <div class="formation-container">
                <h3>Select Obstacle Formation</h3>
                <p>Choose how the opposing team will be arranged</p>
                <div class="formation-options" id="formationOptions"></div>
                <div class="formation-preview-container">
                    <div class="formation-diagram" id="formationDiagram"></div>
                </div>
                <button class="start-game-btn">Start Challenge</button>
            </div>
        `;
        document.body.appendChild(this.overlay);

        this.loadFormations();
        this.setupEventListeners();
    }

    loadFormations() {
        const options = document.getElementById('formationOptions');
        Object.keys(obstacleFormations).forEach(formationKey => {
            const formation = obstacleFormations[formationKey];
            const formationCard = document.createElement('div');
            formationCard.className = 'formation-card';
            if (formationKey === selectedObstacleFormation) {
                formationCard.classList.add('selected');
            }
            formationCard.innerHTML = `
                <h4>${formation.name}</h4>
                <p>${formation.description}</p>
                <div class="difficulty">Difficulty: ${this.getDifficulty(formationKey)}</div>
            `;
            formationCard.addEventListener('click', () => this.selectFormation(formationKey));
            options.appendChild(formationCard);
        });
        
        this.updateFormationDiagram();
    }

    getDifficulty(formation) {
        const difficulties = {
            'defensive_wall': 'Medium',
            'diamond_block': 'Hard',
            'zigzag_defense': 'Very Hard',
            'pyramid_formation': 'Expert'
        };
        return difficulties[formation] || 'Medium';
    }

    selectFormation(formation) {
        selectedObstacleFormation = formation;
        document.querySelectorAll('.formation-card').forEach(card => {
            card.classList.remove('selected');
        });
        event.target.closest('.formation-card').classList.add('selected');
        this.updateFormationDiagram();
    }

    updateFormationDiagram() {
        const diagram = document.getElementById('formationDiagram');
        diagram.innerHTML = '';
        
        const formation = obstacleFormations[selectedObstacleFormation];
        Object.entries(formation.positions).forEach(([position, pos]) => {
            const playerDot = document.createElement('div');
            playerDot.className = 'formation-player-dot obstacle-dot';
            playerDot.style.left = `${(pos.x / 1200) * 100}%`;
            playerDot.style.top = `${(pos.y / 800) * 100}%`;
            playerDot.title = position;
            diagram.appendChild(playerDot);
        });
    }

    setupEventListeners() {
        const startBtn = this.overlay.querySelector('.start-game-btn');
        startBtn.addEventListener('click', () => this.startGame());
    }

    startGame() {
        this.isVisible = false;
        this.overlay.style.display = 'none';
        this.game.startGame();
    }

    show() {
        this.isVisible = true;
        this.overlay.style.display = 'flex';
    }

    hide() {
        this.isVisible = false;
        this.overlay.style.display = 'none';
    }
}

// Initialize game when page loads
window.addEventListener('load', () => {
    const game = new ObstacleCourseGame();
    new ObstacleFormationOverlay(game);
});

// Enhanced CSS for the obstacle course game
const obstacleCourseCSS = `
/* Base responsive styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
    color: white;
    overflow: hidden;
    height: 100vh;
}

#gameContainer {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
}

#gameCanvas {
    flex: 1;
    background: #27ae60;
    display: block;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
}

/* Enhanced formation overlay for obstacle course */
.formation-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.formation-container {
    background: linear-gradient(135deg, #2c3e50, #34495e);
    padding: 30px;
    border-radius: 20px;
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
    text-align: center;
    border: 3px solid #f39c12;
    box-shadow: 0 0 30px rgba(243, 156, 18, 0.5);
}

.formation-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin: 30px 0;
}

.formation-card {
    background: #34495e;
    padding: 20px;
    border-radius: 15px;
    cursor: pointer;
    border: 3px solid transparent;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.formation-card:hover {
    border-color: #3498db;
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(52, 152, 219, 0.4);
}

.formation-card.selected {
    border-color: #2ecc71;
    background: #27ae60;
    transform: scale(1.05);
}

.formation-card h4 {
    margin: 0 0 10px 0;
    color: #ecf0f1;
    font-size: 1.3rem;
}

.formation-card p {
    margin: 0 0 10px 0;
    color: #bdc3c7;
    font-size: 0.9rem;
}

.difficulty {
    font-size: 0.8rem;
    padding: 5px 10px;
    border-radius: 15px;
    background: #e74c3c;
    color: white;
    display: inline-block;
}

.formation-card[data-difficulty="Medium"] .difficulty {
    background: #f39c12;
}

.formation-card[data-difficulty="Hard"] .difficulty {
    background: #e67e22;
}

.formation-card[data-difficulty="Very Hard"] .difficulty {
    background: #e74c3c;
}

.formation-card[data-difficulty="Expert"] .difficulty {
    background: #c0392b;
}

.formation-preview-container {
    background: #1a252f;
    border-radius: 10px;
    padding: 20px;
    margin: 20px 0;
    border: 2px solid #34495e;
}

.formation-diagram {
    position: relative;
    width: 100%;
    height: 200px;
    background: #27ae60;
    border-radius: 5px;
    overflow: hidden;
}

.formation-player-dot {
    position: absolute;
    width: 12px;
    height: 12px;
    background: #e74c3c;
    border: 2px solid white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
}

.formation-player-dot.obstacle-dot {
    background: #3498db;
    border-color: #2980b9;
}

.start-game-btn {
    background: linear-gradient(135deg, #2ecc71, #27ae60);
    color: white;
    border: none;
    padding: 15px 50px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: bold;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(39, 174, 96, 0.4);
}

.start-game-btn:hover {
    background: linear-gradient(135deg, #27ae60, #229954);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(39, 174, 96, 0.6);
}

/* Game messages */
.game-message {
    animation: pulse 1s infinite alternate;
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
}

@keyframes pulse {
    from { transform: translate(-50%, -50%) scale(1); }
    to { transform: translate(-50%, -50%) scale(1.05); }
}

/* Mobile optimizations */
@media (max-width: 768px) {
    .formation-options {
        grid-template-columns: 1fr;
    }
    
    .formation-container {
        padding: 20px;
    }
    
    .formation-card {
        padding: 15px;
    }
}

/* Power-up animations */
@keyframes powerUpGlow {
    0% { box-shadow: 0 0 5px currentColor; }
    50% { box-shadow: 0 0 20px currentColor; }
    100% { box-shadow: 0 0 5px currentColor; }
}

.power-up-active {
    animation: powerUpGlow 2s infinite;
}
`;

// Inject the CSS
const style = document.createElement('style');
style.textContent = obstacleCourseCSS;
document.head.appendChild(style);

// Add viewport meta tag for mobile devices if not present
if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(viewport);
}