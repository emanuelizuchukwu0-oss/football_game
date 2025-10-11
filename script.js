// Football Clubs Data
const footballClubs = [
    {
        id: 1,
        name: "Red Dragons FC",
        shortName: "Dragons",
        color: "#e74c3c",
        logo: "🐉",
        players: generatePlayers("Dragons", "#e74c3c"),
        formation: "4-4-2"
    },
    {
        id: 2,
        name: "Blue Eagles United",
        shortName: "Eagles",
        color: "#3498db",
        logo: "🦅",
        players: generatePlayers("Eagles", "#3498db"),
        formation: "4-3-3"
    },
    {
        id: 3,
        name: "Green Lions FC",
        shortName: "Lions",
        color: "#2ecc71",
        logo: "🦁",
        players: generatePlayers("Lions", "#2ecc71"),
        formation: "4-4-2"
    },
    {
        id: 4,
        name: "Golden Tigers",
        shortName: "Tigers",
        color: "#f39c12",
        logo: "🐯",
        players: generatePlayers("Tigers", "#f39c12"),
        formation: "4-2-3-1"
    },
    {
        id: 5,
        name: "Silver Wolves",
        shortName: "Wolves",
        color: "#95a5a6",
        logo: "🐺",
        players: generatePlayers("Wolves", "#95a5a6"),
        formation: "3-5-2"
    },
    {
        id: 6,
        name: "Purple Panthers",
        shortName: "Panthers",
        color: "#9b59b6",
        logo: "🐆",
        players: generatePlayers("Panthers", "#9b59b6"),
        formation: "4-4-2"
    },
    {
        id: 7,
        name: "Black Hawks",
        shortName: "Hawks",
        color: "#2c3e50",
        logo: "🦅",
        players: generatePlayers("Hawks", "#2c3e50"),
        formation: "4-3-3"
    },
    {
        id: 8,
        name: "White Sharks",
        shortName: "Sharks",
        color: "#ecf0f1",
        logo: "🦈",
        players: generatePlayers("Sharks", "#ecf0f1"),
        formation: "4-1-4-1"
    },
    {
        id: 9,
        name: "Orange Rhinos",
        shortName: "Rhinos",
        color: "#e67e22",
        logo: "🦏",
        players: generatePlayers("Rhinos", "#e67e22"),
        formation: "4-4-2"
    },
    {
        id: 10,
        name: "Crimson Bulls",
        shortName: "Bulls",
        color: "#c0392b",
        logo: "🐂",
        players: generatePlayers("Bulls", "#c0392b"),
        formation: "4-3-3"
    }
];

// Generate 11 players for a team
function generatePlayers(teamName, color) {
    const positions = [
        { role: 'GK', number: 1, name: 'Goalkeeper' },
        { role: 'RB', number: 2, name: 'Right Back' },
        { role: 'CB', number: 3, name: 'Center Back' },
        { role: 'CB', number: 4, name: 'Center Back' },
        { role: 'LB', number: 5, name: 'Left Back' },
        { role: 'RM', number: 6, name: 'Right Midfielder' },
        { role: 'CM', number: 7, name: 'Central Midfielder' },
        { role: 'CM', number: 8, name: 'Central Midfielder' },
        { role: 'LM', number: 9, name: 'Left Midfielder' },
        { role: 'ST', number: 10, name: 'Striker' },
        { role: 'ST', number: 11, name: 'Striker' }
    ];

    return positions.map(pos => ({
        id: Math.random().toString(36).substr(2, 9),
        name: `${teamName} Player ${pos.number}`,
        number: pos.number,
        position: pos.role,
        fullPosition: pos.name,
        team: teamName,
        color: color,
        speed: Math.floor(Math.random() * 20) + 70,
        shooting: Math.floor(Math.random() * 20) + 70,
        passing: Math.floor(Math.random() * 20) + 70,
        defense: Math.floor(Math.random() * 20) + 70,
        stamina: Math.floor(Math.random() * 20) + 70
    }));
}

// Team Selection Logic
let selectedHomeTeam = null;
let selectedAwayTeam = null;

function loadTeams() {
    const homeGrid = document.getElementById('homeTeams');
    const awayGrid = document.getElementById('awayTeams');

    footballClubs.forEach(team => {
        const teamCard = createTeamCard(team);
        homeGrid.appendChild(teamCard.cloneNode(true));
        awayGrid.appendChild(teamCard.cloneNode(true));
    });
}

function createTeamCard(team) {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.innerHTML = `
        <div class="team-logo">${team.logo}</div>
        <h3>${team.name}</h3>
        <p>Formation: ${team.formation}</p>
    `;
    
    card.addEventListener('click', function() {
        selectTeam(team, this.parentElement.id);
    });
    
    return card;
}

function selectTeam(team, gridType) {
    const isHomeGrid = gridType === 'homeTeams';
    
    if (isHomeGrid) {
        selectedHomeTeam = team;
        document.getElementById('selectedHome').textContent = team.name;
    } else {
        selectedAwayTeam = team;
        document.getElementById('selectedAway').textContent = team.name;
    }
    
    // Update UI
    updateSelectedTeams();
    
    // Enable start match button if both teams selected
    const startBtn = document.querySelector('.start-match-btn');
    if (selectedHomeTeam && selectedAwayTeam) {
        startBtn.disabled = false;
    }
}

function updateSelectedTeams() {
    // Remove previous selections
    document.querySelectorAll('.team-card.selected').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add current selections
    if (selectedHomeTeam) {
        document.querySelectorAll('#homeTeams .team-card')[footballClubs.indexOf(selectedHomeTeam)]?.classList.add('selected');
    }
    if (selectedAwayTeam) {
        document.querySelectorAll('#awayTeams .team-card')[footballClubs.indexOf(selectedAwayTeam)]?.classList.add('selected');
    }
}

function startMatch() {
    if (selectedHomeTeam && selectedAwayTeam) {
        // Store selected teams in localStorage for the game page
        localStorage.setItem('homeTeam', JSON.stringify(selectedHomeTeam));
        localStorage.setItem('awayTeam', JSON.stringify(selectedAwayTeam));
        window.location.href = 'game.html';
    }
}

function goBack() {
    window.location.href = 'index.html';
}

// Initialize when page loads
if (document.getElementById('homeTeams')) {
    loadTeams();
}