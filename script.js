let score = 0;
let power = 1;
let auto = 0;

const shopList = document.getElementById('shop-list');

// Generate 100 items
const items = [];
for (let i = 1; i <= 100; i++) {
    items.push({
        id: i,
        name: `Upgrade #${i}`,
        cost: Math.floor(10 * Math.pow(1.4, i)),
        bonus: i % 2 === 0 ? i : 0, // Even items give Power
        autoBonus: i % 2 !== 0 ? Math.ceil(i/2) : 0 // Odd items give Auto
    });
}

// Build the Shop HTML
function buildShop() {
    shopList.innerHTML = items.map((item, index) => `
        <div class="shop-item">
            <div>
                <strong>${item.name}</strong><br>
                <small>${item.bonus ? '+'+item.bonus+' Power' : '+'+item.autoBonus+' Auto/s'}</small>
            </div>
            <button class="buy-btn" id="btn-${index}" onclick="buyItem(${index})">
                $${item.cost}
            </button>
        </div>
    `).join('');
}

function buyItem(idx) {
    let item = items[idx];
    if (score >= item.cost) {
        score -= item.cost;
        power += item.bonus;
        auto += item.autoBonus;
        item.cost = Math.floor(item.cost * 1.5); // Increase price
        sync();
    }
}

function sync() {
    document.getElementById('score').innerText = Math.floor(score);
    document.getElementById('pwr').innerText = power;
    document.getElementById('aps').innerText = auto;
    
    // Update button states
    items.forEach((item, idx) => {
        let b = document.getElementById(`btn-${idx}`);
        if (b) {
            b.innerText = `$${item.cost}`;
            b.disabled = score < item.cost;
        }
    });
}

document.getElementById('clicker').onclick = () => {
    score += power;
    sync();
};

// Main loop
setInterval(() => {
    if (auto > 0) {
        score += (auto / 10);
        sync();
    }
}, 100);

buildShop();
sync();