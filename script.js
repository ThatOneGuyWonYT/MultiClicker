document.addEventListener('DOMContentLoaded', () => {
    // initialize stats from local storage
    let score = parseFloat(localStorage.getItem('mc_score')) || 0;
    let pwr = parseFloat(localStorage.getItem('mc_pwr')) || 1;
    let auto = parseFloat(localStorage.getItem('mc_auto')) || 0;
    let unlockedButtons = parseInt(localStorage.getItem('mc_btns')) || 1;
    let shopData = [];

    // audio setup
    const sndClick = new Audio('Clicker Sounds/click.mp3');
    const sndBuy = new Audio('Clicker Sounds/buy.mp3');
    const sndUnlock = new Audio('Clicker Sounds/unlock.mp3');

    const scoreDisplay = document.getElementById('score');
    const pwrDisplay = document.getElementById('pwr');
    const autoDisplay = document.getElementById('aps');
    const shopList = document.getElementById('shop-list');
    const dock = document.getElementById('button-dock');

    // fetch the shop items from your json
    fetch('ShopItems.json')
        .then(response => response.json())
        .then(data => {
            shopData = data;
            renderShop();
            sync();
        });

    function renderShop() {
        shopList.innerHTML = shopData.map((item, index) => {
            // we assume the first few items in your json might be button unlocks
            // if your json doesn't have "isBtn", this logic just shows everything
            if (item.isBtn && index < unlockedButtons - 1) return '';
            
            // using "price" because that's what your json snippet showed
            return `
            <div class="item">
                <div class="item-info">
                    <b>${item.name}</b>
                    <small>${item.category || 'misc'}</small>
                </div>
                <button class="buy-btn" id="b-${index}" onclick="buyItem(${index})">
                    $${format(item.price)}
                </button>
            </div>`;
        }).join('');
    }

    window.buyItem = (index) => {
        let item = shopData[index];
        if (score >= item.price) {
            score -= item.price;
            
            // logic for power/auto based on item type
            if (item.category === "Electronics") {
                pwr += (item.id * 0.5); // example scaling
            }
            
            // button unlock logic
            if (item.isBtn) {
                unlockedButtons++;
                spawnButton(unlockedButtons - 1);
                sndUnlock.play();
            } else {
                sndBuy.play();
                // scale price up for next purchase
                item.price = Math.floor(item.price * 1.4);
            }

            renderShop();
            sync();
            save();
        }
    };

    function spawnButton(idx) {
        const img = document.createElement('img');
        // uses Button.png for idx 0, then Button1.png, etc.
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
        setTimeout(() => p.remove(), 600);
    }

    function format(n) {
        if (n >= 1e6) return (n / 1e6).toFixed(2) + "m";
        if (n >= 1e3) return (n / 1e3).toFixed(1) + "k";
        return Math.floor(n).toLocaleString();
    }

    function sync() {
        scoreDisplay.innerText = format(score);
        pwrDisplay.innerText = format(pwr);
        autoDisplay.innerText = format(auto);
        shopData.forEach((item, index) => {
            const btn = document.getElementById(`b-${index}`);
            if (btn) btn.disabled = score < item.price;
        });
    }

    function save() {
        localStorage.setItem('mc_score', score);
        localStorage.setItem('mc_pwr', pwr);
        localStorage.setItem('mc_auto', auto);
        localStorage.setItem('mc_btns', unlockedButtons);
    }

    // initialize first buttons on load
    dock.innerHTML = '';
    for(let i=0; i < unlockedButtons; i++) spawnButton(i);

    // main game loop (10 times per second)
    setInterval(() => {
        score += auto / 10;
        sync();
    }, 100);

    // save game state every 20 seconds
    setInterval(save, 20000);
});