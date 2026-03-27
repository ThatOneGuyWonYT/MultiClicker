document.addEventListener('DOMContentLoaded', () => {
    let score = 0;
    let power = 1;
    let auto = 0;

    // Space Themed Items
    const names = ["Space Dust", "Oxy Tank", "Moon Boot", "Alien Tech", "Star Map", "Laser Pointer", "Warp Drive", "Black Hole", "Galactic Core", "God Eye"];
    const items = [];
    for(let i=0; i<100; i++) {
        items.push({
            name: `${names[i%10]} Tier ${Math.floor(i/10)+1}`,
            cost: Math.floor(15 * Math.pow(1.3, i)),
            pwr: i % 2 === 0 ? Math.floor(Math.pow(1.5, i/2)) : 0,
            aps: i % 2 !== 0 ? Math.floor(Math.pow(1.4, i/2)) : 0
        });
    }

    const list = document.getElementById('item-list');
    const scoreEl = document.getElementById('score');
    const pwrEl = document.getElementById('pwr');
    const apsEl = document.getElementById('aps');
    const mainBtn = document.getElementById('main-btn');

    function initShop() {
        list.innerHTML = items.map((item, i) => `
            <div class="item">
                <div><b>${item.name}</b><small>${item.pwr ? '+'+item.pwr+' PWR' : '+'+item.aps+' AUTO'}</small></div>
                <button class="buy-btn" id="btn-${i}" onclick="buyItem(${i})">$${item.cost}</button>
            </div>
        `).join('');
    }

    window.buyItem = (idx) => {
        if (score >= items[idx].cost) {
            score -= items[idx].cost;
            power += items[idx].pwr;
            auto += items[idx].aps;
            items[idx].cost = Math.floor(items[idx].cost * 1.6);
            sync();
        }
    };

    function sync() {
        scoreEl.innerText = Math.floor(score);
        pwrEl.innerText = power;
        apsEl.innerText = auto;
        items.forEach((item, i) => {
            const b = document.getElementById(`btn-${i}`);
            if(b) { b.innerText = "$"+item.cost; b.disabled = score < item.cost; }
        });
    }

    // Click Logic + Animation
    mainBtn.onclick = (e) => {
        score += power;
        
        // Animation
        mainBtn.classList.remove('pop');
        void mainBtn.offsetWidth; // Trigger reflow
        mainBtn.classList.add('pop');

        // Floating Text
        const text = document.createElement('div');
        text.className = 'floating-text';
        text.innerText = `+${power}`;
        text.style.left = `${e.clientX}px`;
        text.style.top = `${e.clientY}px`;
        document.body.appendChild(text);
        setTimeout(() => text.remove(), 800);

        sync();
    };

    setInterval(() => { score += auto/10; sync(); }, 100);
    initShop();
    sync();
});