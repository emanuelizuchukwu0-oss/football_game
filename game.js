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

// Enhanced AnimatedPlayer class with realistic positioning
class AnimatedPlayer {
    constructor(config) {
        // ... (keep existing constructor code the same) ...

        // Enhanced AI behavior with better positioning
        this.formationDiscipline = 0.8; // How well they maintain formation
        this.ballChasingTendency = this.calculateBallChasingTendency();
        this.positioningTimer = 0;
        this.currentZone = this.calculateZone();
    }

    calculateBallChasingTendency() {
        // Different positions have different tendencies to chase the ball
        switch(this.role) {
            case 'goalkeeper': return 0.1;
            case 'defender': return 0.3;
            case 'midfielder': return 0.6;
            case 'attacker': return 0.4;
            default: return 0.5;
        }
    }

    calculateZone() {
        // Divide field into zones for better positioning
        const zoneWidth = 1200 / 3;
        const zoneHeight = 800 / 3;
        const zoneX = Math.floor(this.x / zoneWidth);
        const zoneY = Math.floor(this.y / zoneHeight);
        return { x: zoneX, y: zoneY };
    }

    updateAI(ball, game) {
        this.actionTimer--;
        this.positioningTimer--;

        const dx = ball.x - this.x;
        const dy = ball.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Update current zone
        this.currentZone = this.calculateZone();

        // Enhanced role-based positioning with realistic spacing
        if (ball.possessedBy) {
            if (ball.possessedBy.isHomeTeam === this.isHomeTeam) {
                // Teammate has the ball - intelligent support positioning
                this.supportTeammateIntelligently(ball.possessedBy, ball, game, distance);
            } else {
                // Opponent has the ball - strategic defending
                this.defendStrategically(ball, distance, game);
            }
        } else {
            // Ball is free - only certain players should chase it
            this.handleLooseBall(ball, distance, game);
        }

        // Move towards target with realistic pacing
        this.moveToTargetIntelligently();

        // Make intelligent decisions
        if (this.actionTimer <= 0) {
            this.makeIntelligentDecision(ball, game, distance);
        }
    }

    supportTeammateIntelligently(ballOwner, ball, game, distanceToBall) {
        const goalX = this.isHomeTeam ? 1100 : 100;
        const ballInAttackingThird = (this.isHomeTeam && ball.x > 800) || (!this.isHomeTeam && ball.x < 400);
        const ballInDefendingThird = (this.isHomeTeam && ball.x < 400) || (!this.isHomeTeam && ball.x > 800);

        // Enhanced role-specific positioning
        switch(this.role) {
            case 'goalkeeper':
                this.maintainGoalkeeperPosition(ball, game);
                break;
                
            case 'defender':
                this.maintainDefensiveShape(ballOwner, ball, ballInAttackingThird);
                break;
                
            case 'midfielder':
                this.findMidfieldSpace(ballOwner, ball, game);
                break;
                
            case 'attacker':
                this.makeAttackingRuns(ballOwner, goalX, ballInAttackingThird);
                break;
        }
        
        this.running = true;
    }

    maintainGoalkeeperPosition(ball, game) {
        const goalX = this.isHomeTeam ? 50 : 1150;
        const goalY = 400;
        
        // Goalkeeper stays primarily in the goal area
        if ((this.isHomeTeam && ball.x < 400) || (!this.isHomeTeam && ball.x > 800)) {
            // Only move significantly if ball is in dangerous position
            const predictedY = ball.y + (ball.speedY * 15);
            this.targetX = goalX;
            this.targetY = Math.max(200, Math.min(600, predictedY));
        } else {
            // Return to center of goal
            this.targetX = goalX;
            this.targetY = goalY;
        }
    }

    maintainDefensiveShape(ballOwner, ball, ballInAttackingThird) {
        const formationPos = this.getFormationPosition();
        const defensiveLine = this.isHomeTeam ? 300 : 900;
        
        if (ballInAttackingThird) {
            // Defenders stay deep when team is attacking
            this.targetX = formationPos.x * 0.8;
            this.targetY = formationPos.y;
        } else if (Math.abs(ball.x - this.x) < 250) {
            // Only pressure if ball is in defensive area
            const pressureDistance = 100 + Math.random() * 50;
            const angle = Math.atan2(ball.y - this.y, ball.x - this.x);
            this.targetX = ball.x - Math.cos(angle) * pressureDistance;
            this.targetY = ball.y - Math.sin(angle) * pressureDistance;
        } else {
            // Maintain defensive line
            this.targetX = defensiveLine;
            this.targetY = formationPos.y;
        }
    }

    findMidfieldSpace(ballOwner, ball, game) {
        const formationPos = this.getFormationPosition();
        const goalX = this.isHomeTeam ? 1100 : 100;
        
        // Midfielders find space between defenders and attackers
        if (this.positioningTimer <= 0) {
            this.positioningTimer = 90 + Math.random() * 60;
            
            // Look for open space away from teammates and opponents
            const bestPosition = this.findOptimalSupportPosition(ballOwner, game);
            this.targetX = bestPosition.x;
            this.targetY = bestPosition.y;
        }
        
        // Occasionally make forward runs
        if (Math.random() < 0.01 && ballOwner.x > formationPos.x) {
            this.targetX = formationPos.x + 100;
            this.targetY = formationPos.y + (Math.random() - 0.5) * 100;
        }
    }

    findOptimalSupportPosition(ballOwner, game) {
        const basePos = this.getFormationPosition();
        const goalX = this.isHomeTeam ? 1100 : 100;
        
        // Generate potential support positions
        const potentialPositions = [
            // Direct support
            { x: ballOwner.x + 60, y: ballOwner.y - 40 },
            { x: ballOwner.x + 60, y: ballOwner.y + 40 },
            { x: ballOwner.x - 60, y: ballOwner.y - 40 },
            { x: ballOwner.x - 60, y: ballOwner.y + 40 },
            // Forward passing lanes
            { x: ballOwner.x + 120, y: ballOwner.y - 80 },
            { x: ballOwner.x + 120, y: ballOwner.y + 80 },
            // Formation position
            { x: basePos.x, y: basePos.y }
        ];
        
        let bestPosition = potentialPositions[0];
        let bestScore = -Infinity;
        
        potentialPositions.forEach(pos => {
            let score = 0;
            
            // Distance from ball owner (prefer moderate distance)
            const distToOwner = Math.sqrt(Math.pow(pos.x - ballOwner.x, 2) + Math.pow(pos.y - ballOwner.y, 2));
            score += Math.max(0, 100 - Math.abs(distToOwner - 80));
            
            // Openness (distance to nearest player)
            let minDistToPlayer = Infinity;
            game.players.forEach(player => {
                if (player !== this) {
                    const dist = Math.sqrt(Math.pow(pos.x - player.x, 2) + Math.pow(pos.y - player.y, 2));
                    if (dist < minDistToPlayer) minDistToPlayer = dist;
                }
            });
            score += minDistToPlayer * 2;
            
            // Position relative to goal (attackers get bonus for forward positions)
            if (this.role === 'attacker') {
                const progress = (pos.x - basePos.x) * (this.isHomeTeam ? 1 : -1);
                score += progress * 0.5;
            }
            
            // Defenders get penalty for being too far forward
            if (this.role === 'defender') {
                const defensiveProgress = (basePos.x - pos.x) * (this.isHomeTeam ? 1 : -1);
                if (defensiveProgress > 0) score -= defensiveProgress * 2;
            }
            
            if (score > bestScore) {
                bestScore = score;
                bestPosition = pos;
            }
        });
        
        return bestPosition;
    }

    makeAttackingRuns(ballOwner, goalX, ballInAttackingThird) {
        const formationPos = this.getFormationPosition();
        
        if (ballInAttackingThird) {
            // In attacking third, make intelligent runs
            if (Math.random() < 0.02) {
                // Make a run behind defensive line
                this.targetX = goalX - (this.isHomeTeam ? 50 : -50);
                this.targetY = 300 + Math.random() * 200;
                this.positioningTimer = 120;
            } else if (Math.random() < 0.03) {
                // Drift wide to create space
                this.targetX = formationPos.x;
                this.targetY = Math.random() < 0.5 ? 150 : 650;
                this.positioningTimer = 90;
            } else {
                // Hold position in dangerous areas
                this.targetX = formationPos.x;
                this.targetY = formationPos.y;
            }
        } else {
            // Build up play - stay in formation but look for space
            this.targetX = formationPos.x;
            this.targetY = formationPos.y;
        }
    }

    defendStrategically(ball, distance, game) {
        if (this.role === 'goalkeeper') {
            this.maintainGoalkeeperPosition(ball, game);
            return;
        }

        const formationPos = this.getFormationPosition();
        const ballInDangerZone = (this.isHomeTeam && ball.x < 500) || (!this.isHomeTeam && ball.x > 700);
        
        if (this.role === 'defender' || ballInDangerZone) {
            // Defensive players or any player in danger zone defends
            if (distance < 200 && this.aggression > 0.4) {
                // Pressure the ball if close and aggressive
                const pressureDistance = 30 + Math.random() * 20;
                const angle = Math.atan2(ball.y - this.y, ball.x - this.x);
                this.targetX = ball.x - Math.cos(angle) * pressureDistance;
                this.targetY = ball.y - Math.sin(angle) * pressureDistance;
            } else {
                // Mark space and maintain defensive shape
                this.markStrategicPosition(ball, game);
            }
        } else {
            // Return to formation but adjust for ball position
            this.returnToStrategicPosition(ball, game);
        }
        
        this.running = distance > 25;
    }

    markStrategicPosition(ball, game) {
        const formationPos = this.getFormationPosition();
        const defensiveLine = this.isHomeTeam ? 350 : 850;
        
        // Find nearest opponent to mark
        let nearestOpponent = null;
        let minOpponentDist = Infinity;
        
        game.players.forEach(player => {
            if (player.isHomeTeam !== this.isHomeTeam && player.role !== 'goalkeeper') {
                const dist = Math.sqrt(Math.pow(player.x - this.x, 2) + Math.pow(player.y - this.y, 2));
                if (dist < minOpponentDist && dist < 300) {
                    minOpponentDist = dist;
                    nearestOpponent = player;
                }
            }
        });
        
        if (nearestOpponent && minOpponentDist < 150) {
            // Mark the nearest opponent
            const markDistance = 40;
            const angle = Math.atan2(nearestOpponent.y - this.y, nearestOpponent.x - this.x);
            this.targetX = nearestOpponent.x - Math.cos(angle) * markDistance;
            this.targetY = nearestOpponent.y - Math.sin(angle) * markDistance;
        } else {
            // Maintain zonal marking position
            this.targetX = defensiveLine;
            this.targetY = formationPos.y + (ball.y - 400) * 0.3;
        }
    }

    handleLooseBall(ball, distance, game) {
        // Only certain players should actively chase loose balls
        const shouldChaseBall = this.shouldChaseLooseBall(ball, distance, game);
        
        if (shouldChaseBall && this.actionTimer <= 0) {
            this.targetX = ball.x;
            this.targetY = ball.y;
            this.running = true;
            this.actionTimer = 45 + Math.random() * 30;
        } else {
            // Return to strategic position
            this.returnToStrategicPosition(ball, game);
        }
    }

    shouldChaseLooseBall(ball, distance, game) {
        // Determine if this player should chase the loose ball
        if (distance > 250) return false; // Too far to chase
        
        const ballInZone = this.isBallInResponsibleZone(ball);
        const isClosestPlayer = this.isClosestTeammateToBall(ball, game);
        const rolePriority = this.getChasePriority();
        
        return (ballInZone && isClosestPlayer) || 
               (rolePriority > 0.7 && distance < 150) ||
               (this.aggression > 0.6 && distance < 200);
    }

    isBallInResponsibleZone(ball) {
        // Check if ball is in this player's responsible zone
        const myZone = this.currentZone;
        const ballZone = this.calculateBallZone(ball);
        
        // Players are responsible for balls in their zone or adjacent zones
        const zoneDiff = Math.abs(myZone.x - ballZone.x) + Math.abs(myZone.y - ballZone.y);
        return zoneDiff <= 1;
    }

    calculateBallZone(ball) {
        const zoneWidth = 1200 / 3;
        const zoneHeight = 800 / 3;
        const zoneX = Math.floor(ball.x / zoneWidth);
        const zoneY = Math.floor(ball.y / zoneHeight);
        return { x: zoneX, y: zoneY };
    }

    isClosestTeammateToBall(ball, game) {
        let minDistance = Infinity;
        let closestPlayer = null;
        
        game.players.forEach(player => {
            if (player.isHomeTeam === this.isHomeTeam && player !== this) {
                const dist = Math.sqrt(Math.pow(player.x - ball.x, 2) + Math.pow(player.y - ball.y, 2));
                if (dist < minDistance) {
                    minDistance = dist;
                    closestPlayer = player;
                }
            }
        });
        
        const myDistance = Math.sqrt(Math.pow(this.x - ball.x, 2) + Math.pow(this.y - ball.y, 2));
        return myDistance <= minDistance;
    }

    getChasePriority() {
        // Higher priority means more likely to chase loose balls
        switch(this.role) {
            case 'goalkeeper': return 0.1;
            case 'defender': return 0.3;
            case 'midfielder': return 0.8;
            case 'attacker': return 0.5;
            default: return 0.5;
        }
    }

    returnToStrategicPosition(ball, game) {
        const formationPos = this.getFormationPosition();
        const ballInAttackingHalf = (this.isHomeTeam && ball.x > 600) || (!this.isHomeTeam && ball.x < 600);
        
        // Enhanced positioning based on ball location and role
        if (this.role === 'defender') {
            // Defenders stay back but adjust for ball position
            const defensiveLine = this.isHomeTeam ? 350 : 850;
            this.targetX = defensiveLine;
            this.targetY = formationPos.y + (ball.y - 400) * 0.2;
        } else if (this.role === 'attacker' && !ballInAttackingHalf) {
            // Attackers drop slightly when defending
            this.targetX = formationPos.x * 0.7;
            this.targetY = formationPos.y;
        } else if (this.role === 'midfielder') {
            // Midfielders adjust based on ball position
            const midfieldAdjustment = (ball.x - 600) * 0.1;
            this.targetX = formationPos.x + midfieldAdjustment;
            this.targetY = formationPos.y + (ball.y - 400) * 0.1;
        } else {
            // Default positioning
            this.targetX = formationPos.x;
            this.targetY = formationPos.y;
        }
        
        // Add small random movement to create more natural positioning
        if (Math.random() < 0.02) {
            this.targetX += (Math.random() - 0.5) * 40;
            this.targetY += (Math.random() - 0.5) * 40;
        }
    }

    moveToTargetIntelligently() {
        const targetDx = this.targetX - this.x;
        const targetDy = this.targetY - this.y;
        const targetDistance = Math.sqrt(targetDx * targetDx + targetDy * targetDy);

        if (targetDistance > 8) {
            const speedMultiplier = this.stamina * (1 + this.aggression * 0.2);
            
            // Adjust speed based on urgency
            let urgency = 1.0;
            if (targetDistance > 100) urgency = 1.2;
            if (targetDistance < 20) urgency = 0.7;
            
            this.speedX = (targetDx / targetDistance) * this.speed * speedMultiplier * urgency;
            this.speedY = (targetDy / targetDistance) * this.speed * speedMultiplier * urgency;
            
            this.x += this.speedX;
            this.y += this.speedY;
            this.running = targetDistance > 25;
        } else {
            this.speedX *= 0.7;
            this.speedY *= 0.7;
            this.running = false;
        }
    }

    makeIntelligentDecision(ball, game, distance) {
        // Only attempt actions when it makes sense
        
        // Attempt tackle if in defensive position and close to opponent with ball
        if (ball.possessedBy && 
            ball.possessedBy.isHomeTeam !== this.isHomeTeam && 
            distance < 40 && 
            this.isInDefensivePosition() &&
            Math.random() < this.aggression * 0.04) {
            this.attemptTackle(ball, game);
            this.actionTimer = 60;
        }
        
        // Attempt shot if in good attacking position with ball
        if (this.hasBall && ball.possessedBy === this) {
            const goalX = this.isHomeTeam ? 1150 : 50;
            const dxToGoal = goalX - this.x;
            const dyToGoal = 400 - this.y;
            const distanceToGoal = Math.sqrt(dxToGoal * dxToGoal + dyToGoal * dyToGoal);
            
            const shotProbability = this.calculateShotProbability(distanceToGoal);
            
            if (Math.random() < shotProbability) {
                this.attemptShot(ball, game);
                this.actionTimer = 80;
            } else if (Math.random() < this.passing * 0.04) {
                this.attemptIntelligentPass(ball, game);
                this.actionTimer = 50;
            }
        }
    }

    isInDefensivePosition() {
        // Check if player is in a good defensive position to attempt tackle
        if (this.role === 'goalkeeper') return true;
        
        const formationPos = this.getFormationPosition();
        const positionDiscipline = Math.sqrt(
            Math.pow(this.x - formationPos.x, 2) + 
            Math.pow(this.y - formationPos.y, 2)
        );
        
        return positionDiscipline < 150;
    }

    calculateShotProbability(distanceToGoal) {
        // Higher probability when closer to goal and in good position
        let probability = this.shooting * 0.03;
        
        if (distanceToGoal < 150) probability *= 2.0;
        if (distanceToGoal < 100) probability *= 1.5;
        if (distanceToGoal > 300) probability *= 0.3;
        
        // Check if player has clear shooting lane (simplified)
        const angleToGoal = Math.abs(Math.atan2(400 - this.y, (this.isHomeTeam ? 1150 : 50) - this.x));
        if (angleToGoal < 0.5) probability *= 1.3; // More central position
        
        return probability;
    }

    attemptIntelligentPass(ball, game) {
        if (!this.hasBall || ball.possessedBy !== this) return false;

        let bestTeammate = null;
        let bestScore = -1;

        // Find the best teammate to pass to based on multiple factors
        game.players.forEach(player => {
            if (player !== this && player.isHomeTeam === this.isHomeTeam) {
                const dx = player.x - this.x;
                const dy = player.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 350 && distance > 30) {
                    let score = this.calculatePassScore(player, game, distance);
                    
                    if (score > bestScore) {
                        bestScore = score;
                        bestTeammate = player;
                    }
                }
            }
        });

        if (bestTeammate && bestScore > 50) {
            this.passBall(ball, bestTeammate, game);
            return true;
        }
        
        return false;
    }

    calculatePassScore(teammate, game, distance) {
        let score = 0;
        
        // Progress toward goal
        const goalX = this.isHomeTeam ? 1150 : 50;
        const progress = (teammate.x - this.x) * (this.isHomeTeam ? 1 : -1);
        if (progress > 0) score += progress * 1.5;
        
        // Position relative to role
        if (teammate.role === 'attacker' && progress > 0) score += 60;
        if (teammate.role === 'defender' && progress < 0) score += 40;
        if (teammate.role === 'midfielder') score += 30;
        
        // Openness (distance to nearest opponent)
        let minOpponentDist = Infinity;
        game.players.forEach(opponent => {
            if (opponent.isHomeTeam !== this.isHomeTeam) {
                const dist = Math.sqrt(
                    Math.pow(opponent.x - teammate.x, 2) + 
                    Math.pow(opponent.y - teammate.y, 2)
                );
                if (dist < minOpponentDist) minOpponentDist = dist;
            }
        });
        score += minOpponentDist * 1.2;
        
        // Passing lane safety
        let passingLaneSafety = 100;
        game.players.forEach(opponent => {
            if (opponent.isHomeTeam !== this.isHomeTeam) {
                const distToLine = this.distanceToLine(this.x, this.y, teammate.x, teammate.y, opponent.x, opponent.y);
                if (distToLine < 35) passingLaneSafety -= 40;
            }
        });
        score += passingLaneSafety;
        
        // Distance preference (not too close, not too far)
        score += Math.max(0, 80 - Math.abs(distance - 120));
        
        // Random variation
        score += Math.random() * 40;
        
        return score;
    }

    // ... (keep the rest of the existing methods like kickBall, passBall, attemptTackle, etc. the same) ...
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
    
    setupPlayers() {
        this.players = [];
        const formation = formations[selectedFormation];
        const homePositions = Object.keys(formation.positions);
        const awayPositions = Object.keys(formation.positions);

        // Create home team players
        homePositions.forEach((position, index) => {
            const formationPos = this.getFormationPosition(position, true);
            const playerData = this.homeTeamPlayers[index];
            let isUserControlled = false;
            
            if (this.gameMode === 'player-vs-player') {
                isUserControlled = (index === 9); // ST1 or similar
            } else {
                isUserControlled = (this.userControlledTeam === 'home' || this.userControlledTeam === 'both') && 
                                 (position.includes('ST') || position.includes('S') || index === 9);
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

        // Create away team players
        awayPositions.forEach((position, index) => {
            const formationPos = this.getFormationPosition(position, false);
            const playerData = this.awayTeamPlayers[index];
            let isUserControlled = false;
            
            if (this.gameMode === 'player-vs-player') {
                isUserControlled = (index === 9); // ST1 or similar
            } else {
                isUserControlled = (this.userControlledTeam === 'away' || this.userControlledTeam === 'both') && 
                                 (position.includes('ST') || position.includes('S') || index === 9);
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
                
                if (distance < 35 && distance < closestDistance) {
                    closestDistance = distance;
                    closestPlayer = player;
                }
            });

            if (closestPlayer && closestDistance < 35) {
                this.ball.possessedBy = closestPlayer;
                closestPlayer.hasBall = true;
                this.ball.speedX = 0;
                this.ball.speedY = 0;

                // Switch control if appropriate
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
    
    checkGoals() {
        // Check for goal on the left side (away team scores)
        if (this.ball.x - this.ball.radius < 20 && 
            this.ball.y > this.fieldHeight / 2 - 60 && 
            this.ball.y < this.fieldHeight / 2 + 60) {
            
            // Check if ball is moving toward goal
            if (this.ball.speedX < 0 || this.ball.x < 10) {
                this.score.away++;
                this.handleGoal(false);
                return;
            }
        }
        
        // Check for goal on the right side (home team scores)
        if (this.ball.x + this.ball.radius > this.fieldWidth - 20 && 
            this.ball.y > this.fieldHeight / 2 - 60 && 
            this.ball.y < this.fieldHeight / 2 + 60) {
            
            // Check if ball is moving toward goal
            if (this.ball.speedX > 0 || this.ball.x > this.fieldWidth - 10) {
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