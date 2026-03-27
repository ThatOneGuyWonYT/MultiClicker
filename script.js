let score = 0;
let power = 1;
let auto = 0;

// Manually defining a few to start, then generating the rest for 100 items
const items = [
    { name: "Rusty Spoon", cost: 15, pwr: 1, aps: 0, desc: "Slightly more effective than your thumb." },
    { name: "Old Mouse", cost: 100, pwr: 5, aps: 0, desc: "A relic from 2004." },
    { name: "Coffee Machine", cost: 500, pwr: 0, aps: 5, desc: "The intern is finally awake." },
    { name: "Auto-Clicker Bot", cost: 1200, pwr: 0, aps: 15, desc: "It never sleeps." },
    { name: "Mechanical Keyboard", cost: 3000, pwr: 50, aps: 0, desc: "Clicky sounds make it faster." }
];

// Generate the rest up to 100 with scaling stats
for (let i = 6; i <= 100; i++) {
    items.push({
        name: `Mega Upgrade #${i}`,
        cost: Math.floor(5000 * Math.pow(1.2, i)),
        pwr: i % 2 === 0 ? i * 10 : 0,
        aps: i % 2 !== 0 ? i * 5 : 0,
        desc: `High-tier clicking tech level ${i}.`
    });
}

const itemList = document.getElementById('item-list');

function initShop() {
    itemList.innerHTML = items.map((item, index) => `
        <div class="item">
            <div class="item-info">
                <b>${item.name}</b>
                <p>${item.desc} (${item.pwr > 0 ? '+'+item.pwr+' Power' : '+'+item.aps+' Auto'})</p>
            </div>
            <button class="buy-btn" id="btn-${index}" onclick="buy(${index})">
                $${item.cost}
            </button>
        </div>
    `).join('');
}

window.buy = (idx) => {
    let item = items[idx];
    if (score >= item.cost) {
        score -= item.cost;
        power += item.pwr;
        auto += item.aps;
        item.cost = Math.floor(item.cost * 1.6);
        sync();
    }
};

function sync() {
    document.getElementById('score').innerText = Math.floor(score);
    document.getElementById('pwr').innerText = power;
    document.getElementById('aps').innerText = auto;

    items.forEach((item, idx) => {
        let b = document.getElementById(`btn-${idx}`);
        if (b) {
            b.innerText = "$" + item.cost;
            b.disabled = score < item.cost;
        }
    });
}

document.getElementById('click-btn').onclick = () => {
    score += power;
    sync();
};

setInterval(() => {
    if (auto > 0) {
        score += (auto / 10);
        sync();
    }
}, 100);

initShop();
sync();