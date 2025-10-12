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

// Available Formations
const formations = {
    '4-4-2': {
        name: '4-4-2',
        description: 'Classic balanced formation',
        positions: {
            'GK': { x: 50, y: 250 },
            'RB': { x: 100, y: 100 },
            'CB1': { x: 100, y: 200 },
            'CB2': { x: 100, y: 300 },
            'LB': { x: 100, y: 400 },
            'RM': { x: 180, y: 100 },
            'CM1': { x: 180, y: 200 },
            'CM2': { x: 180, y: 300 },
            'LM': { x: 180, y: 400 },
            'ST1': { x: 260, y: 225 },
            'ST2': { x: 260, y: 275 }
        }
    },
    '4-3-3': {
        name: '4-3-3',
        description: 'Attacking formation with wingers',
        positions: {
            'GK': { x: 50, y: 250 },
            'RB': { x: 100, y: 100 },
            'CB1': { x: 100, y: 200 },
            'CB2': { x: 100, y: 300 },
            'LB': { x: 100, y: 400 },
            'CM1': { x: 180, y: 150 },
            'CM2': { x: 180, y: 250 },
            'CM3': { x: 180, y: 350 },
            'RW': { x: 260, y: 100 },
            'ST': { x: 260, y: 250 },
            'LW': { x: 260, y: 400 }
        }
    },
    '3-5-2': {
        name: '3-5-2',
        description: 'Midfield dominance formation',
        positions: {
            'GK': { x: 50, y: 250 },
            'CB1': { x: 100, y: 150 },
            'CB2': { x: 100, y: 250 },
            'CB3': { x: 100, y: 350 },
            'RM': { x: 180, y: 100 },
            'CM1': { x: 180, y: 200 },
            'CM2': { x: 180, y: 250 },
            'CM3': { x: 180, y: 300 },
            'LM': { x: 180, y: 400 },
            'ST1': { x: 260, y: 200 },
            'ST2': { x: 260, y: 300 }
        }
    },
    '4-2-3-1': {
        name: '4-2-3-1',
        description: 'Modern attacking formation',
        positions: {
            'GK': { x: 50, y: 250 },
            'RB': { x: 100, y: 100 },
            'CB1': { x: 100, y: 200 },
            'CB2': { x: 100, y: 300 },
            'LB': { x: 100, y: 400 },
            'CDM1': { x: 160, y: 200 },
            'CDM2': { x: 160, y: 300 },
            'CAM': { x: 220, y: 250 },
            'RW': { x: 260, y: 150 },
            'LW': { x: 260, y: 350 },
            'ST': { x: 300, y: 250 }
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

// Enhanced FootballBall class
class FootballBall {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 12;
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

        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.speedX *= -0.7;
        }
        if (this.x + this.radius > 800) {
            this.x = 800 - this.radius;
            this.speedX *= -0.7;
        }
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.speedY *= -0.7;
        }
        if (this.y + this.radius > 500) {
            this.y = 500 - this.radius;
            this.speedY *= -0.7;
        }

        if (Math.abs(this.speedX) < 0.1) this.speedX = 0;
        if (Math.abs(this.speedY) < 0.1) this.speedY = 0;
    }

    startAutoMovement() {
        this.isMovingAutomatically = true;
        this.autoMoveTimer = 60 + Math.random() * 120;
        
        const centerX = 400, centerY = 250;
        const dx = centerX - this.x;
        const dy = centerY - this.y;
        
        this.autoMoveDirection = {
            x: (Math.random() - 0.5 + dx * 0.001) * 2,
            y: (Math.random() - 0.5 + dy * 0.001) * 2
        };
        
        const length = Math.sqrt(this.autoMoveDirection.x ** 2 + this.autoMoveDirection.y ** 2);
        this.autoMoveDirection.x /= length;
        this.autoMoveDirection.y /= length;
        
        this.speedX = this.autoMoveDirection.x * (2 + Math.random() * 3);
        this.speedY = this.autoMoveDirection.y * (2 + Math.random() * 3);
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

// Enhanced AnimatedPlayer class with new controls
class AnimatedPlayer {
    constructor(config) {
        this.x = config.x;
        this.y = config.y;
        this.radius = 15;
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
        
        // Player attributes
        this.baseSpeed = 2 + Math.random() * 1;
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

        this.x = Math.max(this.radius, Math.min(800 - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(500 - this.radius, this.y));

        if (this.hasBall && ball.possessedBy === this) {
            ball.x = this.x + (this.isHomeTeam ? 25 : -25);
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
            if (distance < 150 && this.aggression > 0.3) {
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
            distance < 30 && Math.random() < 0.02) {
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
            const goalX = this.isHomeTeam ? 750 : 50;
            let supportDistance = 60;
            
            if (this.role === 'defender') {
                // Defenders stay back
                supportDistance = 100;
                this.targetX = this.getFormationPosition().x;
                this.targetY = this.getFormationPosition().y;
            } else if (this.role === 'attacker') {
                // Attackers move forward
                supportDistance = 40;
                const dx = goalX - ballOwner.x;
                const dy = 250 - ballOwner.y;
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
        const possiblePositions = [
            { x: ballOwner.x + 80, y: ballOwner.y - 60 },
            { x: ballOwner.x + 80, y: ballOwner.y + 60 },
            { x: ballOwner.x - 80, y: ballOwner.y - 60 },
            { x: ballOwner.x - 80, y: ballOwner.y + 60 }
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
            this.targetX = this.isHomeTeam ? 50 : 750;
            this.targetY = 250;
        } else if (this.role === 'defender' && distance < 200) {
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
        const baseX = isHome ? 100 : 700;
        
        if (formation && formation.positions[this.position]) {
            const pos = formation.positions[this.position];
            return {
                x: isHome ? pos.x : 800 - pos.x,
                y: pos.y
            };
        }
        
        // Fallback positions
        const positions = {
            'GK': { x: isHome ? 50 : 750, y: 250 },
            'RB': { x: baseX, y: 100 }, 'CB1': { x: baseX, y: 200 }, 'CB2': { x: baseX, y: 300 }, 'LB': { x: baseX, y: 400 },
            'RM': { x: baseX + (isHome ? 80 : -80), y: 100 }, 'CM1': { x: baseX + (isHome ? 80 : -80), y: 200 },
            'CM2': { x: baseX + (isHome ? 80 : -80), y: 300 }, 'LM': { x: baseX + (isHome ? 80 : -80), y: 400 },
            'ST1': { x: baseX + (isHome ? 160 : -160), y: 225 }, 'ST2': { x: baseX + (isHome ? 160 : -160), y: 275 }
        };

        return positions[this.position] || { x: baseX, y: 250 };
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

        if (distance < 30) {
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

// Enhanced TouchControls with new buttons
class TouchControls {
    constructor(canvas, game) {
        this.canvas = canvas;
        this.game = game;
        this.joystick = {
            x: 100, y: 400, radius: 40, baseX: 100, baseY: 400, isActive: false, touchId: null
        };
        this.shootButton = { x: 700, y: 400, radius: 35, isActive: false };
        this.passButton = { x: 700, y: 340, radius: 35, isActive: false };
        this.tackleButton = { x: 700, y: 280, radius: 35, isActive: false };
        this.sprintButton = { x: 100, y: 340, radius: 35, isActive: false };
        this.userInput = { x: 0, y: 0 };
        
        this.setupEventListeners();
    }

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
        ctx.arc(this.joystick.x, this.joystick.y, 20, 0, Math.PI * 2);
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
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, button.x, button.y);
    }

    getUserInput() {
        return { x: this.userInput.x, y: this.userInput.y };
    }
}

// Enhanced KeyboardControls with new keys
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

// Formation Selection Overlay
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

// Team Plays Overlay
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

// Main Football Game Class
class FootballGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        if (!this.canvas) {
            console.error('Canvas element not found!');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.fieldWidth = this.canvas.width;
        this.fieldHeight = this.canvas.height;
        
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
    }

    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    startMatch() {
        this.matchStarted = true;
        this.setupPlayers();
        this.setupBall();
        this.setupControls();
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
            goalWidth: 80,
            goalHeight: 20
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
        const baseX = isHomeTeam ? 100 : 700;
        
        if (formation && formation.positions[position]) {
            const pos = formation.positions[position];
            return {
                x: isHomeTeam ? pos.x : 800 - pos.x,
                y: pos.y
            };
        }
        
        const positions = {
            'GK': { x: isHomeTeam ? 50 : 750, y: 250 },
            'RB': { x: baseX, y: 100 }, 'CB1': { x: baseX, y: 200 }, 'CB2': { x: baseX, y: 300 }, 'LB': { x: baseX, y: 400 },
            'RM': { x: baseX + (isHomeTeam ? 80 : -80), y: 100 }, 'CM1': { x: baseX + (isHomeTeam ? 80 : -80), y: 200 },
            'CM2': { x: baseX + (isHomeTeam ? 80 : -80), y: 300 }, 'LM': { x: baseX + (isHomeTeam ? 80 : -80), y: 400 },
            'ST1': { x: baseX + (isHomeTeam ? 160 : -160), y: 225 }, 'ST2': { x: baseX + (isHomeTeam ? 160 : -160), y: 275 }
        };

        return positions[position] || { x: baseX, y: 250 };
    }
    
    setupBall() {
        this.ball = new FootballBall(this.field.center.x, this.field.center.y);
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
                
                if (distance < 30 && distance < closestDistance) {
                    closestDistance = distance;
                    closestPlayer = player;
                }
            });

            if (closestPlayer && closestDistance < 30) {
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
        this.passPressed = true;
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
                    
                    if (distance < closestDistance && distance < 200) {
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
        this.tacklePressed = true;
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
        if (this.ball.x - this.ball.radius < 20 && 
            this.ball.y > this.fieldHeight / 2 - 40 && 
            this.ball.y < this.fieldHeight / 2 + 40) {
            this.score.away++;
            this.resetPlay();
        }
        
        if (this.ball.x + this.ball.radius > this.fieldWidth - 20 && 
            this.ball.y > this.fieldHeight / 2 - 40 && 
            this.ball.y < this.fieldHeight / 2 + 40) {
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
            this.ctx.fillRect(300, 10, 200, 30);
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.font = '14px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(`Active Play: ${this.currentTactic.name}`, 400, 30);
        }

        if (this.matchStarted) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(10, this.fieldHeight - 40, 200, 30);
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.font = '12px Arial';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(`Mode: ${this.gameMode === 'player-vs-player' ? 'Player vs Player' : 'Player vs Computer'}`, 20, this.fieldHeight - 20);
        }
    }

    drawControlsInfo() {
        if (!this.matchStarted) return;

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(10, 10, 280, this.isMobile ? 120 : 100);
        
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
        
        for (let i = 0; i < this.fieldWidth; i += 20) {
            for (let j = 0; j < this.fieldHeight; j += 20) {
                this.ctx.beginPath();
                this.ctx.moveTo(i, j);
                this.ctx.lineTo(i + 10, j + 10);
                this.ctx.stroke();
            }
        }
    }
    
    drawField() {
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([]);
        
        this.ctx.strokeRect(20, 20, this.fieldWidth - 40, this.fieldHeight - 40);
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.fieldWidth / 2, 20);
        this.ctx.lineTo(this.fieldWidth / 2, this.fieldHeight - 20);
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.arc(this.field.center.x, this.field.center.y, 60, 0, Math.PI * 2);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(this.field.center.x, this.field.center.y, 2, 0, Math.PI * 2);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fill();
        
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(20, this.fieldHeight / 2 - 40, 5, 80);
        this.ctx.fillRect(this.fieldWidth - 25, this.fieldHeight / 2 - 40, 5, 80);

        this.ctx.strokeRect(20, this.fieldHeight / 2 - 80, 40, 160);
        this.ctx.strokeRect(this.fieldWidth - 60, this.fieldHeight / 2 - 80, 40, 160);

        this.ctx.strokeRect(20, this.fieldHeight / 2 - 160, 120, 320);
        this.ctx.strokeRect(this.fieldWidth - 140, this.fieldHeight / 2 - 160, 120, 320);
    }
    
    updateUI() {
        if (!document.getElementById('homeScore') || !this.matchStarted) return;
        
        document.getElementById('homeScore').textContent = this.score.home;
        document.getElementById('awayScore').textContent = this.score.away;
        
        const minutes = Math.floor(this.time / 60);
        const seconds = Math.floor(this.time % 60);
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

// Enhanced CSS for new features
const additionalCSS = `
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
`;

// Inject the CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);