// Enhanced Football Game with Realistic Features and Responsive Design

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

// Enhanced Football Clubs Data with more realistic formations
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
    },
    {
        id: 3,
        name: "Green Lions FC",
        shortName: "Lions",
        color: "#2ecc71",
        secondaryColor: "#27ae60",
        logo: "🦁",
        formation: "4-4-2",
        playStyle: "defensive"
    },
    {
        id: 4,
        name: "Golden Tigers",
        shortName: "Tigers",
        color: "#f39c12",
        secondaryColor: "#e67e22",
        logo: "🐯",
        formation: "4-2-3-1",
        playStyle: "counter"
    },
    {
        id: 5,
        name: "Silver Wolves",
        shortName: "Wolves",
        color: "#95a5a6",
        secondaryColor: "#7f8c8d",
        logo: "🐺",
        formation: "3-5-2",
        playStyle: "possession"
    }
];

// Enhanced Formations for larger field
const formations = {
    '4-4-2': {
        name: '4-4-2',
        description: 'Classic balanced formation',
        positions: {
            'GK': { x: 100, y: 400 },
            'RB': { x: 250, y: 200 },
            'CB1': { x: 250, y: 350 },
            'CB2': { x: 250, y: 450 },
            'LB': { x: 250, y: 600 },
            'RM': { x: 450, y: 200 },
            'CM1': { x: 450, y: 350 },
            'CM2': { x: 450, y: 450 },
            'LM': { x: 450, y: 600 },
            'ST1': { x: 650, y: 350 },
            'ST2': { x: 650, y: 450 }
        }
    },
    '4-3-3': {
        name: '4-3-3',
        description: 'Attacking formation with wingers',
        positions: {
            'GK': { x: 100, y: 400 },
            'RB': { x: 250, y: 200 },
            'CB1': { x: 250, y: 350 },
            'CB2': { x: 250, y: 450 },
            'LB': { x: 250, y: 600 },
            'CM1': { x: 450, y: 250 },
            'CM2': { x: 450, y: 400 },
            'CM3': { x: 450, y: 550 },
            'RW': { x: 650, y: 200 },
            'ST': { x: 650, y: 400 },
            'LW': { x: 650, y: 600 }
        }
    },
    '3-5-2': {
        name: '3-5-2',
        description: 'Midfield dominance formation',
        positions: {
            'GK': { x: 100, y: 400 },
            'CB1': { x: 250, y: 250 },
            'CB2': { x: 250, y: 400 },
            'CB3': { x: 250, y: 550 },
            'RM': { x: 450, y: 150 },
            'CM1': { x: 450, y: 300 },
            'CM2': { x: 450, y: 400 },
            'CM3': { x: 450, y: 500 },
            'LM': { x: 450, y: 650 },
            'ST1': { x: 650, y: 300 },
            'ST2': { x: 650, y: 500 }
        }
    },
    '4-2-3-1': {
        name: '4-2-3-1',
        description: 'Modern attacking formation',
        positions: {
            'GK': { x: 100, y: 400 },
            'RB': { x: 250, y: 200 },
            'CB1': { x: 250, y: 350 },
            'CB2': { x: 250, y: 450 },
            'LB': { x: 250, y: 600 },
            'CDM1': { x: 400, y: 300 },
            'CDM2': { x: 400, y: 500 },
            'CAM': { x: 550, y: 400 },
            'RW': { x: 700, y: 250 },
            'LW': { x: 700, y: 550 },
            'ST': { x: 800, y: 400 }
        }
    }
};

// Enhanced Game Mode Selection
let selectedGameMode = 'player-vs-computer';
let selectedFormation = '4-4-2';

// Enhanced Real Football Players Database
const footballPlayers = [
    { id: 1, name: "Lionel Messi", position: "RW", rating: 93, team: "Inter Miami", speed: 85, shooting: 92, passing: 91 },
    { id: 2, name: "Cristiano Ronaldo", position: "ST", rating: 92, team: "Al Nassr", speed: 87, shooting: 94, passing: 82 },
    { id: 3, name: "Kylian Mbappé", position: "ST", rating: 91, team: "Paris Saint-Germain", speed: 96, shooting: 89, passing: 80 },
    { id: 4, name: "Kevin De Bruyne", position: "CAM", rating: 91, team: "Manchester City", speed: 76, shooting: 86, passing: 94 },
    { id: 5, name: "Erling Haaland", position: "ST", rating: 91, team: "Manchester City", speed: 89, shooting: 94, passing: 65 },
    { id: 6, name: "Virgil van Dijk", position: "CB", rating: 89, team: "Liverpool", speed: 77, shooting: 60, passing: 70 },
    { id: 7, name: "Mohamed Salah", position: "RW", rating: 90, team: "Liverpool", speed: 90, shooting: 88, passing: 81 },
    { id: 8, name: "Harry Kane", position: "ST", rating: 90, team: "Bayern Munich", speed: 70, shooting: 93, passing: 83 },
    { id: 9, name: "Neymar Jr", position: "LW", rating: 89, team: "Al Hilal", speed: 84, shooting: 85, passing: 88 },
    { id: 10, name: "Robert Lewandowski", position: "ST", rating: 89, team: "Barcelona", speed: 78, shooting: 92, passing: 79 }
];

// Enhanced Football Tactics and Plays
const teamPlays = [
    {
        id: 1,
        name: "Tiki-Taka",
        description: "Short passing and movement, working the ball through channels",
        effect: { possession: 15, passing: 20, speed: -5, shooting: -5 }
    },
    {
        id: 2,
        name: "Counter Attack",
        description: "Quick transitions from defense to attack",
        effect: { speed: 15, shooting: 10, possession: -10, passing: -5 }
    },
    {
        id: 3,
        name: "Gegenpress",
        description: "Immediate pressing after losing possession",
        effect: { pressure: 20, stamina: -10, aggression: 15, speed: 5 }
    },
    {
        id: 4,
        name: "Park the Bus",
        description: "Ultra-defensive formation focusing on defense",
        effect: { defense: 20, speed: -10, shooting: -15, aggression: -10 }
    }
];

// Enhanced FootballBall class for larger field
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
        this.autoMoveTimer = 0;
        this.autoMoveDirection = { x: 0, y: 0 };
        this.isMovingAutomatically = false;
        this.lastTouchedBy = null;
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

        // Updated boundaries for larger field
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

    startAutoMovement() {
        this.isMovingAutomatically = true;
        this.autoMoveTimer = 60 + Math.random() * 120;
        
        const centerX = 600, centerY = 400;
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

        // Enhanced ball design
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

        ctx.beginPath();
        ctx.moveTo(0, this.radius);
        ctx.lineTo(-this.radius * 0.7, this.radius * 0.3);
        ctx.lineTo(-this.radius * 0.5, -this.radius * 0.7);
        ctx.lineTo(this.radius * 0.5, -this.radius * 0.7);
        ctx.lineTo(this.radius * 0.7, this.radius * 0.3);
        ctx.closePath();
        ctx.stroke();

        // Add hexagon pattern
        ctx.beginPath();
        ctx.moveTo(this.radius * 0.3, 0);
        ctx.lineTo(this.radius * 0.15, this.radius * 0.25);
        ctx.lineTo(-this.radius * 0.15, this.radius * 0.25);
        ctx.lineTo(-this.radius * 0.3, 0);
        ctx.lineTo(-this.radius * 0.15, -this.radius * 0.25);
        ctx.lineTo(this.radius * 0.15, -this.radius * 0.25);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    }
}


// Enhanced AnimatedPlayer class with realistic football positioning
class AnimatedPlayer {
    constructor(config) {
        this.x = config.x;
        this.y = config.y;
        this.radius = 18;
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
        this.celebrating = false;
        this.celebrationFrame = 0;
        
        // Movement
        this.speedX = 0;
        this.speedY = 0;
        this.targetX = this.x;
        this.targetY = this.y;
        this.userInputX = 0;
        this.userInputY = 0;
        
        // Player attributes
        if (this.playerData) {
            this.baseSpeed = 2 + (this.playerData.speed / 100) * 3;
            this.shooting = 0.5 + (this.playerData.shooting / 100) * 0.5;
            this.passing = 0.5 + (this.playerData.passing / 100) * 0.5;
        } else {
            this.baseSpeed = 2 + Math.random() * 1.5;
            this.shooting = 0.5 + Math.random() * 0.5;
            this.passing = 0.5 + Math.random() * 0.5;
        }
        
        this.speed = this.baseSpeed;
        this.aggression = 0.5 + Math.random() * 0.5;
        this.control = 0.5 + Math.random() * 0.5;
        this.tacklingSkill = 0.5 + Math.random() * 0.5;
        this.stamina = 1.0;
        
        // AI behavior
        this.lastBallOwner = null;
        this.supportPosition = { x: this.x, y: this.y };
        this.role = this.determineRole();
        this.attackIntent = 0;
        this.defenseIntent = 0;
        this.patience = Math.random() * 100;
        this.actionTimer = 0;
        this.formationPosition = this.getFormationPosition();
        
        // Position behavior
        this.setPositionBehavior();
        this.positionDiscipline = 0.8 + Math.random() * 0.2;
        this.ballChasingUrgency = this.calculateBallChasingUrgency();
    }

    setPositionBehavior() {
        switch(this.role) {
            case 'goalkeeper':
                this.aggression = 0.3;
                this.defenseIntent = 100;
                this.attackIntent = 0;
                this.positionDiscipline = 0.95;
                break;
            case 'defender':
                this.aggression = 0.6;
                this.defenseIntent = 85;
                this.attackIntent = 15;
                this.positionDiscipline = 0.85;
                break;
            case 'midfielder':
                this.aggression = 0.5;
                this.defenseIntent = 50;
                this.attackIntent = 50;
                this.positionDiscipline = 0.75;
                break;
            case 'attacker':
                this.aggression = 0.4;
                this.defenseIntent = 20;
                this.attackIntent = 80;
                this.positionDiscipline = 0.7;
                break;
        }
    }

    calculateBallChasingUrgency() {
        switch(this.role) {
            case 'goalkeeper': return 0.1;
            case 'defender': return 0.4;
            case 'midfielder': return 0.7;
            case 'attacker': return 0.6;
            default: return 0.5;
        }
    }

    determineRole() {
        const position = this.position;
        if (position === 'GK') return 'goalkeeper';
        if (position.includes('B') || position.includes('DM')) return 'defender';
        if (position.includes('M') || position.includes('W') || position.includes('AM')) return 'midfielder';
        if (position.includes('S') || position.includes('T')) return 'attacker';
        return 'midfielder';
    }

    // In AnimatedPlayer class, update the update method:
update(ball, userInput = null, game = null) {
    // Handle stamina
    if (this.running) {
        this.stamina = Math.max(0.3, this.stamina - 0.001);
    } else {
        this.stamina = Math.min(1.0, this.stamina + 0.002);
    }

    // Handle sprinting
    if (this.sprinting && this.isCurrentUserControlled && this.stamina > 0.3) {
        this.speed = this.baseSpeed * 1.8;
        this.stamina -= 0.003;
    } else {
        this.speed = this.baseSpeed * (0.8 + this.stamina * 0.2);
    }

    if (this.isCurrentUserControlled && userInput) {
        this.userInputX = userInput.x;
        this.userInputY = userInput.y;
        
        // SMOOTH MOVEMENT: Only move if there's significant input
        if (Math.abs(this.userInputX) > 0.1 || Math.abs(this.userInputY) > 0.1) {
            this.speedX = this.userInputX * this.speed;
            this.speedY = this.userInputY * this.speed;
            
            this.x += this.speedX;
            this.y += this.speedY;
            this.running = true;
        } else {
            this.speedX *= 0.8;
            this.speedY *= 0.8;
            this.running = false;
        }
        
    } else {
        this.updateAI(ball, game);
    }

    // SMOOTH ANIMATIONS: Update animations only when moving
    this.animationFrame++;
    if (this.running && (Math.abs(this.speedX) > 0.5 || Math.abs(this.speedY) > 0.5)) {
        this.legSwing = Math.sin(this.animationFrame * 0.3) * 20;
        this.armSwing = Math.sin(this.animationFrame * 0.3 + Math.PI) * 15;
    } else {
        this.legSwing *= 0.9;
        this.armSwing *= 0.9;
    }

    // Boundary checks
    this.x = Math.max(this.radius, Math.min(1200 - this.radius, this.x));
    this.y = Math.max(this.radius, Math.min(800 - this.radius, this.y));

    if (this.hasBall && ball.possessedBy === this) {
        ball.x = this.x + (this.isHomeTeam ? 25 : -25);
        ball.y = this.y;
        ball.lastTouchedBy = this;
    }
}// In AnimatedPlayer class, update the updateAI method:
updateAI(ball, game) {
    this.actionTimer--;

    const dx = ball.x - this.x;
    const dy = ball.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // ENHANCED AI: More aggressive and strategic
    if (ball.possessedBy) {
        if (ball.possessedBy.isHomeTeam === this.isHomeTeam) {
            // Teammate has ball - provide intelligent support
            this.supportTeammate(ball.possessedBy, ball, game);
        } else {
            // Opponent has ball - aggressive defense
            this.defendAgainstOpponent(ball, distance, game);
        }
    } else {
        // Ball is free - be more aggressive in going for it
        if (distance < 200 && this.shouldGoForLooseBall(ball)) {
            this.targetX = ball.x;
            this.targetY = ball.y;
            this.running = true;
        } else {
            this.returnToPosition(ball, game);
        }
    }

    // Move towards target
    this.moveToTarget();

    // Make decisions more frequently for better AI
    if (this.actionTimer <= 0) {
        this.makeAIDecision(ball, game, distance);
        this.actionTimer = 20 + Math.random() * 30; // More frequent decisions
    }
}

// Enhanced AI decision making
makeAIDecision(ball, game, distance) {
    // More frequent tackle attempts
    if (ball.possessedBy && ball.possessedBy.isHomeTeam !== this.isHomeTeam && 
        distance < 45 && Math.random() < this.aggression * 0.08) {
        this.attemptTackle(ball, game);
    }
    
    // ENHANCED: More frequent and intelligent shooting/passing
    if (this.hasBall && ball.possessedBy === this) {
        const goalX = this.isHomeTeam ? 1150 : 50;
        const dxToGoal = goalX - this.x;
        const distanceToGoal = Math.abs(dxToGoal);
        
        // Shoot more often and from better positions
        if (distanceToGoal < 350 && Math.random() < this.shooting * 0.05) {
            this.attemptShot(ball, game);
        } else if (Math.random() < this.passing * 0.06) {
            this.attemptPass(ball, game);
        }
        
        // ENHANCED: Dribble or move toward goal
        if (Math.random() < 0.1) {
            const goalDirection = Math.atan2(400 - this.y, goalX - this.x);
            const randomVariation = (Math.random() - 0.5) * 0.5;
            this.targetX = this.x + Math.cos(goalDirection + randomVariation) * 50;
            this.targetY = this.y + Math.sin(goalDirection + randomVariation) * 50;
        }
    }
}

   supportTeammate(ballOwner, ball, game) {
    // Don't crowd the ball owner
    const distanceToOwner = Math.sqrt(
        Math.pow(this.x - ballOwner.x, 2) + Math.pow(this.y - ballOwner.y, 2)
    );

    if (distanceToOwner < 60) {
        // Move away to create space
        const angleAway = Math.atan2(this.y - ballOwner.y, this.x - ballOwner.x);
        this.targetX = ballOwner.x + Math.cos(angleAway) * 80;
        this.targetY = ballOwner.y + Math.sin(angleAway) * 80;
    } else {
        // ENHANCED: More intelligent positioning based on role and situation
        switch(this.role) {
            case 'defender':
                // Defenders provide cover and passing options
                this.targetX = this.isHomeTeam ? 300 : 900;
                this.targetY = ball.y + (Math.random() - 0.5) * 50;
                break;
            case 'midfielder':
                // Midfielders find intelligent support positions
                const supportDistance = 60 + Math.random() * 40;
                const angleToGoal = Math.atan2(400 - ballOwner.y, (this.isHomeTeam ? 1150 : 50) - ballOwner.x);
                const supportAngle = angleToGoal + (Math.random() - 0.5) * 1.0;
                
                this.targetX = ballOwner.x + Math.cos(supportAngle) * supportDistance;
                this.targetY = ballOwner.y + Math.sin(supportAngle) * supportDistance;
                break;
            case 'attacker':
                // ENHANCED: Attackers make more varied and intelligent runs
                if (Math.random() < 0.05) {
                    const runTypes = ['behind', 'channel', 'post', 'drop'];
                    const runType = runTypes[Math.floor(Math.random() * runTypes.length)];
                    const goalX = this.isHomeTeam ? 1150 : 50;
                    
                    switch(runType) {
                        case 'behind':
                            this.targetX = goalX - (this.isHomeTeam ? -100 : 100);
                            this.targetY = 350 + Math.random() * 100;
                            break;
                        case 'channel':
                            this.targetX = goalX - (this.isHomeTeam ? -200 : 200);
                            this.targetY = this.isHomeTeam ? 250 + Math.random() * 300 : 250 + Math.random() * 300;
                            break;
                        case 'post':
                            this.targetX = goalX - (this.isHomeTeam ? -30 : 30);
                            this.targetY = Math.random() < 0.5 ? 320 : 480;
                            break;
                        case 'drop':
                            this.targetX = this.isHomeTeam ? 700 : 500;
                            this.targetY = 300 + Math.random() * 200;
                            break;
                    }
                    this.actionTimer = 120 + Math.random() * 60;
                } else {
                    this.targetX = this.formationPosition.x;
                    this.targetY = this.formationPosition.y;
                }
                break;
            default:
                this.targetX = this.formationPosition.x;
                this.targetY = this.formationPosition.y;
        }
    }
    
    this.applyPositionConstraints();
    this.running = true;
}

    defendAgainstOpponent(ball, distance, game) {
        if (this.role === 'goalkeeper') {
            this.actAsGoalkeeper(ball, game);
            return;
        }

        const goalX = this.isHomeTeam ? 50 : 1150;
        
        if (distance < 120 && this.aggression > 0.4) {
            // Press the ball if close and aggressive
            this.targetX = ball.x;
            this.targetY = ball.y;
        } else {
            // Mark space and cut passing lanes
            const defensiveX = this.isHomeTeam ? 350 : 850;
            const interceptX = defensiveX + (ball.x - defensiveX) * 0.3;
            const interceptY = this.y + (ball.y - this.y) * 0.2;
            
            this.targetX = interceptX;
            this.targetY = interceptY;
        }
        
        this.running = distance > 30;
    }

    shouldGoForLooseBall(ball) {
        // Only certain players should chase loose balls
        if (this.role === 'goalkeeper') return false;
        
        const ballInMyArea = this.isBallInMyArea(ball);
        const urgency = this.ballChasingUrgency * this.aggression;
        
        return ballInMyArea && (Math.random() < urgency * 0.03);
    }

    isBallInMyArea(ball) {
        const formationPos = this.getFormationPosition();
        const distanceToFormation = Math.sqrt(
            Math.pow(ball.x - formationPos.x, 2) + Math.pow(ball.y - formationPos.y, 2)
        );
        return distanceToFormation < 120;
    }

    returnToPosition(ball, game) {
        const formationPos = this.getFormationPosition();
        
        // Small variations to make it look natural
        const variationX = (Math.random() - 0.5) * 20;
        const variationY = (Math.random() - 0.5) * 15;
        
        // Slight adjustment based on ball position
        const ballInfluenceX = (ball.x - 600) * 0.05;
        const ballInfluenceY = (ball.y - 400) * 0.05;
        
        this.targetX = formationPos.x + ballInfluenceX + variationX;
        this.targetY = formationPos.y + ballInfluenceY + variationY;
        
        this.applyPositionConstraints();
        this.running = true;
    }

   actAsGoalkeeper(ball, game) {
    const goalX = this.isHomeTeam ? 50 : 1150;
    const goalY = 400;
    
    // ENHANCED: Better goalkeeper positioning with some imperfection
    this.targetX = goalX;
    
    // Predict ball movement for better positioning but add some error
    if ((this.isHomeTeam && ball.x < 400) || (!this.isHomeTeam && ball.x > 800)) {
        const predictedY = ball.y + (ball.speedY * 5);
        // Add some error to make goalkeeping less perfect
        const error = (Math.random() - 0.5) * 40;
        this.targetY = Math.max(200, Math.min(600, predictedY + error));
    } else {
        this.targetY = goalY;
    }
    
    this.applyPositionConstraints();
}

    applyPositionConstraints() {
        // Keep players in sensible areas
        switch(this.role) {
            case 'goalkeeper':
                this.targetX = Math.max(30, Math.min(150, this.targetX));
                this.targetY = Math.max(150, Math.min(650, this.targetY));
                break;
            case 'defender':
                if (this.isHomeTeam) {
                    this.targetX = Math.max(100, Math.min(500, this.targetX));
                } else {
                    this.targetX = Math.max(700, Math.min(1100, this.targetX));
                }
                break;
            case 'midfielder':
                this.targetX = Math.max(200, Math.min(1000, this.targetX));
                break;
            case 'attacker':
                if (this.isHomeTeam) {
                    this.targetX = Math.max(500, Math.min(1100, this.targetX));
                } else {
                    this.targetX = Math.max(100, Math.min(700, this.targetX));
                }
                break;
        }
        
        this.targetY = Math.max(80, Math.min(720, this.targetY));
    }

    moveToTarget() {
        const targetDx = this.targetX - this.x;
        const targetDy = this.targetY - this.y;
        const targetDistance = Math.sqrt(targetDx * targetDx + targetDy * targetDy);

        if (targetDistance > 5) {
            const speedMultiplier = this.stamina * (1 + this.aggression * 0.2);
            this.speedX = (targetDx / targetDistance) * this.speed * speedMultiplier;
            this.speedY = (targetDy / targetDistance) * this.speed * speedMultiplier;
            
            this.x += this.speedX;
            this.y += this.speedY;
            this.running = targetDistance > 15;
        } else {
            this.speedX *= 0.8;
            this.speedY *= 0.8;
            this.running = false;
        }
    }

  makeAIDecision(ball, game, distance) {
    // Attempt tackle more frequently
    if (ball.possessedBy && ball.possessedBy.isHomeTeam !== this.isHomeTeam && 
        distance < 40 && Math.random() < this.aggression * 0.05) {
        this.attemptTackle(ball, game);
    }
    
    // ENHANCED: Attempt shot or pass if has ball - MORE FREQUENTLY
    if (this.hasBall && ball.possessedBy === this) {
        const goalX = this.isHomeTeam ? 1150 : 50;
        const dxToGoal = goalX - this.x;
        const distanceToGoal = Math.abs(dxToGoal);
        
        // Shoot more often and from further out
        if (distanceToGoal < 400 && Math.random() < this.shooting * 0.04) {
            this.attemptShot(ball, game);
        } else if (Math.random() < this.passing * 0.05) {
            this.attemptPass(ball, game);
        }
    }
}

    // Keep all your existing methods below - they should work fine:
    // attemptShot, attemptPass, passBall, attemptTackle, kickBall, 
    // distanceToLine, getFormationPosition, startSprint, stopSprint, celebrate

 // In the AnimatedPlayer class, update the getFormationPosition method:
getFormationPosition() {
    const formation = formations[selectedFormation];
    if (!formation || !formation.positions[this.position]) {
        // Fallback positions
        const isHome = this.isHomeTeam;
        const baseX = isHome ? 200 : 1000;
        
        const positions = {
            'GK': { x: isHome ? 100 : 1100, y: 400 },
            'RB': { x: baseX, y: 200 }, 'CB1': { x: baseX, y: 350 }, 'CB2': { x: baseX, y: 450 }, 
            'LB': { x: baseX, y: 600 }, 'RM': { x: baseX + (isHome ? 200 : -200), y: 200 },
            'CM1': { x: baseX + (isHome ? 200 : -200), y: 350 }, 'CM2': { x: baseX + (isHome ? 200 : -200), y: 450 },
            'LM': { x: baseX + (isHome ? 200 : -200), y: 600 }, 'ST1': { x: baseX + (isHome ? 400 : -400), y: 350 },
            'ST2': { x: baseX + (isHome ? 400 : -400), y: 450 }, 'RW': { x: baseX + (isHome ? 400 : -400), y: 200 },
            'LW': { x: baseX + (isHome ? 400 : -400), y: 600 }, 'ST': { x: baseX + (isHome ? 400 : -400), y: 400 },
            'CAM': { x: baseX + (isHome ? 300 : -300), y: 400 }, 'CDM1': { x: baseX + (isHome ? 150 : -150), y: 300 },
            'CDM2': { x: baseX + (isHome ? 150 : -150), y: 500 }, 'CB3': { x: baseX, y: 400 }
        };
        
        return positions[this.position] || { x: baseX, y: 400 };
    }
    
    const pos = formation.positions[this.position];
    return {
        x: this.isHomeTeam ? pos.x : 1200 - pos.x,
        y: pos.y
    };
}

    attemptShot(ball, game) {
    if (!this.hasBall || ball.possessedBy !== this) return false;

    const goalX = this.isHomeTeam ? 1150 : 50;
    const goalY = 400;
    
    // ENHANCED: Much more powerful and realistic shooting
    const dxToGoal = goalX - this.x;
    const dyToGoal = goalY - this.y;
    const distanceToGoal = Math.sqrt(dxToGoal * dxToGoal + dyToGoal * dyToGoal);
    
    // Much more power - especially for long shots!
    const basePower = 20 + (distanceToGoal / 50); // More power for distance
    const powerMultiplier = 0.8 + this.shooting * 0.8; // Skill affects power more
    const accuracy = this.shooting * 0.6 + 0.4;
    
    const randomOffset = (1 - accuracy) * 80; // Reduced randomness for better shots
    const targetX = goalX;
    const targetY = goalY + (Math.random() - 0.5) * randomOffset;
    
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    
    // ENHANCED: Apply power with curve for realism
    const power = Math.min(35, basePower * powerMultiplier); // MUCH higher max power
    const curve = (Math.random() - 0.5) * 0.2; // Slight curve
    
    ball.speedX = Math.cos(angle + curve) * power;
    ball.speedY = Math.sin(angle + curve) * power;
    ball.possessedBy = null;
    this.hasBall = false;
    
    this.kicking = true;
    this.kickFrame = 0;
    
    // Update stats
    if (game && game.stats) {
        if (this.isHomeTeam) {
            game.stats.shots.home = (game.stats.shots.home || 0) + 1;
        } else {
            game.stats.shots.away = (game.stats.shots.away || 0) + 1;
        }
    }
    
    return true;
}

    attemptPass(ball, game) {
        if (!this.hasBall || ball.possessedBy !== this) return false;

        let bestTeammate = null;
        let bestScore = -1;

        // Find the best teammate to pass to
        if (game && game.players) {
            game.players.forEach(player => {
                if (player !== this && player.isHomeTeam === this.isHomeTeam) {
                    const dx = player.x - this.x;
                    const dy = player.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 300 && distance > 50) {
                        let score = 0;
                        
                        // Prefer players in better positions
                        const goalX = this.isHomeTeam ? 1150 : 50;
                        const progress = (player.x - this.x) * (this.isHomeTeam ? 1 : -1);
                        
                        if (progress > 0) score += progress * 2;
                        
                        // Add some randomness
                        score += Math.random() * 30;
                        
                        if (score > bestScore) {
                            bestScore = score;
                            bestTeammate = player;
                        }
                    }
                }
            });
        }

        if (bestTeammate) {
            this.passBall(ball, bestTeammate, game);
            return true;
        }
        
        return false;
    }

    passBall(ball, targetPlayer, game) {
        if (!this.hasBall || ball.possessedBy !== this) return false;

        const dx = targetPlayer.x - this.x;
        const dy = targetPlayer.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        
        const passAccuracy = 0.7 + (this.passing * 0.3);
        const randomAngle = (Math.random() - 0.5) * (1 - passAccuracy) * 0.8;
        const power = Math.min(12, 6 + distance / 50);
        
        ball.speedX = Math.cos(angle + randomAngle) * power;
        ball.speedY = Math.sin(angle + randomAngle) * power;
        ball.possessedBy = null;
        ball.lastTouchedBy = this;
        this.hasBall = false;
        
        this.kicking = true;
        this.kickFrame = 0;
        this.lastBallOwner = this;

        return true;
    }

    attemptTackle(ball, game) {
        if (this.tackling || !ball.possessedBy) return false;

        const opponent = ball.possessedBy;
        const dx = opponent.x - this.x;
        const dy = opponent.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 40) {
            this.tackling = true;
            this.tackleFrame = 0;
            
            const successChance = this.tacklingSkill * 0.5 + (this.aggression * 0.3);
            if (Math.random() < successChance) {
                ball.possessedBy.hasBall = false;
                ball.possessedBy = this;
                this.hasBall = true;
                ball.lastTouchedBy = this;
                return true;
            }
        }
        return false;
    }

    // Keep your existing draw method exactly as it was - it's perfect!
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        const facingRight = this.isHomeTeam || this.speedX > 0;
        const scaleX = facingRight ? 1 : -1;
        ctx.scale(scaleX, 1);

        // User-controlled player highlight
        if (this.isCurrentUserControlled) {
            ctx.strokeStyle = this.sprinting ? '#FF0000' : '#FFFF00';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(0, 0, this.radius + 5, 0, Math.PI * 2);
            ctx.stroke();
            
            // Stamina bar
            if (this.sprinting) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillRect(-20, -this.radius - 15, 40, 5);
                ctx.fillStyle = this.stamina > 0.3 ? '#2ecc71' : '#e74c3c';
                ctx.fillRect(-20, -this.radius - 15, 40 * this.stamina, 5);
            }
        }
        game.teamPossession = null;


        // Tackle effect
        if (this.tackling) {
            ctx.fillStyle = 'rgba(255, 0, 0, 0.4)';
            ctx.beginPath();
            ctx.arc(0, 0, this.radius + 12, 0, Math.PI * 2);
            ctx.fill();
        }

        // Celebration effect
        if (this.celebrating) {
            ctx.fillStyle = `rgba(255, 215, 0, ${0.3 + Math.sin(this.celebrationFrame * 0.2) * 0.2})`;
            ctx.beginPath();
            ctx.arc(0, 0, this.radius + 8, 0, Math.PI * 2);
            ctx.fill();
        }

        // Body (torso) with kit details
        ctx.fillStyle = this.color;
        ctx.fillRect(-6, -25, 12, 25);
        
        // Kit stripes for secondary color
        ctx.fillStyle = this.secondaryColor;
        for (let i = -20; i < 0; i += 8) {
            ctx.fillRect(-6, i, 12, 4);
        }

        // Head
        ctx.fillStyle = '#FFDBAC';
        ctx.beginPath();
        ctx.arc(0, -35, 10, 0, Math.PI * 2);
        ctx.fill();

        // Hair
        ctx.fillStyle = '#2C3E50';
        ctx.beginPath();
        ctx.arc(0, -38, 8, 0, Math.PI, true);
        ctx.fill();

        // Face features
        ctx.fillStyle = '#2C3E50';
        ctx.beginPath();
        ctx.arc(-4, -37, 2, 0, Math.PI * 2);
        ctx.arc(4, -37, 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(0, -32, 2.5, 0, Math.PI, false);
        ctx.stroke();

        // Arms with animation
        ctx.fillStyle = this.color;
        const armAngle = this.armSwing;
        
        ctx.save();
        ctx.rotate(armAngle * Math.PI / 180);
        ctx.fillRect(-12, -22, 8, 3);
        ctx.restore();
        
        ctx.save();
        ctx.rotate(-armAngle * Math.PI / 180);
        ctx.fillRect(4, -22, 8, 3);
        ctx.restore();

        // Legs with running animation
        ctx.fillStyle = this.secondaryColor;
        const legAngle = this.legSwing;
        
        ctx.save();
        ctx.rotate(legAngle * Math.PI / 180);
        ctx.fillRect(-4, 0, 4, 25);
        ctx.restore();
        
        ctx.save();
        ctx.rotate(-legAngle * Math.PI / 180);
        ctx.fillRect(0, 0, 4, 25);
        ctx.restore();

        // Shoes
        ctx.fillStyle = '#2C3E50';
        ctx.fillRect(-5, 23, 5, 4);
        ctx.fillRect(0, 23, 5, 4);

        // Player number on back
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.number, 0, -12);

        // Player name if available
        if (this.playerData) {
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '9px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            const lastName = this.playerData.name.split(' ')[1] || this.playerData.name;
            ctx.fillText(lastName, 0, 30);
        }

        // Ball possession indicator
        if (this.hasBall) {
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(25, -15, 6, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#000000';
            ctx.font = '8px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('⚽', 25, -15);
        }

        ctx.restore();
    }

    startSprint() {
        if (this.stamina > 0.3) {
            this.sprinting = true;
        }
    }

    stopSprint() {
        this.sprinting = false;
    }

    celebrate() {
        this.celebrating = true;
        this.celebrationFrame = 0;
    }

    kickBall(ball, power = 10, direction = null) {
        if (!this.hasBall || ball.possessedBy !== this) return false;

        const angle = direction || (this.isHomeTeam ? 0 : Math.PI);
        ball.speedX = Math.cos(angle) * power;
        ball.speedY = Math.sin(angle) * power;
        ball.possessedBy = null;
        ball.lastTouchedBy = this;
        this.hasBall = false;
        
        this.kicking = true;
        this.kickFrame = 0;
        
        return true;
    }
}

// Enhanced TouchControls for larger field
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
        this.sprintButton = { x: 120, y: 520, radius: 45, isActive: false };
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
        
        // Prevent context menu on long press
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    

    handleTouchStart(e) {
        e.preventDefault();
        const touches = e.changedTouches;
        
        for (let i = 0; i < touches.length; i++) {
            const touch = touches[i];
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            const x = (touch.clientX - rect.left) * scaleX;
            const y = (touch.clientY - rect.top) * scaleY;
            
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
                const scaleX = this.canvas.width / rect.width;
                const scaleY = this.canvas.height / rect.height;
                const x = (touch.clientX - rect.left) * scaleX;
                const y = (touch.clientY - rect.top) * scaleY;
                
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
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        
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
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY;
            
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
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.beginPath();
        ctx.arc(this.joystick.baseX, this.joystick.baseY, this.joystick.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.joystick.x, this.joystick.y, 25, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw action buttons
        this.drawButton(ctx, this.shootButton, 'SHOOT', this.shootButton.isActive ? 'rgba(255, 50, 50, 0.8)' : 'rgba(50, 255, 50, 0.7)');
        this.drawButton(ctx, this.passButton, 'PASS', this.passButton.isActive ? 'rgba(50, 100, 255, 0.8)' : 'rgba(50, 150, 255, 0.7)');
        this.drawButton(ctx, this.tackleButton, 'TACKLE', this.tackleButton.isActive ? 'rgba(255, 150, 50, 0.8)' : 'rgba(255, 180, 50, 0.7)');
        this.drawButton(ctx, this.sprintButton, 'SPRINT', this.sprintButton.isActive ? 'rgba(100, 255, 100, 0.8)' : 'rgba(150, 255, 150, 0.7)');
    }

    drawButton(ctx, button, text, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(button.x, button.y, button.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, button.x, button.y);
    }

    getUserInput() {
        return { x: this.userInput.x, y: this.userInput.y };
    }
}

// Enhanced KeyboardControls
class KeyboardControls {
    constructor(game) {
        this.game = game;
        this.keys = {
            ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false,
            ' ': false, 'x': false, 'c': false, 'Shift': false,
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
            
            if (key === 'Shift') {
                this.game.startSprint();
            }
        });

        document.addEventListener('keyup', (e) => {
            const key = e.key;
            if (this.keys.hasOwnProperty(key)) {
                this.keys[key] = false;
                e.preventDefault();
                
                if (key === ' ') this.game.userShoot();
                if (key === 'x') this.game.userPass();
                if (key === 'c') this.game.userTackle();
            }
            
            if (key === 'Shift') {
                this.game.stopSprint();
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

// Enhanced Formation Selection Overlay
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
                <div class="formation-preview-container">
                    <div class="formation-diagram" id="formationDiagram"></div>
                </div>
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
            `;
            formationCard.addEventListener('click', () => this.selectFormation(formationKey));
            options.appendChild(formationCard);
        });
        
        this.updateFormationDiagram();
    }

    selectFormation(formation) {
        selectedFormation = formation;
        document.querySelectorAll('.formation-card').forEach(card => {
            card.classList.remove('selected');
        });
        event.target.closest('.formation-card').classList.add('selected');
        this.updateFormationDiagram();
    }

    updateFormationDiagram() {
        const diagram = document.getElementById('formationDiagram');
        diagram.innerHTML = '';
        
        const formation = formations[selectedFormation];
        Object.entries(formation.positions).forEach(([position, pos]) => {
            const playerDot = document.createElement('div');
            playerDot.className = 'formation-player-dot';
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

// Enhanced Team Plays Overlay
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
                <div class="play-stats">
                    <h4>Current Match Stats</h4>
                    <div id="playStats"></div>
                </div>
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

    updateStats(game) {
        const statsContainer = document.getElementById('playStats');
        if (statsContainer) {
            statsContainer.innerHTML = `
                <p>Possession: ${Math.round(game.stats.possession.home)}% - ${Math.round(game.stats.possession.away)}%</p>
                <p>Shots: ${game.stats.shots.home} - ${game.stats.shots.away}</p>
                <p>Fouls: ${game.stats.fouls.home} - ${game.stats.fouls.away}</p>
            `;
        }
    }

    show() {
        this.isVisible = true;
        this.overlay.style.display = 'flex';
        this.updateStats(this.game);
    }

    hide() {
        this.isVisible = false;
        this.overlay.style.display = 'none';
    }
}

// Enhanced Main Football Game Class
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
        
        // Enhanced controls
        this.touchControls = null;
        this.keyboardControls = null;
        this.isMobile = this.detectMobile();
        
        // Enhanced game state
        this.score = { home: 0, away: 0 };
        this.time = 0;
        this.isPaused = false;
        this.isFirstHalf = true;
        this.halfTime = 45 * 60; // 45 minutes in seconds
        
        // Enhanced stats
        this.stats = {
            possession: { home: 50, away: 50 },
            shots: { home: 0, away: 0 },
            fouls: { home: 0, away: 0 },
            corners: { home: 0, away: 0 },
            saves: { home: 0, away: 0 }
        };

        this.lastPossession = 'home';
        this.passPressed = false;
        this.tacklePressed = false;
        this.lastGoalTime = 0;
        this.celebrationTime = 0;
        
        this.loadGameMode();
        this.loadTeams();
        this.setupField();
        this.assignPlayersToTeams();
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }

    handleResize() {
        // Adjust touch controls for new screen size
        if (this.touchControls && this.matchStarted) {
            // Recalculate control positions based on new canvas size
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            
            // Update control positions (simplified - in real implementation, you'd want more sophisticated scaling)
            this.touchControls.joystick.baseX = 120 * scaleX;
            this.touchControls.joystick.baseY = 600 * scaleY;
            this.touchControls.shootButton.x = 1080 * scaleX;
            this.touchControls.shootButton.y = 600 * scaleY;
            this.touchControls.passButton.x = 1080 * scaleX;
            this.touchControls.passButton.y = 520 * scaleY;
            this.touchControls.tackleButton.x = 1080 * scaleX;
            this.touchControls.tackleButton.y = 440 * scaleY;
            this.touchControls.sprintButton.x = 120 * scaleX;
            this.touchControls.sprintButton.y = 520 * scaleY;
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
                
                if (document.getElementById('homeTeamName')) {
                    document.getElementById('homeTeamName').textContent = this.homeTeam.shortName;
                }
                if (document.getElementById('awayTeamName')) {
                    document.getElementById('awayTeamName').textContent = this.awayTeam.shortName;
                }
            } else {
                this.homeTeam = footballClubs[0];
                this.awayTeam = footballClubs[1];
                this.userControlledTeam = 'home';
                if (document.getElementById('homeTeamName')) {
                    document.getElementById('homeTeamName').textContent = this.homeTeam.shortName;
                }
                if (document.getElementById('awayTeamName')) {
                    document.getElementById('awayTeamName').textContent = this.awayTeam.shortName;
                }
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
        
        // Fill remaining spots with generated players
        while (this.homeTeamPlayers.length < 11) {
            this.homeTeamPlayers.push(this.generatePlayer(this.homeTeamPlayers.length + 1));
        }
        while (this.awayTeamPlayers.length < 11) {
            this.awayTeamPlayers.push(this.generatePlayer(this.awayTeamPlayers.length + 1));
        }
    }

    generatePlayer(number) {
        const firstNames = ['John', 'Mike', 'David', 'Chris', 'Alex', 'James', 'Paul', 'Mark', 'Steve', 'Tom'];
        const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson'];
        const positions = ['CB', 'RB', 'LB', 'CM', 'RM', 'LM', 'CAM', 'CDM', 'ST', 'RW', 'LW'];
        
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const position = positions[Math.floor(Math.random() * positions.length)];
        
        return { 
            name: `${firstName} ${lastName}`, 
            position: position, 
            rating: 70 + Math.floor(Math.random() * 20),
            speed: 60 + Math.floor(Math.random() * 30),
            shooting: 60 + Math.floor(Math.random() * 30),
            passing: 60 + Math.floor(Math.random() * 30)
        };
    }
    
    setupField() {
        this.field = {
            width: this.fieldWidth,
            height: this.fieldHeight,
            center: { x: this.fieldWidth / 2, y: this.fieldHeight / 2 },
            goalWidth: 120, // Bigger goals
            goalHeight: 40
        };
    }
    
  // In FootballGame class, update setupPlayers method:
setupPlayers() {
    this.players = [];
    const formation = formations[selectedFormation];
    if (!formation) {
        console.error('Formation not found:', selectedFormation);
        return;
    }
    
    const homePositions = Object.keys(formation.positions);
    const awayPositions = Object.keys(formation.positions);

    // Reset user control
    this.userControlledPlayer = null;

    // Create home team players
    homePositions.forEach((position, index) => {
        const formationPos = this.getFormationPosition(position, true);
        const playerData = this.homeTeamPlayers[index];
        
        // Only set ONE user controlled player initially
        let isUserControlled = false;
        let isCurrentUserControlled = false;
        
        if (this.gameMode === 'player-vs-computer' && this.userControlledTeam === 'home') {
            // Start with controlling an attacker
            if (position.includes('ST') || position.includes('S') || position === 'CAM') {
                isUserControlled = true;
                isCurrentUserControlled = true;
            }
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
            isCurrentUserControlled: isCurrentUserControlled,
            playerData: playerData
        });
        
        this.players.push(player);
        
        if (isCurrentUserControlled) {
            this.userControlledPlayer = player;
        }
    });

    // Create away team players (similar logic)
    awayPositions.forEach((position, index) => {
        const formationPos = this.getFormationPosition(position, false);
        const playerData = this.awayTeamPlayers[index];
        
        let isUserControlled = false;
        let isCurrentUserControlled = false;
        
        if (this.gameMode === 'player-vs-computer' && this.userControlledTeam === 'away') {
            if (position.includes('ST') || position.includes('S') || position === 'CAM') {
                isUserControlled = true;
                isCurrentUserControlled = true;
            }
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
            isCurrentUserControlled: isCurrentUserControlled,
            playerData: playerData
        });
        
        this.players.push(player);
        
        if (isCurrentUserControlled && !this.userControlledPlayer) {
            this.userControlledPlayer = player;
        }
    });
}
    getFormationPosition(position, isHomeTeam) {
        const formation = formations[selectedFormation];
        const baseX = isHomeTeam ? 200 : 1000;
        
        if (formation && formation.positions[position]) {
            const pos = formation.positions[position];
            return {
                x: isHomeTeam ? pos.x : 1200 - pos.x,
                y: pos.y
            };
        }
        
        // Fallback positions for larger field
        const positions = {
            'GK': { x: isHomeTeam ? 100 : 1100, y: 400 },
            'RB': { x: baseX, y: 200 }, 'CB1': { x: baseX, y: 350 }, 'CB2': { x: baseX, y: 450 }, 'LB': { x: baseX, y: 600 },
            'RM': { x: baseX + (isHomeTeam ? 200 : -200), y: 200 }, 'CM1': { x: baseX + (isHomeTeam ? 200 : -200), y: 350 },
            'CM2': { x: baseX + (isHomeTeam ? 200 : -200), y: 450 }, 'LM': { x: baseX + (isHomeTeam ? 200 : -200), y: 600 },
            'ST1': { x: baseX + (isHomeTeam ? 400 : -400), y: 350 }, 'ST2': { x: baseX + (isHomeTeam ? 400 : -400), y: 450 }
        };

        return positions[position] || { x: baseX, y: 400 };
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

        // Handle celebration period after goal
        if (this.celebrationTime > 0) {
            this.celebrationTime--;
            if (this.celebrationTime === 0) {
                this.resetPlay();
            }
            return;
        }

        let userInput;
        if (this.isMobile) {
            userInput = this.touchControls.getUserInput();
        } else {
            userInput = this.keyboardControls.getUserInput();
        }

        // Update all players
        this.players.forEach(player => {
            if (player.isCurrentUserControlled) {
                player.update(this.ball, userInput, this);
            } else {
                player.update(this.ball, null, this);
            }
        });

        // Update ball
        this.ball.update();
        
        // Check for ball possession changes
        this.checkBallPossession();
        
        // Check for goals
        this.checkGoals();
        
        // Update possession stats
        this.updatePossession();
        
        // Handle user input actions
        if (this.passPressed) {
            this.userPass();
            this.passPressed = false;
        }
        
        if (this.tacklePressed) {
            this.userTackle();
            this.tacklePressed = false;
        }
        
        // Check for corner kicks
        this.checkCorners();
    }

  // In FootballGame class, update the checkBallPossession method:
checkBallPossession() {
    // If ball is moving too fast, no one can possess it
    if (Math.abs(this.ball.speedX) > 5 || Math.abs(this.ball.speedY) > 5) {
        if (this.ball.possessedBy) {
            this.ball.possessedBy.hasBall = false;
            this.ball.possessedBy = null;
        }
        return;
    }

    if (!this.ball.possessedBy) {
        let closestPlayer = null;
        let closestDistance = Infinity;

        this.players.forEach(player => {
            const dx = player.x - this.ball.x;
            const dy = player.y - this.ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Increased possession range and added skill factor
            if (distance < 35 && distance < closestDistance && Math.random() < player.control) {
                closestDistance = distance;
                closestPlayer = player;
            }
        });

        if (closestPlayer && closestDistance < 35) {
            this.ball.possessedBy = closestPlayer;
            closestPlayer.hasBall = true;
            this.ball.speedX = 0;
            this.ball.speedY = 0;

            // TRANSFER CONTROL: Switch control to the player who has the ball
            if ((closestPlayer.isHomeTeam && (this.userControlledTeam === 'home' || this.userControlledTeam === 'both')) ||
                (!closestPlayer.isHomeTeam && (this.userControlledTeam === 'away' || this.userControlledTeam === 'both'))) {
                this.switchUserControl(closestPlayer);
            }
        }
    }
}

// Add this method to FootballGame class:
switchUserControl(newPlayer) {
    if (this.userControlledPlayer) {
        this.userControlledPlayer.isCurrentUserControlled = false;
    }
    this.userControlledPlayer = newPlayer;
    this.userControlledPlayer.isCurrentUserControlled = true;
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
            let bestTeammate = null;
            let bestScore = -1;

            this.players.forEach(player => {
                if (player !== this.userControlledPlayer && 
                    player.isHomeTeam === this.userControlledPlayer.isHomeTeam) {
                    const dx = player.x - this.userControlledPlayer.x;
                    const dy = player.y - this.userControlledPlayer.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 250 && distance > 30) {
                        let score = 100 - distance; // Prefer closer players
                        
                        // Bonus for players in better positions (ahead for attackers, etc.)
                        const progress = (player.x - this.userControlledPlayer.x) * (this.userControlledPlayer.isHomeTeam ? 1 : -1);
                        if (progress > 0) score += 50;
                        
                        // Bonus for open players
                        let opponentCount = 0;
                        this.players.forEach(opponent => {
                            if (opponent.isHomeTeam !== this.userControlledPlayer.isHomeTeam) {
                                const oppDist = Math.sqrt(
                                    Math.pow(opponent.x - player.x, 2) + 
                                    Math.pow(opponent.y - player.y, 2)
                                );
                                if (oppDist < 60) opponentCount++;
                            }
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

        // Update possession stats
        if (this.lastPossession === 'home') {
            this.stats.possession.home = Math.min(100, this.stats.possession.home + 0.08);
            this.stats.possession.away = Math.max(0, this.stats.possession.away - 0.08);
        } else {
            this.stats.possession.away = Math.min(100, this.stats.possession.away + 0.08);
            this.stats.possession.home = Math.max(0, this.stats.possession.home - 0.08);
        }
    }
    
   // In FootballGame class, update checkGoals method:
checkGoals() {
    // Check for goal on the left side (away team scores)
    if (this.ball.x - this.ball.radius < 50 && 
        this.ball.y > 320 && this.ball.y < 480) {
        
        // More lenient goal detection
        if ((this.ball.speedX < -3 || this.ball.x < 20) && Math.random() < 0.9) {
            this.score.away++;
            this.handleGoal(false);
            return;
        }
    }
    
    // Check for goal on the right side (home team scores)
    if (this.ball.x + this.ball.radius > 1150 && 
        this.ball.y > 320 && this.ball.y < 480) {
        
        // More lenient goal detection
        if ((this.ball.speedX > 3 || this.ball.x > 1180) && Math.random() < 0.9) {
            this.score.home++;
            this.handleGoal(true);
            return;
        }
    }
}
    
    handleGoal(isHomeTeam) {
        this.lastGoalTime = this.time;
        this.celebrationTime = 180; // 3 seconds of celebration
        
        // Make scoring team celebrate
        this.players.forEach(player => {
            if (player.isHomeTeam === isHomeTeam) {
                player.celebrate();
            }
        });
        
        // Update UI immediately
        this.updateUI();
        
        // Show goal message
        this.showGoalMessage(isHomeTeam);
    }
    
    showGoalMessage(isHomeTeam) {
        const scoringTeam = isHomeTeam ? this.homeTeam.shortName : this.awayTeam.shortName;
        const message = `GOAL! ${scoringTeam} scores!`;
        
        // Create goal message element
        const goalMsg = document.createElement('div');
        goalMsg.className = 'goal-message';
        goalMsg.textContent = message;
        goalMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px 40px;
            border-radius: 10px;
            font-size: 24px;
            font-weight: bold;
            z-index: 1000;
        `;
        
        document.body.appendChild(goalMsg);
        
        // Remove message after 2 seconds
        setTimeout(() => {
            if (document.body.contains(goalMsg)) {
                document.body.removeChild(goalMsg);
            }
        }, 2000);
    }
    
    checkCorners() {
        // Check for corners
        if ((this.ball.x < 0 && this.ball.y > 0 && this.ball.y < this.fieldHeight) ||
            (this.ball.x > this.fieldWidth && this.ball.y > 0 && this.ball.y < this.fieldHeight)) {
            
            const isHomeTeam = this.ball.lastTouchedBy ? !this.ball.lastTouchedBy.isHomeTeam : this.lastPossession === 'away';
            
            if (isHomeTeam) {
                this.stats.corners.home++;
            } else {
                this.stats.corners.away++;
            }
        }
    }
    
    resetPlay() {
        this.ball.x = this.field.center.x;
        this.ball.y = this.field.center.y;
        this.ball.speedX = 0;
        this.ball.speedY = 0;
        this.ball.possessedBy = null;
        this.ball.lastTouchedBy = null;
        
        this.players.forEach(player => {
            player.hasBall = false;
        });
        
        // Reset players to formation positions
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
        
        // Apply tactic effects to players
        this.players.forEach(player => {
            if (player.isHomeTeam) {
                if (play.effect.speed) player.baseSpeed *= (1 + play.effect.speed / 100);
                if (play.effect.passing) player.passing *= (1 + play.effect.passing / 100);
                if (play.effect.shooting) player.shooting *= (1 + play.effect.shooting / 100);
                if (play.effect.aggression) player.aggression *= (1 + play.effect.aggression / 100);
            }
        });
    }
    
    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.fieldWidth, this.fieldHeight);
        
        // Draw field
        this.drawGrass();
        this.drawField();
        
        // Draw players
        this.players.forEach(player => player.draw(this.ctx));
        
        // Draw ball
        this.ball.draw(this.ctx);

        // Draw controls if on mobile
        if (this.isMobile && this.matchStarted) {
            this.touchControls.draw(this.ctx);
        }

        // Draw game info
        this.drawGameInfo();

        // Draw active tactic
        if (this.currentTactic) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            this.ctx.fillRect(500, 10, 200, 30);
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.font = '16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(`Active Play: ${this.currentTactic.name}`, 600, 30);
        }

        // Draw celebration effect if needed
        if (this.celebrationTime > 0) {
            this.ctx.fillStyle = `rgba(255, 215, 0, ${0.3 + Math.sin(this.time * 10) * 0.2})`;
            this.ctx.fillRect(0, 0, this.fieldWidth, this.fieldHeight);
        }
    }

    drawGameInfo() {
        if (!this.matchStarted) return;

        // Draw controls info box
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(10, 10, 300, this.isMobile ? 140 : 120);
        
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'left';
        
        if (this.isMobile) {
            this.ctx.fillText('CONTROLS:', 20, 30);
            this.ctx.fillText('• Left side: Move player', 20, 50);
            this.ctx.fillText('• Green: Shoot | Blue: Pass', 20, 70);
            this.ctx.fillText('• Orange: Tackle | Light Green: Sprint', 20, 90);
            this.ctx.fillText(`Formation: ${selectedFormation}`, 20, 120);
        } else {
            this.ctx.fillText('CONTROLS:', 20, 30);
            this.ctx.fillText('• Arrow Keys/WASD: Move player', 20, 50);
            this.ctx.fillText('• Space: Shoot | X: Pass | C: Tackle', 20, 70);
            this.ctx.fillText('• Shift: Sprint (1.8x speed)', 20, 90);
            this.ctx.fillText(`Formation: ${selectedFormation}`, 20, 110);
        }

        // Draw match info
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(10, this.fieldHeight - 50, 250, 40);
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`Mode: ${this.getGameModeText()}`, 20, this.fieldHeight - 25);
    }

    getGameModeText() {
        switch(this.gameMode) {
            case 'player-vs-player': return 'Player vs Player';
            case 'player-vs-computer': return 'Player vs Computer';
            case 'computer-vs-computer': return 'Computer vs Computer';
            default: return 'Player vs Computer';
        }
    }

    drawGrass() {
        // Draw green background
        this.ctx.fillStyle = '#27ae60';
        this.ctx.fillRect(0, 0, this.fieldWidth, this.fieldHeight);

        // Draw grass pattern
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

        // Draw center circle shadow
        this.ctx.fillStyle = 'rgba(34, 153, 84, 0.3)';
        this.ctx.beginPath();
        this.ctx.arc(this.field.center.x + 3, this.field.center.y + 3, 75, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawField() {
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 3;
        this.ctx.setLineDash([]);
        
        // Outer boundary
        this.ctx.strokeRect(30, 30, this.fieldWidth - 60, this.fieldHeight - 60);
        
        // Center line
        this.ctx.beginPath();
        this.ctx.moveTo(this.fieldWidth / 2, 30);
        this.ctx.lineTo(this.fieldWidth / 2, this.fieldHeight - 30);
        this.ctx.stroke();
        
        // Center circle
        this.ctx.beginPath();
        this.ctx.arc(this.field.center.x, this.field.center.y, 75, 0, Math.PI * 2);
        this.ctx.stroke();

        // Center spot
        this.ctx.beginPath();
        this.ctx.arc(this.field.center.x, this.field.center.y, 3, 0, Math.PI * 2);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fill();
        
        // Goals
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(30, this.fieldHeight / 2 - 60, 5, 120);
        this.ctx.fillRect(this.fieldWidth - 35, this.fieldHeight / 2 - 60, 5, 120);

        // Goal areas
        this.ctx.strokeRect(30, this.fieldHeight / 2 - 120, 60, 240);
        this.ctx.strokeRect(this.fieldWidth - 90, this.fieldHeight / 2 - 120, 60, 240);

        // Penalty areas
        this.ctx.strokeRect(30, this.fieldHeight / 2 - 240, 180, 480);
        this.ctx.strokeRect(this.fieldWidth - 210, this.fieldHeight / 2 - 240, 180, 480);

        // Penalty spots
        this.ctx.beginPath();
        this.ctx.arc(210, this.fieldHeight / 2, 3, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.arc(this.fieldWidth - 210, this.fieldHeight / 2, 3, 0, Math.PI * 2);
        this.ctx.fill();

        // Penalty arcs
        this.ctx.beginPath();
        this.ctx.arc(210, this.fieldHeight / 2, 75, -Math.PI * 0.35, Math.PI * 0.35);
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.arc(this.fieldWidth - 210, this.fieldHeight / 2, 75, Math.PI * 0.65, Math.PI * 1.35);
        this.ctx.stroke();
    }
    
    updateUI() {
        if (!this.matchStarted) return;
        
        // Update score
        if (document.getElementById('homeScore')) {
            document.getElementById('homeScore').textContent = this.score.home;
        }
        if (document.getElementById('awayScore')) {
            document.getElementById('awayScore').textContent = this.score.away;
        }
        
        // Update match time
        if (document.getElementById('matchTime')) {
            const minutes = Math.floor(this.time / 60);
            const seconds = Math.floor(this.time % 60);
            document.getElementById('matchTime').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        // Update possession
        if (document.getElementById('homePossession')) {
            document.getElementById('homePossession').style.width = `${this.stats.possession.home}%`;
            document.getElementById('homePossession').textContent = `${Math.round(this.stats.possession.home)}%`;
        }
        if (document.getElementById('awayPossession')) {
            document.getElementById('awayPossession').style.width = `${this.stats.possession.away}%`;
            document.getElementById('awayPossession').textContent = `${Math.round(this.stats.possession.away)}%`;
        }
        
        // Update shots
        if (document.getElementById('homeShots')) {
            document.getElementById('homeShots').textContent = Math.floor(this.stats.shots.home);
        }
        if (document.getElementById('awayShots')) {
            document.getElementById('awayShots').textContent = Math.floor(this.stats.shots.away);
        }
        
        // Update fouls
        if (document.getElementById('homeFouls')) {
            document.getElementById('homeFouls').textContent = Math.floor(this.stats.fouls.home);
        }
        if (document.getElementById('awayFouls')) {
            document.getElementById('awayFouls').textContent = Math.floor(this.stats.fouls.away);
        }
    }
}


// Enhanced global game instance
let game;

// Enhanced Game Mode Selection Functions
function selectGameMode(mode) {
    selectedGameMode = mode;
    localStorage.setItem('gameMode', mode);
    
    document.querySelectorAll('.game-mode-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

// Enhanced game control functions
function togglePause() {
    if (game) {
        game.isPaused = !game.isPaused;
        const btn = document.getElementById('pauseBtn');
        if (btn) {
            btn.textContent = game.isPaused ? '▶️ Resume' : '⏸️ Pause';
        }
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
    if (game) {
        game.showTeamPlays();
    }
}

function goToMenu() {
    window.location.href = 'index.html';
}

// Initialize game when page loads
window.addEventListener('load', () => {
    game = new FootballGame();
});

// Enhanced CSS for responsive design and new features
const enhancedCSS = `
/* Base responsive styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #1e3c72, #2a5298);
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

/* Enhanced responsive game header */
.game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background: rgba(0, 0, 0, 0.8);
    border-bottom: 2px solid #f39c12;
}

.team-info {
    display: flex;
    align-items: center;
    gap: 15px;
}

.team-logo {
    font-size: 2rem;
}

.team-name {
    font-size: 1.2rem;
    font-weight: bold;
}

.score-board {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 1.5rem;
    font-weight: bold;
}

.score {
    background: rgba(255, 255, 255, 0.2);
    padding: 10px 20px;
    border-radius: 10px;
    min-width: 60px;
    text-align: center;
}

.match-time {
    font-size: 1.2rem;
    color: #f39c12;
}

.stats-bar {
    display: flex;
    justify-content: space-around;
    padding: 8px 20px;
    background: rgba(0, 0, 0, 0.7);
    border-bottom: 1px solid #34495e;
    font-size: 0.9rem;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}

.stat-value {
    font-weight: bold;
    color: #f39c12;
}

.possession-bar {
    display: flex;
    width: 150px;
    height: 20px;
    background: #34495e;
    border-radius: 10px;
    overflow: hidden;
}

.possession-home, .possession-away {
    height: 100%;
    transition: width 0.3s ease;
}

.possession-home {
    background: #e74c3c;
}

.possession-away {
    background: #3498db;
}

/* Enhanced formation overlay */
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
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
    transform: translateY(-5px) scale(1.02);
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
    margin: 0 0 15px 0;
    color: #bdc3c7;
    font-size: 0.9rem;
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
    cursor: help;
}

.formation-player-dot:hover {
    transform: translate(-50%, -50%) scale(1.3);
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

/* Enhanced team plays overlay */
.team-plays-overlay {
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

.plays-container {
    background: linear-gradient(135deg, #2c3e50, #34495e);
    padding: 25px;
    border-radius: 20px;
    max-width: 800px;
    max-height: 80vh;
    overflow-y: auto;
    border: 3px solid #3498db;
    box-shadow: 0 0 30px rgba(52, 152, 219, 0.5);
}

.plays-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin: 20px 0;
}

.play-card {
    background: #34495e;
    padding: 20px;
    border-radius: 12px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.play-card:hover {
    border-color: #3498db;
    transform: translateY(-3px);
    box-shadow: 0 6px 18px rgba(52, 152, 219, 0.3);
}

.play-card h4 {
    margin: 0 0 10px 0;
    color: #ecf0f1;
    font-size: 1.1rem;
}

.play-card p {
    margin: 0 0 12px 0;
    color: #bdc3c7;
    font-size: 0.85rem;
    line-height: 1.4;
}

.play-effects {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.effect {
    padding: 4px 10px;
    border-radius: 15px;
    font-size: 0.75rem;
    font-weight: bold;
}

.effect.positive {
    background: #27ae60;
    color: white;
}

.effect.negative {
    background: #e74c3c;
    color: white;
}

.play-stats {
    background: #2c3e50;
    padding: 15px;
    border-radius: 10px;
    margin: 15px 0;
    border: 1px solid #34495e;
}

.play-stats h4 {
    margin: 0 0 10px 0;
    color: #f39c12;
    text-align: center;
}

.close-plays-btn {
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 20px;
    cursor: pointer;
    width: 100%;
    font-size: 1rem;
    font-weight: bold;
    transition: all 0.3s ease;
}

.close-plays-btn:hover {
    background: linear-gradient(135deg, #c0392b, #a93226);
    transform: translateY(-2px);
}

/* Enhanced game controls */
.game-controls {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 15px;
    background: rgba(0, 0, 0, 0.8);
    padding: 15px 25px;
    border-radius: 25px;
    backdrop-filter: blur(10px);
}

.control-btn {
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: bold;
    transition: all 0.3s ease;
    min-width: 120px;
}

.control-btn:hover {
    background: linear-gradient(135deg, #2980b9, #2471a3);
    transform: translateY(-2px);
}

.control-btn:active {
    transform: translateY(0);
}

/* Enhanced game mode selection */
.game-mode-selection {
    margin: 25px 0;
    text-align: center;
}

.game-mode-options {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 15px;
    flex-wrap: wrap;
}

.game-mode-btn {
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
    min-width: 180px;
}

.game-mode-btn:hover {
    background: linear-gradient(135deg, #2980b9, #2471a3);
    transform: translateY(-2px);
}

.game-mode-btn.selected {
    background: linear-gradient(135deg, #2ecc71, #27ae60);
    border: 3px solid #27ae60;
    transform: scale(1.05);
}

/* Mobile-specific styles */
@media (max-width: 768px) {
    .game-header {
        padding: 8px 15px;
    }
    
    .team-logo {
        font-size: 1.5rem;
    }
    
    .team-name {
        font-size: 1rem;
    }
    
    .score {
        font-size: 1.2rem;
        padding: 8px 15px;
        min-width: 50px;
    }
    
    .stats-bar {
        padding: 6px 15px;
        font-size: 0.8rem;
    }
    
    .formation-options {
        grid-template-columns: 1fr;
    }
    
    .plays-grid {
        grid-template-columns: 1fr;
    }
    
    .game-controls {
        bottom: 10px;
        padding: 12px 20px;
        gap: 10px;
    }
    
    .control-btn {
        padding: 10px 15px;
        font-size: 0.8rem;
        min-width: 100px;
    }
    
    .game-mode-btn {
        padding: 12px 20px;
        min-width: 140px;
        font-size: 0.9rem;
    }
}

@media (max-width: 480px) {
    .game-header {
        flex-direction: column;
        gap: 10px;
        padding: 10px;
    }
    
    .score-board {
        gap: 10px;
    }
    
    .stats-bar {
        flex-wrap: wrap;
        gap: 10px;
    }
    
    .game-controls {
        flex-wrap: wrap;
        justify-content: center;
        width: 90%;
    }
    
    .control-btn {
        flex: 1;
        min-width: auto;
    }
}

/* Portrait mode optimization */
@media (max-height: 700px) and (orientation: portrait) {
    .formation-container {
        padding: 20px;
        max-height: 85%;
    }
    
    .formation-diagram {
        height: 150px;
    }
    
    .plays-container {
        padding: 20px;
        max-height: 75vh;
    }
}

/* Landscape mode optimization */
@media (max-height: 500px) and (orientation: landscape) {
    .game-header {
        padding: 5px 15px;
    }
    
    .stats-bar {
        padding: 5px 15px;
    }
    
    .formation-container {
        padding: 15px;
    }
    
    .formation-diagram {
        height: 120px;
    }
}

/* High DPI screens */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .formation-card, .play-card, .control-btn, .game-mode-btn {
        border-width: 2px;
    }
}

/* Reduced motion for accessibility */
@media (prefers-reduced-motion: reduce) {
    .formation-card, .play-card, .control-btn, .game-mode-btn,
    .start-game-btn, .close-plays-btn {
        transition: none;
        transform: none;
    }
    
    .formation-card:hover, .play-card:hover,
    .control-btn:hover, .game-mode-btn:hover {
        transform: none;
    }
}
`;

// Inject the enhanced CSS
const style = document.createElement('style');
style.textContent = enhancedCSS;
document.head.appendChild(style);

// Add viewport meta tag for mobile devices if not present
if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(viewport);
}