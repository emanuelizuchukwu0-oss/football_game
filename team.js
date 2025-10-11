// Football Clubs Data (unchanged)
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

// Team Selection Logic
let selectedHomeTeam = null;
let selectedAwayTeam = null;
let userControlledTeam = null;

function loadTeams() {
    const homeGrid = document.getElementById('homeTeams');
    const awayGrid = document.getElementById('awayTeams');

    // Clear existing content
    homeGrid.innerHTML = '';
    awayGrid.innerHTML = '';

    footballClubs.forEach(team => {
        const homeTeamCard = createTeamCard(team, 'home');
        const awayTeamCard = createTeamCard(team, 'away');
        
        homeGrid.appendChild(homeTeamCard);
        awayGrid.appendChild(awayTeamCard);
    });
}

function createTeamCard(team, teamType) {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.dataset.teamType = teamType;
    card.dataset.teamId = team.id;
    
    card.innerHTML = `
        <div class="team-logo" style="background: ${team.color}">${team.logo}</div>
        <h3>${team.name}</h3>
        <p>Formation: ${team.formation}</p>
        <div class="control-indicator">Click to select</div>
    `;
    
    card.addEventListener('click', function() {
        selectTeam(team, teamType);
    });
    
    return card;
}

function selectTeam(team, teamType) {
    // Prevent selecting the same team for both sides
    if (teamType === 'home' && selectedAwayTeam && selectedAwayTeam.id === team.id) {
        alert("This team is already selected as the away team. Please choose a different team.");
        return;
    }
    
    if (teamType === 'away' && selectedHomeTeam && selectedHomeTeam.id === team.id) {
        alert("This team is already selected as the home team. Please choose a different team.");
        return;
    }
    
    if (teamType === 'home') {
        selectedHomeTeam = team;
        document.getElementById('selectedHome').textContent = team.name;
        document.getElementById('selectedHome').dataset.teamId = team.id;
    } else {
        selectedAwayTeam = team;
        document.getElementById('selectedAway').textContent = team.name;
        document.getElementById('selectedAway').dataset.teamId = team.id;
    }
    
    updateSelectedTeams();
    
    const startBtn = document.querySelector('.start-match-btn');
    if (selectedHomeTeam && selectedAwayTeam) {
        // Show team control selection
        showTeamControlSelection();
    } else {
        // Hide control selection if teams are not both selected
        const existingSelection = document.querySelector('.control-selection');
        if (existingSelection) {
            existingSelection.remove();
        }
        startBtn.disabled = true;
        startBtn.textContent = 'Start Match';
        startBtn.classList.remove('enhanced-start');
    }
}

function showTeamControlSelection() {
    // Remove any existing control selection
    const existingSelection = document.querySelector('.control-selection');
    if (existingSelection) {
        existingSelection.remove();
    }
    
    const selectionContainer = document.querySelector('.selection-container');
    const controlSelection = document.createElement('div');
    controlSelection.className = 'control-selection';
    controlSelection.innerHTML = `
        <h3>Which team do you want to control?</h3>
        <div class="control-options">
            <button class="control-option-btn" data-control="home">
                <div class="team-preview" style="background: ${selectedHomeTeam.color}">
                    ${selectedHomeTeam.logo}
                </div>
                <span>Control ${selectedHomeTeam.name}</span>
            </button>
            <button class="control-option-btn" data-control="away">
                <div class="team-preview" style="background: ${selectedAwayTeam.color}">
                    ${selectedAwayTeam.logo}
                </div>
                <span>Control ${selectedAwayTeam.name}</span>
            </button>
            <button class="control-option-btn" data-control="both">
                <div class="team-preview" style="background: linear-gradient(45deg, ${selectedHomeTeam.color}, ${selectedAwayTeam.color})">
                    ⚽
                </div>
                <span>Control Both Teams</span>
            </button>
        </div>
    `;
    
    selectionContainer.appendChild(controlSelection);
    
    // Add event listeners to control buttons
    controlSelection.querySelectorAll('.control-option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            setUserTeam(this.dataset.control);
        });
    });
}

function setUserTeam(controlType) {
    userControlledTeam = controlType;
    
    // Update UI to show selected control
    document.querySelectorAll('.control-option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Find and select the clicked button
    event.target.closest('.control-option-btn').classList.add('selected');
    
    // Enable enhanced start button
    const startBtn = document.querySelector('.start-match-btn');
    startBtn.disabled = false;
    startBtn.textContent = `Start Match - Controlling ${getControlText()}`;
    startBtn.classList.add('enhanced-start');
}

function getControlText() {
    switch(userControlledTeam) {
        case 'home': return selectedHomeTeam.name;
        case 'away': return selectedAwayTeam.name;
        case 'both': return 'Both Teams';
        default: return 'No Team';
    }
}

function updateSelectedTeams() {
    // Remove previous selections
    document.querySelectorAll('.team-card.selected').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add current selections
    if (selectedHomeTeam) {
        const homeCard = document.querySelector(`.team-card[data-team-type="home"][data-team-id="${selectedHomeTeam.id}"]`);
        if (homeCard) homeCard.classList.add('selected');
    }
    if (selectedAwayTeam) {
        const awayCard = document.querySelector(`.team-card[data-team-type="away"][data-team-id="${selectedAwayTeam.id}"]`);
        if (awayCard) awayCard.classList.add('selected');
    }
}

function startMatch() {
    if (selectedHomeTeam && selectedAwayTeam && userControlledTeam) {
        // Store selected teams and control preference
        localStorage.setItem('homeTeam', JSON.stringify(selectedHomeTeam));
        localStorage.setItem('awayTeam', JSON.stringify(selectedAwayTeam));
        localStorage.setItem('userControlledTeam', userControlledTeam);
        window.location.href = 'game.html';
    } else {
        alert('Please select both teams and choose which team to control!');
    }
}

function goBack() {
    window.location.href = 'index.html';
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('homeTeams')) {
        loadTeams();
    }
});