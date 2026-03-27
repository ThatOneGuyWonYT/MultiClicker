let score = 0;
let pointsPerClick = 1;
let upgradeCost = 10;

// Elements
const scoreDisplay = document.getElementById('score');
const perClickDisplay = document.getElementById('per-click');
const upgradeCostDisplay = document.getElementById('upgrade-cost');
const clickBtn = document.getElementById('click-btn');
const upgradeBtn = document.getElementById('upgrade-btn');

// Click Function
clickBtn.addEventListener('click', () => {
    score += pointsPerClick;
    updateDisplay();
});

// Upgrade Function
upgradeBtn.addEventListener('click', () => {
    if (score >= upgradeCost) {
        score -= upgradeCost;
        pointsPerClick++;
        // Increase upgrade cost exponentially
        upgradeCost = Math.floor(upgradeCost * 1.5);
        
        updateDisplay();
    }
});

function updateDisplay() {
    scoreDisplay.innerText = score;
    perClickDisplay.innerText = pointsPerClick;
    upgradeCostDisplay.innerText = upgradeCost;

    // Disable upgrade button if player can't afford it
    upgradeBtn.disabled = score < upgradeCost;
}

// Initial check
updateDisplay();
