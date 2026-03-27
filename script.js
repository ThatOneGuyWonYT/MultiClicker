let score = 0;
let power = 1;
let auto = 0;

// Manually naming items to keep it legit
const shopNames = [
    "Moon Dust", "Oxy Valve", "Solar Cell", "Warp Core", "Alien DNA", 
    "Plasma Tank", "Botnet", "Void Eye", "Supernova", "Galactic Tax"
];

const items = [];
for (let i = 0; i < 100; i++) {
    const tier = Math.floor(i / 10) + 1;
    items.push({
        name: `${shopNames[i % 10]} Mk.${tier}`,
        cost: Math.floor(20 * Math.pow(1.3, i)),
        pwr: i % 2 === 0 ? Math.floor(Math.pow(1.4, i/2) + i) : 0,
        aps: i % 2 !== 0 ? Math.floor(Math.pow(1.3, i/2) + 2) : 0
    });
}

const scoreDisplay = document.getElementById('score');
const pwrDisplay = document.getElementById('pwr');
const apsDisplay = document.getElementById('aps');
const itemList = document.getElementById('items');

function buildShop() {
    itemList.innerHTML = items.map((it, idx) => `
        <div class="item">
            <div>
                <b>${it.name}</b><br>
                <small>${it.pwr ? '+'+it.pwr+' PWR' : '+'+it.aps+' AUTO'}</small>
            </div>
            <button class="buy-btn" id="b${idx}" onclick="buy(${idx})">$${it.cost}</button>
        </div>
    `).join('');
}

window.buy = (i) => {
    if (score >= items[i].cost) {
        score -= items[i].cost;
        power += items[i].pwr;
        auto += items[i].aps;
        items[i].cost = Math.floor(items[i].cost * 1.6);
        refresh();
    }
}

function refresh() {
    scoreDisplay.innerText = Math.floor(score);
    pwrDisplay.innerText = power;
    apsDisplay.innerText = auto;
    items.forEach((it, i) => {
        const b = document.getElementById(`b${i}`);
        if (b) {
            b.innerText = "$" + it.cost;
            b.disabled = score < it.cost;
        }
    });
}

document.getElementById('main-btn').onclick = (e) => {
    score += power;
    
    // Floating text
    const p = document.createElement('div');
    p.className = 'popup';
    p.innerText = `+${power}`;
    p.style.left = `${e.clientX}px`;
    p.style.top = `${e.clientY}px`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 600);

    refresh();
};

setInterval(() => {
    score += auto / 10;
    refresh();
}, 100);

buildShop();
refresh();