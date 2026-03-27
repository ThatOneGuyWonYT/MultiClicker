let game = {
    score: 0,
    power: 1,
    autoRate: 0,
    costs: { power: 10, auto: 50, mega: 500 }
};

const ui = {
    score: document.getElementById('score'),
    power: document.getElementById('per-click'),
    auto: document.getElementById('auto-rate'),
    btnClick: document.getElementById('click-btn'),
    // Shop
    btnPower: document.getElementById('upgrade-power'),
    btnAuto: document.getElementById('upgrade-auto'),
    btnMega: document.getElementById('upgrade-mega'),
    // Prices
    costPower: document.getElementById('cost-power'),
    costAuto: document.getElementById('cost-auto'),
    costMega: document.getElementById('cost-mega')
};

function updateUI() {
    ui.score.innerText = Math.floor(game.score);
    ui.power.innerText = game.power;
    ui.auto.innerText = game.autoRate;
    ui.costPower.innerText = game.costs.power;
    ui.costAuto.innerText = game.costs.auto;
    ui.costMega.innerText = game.costs.mega;

    ui.btnPower.disabled = game.score < game.costs.power;
    ui.btnAuto.disabled = game.score < game.costs.auto;
    ui.btnMega.disabled = game.score < game.costs.mega;
}

ui.btnClick.addEventListener('click', () => {
    game.score += game.power;
    updateUI();
});

ui.btnPower.addEventListener('click', () => {
    if (game.score >= game.costs.power) {
        game.score -= game.costs.power;
        game.power += 1;
        game.costs.power = Math.ceil(game.costs.power * 1.5);
        updateUI();
    }
});

ui.btnAuto.addEventListener('click', () => {
    if (game.score >= game.costs.auto) {
        game.score -= game.costs.auto;
        game.autoRate += 1;
        game.costs.auto = Math.ceil(game.costs.auto * 1.7);
        updateUI();
    }
});

ui.btnMega.addEventListener('click', () => {
    if (game.score >= game.costs.mega) {
        game.score -= game.costs.mega;
        game.power *= 2;
        game.costs.mega *= 6;
        updateUI();
    }
});

// Auto-click loop
setInterval(() => {
    if (game.autoRate > 0) {
        game.score += game.autoRate;
        updateUI();
    }
}, 1000);

updateUI();