// Football Clubs Data
const footballClubs = [
    {
        id: 1,
        name: "Red Dragons FC",
        shortName: "Dragons",
        color: "#e74c3c",
        secondaryColor: "#c0392b",
        logo: "🐉",
        formation: "4-4-2"
    },
    {
        id: 2,
        name: "Blue Eagles United",
        shortName: "Eagles",
        color: "#3498db",
        secondaryColor: "#2980b9",
        logo: "🦅",
        formation: "4-3-3"
    },
    {
        id: 3,
        name: "Green Lions FC",
        shortName: "Lions",
        color: "#2ecc71",
        secondaryColor: "#27ae60",
        logo: "🦁",
        formation: "4-4-2"
    },
    {
        id: 4,
        name: "Golden Tigers",
        shortName: "Tigers",
        color: "#f39c12",
        secondaryColor: "#e67e22",
        logo: "🐯",
        formation: "4-2-3-1"
    },
    {
        id: 5,
        name: "Silver Wolves",
        shortName: "Wolves",
        color: "#95a5a6",
        secondaryColor: "#7f8c8d",
        logo: "🐺",
        formation: "3-5-2"
    },
    {
        id: 6,
        name: "Purple Panthers",
        shortName: "Panthers",
        color: "#9b59b6",
        secondaryColor: "#8e44ad",
        logo: "🐆",
        formation: "4-4-2"
    },
    {
        id: 7,
        name: "Black Hawks",
        shortName: "Hawks",
        color: "#2c3e50",
        secondaryColor: "#34495e",
        logo: "🦅",
        formation: "4-3-3"
    },
    {
        id: 8,
        name: "White Sharks",
        shortName: "Sharks",
        color: "#ecf0f1",
        secondaryColor: "#bdc3c7",
        logo: "🦈",
        formation: "4-1-4-1"
    },
    {
        id: 9,
        name: "Orange Rhinos",
        shortName: "Rhinos",
        color: "#e67e22",
        secondaryColor: "#d35400",
        logo: "🦏",
        formation: "4-4-2"
    },
    {
        id: 10,
        name: "Crimson Bulls",
        shortName: "Bulls",
        color: "#c0392b",
        secondaryColor: "#e74c3c",
        logo: "🐂",
        formation: "4-3-3"
    }
];

// Available Formations - UPDATED FOR RESPONSIVE
const formations = {
    '4-4-2': {
        name: '4-4-2',
        description: 'Classic balanced formation',
        positions: {
            'GK': { x: 0.0625, y: 0.5 },      // 50/800, 250/500
            'RB': { x: 0.125, y: 0.2 },       // 100/800, 100/500
            'CB1': { x: 0.125, y: 0.4 },      // 100/800, 200/500
            'CB2': { x: 0.125, y: 0.6 },      // 100/800, 300/500
            'LB': { x: 0.125, y: 0.8 },       // 100/800, 400/500
            'RM': { x: 0.225, y: 0.2 },       // 180/800, 100/500
            'CM1': { x: 0.225, y: 0.4 },      // 180/800, 200/500
            'CM2': { x: 0.225, y: 0.6 },      // 180/800, 300/500
            'LM': { x: 0.225, y: 0.8 },       // 180/800, 400/500
            'ST1': { x: 0.325, y: 0.45 },     // 260/800, 225/500
            'ST2': { x: 0.325, y: 0.55 }      // 260/800, 275/500
        }
    },
    '4-3-3': {
        name: '4-3-3',
        description: 'Attacking formation with wingers',
        positions: {
            'GK': { x: 0.0625, y: 0.5 },
            'RB': { x: 0.125, y: 0.2 },
            'CB1': { x: 0.125, y: 0.4 },
            'CB2': { x: 0.125, y: 0.6 },
            'LB': { x: 0.125, y: 0.8 },
            'CM1': { x: 0.225, y: 0.3 },
            'CM2': { x: 0.225, y: 0.5 },
            'CM3': { x: 0.225, y: 0.7 },
            'RW': { x: 0.325, y: 0.2 },
            'ST': { x: 0.325, y: 0.5 },
            'LW': { x: 0.325, y: 0.8 }
        }
    },
    '3-5-2': {
        name: '3-5-2',
        description: 'Midfield dominance formation',
        positions: {
            'GK': { x: 0.0625, y: 0.5 },
            'CB1': { x: 0.125, y: 0.3 },
            'CB2': { x: 0.125, y: 0.5 },
            'CB3': { x: 0.125, y: 0.7 },
            'RM': { x: 0.225, y: 0.2 },
            'CM1': { x: 0.225, y: 0.4 },
            'CM2': { x: 0.225, y: 0.5 },
            'CM3': { x: 0.225, y: 0.6 },
            'LM': { x: 0.225, y: 0.8 },
            'ST1': { x: 0.325, y: 0.4 },
            'ST2': { x: 0.325, y: 0.6 }
        }
    },
    '4-2-3-1': {
        name: '4-2-3-1',
        description: 'Modern attacking formation',
        positions: {
            'GK': { x: 0.0625, y: 0.5 },
            'RB': { x: 0.125, y: 0.2 },
            'CB1': { x: 0.125, y: 0.4 },
            'CB2': { x: 0.125, y: 0.6 },
            'LB': { x: 0.125, y: 0.8 },
            'CDM1': { x: 0.2, y: 0.4 },
            'CDM2': { x: 0.2, y: 0.6 },
            'CAM': { x: 0.275, y: 0.5 },
            'RW': { x: 0.325, y: 0.3 },
            'LW': { x: 0.325, y: 0.7 },
            'ST': { x: 0.375, y: 0.5 }
        }
    }
};


// Game Mode Selection
let selectedGameMode = 'player-vs-computer';
let selectedFormation = '4-4-2';

// Real Football Players Database
const footballPlayers = [
    { id: 1, name: "Lionel Messi", position: "RW", rating: 93, team: "Inter Miami" },
    { id: 2, name: "Cristiano Ronaldo", position: "ST", rating: 92, team: "Al Nassr" },
    { id: 3, name: "Kylian Mbappé", position: "ST", rating: 91, team: "Paris Saint-Germain" },
    { id: 4, name: "Kevin De Bruyne", position: "CAM", rating: 91, team: "Manchester City" },
    { id: 5, name: "Erling Haaland", position: "ST", rating: 91, team: "Manchester City" },
    { id: 6, name: "Virgil van Dijk", position: "CB", rating: 89, team: "Liverpool" },
    { id: 7, name: "Mohamed Salah", position: "RW", rating: 90, team: "Liverpool" },
    { id: 8, name: "Harry Kane", position: "ST", rating: 90, team: "Bayern Munich" },
    { id: 9, name: "Neymar Jr", position: "LW", rating: 89, team: "Al Hilal" },
    { id: 10, name: "Robert Lewandowski", position: "ST", rating: 89, team: "Barcelona" }
];

// Football Tactics and Plays
const teamPlays = [
    {
        id: 1,
        name: "Tiki-Taka",
        description: "Short passing and movement, working the ball through channels",
        effect: { possession: 15, passing: 20, speed: -5 }
    },
    {
        id: 2,
        name: "Counter Attack",
        description: "Quick transitions from defense to attack",
        effect: { speed: 15, shooting: 10, possession: -10 }
    },
    {
        id: 3,
        name: "Gegenpress",
        description: "Immediate pressing after losing possession",
        effect: { pressure: 20, stamina: -10, aggression: 15 }
    }
];




// Game Timer State
const gameTimer = {
    totalTime: 300, // 5 minutes in seconds
    currentTime: 0,
    isGameEnded: false,
    gameTimerInterval: null
};

// Enhanced FootballBall class - UPDATED FOR RESPONSIVE
class FootballBall {
    constructor(x, y, fieldWidth, fieldHeight) {
        this.x = x;
        this.y = y;
        this.fieldWidth = fieldWidth;
        this.fieldHeight = fieldHeight;
        this.radius = fieldWidth * 0.015; // Responsive radius
        this.speedX = 0;
        this.speedY = 0;
        this.friction = 0.98;
        this.rotation = 0;
        this.spin = 0;
        this.possessedBy = null;
        this.autoMoveTimer = 0;
        this.autoMoveDirection = { x: 0, y: 0 };
        this.isMovingAutomatically = false;
    }

    update() {
        if (this.possessedBy) {
            this.isMovingAutomatically = false;
            return;
        }

        if (!this.isMovingAutomatically && (this.speedX === 0 && this.speedY === 0)) {
            this.startAutoMovement();
        }

        if (this.isMovingAutomatically) {
            this.autoMoveTimer--;
            if (this.autoMoveTimer <= 0) {
                this.startAutoMovement();
            }
        }

        this.speedX *= this.friction;
        this.speedY *= this.friction;
        
        this.x += this.speedX;
        this.y += this.speedY;
        
        this.rotation += this.speedX * 0.1;
        this.spin += this.speedY * 0.1;

        // Use field boundaries
        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.speedX *= -0.7;
        }
        if (this.x + this.radius > this.fieldWidth) {
            this.x = this.fieldWidth - this.radius;
            this.speedX *= -0.7;
        }
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.speedY *= -0.7;
        }
        if (this.y + this.radius > this.fieldHeight) {
            this.y = this.fieldHeight - this.radius;
            this.speedY *= -0.7;
        }

        if (Math.abs(this.speedX) < 0.1) this.speedX = 0;
        if (Math.abs(this.speedY) < 0.1) this.speedY = 0;
    }

    startAutoMovement() {
        this.isMovingAutomatically = true;
        this.autoMoveTimer = 60 + Math.random() * 120;
        
        const centerX = this.fieldWidth / 2;
        const centerY = this.fieldHeight / 2;
        const dx = centerX - this.x;
        const dy = centerY - this.y;
        
        this.autoMoveDirection = {
            x: (Math.random() - 0.5 + dx * 0.001) * 2,
            y: (Math.random() - 0.5 + dy * 0.001) * 2
        };
        
        const length = Math.sqrt(this.autoMoveDirection.x ** 2 + this.autoMoveDirection.y ** 2);
        this.autoMoveDirection.x /= length;
        this.autoMoveDirection.y /= length;
        
        const speedMultiplier = 2 + Math.random() * 3;
        this.speedX = this.autoMoveDirection.x * speedMultiplier;
        this.speedY = this.autoMoveDirection.y * speedMultiplier;
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
        
        ctx.beginPath();
        ctx.moveTo(0, -this.radius);
        ctx.lineTo(this.radius * 0.6, -this.radius * 0.4);
        ctx.lineTo(this.radius * 0.4, this.radius * 0.6);
        ctx.lineTo(-this.radius * 0.4, this.radius * 0.6);
        ctx.lineTo(-this.radius * 0.6, -this.radius * 0.4);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, this.radius);
        ctx.lineTo(-this.radius * 0.6, this.radius * 0.4);
        ctx.lineTo(-this.radius * 0.4, -this.radius * 0.6);
        ctx.lineTo(this.radius * 0.4, -this.radius * 0.6);
        ctx.lineTo(this.radius * 0.6, this.radius * 0.4);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    }
}

// Enhanced AnimatedPlayer class with new controls - UPDATED FOR RESPONSIVE
class AnimatedPlayer {
    constructor(config) {
        this.x = config.x;
        this.y = config.y;
        this.fieldWidth = config.fieldWidth;
        this.fieldHeight = config.fieldHeight;
        this.radius = this.fieldWidth * 0.01875; // Responsive radius (15px on 800px width)
        this.color = config.color;
        this.secondaryColor = config.secondaryColor;
        this.number = config.number;
        this.position = config.position;
        this.isHomeTeam = config.isHomeTeam;
        this.teamName = config.teamName;
        this.isUserControlled = config.isUserControlled || false;
        this.isCurrentUserControlled = config.isCurrentUserControlled || false;
        this.playerData = config.playerData || null;
        
        // Animation properties
        this.animationFrame = 0;
        this.legSwing = 0;
        this.armSwing = 0;
        this.running = false;
        this.kicking = false;
        this.kickFrame = 0;
        this.hasBall = false;
        this.sprinting = false;
        this.tackling = false;
        this.tackleFrame = 0;
        
        // Movement
        this.speedX = 0;
        this.speedY = 0;
        this.targetX = this.x;
        this.targetY = this.y;
        this.userInputX = 0;
        this.userInputY = 0;
        
        // Player attributes - make speed relative to field size
        const baseSpeedFactor = this.fieldWidth / 800; // Scale speed based on field size
        this.baseSpeed = (2 + Math.random() * 1) * baseSpeedFactor;
        this.speed = this.baseSpeed;
        this.aggression = 0.5 + Math.random() * 0.5;
        this.control = 0.5 + Math.random() * 0.5;
        this.passing = 0.5 + Math.random() * 0.5;
        this.tacklingSkill = 0.5 + Math.random() * 0.5;
        
        // AI behavior
        this.lastBallOwner = null;
        this.supportPosition = { x: this.x, y: this.y };
        this.role = this.determineRole();
    }

    determineRole() {
        const position = this.position;
        if (position === 'GK') return 'goalkeeper';
        if (position.includes('B')) return 'defender';
        if (position.includes('M') || position.includes('W')) return 'midfielder';
        if (position.includes('S') || position.includes('T')) return 'attacker';
        return 'midfielder';
    }

    update(ball, userInput = null, game = null) {
        // Handle sprinting
        if (this.sprinting && this.isCurrentUserControlled) {
            this.speed = this.baseSpeed * 1.8; // 80% faster when sprinting
        } else {
            this.speed = this.baseSpeed;
        }

        if (this.isCurrentUserControlled && userInput) {
            this.userInputX = userInput.x;
            this.userInputY = userInput.y;
            
            this.speedX = this.userInputX * this.speed;
            this.speedY = this.userInputY * this.speed;
            
            this.x += this.speedX;
            this.y += this.speedY;
            this.running = (this.userInputX !== 0 || this.userInputY !== 0);
            
        } else {
            this.updateAI(ball, game);
        }

        // Update animations
        this.animationFrame++;
        if (this.running) {
            this.legSwing = Math.sin(this.animationFrame * 0.3) * 15;
            this.armSwing = Math.sin(this.animationFrame * 0.3 + Math.PI) * 10;
        } else {
            this.legSwing *= 0.9;
            this.armSwing *= 0.9;
        }

        // Update tackle animation
        if (this.tackling) {
            this.tackleFrame++;
            if (this.tackleFrame > 20) {
                this.tackling = false;
                this.tackleFrame = 0;
            }
        }

        // Use dynamic field boundaries
        this.x = Math.max(this.radius, Math.min(this.fieldWidth - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(this.fieldHeight - this.radius, this.y));

        if (this.hasBall && ball.possessedBy === this) {
            ball.x = this.x + (this.isHomeTeam ? this.fieldWidth * 0.03125 : -this.fieldWidth * 0.03125); // 25px on 800px width
            ball.y = this.y;
        }
    }

    updateAI(ball, game) {
        const dx = ball.x - this.x;
        const dy = ball.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Role-based positioning
        if (ball.possessedBy) {
            if (ball.possessedBy.isHomeTeam === this.isHomeTeam) {
                // Teammate has the ball
                this.supportTeammate(ball.possessedBy, ball, game);
            } else {
                // Opponent has the ball - defend based on role
                this.defend(ball, distance);
            }
        } else {
            // Ball is free
            if (distance < this.fieldWidth * 0.1875 && this.aggression > 0.3) { // 150px on 800px width
                this.targetX = ball.x;
                this.targetY = ball.y;
                this.running = true;
            } else {
                this.returnToPosition();
            }
        }

        // Move towards target
        const targetDx = this.targetX - this.x;
        const targetDy = this.targetY - this.y;
        const targetDistance = Math.sqrt(targetDx * targetDx + targetDy * targetDy);

        if (targetDistance > 2) {
            this.speedX = (targetDx / targetDistance) * this.speed;
            this.speedY = (targetDy / targetDistance) * this.speed;
            
            this.x += this.speedX;
            this.y += this.speedY;
        } else {
            this.speedX *= 0.9;
            this.speedY *= 0.9;
            this.running = false;
        }

        // Attempt tackle if close to opponent with ball
        if (ball.possessedBy && ball.possessedBy.isHomeTeam !== this.isHomeTeam && 
            distance < this.fieldWidth * 0.0375 && Math.random() < 0.02) { // 30px on 800px width
            this.attemptTackle(ball, game);
        }
    }

    supportTeammate(ballOwner, ball, game) {
        if (this === game.userControlledPlayer) {
            this.targetX = ball.x;
            this.targetY = ball.y;
            this.running = true;
        } else {
            // Find intelligent support position based on role
            const goalX = this.isHomeTeam ? this.fieldWidth * 0.9375 : this.fieldWidth * 0.0625; // 750px or 50px on 800px width
            let supportDistance = this.fieldWidth * 0.075; // 60px on 800px width
            
            if (this.role === 'defender') {
                // Defenders stay back
                supportDistance = this.fieldWidth * 0.125; // 100px on 800px width
                this.targetX = this.getFormationPosition().x;
                this.targetY = this.getFormationPosition().y;
            } else if (this.role === 'attacker') {
                // Attackers move forward
                supportDistance = this.fieldWidth * 0.05; // 40px on 800px width
                const dx = goalX - ballOwner.x;
                const dy = this.fieldHeight * 0.5 - ballOwner.y; // 250px on 500px height
                const distanceToGoal = Math.sqrt(dx * dx + dy * dy);
                
                if (distanceToGoal > 0) {
                    this.supportPosition.x = ballOwner.x + (dx / distanceToGoal) * supportDistance;
                    this.supportPosition.y = ballOwner.y + (dy / distanceToGoal) * supportDistance;
                }
                this.targetX = this.supportPosition.x;
                this.targetY = this.supportPosition.y;
            } else {
                // Midfielders find space
                this.findSpace(ballOwner, game);
            }
            this.running = true;
        }
    }

    findSpace(ballOwner, game) {
        // Simple space finding - move to open area
        const offsetX = this.fieldWidth * 0.1; // 80px on 800px width
        const offsetY = this.fieldHeight * 0.12; // 60px on 500px height
        
        const possiblePositions = [
            { x: ballOwner.x + offsetX, y: ballOwner.y - offsetY },
            { x: ballOwner.x + offsetX, y: ballOwner.y + offsetY },
            { x: ballOwner.x - offsetX, y: ballOwner.y - offsetY },
            { x: ballOwner.x - offsetX, y: ballOwner.y + offsetY }
        ];
        
        let bestPosition = possiblePositions[0];
        let maxDistance = 0;
        
        possiblePositions.forEach(pos => {
            let minDistanceToTeammate = Infinity;
            game.players.forEach(player => {
                if (player !== this && player.isHomeTeam === this.isHomeTeam) {
                    const dist = Math.sqrt((pos.x - player.x) ** 2 + (pos.y - player.y) ** 2);
                    if (dist < minDistanceToTeammate) minDistanceToTeammate = dist;
                }
            });
            
            if (minDistanceToTeammate > maxDistance) {
                maxDistance = minDistanceToTeammate;
                bestPosition = pos;
            }
        });
        
        this.targetX = bestPosition.x;
        this.targetY = bestPosition.y;
    }

    defend(ball, distance) {
        if (this.role === 'goalkeeper') {
            // GK stays in goal area
            this.targetX = this.isHomeTeam ? this.fieldWidth * 0.0625 : this.fieldWidth * 0.9375; // 50px or 750px on 800px width
            this.targetY = this.fieldHeight * 0.5; // 250px on 500px height
        } else if (this.role === 'defender' && distance < this.fieldWidth * 0.25) { // 200px on 800px width
            // Defenders actively defend
            this.targetX = ball.x;
            this.targetY = ball.y;
        } else {
            // Return to defensive position
            this.returnToPosition();
        }
        this.running = distance > 20;
    }

    returnToPosition() {
        const formationPos = this.getFormationPosition();
        this.targetX = formationPos.x;
        this.targetY = formationPos.y;
    }

    getFormationPosition() {
        const formation = formations[selectedFormation];
        const isHome = this.isHomeTeam;
        const baseX = isHome ? this.fieldWidth * 0.125 : this.fieldWidth * 0.875; // 100px or 700px on 800px width
        
        if (formation && formation.positions[this.position]) {
            const pos = formation.positions[this.position];
            return {
                x: isHome ? pos.x * this.fieldWidth : this.fieldWidth - (pos.x * this.fieldWidth),
                y: pos.y * this.fieldHeight
            };
        }
        
        // Fallback positions (relative)
        const positions = {
            'GK': { x: isHome ? this.fieldWidth * 0.0625 : this.fieldWidth * 0.9375, y: this.fieldHeight * 0.5 },
            'RB': { x: baseX, y: this.fieldHeight * 0.2 }, 
            'CB1': { x: baseX, y: this.fieldHeight * 0.4 }, 
            'CB2': { x: baseX, y: this.fieldHeight * 0.6 }, 
            'LB': { x: baseX, y: this.fieldHeight * 0.8 },
            'RM': { x: baseX + (isHome ? this.fieldWidth * 0.1 : -this.fieldWidth * 0.1), y: this.fieldHeight * 0.2 },
            'CM1': { x: baseX + (isHome ? this.fieldWidth * 0.1 : -this.fieldWidth * 0.1), y: this.fieldHeight * 0.4 },
            'CM2': { x: baseX + (isHome ? this.fieldWidth * 0.1 : -this.fieldWidth * 0.1), y: this.fieldHeight * 0.6 },
            'LM': { x: baseX + (isHome ? this.fieldWidth * 0.1 : -this.fieldWidth * 0.1), y: this.fieldHeight * 0.8 },
            'ST1': { x: baseX + (isHome ? this.fieldWidth * 0.2 : -this.fieldWidth * 0.2), y: this.fieldHeight * 0.45 },
            'ST2': { x: baseX + (isHome ? this.fieldWidth * 0.2 : -this.fieldWidth * 0.2), y: this.fieldHeight * 0.55 }
        };

        return positions[this.position] || { x: baseX, y: this.fieldHeight * 0.5 };
    }

    kickBall(ball, power = 8, direction = null) {
        if (!this.hasBall || ball.possessedBy !== this) return false;

        const angle = direction || (this.isHomeTeam ? 0 : Math.PI);
        ball.speedX = Math.cos(angle) * power;
        ball.speedY = Math.sin(angle) * power;
        ball.possessedBy = null;
        this.hasBall = false;
        
        this.kicking = true;
        this.kickFrame = 0;
        
        return true;
    }

    passBall(ball, targetPlayer, game) {
        if (!this.hasBall || ball.possessedBy !== this) return false;

        const dx = targetPlayer.x - this.x;
        const dy = targetPlayer.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        
        const passAccuracy = 0.9 + (this.passing * 0.2);
        const randomAngle = (Math.random() - 0.5) * (1 - passAccuracy) * 0.5;
        
        ball.speedX = Math.cos(angle + randomAngle) * 6;
        ball.speedY = Math.sin(angle + randomAngle) * 6;
        ball.possessedBy = null;
        this.hasBall = false;
        
        this.kicking = true;
        this.kickFrame = 0;
        this.lastBallOwner = this;

        if (targetPlayer.isHomeTeam === this.isHomeTeam && 
            (game.userControlledTeam === 'home' || game.userControlledTeam === 'away' || game.userControlledTeam === 'both')) {
            game.switchUserControl(targetPlayer);
        }
        
        return true;
    }

    attemptTackle(ball, game) {
        if (this.tackling || !ball.possessedBy) return false;

        const opponent = ball.possessedBy;
        const dx = opponent.x - this.x;
        const dy = opponent.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.fieldWidth * 0.0375) { // 30px on 800px width
            this.tackling = true;
            this.tackleFrame = 0;
            
            // Success chance based on tackling skill
            const successChance = this.tacklingSkill * 0.6;
            if (Math.random() < successChance) {
                // Successful tackle
                ball.possessedBy.hasBall = false;
                ball.possessedBy = this;
                this.hasBall = true;
                
                // Switch control if this player is on user's team
                if ((this.isHomeTeam && (game.userControlledTeam === 'home' || game.userControlledTeam === 'both' || game.gameMode === 'player-vs-player')) ||
                    (!this.isHomeTeam && (game.userControlledTeam === 'away' || game.userControlledTeam === 'both' || game.gameMode === 'player-vs-player'))) {
                    game.switchUserControl(this);
                }
                return true;
            }
        }
        return false;
    }

    startSprint() {
        this.sprinting = true;
    }

    stopSprint() {
        this.sprinting = false;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        const facingRight = this.isHomeTeam || this.speedX > 0;
        const scaleX = facingRight ? 1 : -1;
        ctx.scale(scaleX, 1);

        // Highlight user-controlled player
        if (this.isCurrentUserControlled) {
            ctx.strokeStyle = this.sprinting ? '#FF0000' : '#FFFF00';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, this.radius + 3, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Draw tackle effect
        if (this.tackling) {
            ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
            ctx.beginPath();
            ctx.arc(0, 0, this.radius + 8, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw body (torso)
        ctx.fillStyle = this.color;
        ctx.fillRect(-4, -20, 8, 20);

        // Draw head
        ctx.fillStyle = '#FFDBAC';
        ctx.beginPath();
        ctx.arc(0, -30, 8, 0, Math.PI * 2);
        ctx.fill();

        // Draw hair
        ctx.fillStyle = '#2C3E50';
        ctx.beginPath();
        ctx.arc(0, -33, 7, 0, Math.PI, true);
        ctx.fill();

        // Draw face features
        ctx.fillStyle = '#2C3E50';
        ctx.beginPath();
        ctx.arc(-3, -32, 1.5, 0, Math.PI * 2);
        ctx.arc(3, -32, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(0, -28, 2, 0, Math.PI, false);
        ctx.stroke();

        // Draw arms
        ctx.fillStyle = this.color;
        const armAngle = this.armSwing;
        
        ctx.save();
        ctx.rotate(armAngle * Math.PI / 180);
        ctx.fillRect(-10, -18, 6, 2);
        ctx.restore();
        
        ctx.save();
        ctx.rotate(-armAngle * Math.PI / 180);
        ctx.fillRect(4, -18, 6, 2);
        ctx.restore();

        // Draw legs with running animation
        ctx.fillStyle = this.secondaryColor;
        const legAngle = this.legSwing;
        
        ctx.save();
        ctx.rotate(legAngle * Math.PI / 180);
        ctx.fillRect(-3, 0, 3, 20);
        ctx.restore();
        
        ctx.save();
        ctx.rotate(-legAngle * Math.PI / 180);
        ctx.fillRect(0, 0, 3, 20);
        ctx.restore();

        // Draw shoes
        ctx.fillStyle = '#2C3E50';
        ctx.fillRect(-4, 18, 4, 3);
        ctx.fillRect(0, 18, 4, 3);

        // Draw player number on back
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.number, 0, -10);

        // Draw player name if available
        if (this.playerData) {
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '8px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(this.playerData.name.split(' ')[1], 0, 25);
        }

        // Draw ball possession indicator
        if (this.hasBall) {
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(20, -10, 5, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}

// Enhanced TouchControls with new buttons - UPDATED FOR RESPONSIVE
class TouchControls {
    constructor(canvas, game) {
        this.canvas = canvas;
        this.game = game;
        this.fieldWidth = canvas.width;
        this.fieldHeight = canvas.height;
        
        // Make controls responsive
        this.joystick = {
            x: this.fieldWidth * 0.125, 
            y: this.fieldHeight * 0.8, 
            radius: this.fieldWidth * 0.05, 
            baseX: this.fieldWidth * 0.125, 
            baseY: this.fieldHeight * 0.8, 
            isActive: false, 
            touchId: null
        };
        this.shootButton = { 
            x: this.fieldWidth * 0.875, 
            y: this.fieldHeight * 0.8, 
            radius: this.fieldWidth * 0.04375, 
            isActive: false 
        };
        this.passButton = { 
            x: this.fieldWidth * 0.875, 
            y: this.fieldHeight * 0.68, 
            radius: this.fieldWidth * 0.04375, 
            isActive: false 
        };
        this.tackleButton = { 
            x: this.fieldWidth * 0.875, 
            y: this.fieldHeight * 0.56, 
            radius: this.fieldWidth * 0.04375, 
            isActive: false 
        };
        this.sprintButton = { 
            x: this.fieldWidth * 0.125, 
            y: this.fieldHeight * 0.68, 
            radius: this.fieldWidth * 0.04375, 
            isActive: false 
        };
        this.userInput = { x: 0, y: 0 };
        
        this.setupEventListeners();
    }

    // ... (keep all your existing TouchControls methods the same, they'll work with the new responsive positions)

    setupEventListeners() {
        this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
        this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));
        
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    }

    handleTouchStart(e) {
        e.preventDefault();
        const touches = e.changedTouches;
        
        for (let i = 0; i < touches.length; i++) {
            const touch = touches[i];
            const rect = this.canvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            
            // Check joystick
            const joystickDist = Math.sqrt(Math.pow(x - this.joystick.baseX, 2) + Math.pow(y - this.joystick.baseY, 2));
            if (joystickDist <= this.joystick.radius && !this.joystick.isActive) {
                this.joystick.isActive = true;
                this.joystick.touchId = touch.identifier;
                this.joystick.x = x;
                this.joystick.y = y;
            }
            
            // Check buttons
            this.checkButton(x, y, this.shootButton, () => this.game.userShoot());
            this.checkButton(x, y, this.passButton, () => this.game.userPass());
            this.checkButton(x, y, this.tackleButton, () => this.game.userTackle());
            this.checkButton(x, y, this.sprintButton, () => this.game.startSprint());
        }
    }

    checkButton(x, y, button, action) {
        const dist = Math.sqrt(Math.pow(x - button.x, 2) + Math.pow(y - button.y, 2));
        if (dist <= button.radius) {
            button.isActive = true;
            action();
        }
    }

    handleTouchMove(e) {
        e.preventDefault();
        const touches = e.changedTouches;
        
        for (let i = 0; i < touches.length; i++) {
            const touch = touches[i];
            
            if (this.joystick.isActive && touch.identifier === this.joystick.touchId) {
                const rect = this.canvas.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                
                const dx = x - this.joystick.baseX;
                const dy = y - this.joystick.baseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                const limitedDistance = Math.min(distance, this.joystick.radius);
                const angle = Math.atan2(dy, dx);
                
                this.joystick.x = this.joystick.baseX + Math.cos(angle) * limitedDistance;
                this.joystick.y = this.joystick.baseY + Math.sin(angle) * limitedDistance;
                
                this.userInput.x = dx / this.joystick.radius;
                this.userInput.y = dy / this.joystick.radius;
            }
        }
    }

    handleTouchEnd(e) {
        e.preventDefault();
        const touches = e.changedTouches;
        
        for (let i = 0; i < touches.length; i++) {
            const touch = touches[i];
            
            if (this.joystick.isActive && touch.identifier === this.joystick.touchId) {
                this.joystick.isActive = false;
                this.joystick.touchId = null;
                this.joystick.x = this.joystick.baseX;
                this.joystick.y = this.joystick.baseY;
                this.userInput.x = 0;
                this.userInput.y = 0;
            }
            
            this.sprintButton.isActive = false;
            this.game.stopSprint();
        }
        
        this.shootButton.isActive = false;
        this.passButton.isActive = false;
        this.tackleButton.isActive = false;
    }

    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const joystickDist = Math.sqrt(Math.pow(x - this.joystick.baseX, 2) + Math.pow(y - this.joystick.baseY, 2));
        if (joystickDist <= this.joystick.radius) {
            this.joystick.isActive = true;
            this.joystick.x = x;
            this.joystick.y = y;
        }
        
        this.checkButton(x, y, this.shootButton, () => this.game.userShoot());
        this.checkButton(x, y, this.passButton, () => this.game.userPass());
        this.checkButton(x, y, this.tackleButton, () => this.game.userTackle());
        this.checkButton(x, y, this.sprintButton, () => this.game.startSprint());
    }

    handleMouseMove(e) {
        if (this.joystick.isActive) {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const dx = x - this.joystick.baseX;
            const dy = y - this.joystick.baseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            const limitedDistance = Math.min(distance, this.joystick.radius);
            const angle = Math.atan2(dy, dx);
            
            this.joystick.x = this.joystick.baseX + Math.cos(angle) * limitedDistance;
            this.joystick.y = this.joystick.baseY + Math.sin(angle) * limitedDistance;
            
            this.userInput.x = dx / this.joystick.radius;
            this.userInput.y = dy / this.joystick.radius;
        }
    }

    handleMouseUp(e) {
        if (this.joystick.isActive) {
            this.joystick.isActive = false;
            this.joystick.x = this.joystick.baseX;
            this.joystick.y = this.joystick.baseY;
            this.userInput.x = 0;
            this.userInput.y = 0;
        }
        
        this.sprintButton.isActive = false;
        this.game.stopSprint();
        
        this.shootButton.isActive = false;
        this.passButton.isActive = false;
        this.tackleButton.isActive = false;
    }

    draw(ctx) {
        // Draw joystick
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.arc(this.joystick.baseX, this.joystick.baseY, this.joystick.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(this.joystick.x, this.joystick.y, this.fieldWidth * 0.025, 0, Math.PI * 2); // 20px on 800px width
        ctx.fill();
        
        // Draw action buttons
        this.drawButton(ctx, this.shootButton, 'SHOOT', this.shootButton.isActive ? 'rgba(255, 0, 0, 0.7)' : 'rgba(0, 255, 0, 0.7)');
        this.drawButton(ctx, this.passButton, 'PASS', this.passButton.isActive ? 'rgba(0, 100, 255, 0.7)' : 'rgba(0, 150, 255, 0.7)');
        this.drawButton(ctx, this.tackleButton, 'TACKLE', this.tackleButton.isActive ? 'rgba(255, 100, 0, 0.7)' : 'rgba(255, 150, 0, 0.7)');
        this.drawButton(ctx, this.sprintButton, 'SPRINT', this.sprintButton.isActive ? 'rgba(100, 255, 100, 0.7)' : 'rgba(150, 255, 150, 0.7)');
    }

    drawButton(ctx, button, text, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(button.x, button.y, button.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `${this.fieldWidth * 0.015}px Arial`; // 12px on 800px width
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, button.x, button.y);
    }

    getUserInput() {
        return { x: this.userInput.x, y: this.userInput.y };
    }
}

// Enhanced KeyboardControls with new keys - NO CHANGES NEEDED
class KeyboardControls {
    constructor(game) {
        this.game = game;
        this.keys = {
            ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false,
            ' ': false, 'x': false, 'c': false, 'Shift': false
        };
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (this.keys.hasOwnProperty(e.key)) {
                this.keys[e.key] = true;
                e.preventDefault();
            }
            
            if (e.key === 'Shift') {
                this.game.startSprint();
            }
        });

        document.addEventListener('keyup', (e) => {
            if (this.keys.hasOwnProperty(e.key)) {
                this.keys[e.key] = false;
                e.preventDefault();
                
                if (e.key === ' ') this.game.userShoot();
                if (e.key === 'x') this.game.userPass();
                if (e.key === 'c') this.game.userTackle();
            }
            
            if (e.key === 'Shift') {
                this.game.stopSprint();
            }
        });
    }

    getUserInput() {
        let x = 0, y = 0;
        
        if (this.keys.ArrowUp) y -= 1;
        if (this.keys.ArrowDown) y += 1;
        if (this.keys.ArrowLeft) x -= 1;
        if (this.keys.ArrowRight) x += 1;
        
        if (x !== 0 && y !== 0) {
            x *= 0.707;
            y *= 0.707;
        }
        
        return { x, y };
    }
}

// Formation Selection Overlay - NO CHANGES NEEDED
class FormationOverlay {
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
                <h3>Select Your Formation</h3>
                <div class="formation-options" id="formationOptions"></div>
                <button class="start-game-btn">Start Match</button>
            </div>
        `;
        document.body.appendChild(this.overlay);

        this.loadFormations();
        this.setupEventListeners();
    }

    loadFormations() {
        const options = document.getElementById('formationOptions');
        Object.keys(formations).forEach(formationKey => {
            const formation = formations[formationKey];
            const formationCard = document.createElement('div');
            formationCard.className = 'formation-card';
            if (formationKey === selectedFormation) {
                formationCard.classList.add('selected');
            }
            formationCard.innerHTML = `
                <h4>${formation.name}</h4>
                <p>${formation.description}</p>
                <div class="formation-preview">
                    ${this.generateFormationPreview(formation)}
                </div>
            `;
            formationCard.addEventListener('click', () => this.selectFormation(formationKey));
            options.appendChild(formationCard);
        });
    }

    generateFormationPreview(formation) {
        let preview = '<div class="formation-grid">';
        for (let y = 0; y <= 500; y += 50) {
            for (let x = 0; x <= 300; x += 30) {
                let hasPlayer = false;
                Object.values(formation.positions).forEach(pos => {
                    if (Math.abs(pos.x - x) < 15 && Math.abs(pos.y - y) < 15) {
                        hasPlayer = true;
                    }
                });
                preview += `<div class="formation-cell ${hasPlayer ? 'player' : ''}"></div>`;
            }
        }
        preview += '</div>';
        return preview;
    }

    selectFormation(formation) {
        selectedFormation = formation;
        document.querySelectorAll('.formation-card').forEach(card => {
            card.classList.remove('selected');
        });
        event.target.closest('.formation-card').classList.add('selected');
    }

    setupEventListeners() {
        const startBtn = this.overlay.querySelector('.start-game-btn');
        startBtn.addEventListener('click', () => this.startGame());
    }

    startGame() {
        this.isVisible = false;
        this.overlay.style.display = 'none';
        this.game.startMatch();
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

// Team Plays Overlay - NO CHANGES NEEDED
class TeamPlaysOverlay {
    constructor(game) {
        this.game = game;
        this.isVisible = false;
        this.selectedPlay = null;
        this.createOverlay();
    }

    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'team-plays-overlay';
        this.overlay.innerHTML = `
            <div class="plays-container">
                <h3>Select Team Play</h3>
                <div class="plays-grid" id="playsGrid"></div>
                <button class="close-plays-btn">Close</button>
            </div>
        `;
        this.overlay.style.display = 'none';
        document.body.appendChild(this.overlay);

        this.loadPlays();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const closeBtn = this.overlay.querySelector('.close-plays-btn');
        closeBtn.addEventListener('click', () => this.hide());
    }

    loadPlays() {
        const grid = document.getElementById('playsGrid');
        teamPlays.forEach(play => {
            const playCard = document.createElement('div');
            playCard.className = 'play-card';
            playCard.innerHTML = `
                <h4>${play.name}</h4>
                <p>${play.description}</p>
                <div class="play-effects">
                    ${Object.entries(play.effect).map(([stat, value]) => 
                        `<span class="effect ${value > 0 ? 'positive' : 'negative'}">${stat}: ${value > 0 ? '+' : ''}${value}</span>`
                    ).join('')}
                </div>
            `;
            playCard.addEventListener('click', () => this.selectPlay(play));
            grid.appendChild(playCard);
        });
    }

    selectPlay(play) {
        this.selectedPlay = play;
        this.game.applyTeamPlay(play);
        this.hide();
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

// Main Football Game Class - UPDATED FOR RESPONSIVE
class FootballGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        if (!this.canvas) {
            console.error('Canvas element not found!');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        
        // Set responsive canvas dimensions
        this.setupResponsiveCanvas();
        
        this.homeTeam = null;
        this.awayTeam = null;
        this.ball = null;
        this.players = [];
        this.userControlledPlayer = null;
        this.userControlledTeam = null;
        this.gameMode = 'player-vs-computer';
        this.matchStarted = false;
        
        // Enhanced features
        this.formationOverlay = new FormationOverlay(this);
        this.teamPlaysOverlay = new TeamPlaysOverlay(this);
        this.currentTactic = null;
        this.homeTeamPlayers = [];
        this.awayTeamPlayers = [];
        
        // Controls
        this.touchControls = null;
        this.keyboardControls = null;
        this.isMobile = this.detectMobile();
        
        this.score = { home: 0, away: 0 };
        this.time = 0;
        this.isPaused = false;
        this.isFirstHalf = true;
        
        this.stats = {
            possession: { home: 50, away: 50 },
            shots: { home: 0, away: 0 },
            fouls: { home: 0, away: 0 }
        };

        this.lastPossession = 'home';
        this.passPressed = false;
        this.tacklePressed = false;
        
        this.loadGameMode();
        this.loadTeams();
        this.setupField();
        this.assignPlayersToTeams();
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.handleResize(), 100);
        });
    }

    setupResponsiveCanvas() {
        const container = this.canvas.parentElement;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        // Set canvas dimensions to fill container
        this.canvas.width = containerWidth;
        this.canvas.height = containerHeight;
        
        this.fieldWidth = this.canvas.width;
        this.fieldHeight = this.canvas.height;
        
        console.log('Canvas resized to:', this.fieldWidth, 'x', this.fieldHeight);
    }

    handleResize() {
        if (!this.matchStarted) return;
        
        const oldWidth = this.fieldWidth;
        const oldHeight = this.fieldHeight;
        
        this.setupResponsiveCanvas();
        
        // Scale player positions
        const scaleX = this.fieldWidth / oldWidth;
        const scaleY = this.fieldHeight / oldHeight;
        
        this.players.forEach(player => {
            player.x *= scaleX;
            player.y *= scaleY;
            player.fieldWidth = this.fieldWidth;
            player.fieldHeight = this.fieldHeight;
            player.radius = this.fieldWidth * 0.01875;
            
            // Update base speed based on new field size
            const baseSpeedFactor = this.fieldWidth / 800;
            player.baseSpeed = (2 + Math.random() * 1) * baseSpeedFactor;
            player.speed = player.sprinting ? player.baseSpeed * 1.8 : player.baseSpeed;
        });
        
        // Update ball
        if (this.ball) {
            this.ball.x *= scaleX;
            this.ball.y *= scaleY;
            this.ball.fieldWidth = this.fieldWidth;
            this.ball.fieldHeight = this.fieldHeight;
            this.ball.radius = this.fieldWidth * 0.015;
        }
        
        // Update field
        this.setupField();
        
        // Update touch controls
        if (this.touchControls) {
            this.touchControls.fieldWidth = this.fieldWidth;
            this.touchControls.fieldHeight = this.fieldHeight;
            
            // Update control positions
            this.touchControls.joystick.baseX = this.fieldWidth * 0.125;
            this.touchControls.joystick.baseY = this.fieldHeight * 0.8;
            this.touchControls.joystick.radius = this.fieldWidth * 0.05;
            this.touchControls.joystick.x = this.touchControls.joystick.baseX;
            this.touchControls.joystick.y = this.touchControls.joystick.baseY;
            
            this.touchControls.shootButton.x = this.fieldWidth * 0.875;
            this.touchControls.shootButton.y = this.fieldHeight * 0.8;
            this.touchControls.shootButton.radius = this.fieldWidth * 0.04375;
            
            this.touchControls.passButton.x = this.fieldWidth * 0.875;
            this.touchControls.passButton.y = this.fieldHeight * 0.68;
            this.touchControls.passButton.radius = this.fieldWidth * 0.04375;
            
            this.touchControls.tackleButton.x = this.fieldWidth * 0.875;
            this.touchControls.tackleButton.y = this.fieldHeight * 0.56;
            this.touchControls.tackleButton.radius = this.fieldWidth * 0.04375;
            
            this.touchControls.sprintButton.x = this.fieldWidth * 0.125;
            this.touchControls.sprintButton.y = this.fieldHeight * 0.68;
            this.touchControls.sprintButton.radius = this.fieldWidth * 0.04375;
        }
    }

    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    startMatch() {
        this.matchStarted = true;
        this.setupPlayers();
        this.setupBall();
        this.setupControls();
        this.startGameTimer();
        this.startGameLoop();
        this.updateUI();
    }

    setupControls() {
        this.touchControls = new TouchControls(this.canvas, this);
        this.keyboardControls = new KeyboardControls(this);
    }
    
    loadGameMode() {
        try {
            const gameModeData = localStorage.getItem('gameMode');
            if (gameModeData) {
                this.gameMode = gameModeData;
            }
        } catch (error) {
            console.error('Error loading game mode:', error);
        }
    }
    
    loadTeams() {
        try {
            const homeData = localStorage.getItem('homeTeam');
            const awayData = localStorage.getItem('awayTeam');
            const userControlledTeamData = localStorage.getItem('userControlledTeam');
            
            if (homeData && awayData) {
                this.homeTeam = JSON.parse(homeData);
                this.awayTeam = JSON.parse(awayData);
                this.userControlledTeam = userControlledTeamData;
                
                document.getElementById('homeTeamName').textContent = this.homeTeam.shortName;
                document.getElementById('awayTeamName').textContent = this.awayTeam.shortName;
            } else {
                this.homeTeam = footballClubs[0];
                this.awayTeam = footballClubs[1];
                this.userControlledTeam = 'home';
                document.getElementById('homeTeamName').textContent = this.homeTeam.shortName;
                document.getElementById('awayTeamName').textContent = this.awayTeam.shortName;
            }
        } catch (error) {
            console.error('Error loading teams:', error);
            this.homeTeam = footballClubs[0];
            this.awayTeam = footballClubs[1];
            this.userControlledTeam = 'home';
        }
    }

    assignPlayersToTeams() {
        const shuffledPlayers = [...footballPlayers].sort(() => Math.random() - 0.5);
        
        this.homeTeamPlayers = shuffledPlayers.slice(0, 5);
        this.awayTeamPlayers = shuffledPlayers.slice(5, 10);
        
        while (this.homeTeamPlayers.length < 11) {
            this.homeTeamPlayers.push({ 
                name: `Player ${this.homeTeamPlayers.length + 1}`, 
                position: 'Generic', 
                rating: 70 
            });
        }
        while (this.awayTeamPlayers.length < 11) {
            this.awayTeamPlayers.push({ 
                name: `Player ${this.awayTeamPlayers.length + 1}`, 
                position: 'Generic', 
                rating: 70 
            });
        }
    }
    
    setupField() {
        this.field = {
            width: this.fieldWidth,
            height: this.fieldHeight,
            center: { x: this.fieldWidth / 2, y: this.fieldHeight / 2 },
            goalWidth: this.fieldWidth * 0.1, // 80px on 800px width
            goalHeight: this.fieldHeight * 0.04 // 20px on 500px height
        };
    }
    
    setupPlayers() {
        this.players = [];
        const formation = formations[selectedFormation];
        const homePositions = Object.keys(formation.positions);
        const awayPositions = Object.keys(formation.positions);

        homePositions.forEach((position, index) => {
            const formationPos = this.getFormationPosition(position, true);
            const playerData = this.homeTeamPlayers[index];
            let isUserControlled = false;
            
            if (this.gameMode === 'player-vs-player') {
                isUserControlled = (index === 9);
            } else {
                isUserControlled = (this.userControlledTeam === 'home' || this.userControlledTeam === 'both') && index === 9;
            }
            
            const player = new AnimatedPlayer({
                x: formationPos.x,
                y: formationPos.y,
                fieldWidth: this.fieldWidth,
                fieldHeight: this.fieldHeight,
                color: this.homeTeam.color,
                secondaryColor: this.homeTeam.secondaryColor,
                number: index + 1,
                position: position,
                isHomeTeam: true,
                teamName: this.homeTeam.name,
                isUserControlled: isUserControlled,
                isCurrentUserControlled: isUserControlled,
                playerData: playerData
            });
            
            this.players.push(player);
            
            if (isUserControlled) {
                this.userControlledPlayer = player;
            }
        });

        awayPositions.forEach((position, index) => {
            const formationPos = this.getFormationPosition(position, false);
            const playerData = this.awayTeamPlayers[index];
            let isUserControlled = false;
            
            if (this.gameMode === 'player-vs-player') {
                isUserControlled = (index === 9);
            } else {
                isUserControlled = (this.userControlledTeam === 'away' || this.userControlledTeam === 'both') && index === 9;
            }
            
            const player = new AnimatedPlayer({
                x: formationPos.x,
                y: formationPos.y,
                fieldWidth: this.fieldWidth,
                fieldHeight: this.fieldHeight,
                color: this.awayTeam.color,
                secondaryColor: this.awayTeam.secondaryColor,
                number: index + 1,
                position: position,
                isHomeTeam: false,
                teamName: this.awayTeam.name,
                isUserControlled: isUserControlled,
                isCurrentUserControlled: isUserControlled,
                playerData: playerData
            });
            
            this.players.push(player);
            
            if (isUserControlled && !this.userControlledPlayer) {
                this.userControlledPlayer = player;
            }
        });
    }

    getFormationPosition(position, isHomeTeam) {
        const formation = formations[selectedFormation];
        
        if (formation && formation.positions[position]) {
            const pos = formation.positions[position];
            return {
                x: isHomeTeam ? pos.x * this.fieldWidth : this.fieldWidth - (pos.x * this.fieldWidth),
                y: pos.y * this.fieldHeight
            };
        }
        
        // Fallback positions (relative)
        const baseX = isHomeTeam ? this.fieldWidth * 0.125 : this.fieldWidth * 0.875;
        const positions = {
            'GK': { x: isHomeTeam ? this.fieldWidth * 0.0625 : this.fieldWidth * 0.9375, y: this.fieldHeight * 0.5 },
            'RB': { x: baseX, y: this.fieldHeight * 0.2 }, 
            'CB1': { x: baseX, y: this.fieldHeight * 0.4 }, 
            'CB2': { x: baseX, y: this.fieldHeight * 0.6 }, 
            'LB': { x: baseX, y: this.fieldHeight * 0.8 },
            'RM': { x: baseX + (isHomeTeam ? this.fieldWidth * 0.1 : -this.fieldWidth * 0.1), y: this.fieldHeight * 0.2 },
            'CM1': { x: baseX + (isHomeTeam ? this.fieldWidth * 0.1 : -this.fieldWidth * 0.1), y: this.fieldHeight * 0.4 },
            'CM2': { x: baseX + (isHomeTeam ? this.fieldWidth * 0.1 : -this.fieldWidth * 0.1), y: this.fieldHeight * 0.6 },
            'LM': { x: baseX + (isHomeTeam ? this.fieldWidth * 0.1 : -this.fieldWidth * 0.1), y: this.fieldHeight * 0.8 },
            'ST1': { x: baseX + (isHomeTeam ? this.fieldWidth * 0.2 : -this.fieldWidth * 0.2), y: this.fieldHeight * 0.45 },
            'ST2': { x: baseX + (isHomeTeam ? this.fieldWidth * 0.2 : -this.fieldWidth * 0.2), y: this.fieldHeight * 0.55 }
        };

        return positions[this.position] || { x: baseX, y: this.fieldHeight * 0.5 };
    }
    
    setupBall() {
        this.ball = new FootballBall(this.field.center.x, this.field.center.y, this.fieldWidth, this.fieldHeight);
    }
    
    startGameLoop() {
        const gameLoop = () => {
            if (!this.isPaused && this.matchStarted) {
                this.update();
                this.render();
                this.time += 0.016;
                this.updateUI();
            }
            requestAnimationFrame(gameLoop);
        };
        gameLoop();
    }

    startGameTimer() {
        gameTimer.currentTime = 0;
        gameTimer.isGameEnded = false;
        
        if (gameTimer.gameTimerInterval) {
            clearInterval(gameTimer.gameTimerInterval);
        }
        
        gameTimer.gameTimerInterval = setInterval(() => {
            if (!this.isPaused && this.matchStarted && !gameTimer.isGameEnded) {
                gameTimer.currentTime++;
                
                // Update time display
                this.updateUI();
                
                // Check if game time is over (5 minutes)
                if (gameTimer.currentTime >= gameTimer.totalTime) {
                    this.endGame();
                }
            }
        }, 1000);
    }

    endGame() {
        gameTimer.isGameEnded = true;
        this.matchStarted = false;
        
        if (gameTimer.gameTimerInterval) {
            clearInterval(gameTimer.gameTimerInterval);
        }
        
        this.showGameEndOverlay();
    }

    showGameEndOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'gameEndOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            color: white;
            font-family: Arial, sans-serif;
        `;
        
        const winner = this.score.home > this.score.away ? this.homeTeam.name : 
                      this.score.away > this.score.home ? this.awayTeam.name : 'Draw';
        
        overlay.innerHTML = `
            <div style="text-align: center; padding: 40px; background: #2c3e50; border-radius: 20px; border: 3px solid #ecf0f1;">
                <h1 style="font-size: 3rem; margin-bottom: 20px; color: #f39c12;">🏆 FULL TIME! 🏆</h1>
                <div style="font-size: 4rem; margin: 30px 0; font-weight: bold;">
                    ${this.score.home} - ${this.score.away}
                </div>
                <div style="font-size: 2rem; margin-bottom: 30px; color: #2ecc71;">
                    ${winner} ${winner === 'Draw' ? '' : 'Wins!'}
                </div>
                <button id="playAgainBtn" style="
                    padding: 20px 50px;
                    font-size: 1.5rem;
                    background: linear-gradient(45deg, #00b09b, #96c93d);
                    color: white;
                    border: none;
                    border-radius: 50px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: all 0.3s ease;
                ">Play Again</button>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        document.getElementById('playAgainBtn').addEventListener('click', () => {
            this.restartGame();
        });
    }

    restartGame() {
        // Remove overlay
        const overlay = document.getElementById('gameEndOverlay');
        if (overlay) overlay.remove();
        
        // Reset game state
        gameTimer.isGameEnded = false;
        gameTimer.currentTime = 0;
        this.isPaused = false;
        this.matchStarted = false;
        
        // Reset score and stats
        this.score = { home: 0, away: 0 };
        this.stats = {
            possession: { home: 50, away: 50 },
            shots: { home: 0, away: 0 },
            fouls: { home: 0, away: 0 }
        };
        
        // Reset players and ball
        this.resetPlay();
        
        // Update UI
        this.updateUI();
        
        // Show formation overlay to start new game
        this.formationOverlay.show();
    }
    
    update() {
        if (!this.matchStarted) return;

        let userInput;
        if (this.isMobile) {
            userInput = this.touchControls.getUserInput();
        } else {
            userInput = this.keyboardControls.getUserInput();
        }

        this.players.forEach(player => {
            if (player.isCurrentUserControlled) {
                player.update(this.ball, userInput, this);
            } else {
                player.update(this.ball, null, this);
            }
        });

        this.ball.update();
        
        this.checkBallPossession();
        this.checkGoals();
        this.updatePossession();
        
        if (this.passPressed) {
            this.userPass();
            this.passPressed = false;
        }
        
        if (this.tacklePressed) {
            this.userTackle();
            this.tacklePressed = false;
        }
    }

    checkBallPossession() {
        if (this.ball.possessedBy && (Math.abs(this.ball.speedX) > 1 || Math.abs(this.ball.speedY) > 1)) {
            this.ball.possessedBy.hasBall = false;
            this.ball.possessedBy = null;
            return;
        }

        if (!this.ball.possessedBy) {
            let closestPlayer = null;
            let closestDistance = Infinity;

            this.players.forEach(player => {
                const dx = player.x - this.ball.x;
                const dy = player.y - this.ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.fieldWidth * 0.0375 && distance < closestDistance) { // 30px on 800px width
                    closestDistance = distance;
                    closestPlayer = player;
                }
            });

            if (closestPlayer && closestDistance < this.fieldWidth * 0.0375) {
                this.ball.possessedBy = closestPlayer;
                closestPlayer.hasBall = true;
                this.ball.speedX = 0;
                this.ball.speedY = 0;

                if ((closestPlayer.isHomeTeam && (this.userControlledTeam === 'home' || this.userControlledTeam === 'both' || this.gameMode === 'player-vs-player')) ||
                    (!closestPlayer.isHomeTeam && (this.userControlledTeam === 'away' || this.userControlledTeam === 'both' || this.gameMode === 'player-vs-player'))) {
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

    userShoot() {
        if (this.userControlledPlayer && this.userControlledPlayer.hasBall) {
            const direction = Math.atan2(
                this.userControlledPlayer.speedY,
                this.userControlledPlayer.speedX
            ) || (this.userControlledPlayer.isHomeTeam ? 0 : Math.PI);
            
            this.userControlledPlayer.kickBall(this.ball, 12, direction);
            
            if (this.userControlledPlayer.isHomeTeam) {
                this.stats.shots.home++;
            } else {
                this.stats.shots.away++;
            }
        }
    }

    userPass() {
        if (this.userControlledPlayer && this.userControlledPlayer.hasBall) {
            let closestTeammate = null;
            let closestDistance = Infinity;

            this.players.forEach(player => {
                if (player !== this.userControlledPlayer && 
                    player.isHomeTeam === this.userControlledPlayer.isHomeTeam) {
                    const dx = player.x - this.userControlledPlayer.x;
                    const dy = player.y - this.userControlledPlayer.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < closestDistance && distance < this.fieldWidth * 0.25) { // 200px on 800px width
                        closestDistance = distance;
                        closestTeammate = player;
                    }
                }
            });

            if (closestTeammate) {
                this.userControlledPlayer.passBall(this.ball, closestTeammate, this);
            }
        }
    }

    userTackle() {
        if (this.userControlledPlayer && !this.userControlledPlayer.hasBall) {
            this.userControlledPlayer.attemptTackle(this.ball, this);
        }
    }

    startSprint() {
        if (this.userControlledPlayer) {
            this.userControlledPlayer.startSprint();
        }
    }

    stopSprint() {
        if (this.userControlledPlayer) {
            this.userControlledPlayer.stopSprint();
        }
    }
    
    updatePossession() {
        if (this.ball.possessedBy) {
            this.lastPossession = this.ball.possessedBy.isHomeTeam ? 'home' : 'away';
        }

        if (this.lastPossession === 'home') {
            this.stats.possession.home = Math.min(100, this.stats.possession.home + 0.1);
            this.stats.possession.away = Math.max(0, this.stats.possession.away - 0.1);
        } else {
            this.stats.possession.away = Math.min(100, this.stats.possession.away + 0.1);
            this.stats.possession.home = Math.max(0, this.stats.possession.home - 0.1);
        }
    }
    
    checkGoals() {
        const goalLine = this.fieldWidth * 0.025; // 20px on 800px width
        const goalTop = this.fieldHeight / 2 - this.fieldHeight * 0.08; // 40px on 500px height
        const goalBottom = this.fieldHeight / 2 + this.fieldHeight * 0.08; // 40px on 500px height
        
        if (this.ball.x - this.ball.radius < goalLine && 
            this.ball.y > goalTop && 
            this.ball.y < goalBottom) {
            this.score.away++;
            this.resetPlay();
        }
        
        if (this.ball.x + this.ball.radius > this.fieldWidth - goalLine && 
            this.ball.y > goalTop && 
            this.ball.y < goalBottom) {
            this.score.home++;
            this.resetPlay();
        }
    }
    
    resetPlay() {
        this.ball.x = this.field.center.x;
        this.ball.y = this.field.center.y;
        this.ball.speedX = 0;
        this.ball.speedY = 0;
        this.ball.possessedBy = null;
        
        this.players.forEach(player => {
            player.hasBall = false;
        });
        
        this.setupPlayers();
    }

    showTeamPlays() {
        this.teamPlaysOverlay.show();
    }

    hideTeamPlays() {
        this.teamPlaysOverlay.hide();
    }

    applyTeamPlay(play) {
        this.currentTactic = play;
        this.players.forEach(player => {
            if (player.isHomeTeam) {
                player.speed *= (1 + (play.effect.speed || 0) / 100);
            }
        });
    }
    
    render() {
        this.drawGrass();
        this.drawField();
        this.players.forEach(player => player.draw(this.ctx));
        this.ball.draw(this.ctx);

        if (this.isMobile && this.matchStarted) {
            this.touchControls.draw(this.ctx);
        }

        this.drawControlsInfo();

        if (this.currentTactic) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            this.ctx.fillRect(this.fieldWidth * 0.375, 10, this.fieldWidth * 0.25, 30); // 300px, 200px on 800px width
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.font = '14px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(`Active Play: ${this.currentTactic.name}`, this.fieldWidth * 0.5, 30); // 400px on 800px width
        }

        if (this.matchStarted) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(10, this.fieldHeight - 40, this.fieldWidth * 0.25, 30); // 200px on 800px width
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.font = '12px Arial';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(`Mode: ${this.gameMode === 'player-vs-player' ? 'Player vs Player' : 'Player vs Computer'}`, 20, this.fieldHeight - 20);
        }
    }

    drawControlsInfo() {
        if (!this.matchStarted) return;

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(10, 10, this.fieldWidth * 0.35, this.isMobile ? 120 : 100); // 280px on 800px width
        
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'left';
        
        if (this.isMobile) {
            this.ctx.fillText('CONTROLS:', 20, 30);
            this.ctx.fillText('• Left side: Move player', 20, 45);
            this.ctx.fillText('• Green: Shoot | Blue: Pass', 20, 60);
            this.ctx.fillText('• Orange: Tackle | Light Green: Sprint', 20, 75);
            this.ctx.fillText(`Formation: ${selectedFormation}`, 20, 100);
        } else {
            this.ctx.fillText('CONTROLS:', 20, 30);
            this.ctx.fillText('• Arrow Keys: Move player', 20, 45);
            this.ctx.fillText('• Space: Shoot | X: Pass | C: Tackle', 20, 60);
            this.ctx.fillText('• Shift: Sprint (1.8x speed)', 20, 75);
            this.ctx.fillText(`Formation: ${selectedFormation}`, 20, 100);
        }
    }

    drawGrass() {
        this.ctx.fillStyle = '#27ae60';
        this.ctx.fillRect(0, 0, this.fieldWidth, this.fieldHeight);

        this.ctx.strokeStyle = '#229954';
        this.ctx.lineWidth = 1;
        
        const patternSize = this.fieldWidth * 0.025; // 20px on 800px width
        for (let i = 0; i < this.fieldWidth; i += patternSize) {
            for (let j = 0; j < this.fieldHeight; j += patternSize) {
                this.ctx.beginPath();
                this.ctx.moveTo(i, j);
                this.ctx.lineTo(i + patternSize * 0.5, j + patternSize * 0.5);
                this.ctx.stroke();
            }
        }
    }
    
    drawField() {
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([]);
        
        const border = this.fieldWidth * 0.025; // 20px on 800px width
        this.ctx.strokeRect(border, border, this.fieldWidth - border * 2, this.fieldHeight - border * 2);
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.fieldWidth / 2, border);
        this.ctx.lineTo(this.fieldWidth / 2, this.fieldHeight - border);
        this.ctx.stroke();
        
        const centerCircleRadius = this.fieldWidth * 0.075; // 60px on 800px width
        this.ctx.beginPath();
        this.ctx.arc(this.field.center.x, this.field.center.y, centerCircleRadius, 0, Math.PI * 2);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(this.field.center.x, this.field.center.y, 2, 0, Math.PI * 2);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fill();
        
        this.ctx.fillStyle = '#ffffff';
        const goalPostWidth = this.fieldWidth * 0.00625; // 5px on 800px width
        const goalHeight = this.fieldHeight * 0.16; // 80px on 500px height
        this.ctx.fillRect(border, this.fieldHeight / 2 - goalHeight / 2, goalPostWidth, goalHeight);
        this.ctx.fillRect(this.fieldWidth - border - goalPostWidth, this.fieldHeight / 2 - goalHeight / 2, goalPostWidth, goalHeight);

        const goalAreaWidth = this.fieldWidth * 0.05; // 40px on 800px width
        const goalAreaHeight = this.fieldHeight * 0.32; // 160px on 500px height
        this.ctx.strokeRect(border, this.fieldHeight / 2 - goalAreaHeight / 2, goalAreaWidth, goalAreaHeight);
        this.ctx.strokeRect(this.fieldWidth - border - goalAreaWidth, this.fieldHeight / 2 - goalAreaHeight / 2, goalAreaWidth, goalAreaHeight);

        const penaltyAreaWidth = this.fieldWidth * 0.15; // 120px on 800px width
        const penaltyAreaHeight = this.fieldHeight * 0.64; // 320px on 500px height
        this.ctx.strokeRect(border, this.fieldHeight / 2 - penaltyAreaHeight / 2, penaltyAreaWidth, penaltyAreaHeight);
        this.ctx.strokeRect(this.fieldWidth - border - penaltyAreaWidth, this.fieldHeight / 2 - penaltyAreaHeight / 2, penaltyAreaWidth, penaltyAreaHeight);
    }
    
    updateUI() {
        if (!document.getElementById('homeScore') || !this.matchStarted) return;
        
        document.getElementById('homeScore').textContent = this.score.home;
        document.getElementById('awayScore').textContent = this.score.away;
        
        // Use the game timer instead of this.time
        const minutes = Math.floor(gameTimer.currentTime / 60);
        const seconds = Math.floor(gameTimer.currentTime % 60);
        document.getElementById('matchTime').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        document.getElementById('homePossession').style.width = `${this.stats.possession.home}%`;
        document.getElementById('awayPossession').style.width = `${this.stats.possession.away}%`;
        document.getElementById('homePossession').textContent = `${Math.round(this.stats.possession.home)}%`;
        document.getElementById('awayPossession').textContent = `${Math.round(this.stats.possession.away)}%`;
        
        document.getElementById('homeShots').textContent = Math.floor(this.stats.shots.home);
        document.getElementById('awayShots').textContent = Math.floor(this.stats.shots.away);
    }
}

// Global game instance
let game;

// Game Mode Selection Functions
function selectGameMode(mode) {
    selectedGameMode = mode;
    localStorage.setItem('gameMode', mode);
    
    document.querySelectorAll('.game-mode-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

// Game control functions
function togglePause() {
    if (game) {
        game.isPaused = !game.isPaused;
        const btn = document.getElementById('pauseBtn');
        btn.textContent = game.isPaused ? '▶️ Resume' : '⏸️ Pause';
    }
}

function showTeamPlays() {
    if (game) {
        game.showTeamPlays();
    }
}

function changeFormation() {
    if (game && game.formationOverlay) {
        game.formationOverlay.show();
    }
}

function makeSubstitution() {
    alert('Substitution feature coming soon!');
}

function changeTactics() {
    alert('Tactics change feature coming soon!');
}

function goToMenu() {
    window.location.href = 'index.html';
}

// Initialize game when page loads
window.addEventListener('load', () => {
    game = new FootballGame();
});

// Enhanced CSS for new features - ADD RESPONSIVE CSS
const additionalCSS = `
/* Responsive base styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    color: white;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    position: fixed;
}

/* Responsive game container */
.game-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    padding: 10px;
    gap: 10px;
}

/* Responsive canvas container */
.field-container {
    flex: 1;
    width: 100%;
    position: relative;
    background: #27ae60;
    border-radius: 10px;
    overflow: hidden;
    border: 3px solid #ecf0f1;
    min-height: 200px;
}

#gameCanvas {
    width: 100% !important;
    height: 100% !important;
    display: block;
}

/* Responsive scoreboard */
.scoreboard {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
    padding: 15px;
    border-radius: 15px;
    width: 100%;
    min-height: 80px;
}

.team {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
}

.team-name {
    font-size: clamp(14px, 4vw, 20px);
    font-weight: bold;
    margin-bottom: 5px;
    text-align: center;
}

.team-score {
    font-size: clamp(24px, 8vw, 36px);
    font-weight: bold;
}

.match-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
}

.match-time {
    font-size: clamp(18px, 6vw, 28px);
    font-weight: bold;
    margin-bottom: 5px;
}

.match-half {
    font-size: clamp(12px, 3vw, 16px);
    color: #ccc;
}

/* Responsive game controls */
.game-controls {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    width: 100%;
    padding: 10px 0;
}

.game-controls button {
    padding: clamp(8px, 3vw, 12px);
    background: linear-gradient(45deg, #3498db, #2980b9);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: clamp(12px, 3.5vw, 16px);
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    min-height: 44px;
}

.game-controls button:active {
    transform: scale(0.95);
    background: linear-gradient(45deg, #2980b9, #1f618d);
}

/* Responsive match stats */
.match-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
    padding: 15px;
    border-radius: 15px;
}

.stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.stat span:first-child {
    font-size: clamp(12px, 3vw, 14px);
    margin-bottom: 5px;
    color: #ccc;
}

.possession-bar {
    width: 100%;
    height: 20px;
    background: #34495e;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    margin-top: 5px;
}

.home-possession, .away-possession {
    height: 100%;
    transition: width 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: bold;
    color: white;
}

.home-possession {
    background: #e74c3c;
}

.away-possession {
    background: #3498db;
}

/* Landscape orientation */
@media (orientation: landscape) {
    .game-container {
        flex-direction: row;
        flex-wrap: wrap;
        padding: 5px;
        gap: 5px;
    }

    .scoreboard {
        order: 1;
        width: 100%;
        min-height: 60px;
    }

    .field-container {
        order: 2;
        flex: 2;
        min-height: auto;
    }

    .game-controls {
        order: 3;
        width: auto;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(4, 1fr);
    }

    .match-stats {
        order: 4;
        flex: 1;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(3, 1fr);
        min-width: 120px;
    }

    .team {
        flex-direction: row;
        justify-content: space-around;
    }

    .team-name {
        margin-bottom: 0;
        margin-right: 10px;
    }
}

/* Small screens */
@media (max-width: 320px) {
    .game-container {
        padding: 5px;
        gap: 5px;
    }
    
    .scoreboard {
        padding: 10px;
    }
    
    .game-controls button {
        padding: 6px;
        font-size: 11px;
    }
}

/* Large screens */
@media (min-width: 768px) {
    .game-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
    }
}

/* Safe area support */
@supports(padding: max(0px)) {
    .game-container {
        padding-left: max(10px, env(safe-area-inset-left));
        padding-right: max(10px, env(safe-area-inset-right));
        padding-top: max(10px, env(safe-area-inset-top));
        padding-bottom: max(10px, env(safe-area-inset-bottom));
    }
}

/* Keep all your existing overlay styles */
.formation-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.formation-container {
    background: #2c3e50;
    padding: 30px;
    border-radius: 15px;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    text-align: center;
}

.formation-options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin: 30px 0;
}

.formation-card {
    background: #34495e;
    padding: 20px;
    border-radius: 10px;
    cursor: pointer;
    border: 3px solid transparent;
    transition: all 0.3s ease;
}

.formation-card:hover {
    border-color: #3498db;
    transform: translateY(-5px);
}

.formation-card.selected {
    border-color: #2ecc71;
    background: #2c3e50;
}

.formation-card h4 {
    margin: 0 0 10px 0;
    color: #ecf0f1;
    font-size: 18px;
}

.formation-card p {
    margin: 0 0 15px 0;
    color: #bdc3c7;
    font-size: 14px;
}

.formation-preview {
    background: #27ae60;
    border-radius: 5px;
    padding: 10px;
}

.formation-grid {
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    grid-template-rows: repeat(11, 1fr);
    gap: 1px;
    width: 100%;
    height: 120px;
}

.formation-cell {
    background: #229954;
    border-radius: 1px;
}

.formation-cell.player {
    background: #e74c3c;
    border-radius: 50%;
}

.start-game-btn {
    background: #2ecc71;
    color: white;
    border: none;
    padding: 15px 40px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    transition: all 0.3s ease;
}

.start-game-btn:hover {
    background: #27ae60;
    transform: scale(1.05);
}

.team-plays-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.plays-container {
    background: #2c3e50;
    padding: 20px;
    border-radius: 10px;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
}

.plays-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin: 20px 0;
}

.play-card {
    background: #34495e;
    padding: 15px;
    border-radius: 8px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.3s ease;
}

.play-card:hover {
    border-color: #3498db;
    transform: translateY(-2px);
}

.play-card h4 {
    margin: 0 0 8px 0;
    color: #ecf0f1;
}

.play-card p {
    margin: 0 0 10px 0;
    color: #bdc3c7;
    font-size: 12px;
}

.play-effects {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}

.effect {
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 10px;
}

.effect.positive {
    background: #27ae60;
    color: white;
}

.effect.negative {
    background: #e74c3c;
    color: white;
}

.close-plays-btn {
    background: #e74c3c;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
}

.close-plays-btn:hover {
    background: #c0392b;
}

.game-mode-selection {
    margin: 20px 0;
    text-align: center;
}

.game-mode-options {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 10px;
}

.game-mode-btn {
    background: #3498db;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
}

.game-mode-btn:hover {
    background: #2980b9;
    transform: translateY(-2px);
}

.game-mode-btn.selected {
    background: #2ecc71;
    border: 3px solid #27ae60;
}

#gameEndOverlay {
    animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
}

#playAgainBtn:hover {
    transform: scale(1.1);
    background: linear-gradient(45deg, #96c93d, #00b09b) !important;
    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
}
`;

// Inject the CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);