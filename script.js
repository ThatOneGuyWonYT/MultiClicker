document.addEventListener('DOMContentLoaded', () => {
    let score = 0;
    let power = 1;
    let auto = 0;
    let items = [];

    const prefixes = ["Rusty", "Shiny", "Turbo", "Omega", "Forbidden", "Cyber", "Godly", "Gamer", "Illegal", "Void"];
    const nouns = ["Spoon", "Keyboard", "Mouse", "Server", "Botnet", "AI", "Quantum Core", "GPU", "Energy Drink", "Satellite"];

    // 1. GENERATE 100 UNIQUE ITEMS
    for (let i = 0; i < 100; i++) {
        let pIndex = Math.floor(i / 10);
        let nIndex = i % 10;
        items.push({
            name: `${prefixes[pIndex]} ${nouns[nIndex]}`,
            cost: Math.floor(15 * Math.pow(1.25, i)),
            pwr: i % 2 === 0 ? Math.floor(Math.pow(1.4, i/2)) : 0,
            aps: i % 2 !== 0 ? Math.floor(Math.pow(1.3, i/2)) : 0
        });
    }

    const list = document.getElementById('item-list');
    const scoreEl = document.getElementById('score');
    const pwrEl = document.getElementById('pwr');
    const apsEl = document.getElementById('aps');

    // 2. BUILD SHOP HTML
    function initShop() {
        list.innerHTML = items.map((item, i) => `
            <div class="item">
                <div>
                    <b>${item.name}</b><br>
                    <small>${item.pwr > 0 ? '+' + item.pwr + ' Pwr' : '+' + item.aps + ' Auto'}</small>
                </div>
                <button class="buy-btn" id="btn-${i}" onclick="buyItem(${i})">
                    $${item.cost}
                </button>
            </div>
        `).join('');
    }

    window.buyItem = (idx) => {
        if (score >= items[idx].cost) {
            score -= items[idx].cost;
            power += items[idx].pwr;
            auto += items[idx].aps;
            items[idx].cost = Math.floor(items[idx].cost * 1.5);
            sync();
        }
    };

    function sync() {
        scoreEl.innerText = Math.floor(score);
        pwrEl.innerText = power;
        apsEl.innerText = auto;

        items.forEach((item, i) => {
            const btn = document.getElementById(`btn-${i}`);
            if (btn) {
                btn.innerText = "$" + item.cost;
                btn.disabled = score < item.cost;
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
});