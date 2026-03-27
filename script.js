let score = 0;
let power = 1;
let auto = 0;

let costs = [50, 15, 500];

const scoreEl = document.getElementById('score');
const autoEl = document.getElementById('auto-rate');
const powerEl = document.getElementById('per-click');

// Update Everything
function sync() {
    scoreEl.innerText = Math.floor(score);
    autoEl.innerText = auto;
    powerEl.innerText = power;

    document.getElementById('c1').innerText = costs[0];
    document.getElementById('c2').innerText = costs[1];
    document.getElementById('c3').innerText = costs[2];

    document.getElementById('buy-intern').disabled = score < costs[0];
    document.getElementById('buy-energy').disabled = score < costs[1];
    document.getElementById('buy-botnet').disabled = score < costs[2];
}

// Click
document.getElementById('main-btn').onclick = () => {
    score += power;
    sync();
};

// Shop Logic
document.getElementById('buy-intern').onclick = () => {
    if (score >= costs[0]) {
        score -= costs[0];
        auto += 1;
        costs[0] = Math.round(costs[0] * 1.2);
        sync();
    }
};

document.getElementById('buy-energy').onclick = () => {
    if (score >= costs[1]) {
        score -= costs[1];
        power += 1;
        costs[1] = Math.round(costs[1] * 1.3);
        sync();
    }
};

document.getElementById('buy-botnet').onclick = () => {
    if (score >= costs[2]) {
        score -= costs[2];
        auto += 10;
        costs[2] = Math.round(costs[2] * 1.5);
        sync();
    }
};

// Auto-Clicker Engine
setInterval(() => {
    if (auto > 0) {
        score += auto / 10; // Smooth increment
        sync();
    }
}, 100);

sync();