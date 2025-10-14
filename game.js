// FIFA 2024 STYLE FOOTBALL GAME - REALISTIC PLAYER MOVEMENTS

// Enhanced Football Player Class with FIFA-like realism
class FIFA2024Player {
    constructor(config) {
        this.x = config.x;
        this.y = config.y;
        this.color = config.color;
        this.secondaryColor = config.secondaryColor;
        this.number = config.number;
        this.position = config.position;
        this.isHomeTeam = config.isHomeTeam;
        this.teamName = config.teamName;
        this.isUserControlled = config.isUserControlled;
        this.isCurrentUserControlled = config.isCurrentUserControlled;
        this.playerData = config.playerData;
        
        // FIFA-style player attributes
        this.radius = 22;
        this.baseSpeed = 2.5;
        this.speed = this.baseSpeed;
        this.acceleration = 0.15;
        this.deceleration = 0.12;
        this.maxSpeed = 4.5;
        this.agility = 0.8;
        this.balance = 0.7;
        
        // Enhanced physics
        this.velocityX = 0;
        this.velocityY = 0;
        this.momentumX = 0;
        this.momentumY = 0;
        this.facingDirection = this.isHomeTeam ? 0 : Math.PI;
        
        // Player states
        this.hasBall = false;
        this.isSprinting = false;
        this.isJogging = false;
        this.isWalking = false;
        this.isDribbling = false;
        this.isPassing = false;
        this.isShooting = false;
        this.isTackling = false;
        this.isCelebrating = false;
        this.isFalling = false;
        this.isJumping = false;
        
        // Animation properties
        this.animationFrame = 0;
        this.legSwing = 0;
        this.armSwing = 0;
        this.bodyLean = 0;
        this.headAngle = 0;
        this.kickPower = 0;
        this.tacklePower = 0;
        
        // Player stats (FIFA-style ratings)
        this.attributes = {
            pace: 75 + Math.random() * 25,
            shooting: 70 + Math.random() * 30,
            passing: 70 + Math.random() * 30,
            dribbling: 70 + Math.random() * 30,
            defending: 70 + Math.random() * 30,
            physical: 70 + Math.random() * 30
        };
        
        // Stamina system
        this.stamina = 100;
        this.staminaDrainRate = 0.1;
        this.staminaRecoveryRate = 0.05;
        
        // AI behavior
        this.aiIntelligence = 0.6 + Math.random() * 0.4;
        this.positioning = 0.6 + Math.random() * 0.4;
        this.aggression = 0.4 + Math.random() * 0.4;
        this.teamwork = 0.6 + Math.random() * 0.4;
        
        this.setRoleBasedAttributes();
        this.resetMovement();
    }

    setRoleBasedAttributes() {
        switch(this.determineRole()) {
            case 'goalkeeper':
                this.attributes.pace = 60 + Math.random() * 20;
                this.attributes.shooting = 40 + Math.random() * 20;
                this.attributes.passing = 70 + Math.random() * 20;
                this.attributes.dribbling = 50 + Math.random() * 20;
                this.attributes.defending = 85 + Math.random() * 15;
                this.attributes.physical = 80 + Math.random() * 20;
                break;
            case 'defender':
                this.attributes.pace = 65 + Math.random() * 25;
                this.attributes.shooting = 50 + Math.random() * 25;
                this.attributes.passing = 70 + Math.random() * 20;
                this.attributes.dribbling = 60 + Math.random() * 25;
                this.attributes.defending = 80 + Math.random() * 20;
                this.attributes.physical = 85 + Math.random() * 15;
                break;
            case 'midfielder':
                this.attributes.pace = 75 + Math.random() * 20;
                this.attributes.shooting = 70 + Math.random() * 25;
                this.attributes.passing = 80 + Math.random() * 20;
                this.attributes.dribbling = 80 + Math.random() * 20;
                this.attributes.defending = 65 + Math.random() * 25;
                this.attributes.physical = 75 + Math.random() * 20;
                break;
            case 'attacker':
                this.attributes.pace = 85 + Math.random() * 15;
                this.attributes.shooting = 85 + Math.random() * 15;
                this.attributes.passing = 75 + Math.random() * 20;
                this.attributes.dribbling = 85 + Math.random() * 15;
                this.attributes.defending = 40 + Math.random() * 25;
                this.attributes.physical = 70 + Math.random() * 25;
                break;
        }
        
        // Apply player data if available
        if (this.playerData) {
            this.attributes.pace = this.playerData.speed || this.attributes.pace;
            this.attributes.shooting = this.playerData.shooting || this.attributes.shooting;
            this.attributes.passing = this.playerData.passing || this.attributes.passing;
        }
        
        this.calculateDerivedAttributes();
    }

    calculateDerivedAttributes() {
        this.maxSpeed = 3 + (this.attributes.pace / 100) * 3;
        this.acceleration = 0.1 + (this.attributes.pace / 100) * 0.15;
        this.agility = 0.6 + (this.attributes.dribbling / 100) * 0.4;
        this.balance = 0.6 + (this.attributes.physical / 100) * 0.4;
    }

    update(ball, userInput = null, game = null) {
        this.animationFrame++;
        
        // Update stamina
        this.updateStamina();
        
        // Update player state
        this.updatePlayerState();
        
        // Handle user input or AI
        if (this.isCurrentUserControlled && userInput) {
            this.handleUserInput(userInput, ball, game);
        } else {
            this.handleAI(ball, game);
        }
        
        // Apply physics and movement
        this.applyMovementPhysics();
        this.updatePosition();
        this.updateAnimations();
        
        // Handle ball possession
        this.handleBallPossession(ball, game);
        
        // Boundary checks
        this.enforceBoundaries();
    }

    updateStamina() {
        if (this.isSprinting) {
            this.stamina = Math.max(20, this.stamina - this.staminaDrainRate);
        } else if (!this.isMoving()) {
            this.stamina = Math.min(100, this.stamina + this.staminaRecoveryRate);
        }
        
        // Adjust speed based on stamina
        const staminaEffect = 0.6 + (this.stamina / 100) * 0.4;
        this.speed = this.baseSpeed * staminaEffect;
        
        if (this.stamina < 30 && this.isSprinting) {
            this.isSprinting = false;
        }
    }

    updatePlayerState() {
        const speed = Math.sqrt(this.velocityX ** 2 + this.velocityY ** 2);
        
        if (speed < 0.5) {
            this.isWalking = false;
            this.isJogging = false;
            this.isSprinting = false;
        } else if (speed < 2) {
            this.isWalking = true;
            this.isJogging = false;
            this.isSprinting = false;
        } else if (speed < 3.5) {
            this.isWalking = false;
            this.isJogging = true;
            this.isSprinting = false;
        } else {
            this.isWalking = false;
            this.isJogging = false;
            this.isSprinting = true;
        }
        
        this.isDribbling = this.hasBall && (this.isWalking || this.isJogging);
    }

    handleUserInput(userInput, ball, game) {
        const inputX = userInput.x || 0;
        const inputY = userInput.y || 0;
        
        // Calculate target velocity based on input
        let targetVelX = inputX * this.speed;
        let targetVelY = inputY * this.speed;
        
        // Apply sprint modifier
        if (this.isSprinting) {
            targetVelX *= 1.8;
            targetVelY *= 1.8;
        }
        
        // Smooth acceleration towards target velocity
        this.velocityX += (targetVelX - this.velocityX) * this.acceleration;
        this.velocityY += (targetVelY - this.velocityY) * this.acceleration;
        
        // Update facing direction
        if (Math.abs(inputX) > 0.1 || Math.abs(inputY) > 0.1) {
            this.facingDirection = Math.atan2(inputY, inputX);
        }
        
        // Handle actions
        if (userInput.shoot && this.hasBall) {
            this.attemptShot(ball, game);
        }
        if (userInput.pass && this.hasBall) {
            this.attemptPass(ball, game);
        }
        if (userInput.tackle && !this.hasBall) {
            this.attemptTackle(ball, game);
        }
        if (userInput.sprint) {
            this.startSprint();
        } else {
            this.stopSprint();
        }
    }

    handleAI(ball, game) {
        // FIFA-like AI decision making
        const ballDistance = Math.sqrt((ball.x - this.x) ** 2 + (ball.y - this.y) ** 2);
        const ballInPossession = ball.possessedBy;
        
        if (ballInPossession) {
            if (ballInPossession.isHomeTeam === this.isHomeTeam) {
                // Teammate has ball - support or get open
                this.supportTeammate(ballInPossession, ball, game);
            } else {
                // Opponent has ball - defend
                this.defendAgainstOpponent(ballInPossession, ball, game);
            }
        } else {
            // Loose ball - decide whether to go for it
            if (this.shouldChaseBall(ball, ballDistance)) {
                this.chaseBall(ball, game);
            } else {
                this.maintainPosition(ball, game);
            }
        }
        
        // AI decision making for actions
        if (this.hasBall && Math.random() < 0.02 * this.aiIntelligence) {
            this.makeAIDecision(ball, game);
        }
    }

    supportTeammate(ballOwner, ball, game) {
        const role = this.determineRole();
        const distanceToOwner = Math.sqrt((this.x - ballOwner.x) ** 2 + (this.y - ballOwner.y) ** 2);
        
        let targetX, targetY;
        
        switch(role) {
            case 'defender':
                // Stay back and provide defensive cover
                targetX = this.isHomeTeam ? 300 : 900;
                targetY = this.y;
                break;
            case 'midfielder':
                // Find space in midfield
                if (distanceToOwner < 100) {
                    // Move away to create passing lane
                    const angle = Math.atan2(this.y - ballOwner.y, this.x - ballOwner.x);
                    targetX = ballOwner.x + Math.cos(angle) * 80;
                    targetY = ballOwner.y + Math.sin(angle) * 80;
                } else {
                    // Move into attacking position
                    targetX = this.isHomeTeam ? 600 : 600;
                    targetY = 200 + Math.random() * 400;
                }
                break;
            case 'attacker':
                // Make attacking runs
                if (this.isHomeTeam) {
                    targetX = 800 + Math.random() * 200;
                } else {
                    targetX = 200 - Math.random() * 200;
                }
                targetY = 150 + Math.random() * 500;
                break;
            default:
                targetX = this.x;
                targetY = this.y;
        }
        
        this.moveToPosition(targetX, targetY, 0.7);
    }

    defendAgainstOpponent(ballOwner, ball, game) {
        const role = this.determineRole();
        const distanceToBall = Math.sqrt((this.x - ball.x) ** 2 + (this.y - ball.y) ** 2);
        
        let targetX, targetY;
        
        if (role === 'goalkeeper') {
            this.actAsGoalkeeper(ball, game);
            return;
        }
        
        if (distanceToBall < 150 && this.aggression > 0.5) {
            // Pressure the ball carrier
            targetX = ballOwner.x;
            targetY = ballOwner.y;
        } else {
            // Maintain defensive shape
            const goalX = this.isHomeTeam ? 100 : 1100;
            const interceptX = this.isHomeTeam ? 400 : 800;
            
            targetX = interceptX;
            targetY = ball.y + (Math.random() - 0.5) * 50;
        }
        
        this.moveToPosition(targetX, targetY, 0.8);
    }

    actAsGoalkeeper(ball, game) {
        const goalX = this.isHomeTeam ? 80 : 1120;
        const goalTop = 320;
        const goalBottom = 480;
        
        // Position in goal area
        let targetY = ball.y;
        targetY = Math.max(goalTop + 20, Math.min(goalBottom - 20, targetY));
        
        // Move out when ball is far, stay in goal when ball is close
        const ballDistance = Math.abs(ball.x - goalX);
        let targetX = goalX;
        
        if (ballDistance > 400 && this.isHomeTeam === (ball.x < 600)) {
            targetX = this.isHomeTeam ? 200 : 1000;
        }
        
        this.moveToPosition(targetX, targetY, 0.6);
    }

    chaseBall(ball, game) {
        // Predict ball movement
        const predictFrames = 10;
        const predictedX = ball.x + ball.speedX * predictFrames;
        const predictedY = ball.y + ball.speedY * predictFrames;
        
        this.moveToPosition(predictedX, predictedY, 0.9);
        
        // Sprint if far from ball
        const ballDistance = Math.sqrt((this.x - ball.x) ** 2 + (this.y - ball.y) ** 2);
        if (ballDistance > 100 && this.stamina > 40) {
            this.startSprint();
        }
    }

    maintainPosition(ball, game) {
        const formationPos = this.getFormationPosition();
        const ballInfluence = this.calculateBallInfluence(ball);
        
        const targetX = formationPos.x + ballInfluence.x;
        const targetY = formationPos.y + ballInfluence.y;
        
        this.moveToPosition(targetX, targetY, 0.4);
        this.stopSprint();
    }

    calculateBallInfluence(ball) {
        const ballDistance = Math.sqrt((this.x - ball.x) ** 2 + (this.y - ball.y) ** 2);
        const maxInfluenceDistance = 300;
        
        if (ballDistance > maxInfluenceDistance) {
            return { x: 0, y: 0 };
        }
        
        const influence = 1 - (ballDistance / maxInfluenceDistance);
        const dx = ball.x - this.x;
        const dy = ball.y - this.y;
        
        return {
            x: dx * influence * 0.3,
            y: dy * influence * 0.3
        };
    }

    moveToPosition(targetX, targetY, urgency = 0.5) {
        const dx = targetX - this.x;
        const dy = targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 5) {
            const directionX = dx / distance;
            const directionY = dy / distance;
            
            const speed = this.speed * urgency * (0.5 + this.attributes.pace / 150);
            
            this.velocityX += (directionX * speed - this.velocityX) * this.acceleration;
            this.velocityY += (directionY * speed - this.velocityY) * this.acceleration;
            
            this.facingDirection = Math.atan2(directionY, directionX);
        } else {
            // Decelerate when close to target
            this.velocityX *= 0.8;
            this.velocityY *= 0.8;
        }
    }

    makeAIDecision(ball, game) {
        if (!this.hasBall) return;
        
        const role = this.determineRole();
        const goalX = this.isHomeTeam ? 1150 : 50;
        const distanceToGoal = Math.abs(goalX - this.x);
        
        const decisionRandom = Math.random();
        
        if (role === 'attacker' && distanceToGoal < 300 && decisionRandom < 0.3) {
            this.attemptShot(ball, game);
        } else if (decisionRandom < 0.4) {
            this.attemptPass(ball, game);
        } else if (decisionRandom < 0.7) {
            this.attemptDribble(ball, game);
        }
        // Otherwise continue with current action
    }

    attemptDribble(ball, game) {
        if (!this.hasBall) return;
        
        // Change direction slightly to dribble past opponents
        const dribbleAngle = this.facingDirection + (Math.random() - 0.5) * 0.5;
        const dribblePower = 2 + Math.random() * 3;
        
        this.velocityX += Math.cos(dribbleAngle) * dribblePower * 0.1;
        this.velocityY += Math.sin(dribbleAngle) * dribblePower * 0.1;
        
        this.isDribbling = true;
    }

    attemptShot(ball, game) {
        if (!this.hasBall) return false;
        
        this.isShooting = true;
        this.kickPower = 15 + (this.attributes.shooting / 100) * 20;
        
        const goalX = this.isHomeTeam ? 1150 : 50;
        const goalY = 400;
        
        // Calculate shot direction with accuracy based on shooting attribute
        const dx = goalX - this.x;
        const dy = (goalY + (Math.random() - 0.5) * 100) - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const baseAngle = Math.atan2(dy, dx);
        
        // Accuracy based on player rating
        const accuracy = 0.8 + (this.attributes.shooting / 100) * 0.4;
        const angleVariation = (1 - accuracy) * 0.3;
        const finalAngle = baseAngle + (Math.random() - 0.5) * angleVariation;
        
        // Power based on distance and player rating
        const power = Math.min(25, this.kickPower * (0.8 + distance / 1000));
        
        // Apply curve based on player skill
        const curve = (Math.random() - 0.5) * 0.2 * (this.attributes.dribbling / 100);
        
        ball.speedX = Math.cos(finalAngle + curve) * power;
        ball.speedY = Math.sin(finalAngle + curve) * power;
        ball.possessedBy = null;
        ball.lastTouchedBy = this;
        this.hasBall = false;
        this.isShooting = false;
        
        // Update game stats
        if (game) {
            if (this.isHomeTeam) {
                game.stats.shots.home++;
            } else {
                game.stats.shots.away++;
            }
        }
        
        return true;
    }

    attemptPass(ball, game) {
        if (!this.hasBall) return false;
        
        let bestTeammate = null;
        let bestScore = -Infinity;
        
        if (game && game.players) {
            game.players.forEach(player => {
                if (player !== this && player.isHomeTeam === this.isHomeTeam) {
                    const dx = player.x - this.x;
                    const dy = player.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 400 && distance > 50) {
                        let score = 0;
                        
                        // Score based on positioning
                        const progress = (player.x - this.x) * (this.isHomeTeam ? 1 : -1);
                        if (progress > 0) score += progress * 2;
                        
                        // Score based on proximity to opponents
                        let opponentProximity = 0;
                        game.players.forEach(opponent => {
                            if (opponent.isHomeTeam !== this.isHomeTeam) {
                                const oppDist = Math.sqrt(
                                    Math.pow(opponent.x - player.x, 2) + 
                                    Math.pow(opponent.y - player.y, 2)
                                );
                                if (oppDist < 80) opponentProximity++;
                            }
                        });
                        score -= opponentProximity * 50;
                        
                        // Random factor
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
        if (!this.hasBall) return false;
        
        this.isPassing = true;
        
        const dx = targetPlayer.x - this.x;
        const dy = targetPlayer.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const baseAngle = Math.atan2(dy, dx);
        
        // Passing accuracy based on player rating
        const accuracy = 0.7 + (this.attributes.passing / 100) * 0.3;
        const angleVariation = (1 - accuracy) * 0.2;
        const finalAngle = baseAngle + (Math.random() - 0.5) * angleVariation;
        
        const power = Math.min(15, 6 + distance / 80);
        
        ball.speedX = Math.cos(finalAngle) * power;
        ball.speedY = Math.sin(finalAngle) * power;
        ball.possessedBy = null;
        ball.lastTouchedBy = this;
        this.hasBall = false;
        this.isPassing = false;
        
        return true;
    }

    attemptTackle(ball, game) {
        if (this.hasBall || this.isTackling) return false;
        
        const ballDistance = Math.sqrt((this.x - ball.x) ** 2 + (this.y - ball.y) ** 2);
        
        if (ballDistance < 40) {
            this.isTackling = true;
            this.tacklePower = 5 + Math.random() * 5;
            
            const successChance = (this.attributes.defending / 100) * 0.7;
            
            if (Math.random() < successChance && ball.possessedBy) {
                // Successful tackle
                ball.possessedBy.hasBall = false;
                ball.possessedBy = this;
                this.hasBall = true;
                ball.lastTouchedBy = this;
                
                // Add some recoil
                this.velocityX *= -0.5;
                this.velocityY *= -0.5;
            } else {
                // Failed tackle - foul or miss
                if (Math.random() < 0.3) {
                    // Foul
                    if (game) {
                        if (this.isHomeTeam) {
                            game.stats.fouls.home++;
                        } else {
                            game.stats.fouls.away++;
                        }
                    }
                }
            }
            
            setTimeout(() => {
                this.isTackling = false;
            }, 300);
            
            return true;
        }
        
        return false;
    }

    applyMovementPhysics() {
        // Apply momentum and friction
        this.velocityX += this.momentumX;
        this.velocityY += this.momentumY;
        
        // Apply friction
        this.velocityX *= 0.92;
        this.velocityY *= 0.92;
        
        // Decay momentum
        this.momentumX *= 0.8;
        this.momentumY *= 0.8;
        
        // Limit maximum speed
        const currentSpeed = Math.sqrt(this.velocityX ** 2 + this.velocityY ** 2);
        if (currentSpeed > this.maxSpeed) {
            const ratio = this.maxSpeed / currentSpeed;
            this.velocityX *= ratio;
            this.velocityY *= ratio;
        }
    }

    updatePosition() {
        this.x += this.velocityX;
        this.y += this.velocityY;
    }

    updateAnimations() {
        const speed = Math.sqrt(this.velocityX ** 2 + this.velocityY ** 2);
        
        // Running animation
        if (speed > 0.5) {
            this.legSwing = Math.sin(this.animationFrame * 0.4) * 25 * (speed / this.maxSpeed);
            this.armSwing = Math.sin(this.animationFrame * 0.4 + Math.PI) * 20 * (speed / this.maxSpeed);
            this.bodyLean = speed * 2;
        } else {
            this.legSwing *= 0.9;
            this.armSwing *= 0.9;
            this.bodyLean *= 0.9;
        }
        
        // Head follows ball when not in possession
        if (!this.hasBall) {
            this.headAngle = Math.sin(this.animationFrame * 0.1) * 0.3;
        } else {
            this.headAngle = 0;
        }
    }

    handleBallPossession(ball, game) {
        if (this.hasBall && ball.possessedBy === this) {
            // Player has ball - position it appropriately
            const carryDistance = 28;
            ball.x = this.x + Math.cos(this.facingDirection) * carryDistance;
            ball.y = this.y + Math.sin(this.facingDirection) * carryDistance;
            ball.speedX = this.velocityX * 0.5;
            ball.speedY = this.velocityY * 0.5;
        }
    }

    enforceBoundaries() {
        const margin = this.radius;
        this.x = Math.max(margin, Math.min(1200 - margin, this.x));
        this.y = Math.max(margin, Math.min(800 - margin, this.y));
        
        // Bounce off boundaries with reduced velocity
        if (this.x <= margin || this.x >= 1200 - margin) {
            this.velocityX *= -0.5;
            this.momentumX *= -0.5;
        }
        if (this.y <= margin || this.y >= 800 - margin) {
            this.velocityY *= -0.5;
            this.momentumY *= -0.5;
        }
    }

    startSprint() {
        if (this.stamina > 30) {
            this.isSprinting = true;
            this.baseSpeed = 4.0;
        }
    }

    stopSprint() {
        this.isSprinting = false;
        this.baseSpeed = 2.5;
    }

    isMoving() {
        return Math.abs(this.velocityX) > 0.1 || Math.abs(this.velocityY) > 0.1;
    }

    shouldChaseBall(ball, distance) {
        const role = this.determineRole();
        const ballInMyThird = this.isHomeTeam ? ball.x < 400 : ball.x > 800;
        
        switch(role) {
            case 'goalkeeper':
                return distance < 200 && ballInMyThird;
            case 'defender':
                return distance < 250 && ballInMyThird;
            case 'midfielder':
                return distance < 300;
            case 'attacker':
                return distance < 350 && !ballInMyThird;
            default:
                return distance < 200;
        }
    }

    determineRole() {
        if (this.position === 'GK') return 'goalkeeper';
        if (this.position.includes('B') || this.position.includes('D')) return 'defender';
        if (this.position.includes('M')) return 'midfielder';
        if (this.position.includes('S') || this.position.includes('T') || this.position.includes('W')) return 'attacker';
        return 'midfielder';
    }

    getFormationPosition() {
        const formation = formations[selectedFormation];
        if (!formation || !formation.positions[this.position]) {
            return { x: this.isHomeTeam ? 200 : 1000, y: 400 };
        }
        
        const pos = formation.positions[this.position];
        return {
            x: this.isHomeTeam ? pos.x : 1200 - pos.x,
            y: pos.y
        };
    }

    resetMovement() {
        this.velocityX = 0;
        this.velocityY = 0;
        this.momentumX = 0;
        this.momentumY = 0;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // Apply body lean when moving
        ctx.rotate(this.bodyLean * 0.01);
        
        const facingRight = Math.abs(this.facingDirection) < Math.PI / 2;
        const scaleX = facingRight ? 1 : -1;
        ctx.scale(scaleX, 1);

        // Highlight user-controlled player
        if (this.isCurrentUserControlled) {
            ctx.strokeStyle = this.isSprinting ? '#FF4444' : '#FFFF00';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(0, 0, this.radius + 6, 0, Math.PI * 2);
            ctx.stroke();
            
            // Stamina bar
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(-25, -this.radius - 12, 50, 6);
            ctx.fillStyle = this.stamina > 50 ? '#2ecc71' : this.stamina > 20 ? '#f39c12' : '#e74c3c';
            ctx.fillRect(-25, -this.radius - 12, 50 * (this.stamina / 100), 6);
        }

        // Tackle effect
        if (this.isTackling) {
            ctx.fillStyle = 'rgba(255, 50, 50, 0.4)';
            ctx.beginPath();
            ctx.arc(0, 0, this.radius + 15, 0, Math.PI * 2);
            ctx.fill();
        }

        // Shooting effect
        if (this.isShooting) {
            ctx.fillStyle = 'rgba(255, 215, 0, 0.4)';
            ctx.beginPath();
            ctx.arc(0, 0, this.radius + 10, 0, Math.PI * 2);
            ctx.fill();
        }

        // Body with dynamic kit
        ctx.fillStyle = this.color;
        ctx.fillRect(-8, -30, 16, 35);
        
        // Kit details
        ctx.fillStyle = this.secondaryColor;
        ctx.fillRect(-8, -25, 16, 5);
        ctx.fillRect(-8, -15, 16, 5);
        ctx.fillRect(-8, -5, 16, 5);

        // Head with rotation
        ctx.save();
        ctx.rotate(this.headAngle);
        ctx.fillStyle = '#FFDBAC';
        ctx.beginPath();
        ctx.arc(0, -42, 12, 0, Math.PI * 2);
        ctx.fill();

        // Hair
        ctx.fillStyle = '#2C3E50';
        ctx.beginPath();
        ctx.arc(0, -45, 10, 0, Math.PI, true);
        ctx.fill();

        // Face features
        ctx.fillStyle = '#2C3E50';
        ctx.beginPath();
        ctx.arc(-4, -44, 2.5, 0, Math.PI * 2);
        ctx.arc(4, -44, 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(0, -38, 3, 0, Math.PI, false);
        ctx.stroke();
        ctx.restore();

        // Arms with dynamic swing
        ctx.fillStyle = this.color;
        
        ctx.save();
        ctx.rotate(this.armSwing * Math.PI / 180);
        ctx.fillRect(-14, -25, 10, 4);
        ctx.restore();
        
        ctx.save();
        ctx.rotate(-this.armSwing * Math.PI / 180);
        ctx.fillRect(4, -25, 10, 4);
        ctx.restore();

        // Legs with running animation
        ctx.fillStyle = this.secondaryColor;
        
        ctx.save();
        ctx.rotate(this.legSwing * Math.PI / 180);
        ctx.fillRect(-6, 5, 5, 30);
        ctx.restore();
        
        ctx.save();
        ctx.rotate(-this.legSwing * Math.PI / 180);
        ctx.fillRect(1, 5, 5, 30);
        ctx.restore();

        // Shoes
        ctx.fillStyle = '#2C3E50';
        ctx.fillRect(-7, 32, 6, 5);
        ctx.fillRect(1, 32, 6, 5);

        // Player number
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.number, 0, -10);

        // Player name
        if (this.playerData) {
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            const lastName = this.playerData.name.split(' ')[1] || this.playerData.name;
            ctx.fillText(lastName, 0, 38);
        }

        // Ball indicator
        if (this.hasBall) {
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(30, -20, 8, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#000000';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('⚽', 30, -20);
        }

        // Attribute stars (visual representation of player quality)
        const rating = this.calculateOverallRating();
        const stars = Math.floor(rating / 20);
        ctx.fillStyle = '#FFD700';
        ctx.font = '8px Arial';
        ctx.textAlign = 'center';
        for (let i = 0; i < stars; i++) {
            ctx.fillText('★', -15 + i * 6, -45);
        }

        ctx.restore();
    }

    calculateOverallRating() {
        const weights = {
            pace: 0.15,
            shooting: 0.2,
            passing: 0.2,
            dribbling: 0.15,
            defending: 0.15,
            physical: 0.15
        };
        
        let total = 0;
        for (const [attribute, weight] of Object.entries(weights)) {
            total += this.attributes[attribute] * weight;
        }
        
        return Math.round(total);
    }

    celebrate() {
        this.isCelebrating = true;
        this.velocityX = (Math.random() - 0.5) * 3;
        this.velocityY = (Math.random() - 0.5) * 3;
        
        setTimeout(() => {
            this.isCelebrating = false;
            this.resetMovement();
        }, 2000);
    }
}

// Enhanced FootballBall class with realistic physics
class FIFA2024FootballBall {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 14;
        this.speedX = 0;
        this.speedY = 0;
        this.rotation = 0;
        this.spin = 0;
        this.airResistance = 0.99;
        this.groundFriction = 0.96;
        this.gravity = 0.1;
        this.bounceDamping = 0.7;
        this.possessedBy = null;
        this.lastTouchedBy = null;
        this.isInAir = false;
        this.bounceCount = 0;
    }

    update() {
        if (this.possessedBy) {
            this.isInAir = false;
            this.bounceCount = 0;
            return;
        }

        // Apply gravity if ball is in air
        if (this.isInAir) {
            this.speedY += this.gravity;
        }

        // Apply air resistance
        this.speedX *= this.airResistance;
        this.speedY *= this.airResistance;

        // Update position
        this.x += this.speedX;
        this.y += this.speedY;

        // Update rotation based on movement
        this.rotation += this.speedX * 0.1;
        this.spin += this.speedY * 0.05;

        // Boundary collision with enhanced physics
        this.handleBoundaryCollision();

        // Ground collision
        if (this.y + this.radius > 800) {
            this.y = 800 - this.radius;
            this.speedY *= -this.bounceDamping;
            this.speedX *= this.groundFriction;
            this.isInAir = false;
            this.bounceCount++;
            
            // Add random bounce variation
            if (this.bounceCount < 3) {
                this.speedX += (Math.random() - 0.5) * 0.5;
            }
        } else {
            this.isInAir = true;
        }

        // Stop ball if moving very slowly
        if (Math.abs(this.speedX) < 0.1 && Math.abs(this.speedY) < 0.1) {
            this.speedX = 0;
            this.speedY = 0;
        }
    }

    handleBoundaryCollision() {
        // Left and right boundaries (goals are handled separately)
        if (this.x - this.radius < 50 && (this.y < 320 || this.y > 480)) {
            this.x = this.radius + 50;
            this.speedX *= -0.8;
            this.speedY *= 0.9;
        }
        if (this.x + this.radius > 1150 && (this.y < 320 || this.y > 480)) {
            this.x = 1150 - this.radius;
            this.speedX *= -0.8;
            this.speedY *= 0.9;
        }

        // Top and bottom boundaries
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.speedY *= -0.8;
            this.speedX *= 0.9;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Modern football ball design
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;

        // Main pentagon/hexagon pattern (modern ball design)
        for (let i = 0; i < 5; i++) {
            const angle = (i * 72) * Math.PI / 180;
            const x = Math.cos(angle) * this.radius * 0.6;
            const y = Math.sin(angle) * this.radius * 0.6;
            
            ctx.beginPath();
            ctx.moveTo(0, 0);
            for (let j = 0; j < 5; j++) {
                const pentAngle = angle + (j * 72) * Math.PI / 180;
                const pentX = x + Math.cos(pentAngle) * this.radius * 0.3;
                const pentY = y + Math.sin(pentAngle) * this.radius * 0.3;
                if (j === 0) ctx.moveTo(pentX, pentY);
                else ctx.lineTo(pentX, pentY);
            }
            ctx.closePath();
            ctx.stroke();
        }

        // Add texture/shine for realism
        const gradient = ctx.createRadialGradient(-3, -3, 0, -3, -3, this.radius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(200, 200, 200, 0.3)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

// Replace the original classes in your game
// In your FootballGame class, replace:
// - new FootballBall() with new FIFA2024FootballBall()
// - new AnimatedPlayer() with new FIFA2024Player()

// Enhanced controls for realistic gameplay
class FIFA2024Controls {
    constructor(game) {
        this.game = game;
        this.keys = {
            ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false,
            ' ': false, 'x': false, 'c': false, 'Shift': false,
            'w': false, 's': false, 'a': false, 'd': false
        };
        
        // Analog input for smoother movement
        this.analogInput = { x: 0, y: 0 };
        this.inputSmoothing = 0.1;
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            const key = e.key;
            if (this.keys.hasOwnProperty(key)) {
                this.keys[key] = true;
                e.preventDefault();
            }
            
            this.updateAnalogInput();
            
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
            
            this.updateAnalogInput();
            
            if (key === 'Shift') {
                this.game.stopSprint();
            }
        });

        // Gamepad support for console-like experience
        window.addEventListener("gamepadconnected", (e) => {
            console.log("Gamepad connected:", e.gamepad.id);
            this.gamepadIndex = e.gamepad.index;
        });

        window.addEventListener("gamepaddisconnected", (e) => {
            console.log("Gamepad disconnected:", e.gamepad.id);
            this.gamepadIndex = null;
        });
    }

    updateAnalogInput() {
        let targetX = 0, targetY = 0;
        
        if (this.keys.ArrowUp || this.keys.w) targetY -= 1;
        if (this.keys.ArrowDown || this.keys.s) targetY += 1;
        if (this.keys.ArrowLeft || this.keys.a) targetX -= 1;
        if (this.keys.ArrowRight || this.keys.d) targetX += 1;
        
        // Smooth analog input
        this.analogInput.x += (targetX - this.analogInput.x) * this.inputSmoothing;
        this.analogInput.y += (targetY - this.analogInput.y) * this.inputSmoothing;
        
        // Normalize diagonal movement
        if (targetX !== 0 && targetY !== 0) {
            this.analogInput.x *= 0.707;
            this.analogInput.y *= 0.707;
        }
    }

    getUserInput() {
        // Check for gamepad input first
        if (this.gamepadIndex !== null && this.gamepadIndex !== undefined) {
            const gamepads = navigator.getGamepads();
            const gamepad = gamepads[this.gamepadIndex];
            
            if (gamepad) {
                // Left analog stick
                const stickX = gamepad.axes[0];
                const stickY = gamepad.axes[1];
                
                // Apply deadzone
                const deadzone = 0.15;
                if (Math.abs(stickX) > deadzone || Math.abs(stickY) > deadzone) {
                    this.analogInput.x = stickX;
                    this.analogInput.y = stickY;
                } else {
                    this.analogInput.x = 0;
                    this.analogInput.y = 0;
                }
                
                // Gamepad buttons
                if (gamepad.buttons[0].pressed) this.game.userShoot(); // A button
                if (gamepad.buttons[1].pressed) this.game.userPass(); // B button
                if (gamepad.buttons[2].pressed) this.game.userTackle(); // X button
                if (gamepad.buttons[4].pressed) this.game.startSprint(); // LB
                if (!gamepad.buttons[4].pressed) this.game.stopSprint();
            }
        }
        
        return {
            x: this.analogInput.x,
            y: this.analogInput.y,
            shoot: this.keys[' '],
            pass: this.keys['x'],
            tackle: this.keys['c'],
            sprint: this.keys['Shift']
        };
    }
}

// Enhanced CSS for FIFA-style UI
const fifa2024CSS = `
/* FIFA 2024 Style CSS */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #0c1f38, #152642);
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
    background: linear-gradient(135deg, #1a7c42, #27ae60);
    display: block;
    width: 100%;
    height: 100%;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
}

/* FIFA-style header */
.game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 25px;
    background: linear-gradient(135deg, #1a2530, #2c3e50);
    border-bottom: 3px solid #f39c12;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
}

.team-info {
    display: flex;
    align-items: center;
    gap: 20px;
}

.team-logo {
    font-size: 2.5rem;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
}

.team-name {
    font-size: 1.4rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.score-board {
    display: flex;
    align-items: center;
    gap: 25px;
    font-size: 1.8rem;
    font-weight: bold;
}

.score {
    background: linear-gradient(135deg, #2c3e50, #34495e);
    padding: 12px 25px;
    border-radius: 15px;
    min-width: 70px;
    text-align: center;
    border: 3px solid #f39c12;
    box-shadow: 0 4px 15px rgba(243, 156, 18, 0.3);
}

.match-time {
    font-size: 1.4rem;
    color: #f39c12;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.stats-bar {
    display: flex;
    justify-content: space-around;
    padding: 10px 25px;
    background: linear-gradient(135deg, #1a2530, #2c3e50);
    border-bottom: 2px solid #34495e;
    font-size: 0.95rem;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.stat-value {
    font-weight: bold;
    color: #f39c12;
    font-size: 1.1rem;
}

.possession-bar {
    display: flex;
    width: 180px;
    height: 25px;
    background: #34495e;
    border-radius: 12px;
    overflow: hidden;
    border: 2px solid #2c3e50;
}

.possession-home, .possession-away {
    height: 100%;
    transition: width 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.8rem;
    color: white;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.possession-home {
    background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.possession-away {
    background: linear-gradient(135deg, #3498db, #2980b9);
}

/* FIFA-style controls info */
.controls-info {
    position: absolute;
    top: 120px;
    left: 20px;
    background: rgba(0, 0, 0, 0.85);
    padding: 20px;
    border-radius: 15px;
    border: 2px solid #f39c12;
    backdrop-filter: blur(10px);
}

.controls-info h3 {
    color: #f39c12;
    margin-bottom: 15px;
    text-align: center;
}

.control-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 8px 0;
    font-size: 0.9rem;
}

.control-key {
    background: #2c3e50;
    padding: 4px 8px;
    border-radius: 6px;
    border: 1px solid #f39c12;
    min-width: 30px;
    text-align: center;
    font-weight: bold;
}

/* Enhanced mobile controls */
.mobile-controls {
    position: absolute;
    bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    pointer-events: none;
}

.mobile-joystick {
    width: 120px;
    height: 120px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 60px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    pointer-events: auto;
}

.mobile-buttons {
    display: flex;
    flex-direction: column;
    gap: 15px;
    pointer-events: auto;
}

.mobile-button {
    width: 70px;
    height: 70px;
    border-radius: 35px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
    backdrop-filter: blur(10px);
}

.mobile-button.shoot {
    background: rgba(231, 76, 60, 0.8);
}

.mobile-button.pass {
    background: rgba(52, 152, 219, 0.8);
}

.mobile-button.tackle {
    background: rgba(243, 156, 18, 0.8);
}

.mobile-button.sprint {
    background: rgba(46, 204, 113, 0.8);
}

/* FIFA-style animations */
@keyframes fifaPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

@keyframes goalFlash {
    0% { background-color: rgba(255, 255, 255, 0.8); }
    50% { background-color: rgba(255, 215, 0, 0.6); }
    100% { background-color: rgba(255, 255, 255, 0.8); }
}

.goal-animation {
    animation: goalFlash 0.5s ease-in-out 3;
}

.player-celebrate {
    animation: fifaPulse 0.3s ease-in-out infinite;
}

/* Enhanced responsive design */
@media (max-width: 768px) {
    .game-header {
        padding: 8px 15px;
    }
    
    .team-logo {
        font-size: 1.8rem;
    }
    
    .team-name {
        font-size: 1rem;
    }
    
    .score {
        font-size: 1.4rem;
        padding: 8px 15px;
        min-width: 50px;
    }
    
    .stats-bar {
        padding: 6px 15px;
        font-size: 0.8rem;
    }
    
    .controls-info {
        display: none;
    }
}

/* Gamepad connection indicator */
.gamepad-indicator {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(46, 204, 113, 0.9);
    color: white;
    padding: 8px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: bold;
    display: none;
}

.gamepad-connected .gamepad-indicator {
    display: block;
}
`;

// Inject FIFA 2024 CSS
const fifaStyle = document.createElement('style');
fifaStyle.textContent = fifa2024CSS;
document.head.appendChild(fifaStyle);

// Enhanced initialization
window.addEventListener('load', () => {
    // Add gamepad connection indicator
    const gamepadIndicator = document.createElement('div');
    gamepadIndicator.className = 'gamepad-indicator';
    gamepadIndicator.textContent = '🎮 Gamepad Connected';
    document.body.appendChild(gamepadIndicator);
    
    // Initialize game with FIFA 2024 style
    game = new FootballGame();
    
    // Enhanced gamepad detection
    window.addEventListener("gamepadconnected", (e) => {
        document.body.classList.add('gamepad-connected');
    });
    
    window.addEventListener("gamepaddisconnected", (e) => {
        document.body.classList.remove('gamepad-connected');
    });
});

// Usage in your FootballGame class:
// Replace your existing player and ball creation with:
// this.ball = new FIFA2024FootballBall(this.field.center.x, this.field.center.y);
// const player = new FIFA2024Player({ ...config });

// And replace your controls with:
// this.keyboardControls = new FIFA2024Controls(this);