document.addEventListener('DOMContentLoaded', () => {
    let score = parseFloat(localStorage.getItem('mc_score')) || 0;
    let pwr = parseFloat(localStorage.getItem('mc_pwr')) || 1;
    let auto = parseFloat(localStorage.getItem('mc_auto')) || 0;
    let unlockedButtons = parseInt(localStorage.getItem('mc_btns')) || 1;
    let shopData = [];

    const sndClick = new Audio('Clicker Sounds/click.mp3');
    const sndBuy = new Audio('Clicker Sounds/buy.mp3');

    const scoreDisplay = document.getElementById('score');
    const pwrDisplay = document.getElementById('pwr');
    const autoDisplay = document.getElementById('aps');
    const shopList = document.getElementById('shop-list');
    const dock = document.getElementById('button-dock');

    fetch('ShopItems.json')
        .then(r => r.json())
        .then(data => {
            shopData = data;
            renderShop();
            sync();
        });

    function renderShop() {
        shopList.innerHTML = shopData.map((it, i) => {
            // Logic to hide button unlocks you already have
            if (it.isBtn && i < (unlockedButtons - 1) * 5) return ''; // Adjust based on where buttons are in your list
            
            return `
            <div class="item">
                <div class="item-info">
                    <b>${it.name}</b>
                    <small>${it.desc}</small>
                </div>
                <button class="buy-btn" id="b-${i}" onclick="buyItem(${i})">$${format(it.price)}</button>
            </div>`;
        }).join('');
    }

    window.buyItem = (i) => {
        let it = shopData[i];
        if (score >= it.price) {
            score -= it.price;
            pwr += it.p || 0;
            auto += it.a || 0;

            if (it.isBtn) {
                unlockedButtons++;
                spawnButton(unlockedButtons - 1);
            } else {
                it.price = Math.floor(it.price * 1.5);
                sndBuy.play();
            }

            renderShop();
            sync();
            save();
        }
    };

    function spawnButton(idx) {
        const img = document.createElement('img');
        // Uses Button.png for 0, Button1.png for 1... up to Button9.png
        img.src = `ClickerArt/Button${idx === 0 ? '' : idx}.png`;
        img.className = 'clickable-btn';
        img.onclick = (e) => {
            score += pwr;
            sndClick.currentTime = 0;
            sndClick.play();
            sync();
        };
        dock.appendChild(img);
    }

    function format(n) {
        if (n >= 1e12) return (n / 1e12).toFixed(1) + "t";
        if (n >= 1e9) return (n / 1e9).toFixed(1) + "b";
        if (n >= 1e6) return (n / 1e6).toFixed(1) + "m";
        if (n >= 1e3) return (n / 1e3).toFixed(1) + "k";
        return Math.floor(n).toLocaleString();
    }

    function sync() {
        scoreDisplay.innerText = format(score);
        pwrDisplay.innerText = "power: " + format(pwr);
        autoDisplay.innerText = "auto: " + format(auto);
        shopData.forEach((it, i) => {
            const btn = document.getElementById(`b-${i}`);
            if (btn) btn.disabled = score < it.price;
        });
    }

    function save() {
        localStorage.setItem('mc_score', score);
        localStorage.setItem('mc_pwr', pwr);
        localStorage.setItem('mc_auto', auto);
        localStorage.setItem('mc_btns', unlockedButtons);
    }

    dock.innerHTML = '';
    for(let i=0; i < unlockedButtons; i++) spawnButton(i);

    setInterval(() => {
        score += auto / 10;
        sync();
    }, 100);
});