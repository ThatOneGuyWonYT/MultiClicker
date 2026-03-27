let score = 0;
let power = 1;
let auto = 0;
let costs = [50, 15, 500];

const scoreDisplay = document.getElementById('score');
const pwrDisplay = document.getElementById('pwr');
const apsDisplay = document.getElementById('aps');
const btnMain = document.getElementById('clicker');

function update() {
    scoreDisplay.innerText = Math.floor(score);
    pwrDisplay.innerText = power;
    apsDisplay.innerText = auto;

    // Update shop costs and button states
    for (let i = 0; i < 3; i++) {
        let btn = document.getElementById(`c${i}`).parentNode;
        document.getElementById(`c${i}`).innerText = costs[i];
        btn.disabled = score < costs[i];
    }
}

btnMain.onclick = () => {
    score += power;
    update();
};

window.buy = (item) => {
    if (score < costs[item]) return;

    score -= costs[item];
    
    if (item === 0) { // Intern
        auto += 1;
        costs[0] = Math.round(costs[0] * 1.3);
    } else if (item === 1) { // Drink
        power += 1;
        costs[1] = Math.round(costs[1] * 1.4);
    } else if (item === 2) { // Botnet
        auto += 10;
        costs[2] = Math.round(costs[2] * 1.5);
    }
    update();
};

// Auto-click loop
setInterval(() => {
    if (auto > 0) {
        score += (auto / 10);
        update();
    }
}, 100);

update();