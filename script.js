document.addEventListener('DOMContentLoaded', () => {
    let score = 0;
    let pwr = 1;
    let auto = 0;

    // HANDMADE SHOP DATA
    const rawData = [
        { name: "Extra Finger", desc: "A literal 6th finger. Weird but helpful.", cost: 15, p: 1, a: 0 },
        { name: "Soggy Space Sandwich", desc: "Gives you a weird sugar rush.", cost: 100, p: 5, a: 0 },
        { name: "Sentient Toaster", desc: "It clicks for you, but it's angry.", cost: 250, p: 0, a: 2 },
        { name: "Stolen NASA Wifi", desc: "Download some more clicks.", cost: 600, p: 15, a: 0 },
        { name: "Illegal Space Tax", desc: "Automated wealth redistribution.", cost: 1200, p: 0, a: 10 },
        { name: "Gamer Chair in Zero-G", desc: "Extreme posture. Extreme clicks.", cost: 3000, p: 40, a: 0 },
        { name: "Alien Intern", desc: "He works for glorp-berries.", cost: 7500, p: 0, a: 35 },
        { name: "Infinite Monkey Room", desc: "Monkeys + Typewriters = Clicks.", cost: 15000, p: 0, a: 80 },
        { name: "Void-Proof Gloves", desc: "Punch the air for profit.", cost: 40000, p: 200, a: 0 },
        { name: "The Moon (Small Part)", desc: "It's yours now. Don't ask.", cost: 100000, p: 0, a: 500 }
    ];

    // Generate the rest up to 100 with scaling but unique names
    const shopItems = [...rawData];
    for (let i = 11; i <= 100; i++) {
        shopItems.push({
            name: `Exotic Matter Level ${i}`,
            desc: "The science gets too weird to explain.",
            cost: Math.floor(100000 * Math.pow(1.2, i-10)),
            p: i % 2 === 0 ? i * 100 : 0,
            a: i % 2 !== 0 ? i * 60 : 0
        });
    }

    const list = document.getElementById('shop-list');
    const scoreEl = document.getElementById('score');
    const pwrEl = document.getElementById('pwr');
    const apsEl = document.getElementById('aps');
    const mainBtn = document.getElementById('main-btn');

    function renderShop() {
        list.innerHTML = shopItems.map((it, i) => `
            <div class="item">
                <div class="item-desc">
                    <b>${it.name}</b>
                    <small>${it.desc}</small>
                </div>
                <button class="buy-btn" id="b-${i}" onclick="buy(${i})">$${it.cost}</button>
            </div>
        `).join('');
    }

    window.buy = (i) => {
        let it = shopItems[i];
        if (score >= it.cost) {
            score -= it.cost;
            pwr += it.p;
            auto += it.a;
            it.cost = Math.floor(it.cost * 1.6);
            refresh();
        }
    };

    function refresh() {
        scoreEl.innerText = Math.floor(score);
        pwrEl.innerText = pwr;
        apsEl.innerText = auto;
        shopItems.forEach((it, i) => {
            const b = document.getElementById(`b-${i}`);
            if (b) {
                b.innerText = "$" + it.cost;
                b.disabled = score < it.cost;
            }
        });
    }

    mainBtn.onclick = (e) => {
        score += pwr;
        
        // Floating Text
        const pop = document.createElement('div');
        pop.className = 'pop';
        pop.innerText = `+${pwr}`;
        pop.style.left = `${e.clientX}px`;
        pop.style.top = `${e.clientY}px`;
        document.body.appendChild(pop);
        setTimeout(() => pop.remove(), 600);

        refresh();
    };

    setInterval(() => {
        score += auto / 10;
        refresh();
    }, 100);

    renderShop();
    refresh();
});