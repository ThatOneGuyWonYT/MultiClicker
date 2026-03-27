document.addEventListener('DOMContentLoaded', () => {
    let score = parseFloat(localStorage.getItem('mc_score')) || 0;
    let pwr = parseFloat(localStorage.getItem('mc_pwr')) || 1;
    let auto = parseFloat(localStorage.getItem('mc_auto')) || 0;
    let unlockedButtons = parseInt(localStorage.getItem('mc_btns')) || 1;
    let shopData = [];

    // sounds
    const sndClick = new Audio('Clicker Sounds/click.mp3');
    const sndBuy = new Audio('Clicker Sounds/buy.mp3');
    const sndUnlock = new Audio('Clicker Sounds/unlock.mp3');

    const scoreDisplay = document.getElementById('score');
    const pwrDisplay = document.getElementById('pwr');
    const autoDisplay = document.getElementById('aps');
    const shopList = document.getElementById('shop-list');
    const dock = document.getElementById('button-dock');

    // fetch the shop items
    fetch('ShopItems.json')
        .then(r => r.json())
        .then(data => {
            shopData = data;
            renderShop();
            sync();
        });

    function renderShop() {
        shopList.innerHTML = shopData.map((it, i) => {
            // hide button upgrades already owned
            if (it.isBtn && i < unlockedButtons - 1) return '';
            
            return `
            <div class="item">
                <div class="item-info">
                    <b>${it.name}</b>
                    <small>${it.desc}</small>
                </div>
                <button class="buy-btn" id="b-${i}" onclick="buyItem(${i})">$${format(it.cost)}</button>
            </div>`;
        }).join('');
    }

    window.buyItem = (i) => {
        let it = shopData[i];
        if (score >= it.cost) {
            score -= it.cost;
            pwr += it.p || 0;
            auto += it.a || 0;

            if (it.isBtn) {
                unlockedButtons++;
                spawnButton(unlockedButtons - 1);
                sndUnlock.play();
            } else {
                it.cost = Math.floor(it.cost * 1.5);
                sndBuy.play();
            }

            renderShop();
            sync();
            save();
        }
    };

    function spawnButton(idx) {
        const img = document.createElement('img');
        // Button.png, then Button1.png, etc.
        img.src = `ClickerArt/Button${idx === 0 ? '' : idx}.png`;
        img.className = 'clickable-btn';
        img.onclick = (e) => {
            score += pwr;
            sndClick.currentTime = 0;
            sndClick.play();
            showPop(e);
            sync();
        };
        dock.appendChild(img);
    }

    function showPop(e) {
        const p = document.createElement('div');
        p.className = 'pop';
        p.innerText = `+${format(pwr)}`;
        p.style.left = e.clientX + 'px';
        p.style.top = e.clientY + 'px';
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 500);
    }

    function format(n) {
        if (n >= 1e9) return (n / 1e9).toFixed(2) + "b";
        if (n >= 1e6) return (n / 1e6).toFixed(2) + "m";
        if (n >= 1e3) return (n / 1e3).toFixed(1) + "k";
        return Math.floor(n).toLocaleString();
    }

    function sync() {
        scoreDisplay.innerText = format(score);
        pwrDisplay.innerText = format(pwr);
        autoDisplay.innerText = format(auto);
        shopData.forEach((it, i) => {
            const btn = document.getElementById(`b-${i}`);
            if (btn) btn.disabled = score < it.cost;
        });
    }

    function save() {
        localStorage.setItem('mc_score', score);
        localStorage.setItem('mc_pwr', pwr);
        localStorage.setItem('mc_auto', auto);
        localStorage.setItem('mc_btns', unlockedButtons);
    }

    // initial setup
    dock.innerHTML = '';
    for(let i=0; i < unlockedButtons; i++) spawnButton(i);

    // loop
    setInterval(() => {
        score += auto / 10;
        sync();
    }, 100);

    // save every 30s
    setInterval(save, 30000);
});