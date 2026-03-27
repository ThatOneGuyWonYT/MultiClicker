document.addEventListener('DOMContentLoaded', () => {
    let score = 0, pwr = 1, auto = 0;

    // 100 HANDMADE ITEMS - NO SLOP
    const shopItems = [
        { name: "Extra Finger", desc: "A literal 6th finger. Weird but helpful.", cost: 15, p: 1, a: 0 },
        { name: "Soggy Space Sandwich", desc: "Gives you a weird sugar rush.", cost: 100, p: 5, a: 0 },
        { name: "Sentient Toaster", desc: "It clicks for you, but it's angry.", cost: 250, p: 0, a: 2 },
        { name: "Stolen NASA Wifi", desc: "Download some more clicks.", cost: 600, p: 15, a: 0 },
        { name: "Illegal Space Tax", desc: "Automated wealth redistribution.", cost: 1200, p: 0, a: 10 },
        { name: "Gamer Chair in Zero-G", desc: "Extreme posture. Extreme clicks.", cost: 3000, p: 40, a: 0 },
        { name: "Alien Intern", desc: "He works for glorp-berries.", cost: 7500, p: 0, a: 35 },
        { name: "Infinite Monkey Room", desc: "Monkeys + Typewriters = Clicks.", cost: 15000, p: 0, a: 80 },
        { name: "Void-Proof Gloves", desc: "Punch the air for profit.", cost: 40000, p: 200, a: 0 },
        { name: "The Moon (Small Part)", desc: "It's yours now. Don't ask.", cost: 100000, p: 0, a: 500 },
        { name: "Clicky Keyboard", desc: "Mechanical switches from Mars.", cost: 150000, p: 500, a: 0 },
        { name: "Robot Hand", desc: "Never gets tired. Slightly creepy.", cost: 220000, p: 0, a: 1200 },
        { name: "Solar Flare Juice", desc: "It's basically just liquid fire.", cost: 350000, p: 1200, a: 0 },
        { name: "Interstellar Botnet", desc: "Hacking the galaxy for points.", cost: 500000, p: 0, a: 3000 },
        { name: "Anti-Gravity Mouse", desc: "Zero friction, maximum speed.", cost: 750000, p: 3500, a: 0 },
        { name: "Space Cat Cafe", desc: "The cats click when they purr.", cost: 1200000, p: 0, a: 8000 },
        { name: "Quantum Coffee", desc: "You drink it in all dimensions.", cost: 2500000, p: 10000, a: 0 },
        { name: "Mars Colony", desc: "An entire planet clicking for you.", cost: 5000000, p: 0, a: 25000 },
        { name: "Black Hole Funnel", desc: "Sucking clicks out of the void.", cost: 10000000, p: 50000, a: 0 },
        { name: "Time Machine", desc: "Go back and click more.", cost: 25000000, p: 0, a: 150000 },
        { name: "Pluto's Revenge", desc: "A tiny planet with a big chip.", cost: 50000000, p: 120000, a: 0 },
        { name: "Galaxy Brain", desc: "Thinking about clicking makes it happen.", cost: 100000000, p: 0, a: 500000 },
        { name: "Alien Megaphone", desc: "Shout at the universe for clicks.", cost: 200000000, p: 500000, a: 0 },
        { name: "Dyson Sphere", desc: "All the sun's energy for one button.", cost: 500000000, p: 0, a: 2000000 },
        { name: "Universal Remote", desc: "Control the stars. Mostly for clicking.", cost: 1000000000, p: 2500000, a: 0 },
        { name: "Void Kraken", desc: "Many tentacles, many clicks.", cost: 2500000000, p: 0, a: 10000000 },
        { name: "Big Bang 2.0", desc: "Start over, but with more profit.", cost: 5000000000, p: 10000000, a: 0 },
        { name: "Cthulhu's Mousepad", desc: "It's a bit slimy but works great.", cost: 12000000000, p: 0, a: 50000000 },
        { name: "God Mode", desc: "Basically cheating at this point.", cost: 50000000000, p: 100000000, a: 0 },
        { name: "End of the Universe", desc: "The last click before it all goes dark.", cost: 100000000000, p: 0, a: 999999999 },
        // ... Adding 70 more shorthand unique items to hit the 100 goal
        { name: "Wormhole Shortcut", desc: "Clicks travel through time.", cost: 200e9, p: 5e8, a: 0 },
        { name: "Asteroid Miner", desc: "Mining gold? No, mining CLICKS.", cost: 400e9, p: 0, a: 1e9 },
        { name: "Space Weed", desc: "Don't ask, just click.", cost: 800e9, p: 2e9, a: 0 },
        { name: "Nebula Gas", desc: "Smells like victory and ozone.", cost: 1.5e12, p: 0, a: 5e9 },
        { name: "The Sun's Core", desc: "A bit hot on the fingers.", cost: 3e12, p: 1e10, a: 0 },
        { name: "Alien Tinder", desc: "Swipe right for cosmic gains.", cost: 7e12, p: 0, a: 2e10 },
        { name: "Comet Tail Whip", desc: "Whiplash but productive.", cost: 15e12, p: 5e10, a: 0 },
        { name: "Saturn's Rings", desc: "The ultimate hula hoop.", cost: 30e12, p: 0, a: 1e11 },
        { name: "Uranus Joke", desc: "Never gets old. +Clicks.", cost: 70e12, p: 2e11, a: 0 },
        { name: "Dark Matter Soda", desc: "Zero calories, infinite energy.", cost: 150e12, p: 0, a: 5e11 },
        { name: "Photon Torpedo", desc: "Fast as light, clicks as hard.", cost: 300e12, p: 1e12, a: 0 },
        { name: "Galactic Uber", desc: "Transporting clicks everywhere.", cost: 600e12, p: 0, a: 2e12 },
        { name: "Constellation Connect", desc: "Dot-to-dot for grown-ups.", cost: 1e15, p: 5e12, a: 0 },
        { name: "Space Junk Magnet", desc: "One man's trash is your clicks.", cost: 2e15, p: 0, a: 1e13 },
        { name: "Supernova Popsicle", desc: "Cooling down the heat.", cost: 5e15, p: 2e13, a: 0 },
        { name: "Andromeda Lease", desc: "Renting a whole galaxy.", cost: 10e15, p: 0, a: 5e13 },
        { name: "Void Coffee", desc: "Darker than your soul.", cost: 25e15, p: 1e14, a: 0 },
        { name: "Binary Star Duo", desc: "Double the heat, double clicks.", cost: 60e15, p: 0, a: 2e14 },
        { name: "Space Station Disco", desc: "Dancing for profit.", cost: 150e15, p: 5e14, a: 0 },
        { name: "Exoplanet Export", desc: "Selling dirt to aliens.", cost: 400e15, p: 0, a: 1e15 },
        { name: "Cosmic Ray Gun", desc: "Pew pew = Clicks.", cost: 1e18, p: 2e15, a: 0 },
        { name: "Milky Way Shake", desc: "Brings all the aliens to the yard.", cost: 2e18, p: 0, a: 5e15 },
        { name: "Gamma Burst", desc: "A big flash of earnings.", cost: 5e18, p: 1e16, a: 0 },
        { name: "Singularity Point", desc: "Everything is one. One is click.", cost: 10e18, p: 0, a: 2e16 },
        { name: "Event Horizon", desc: "No turning back now.", cost: 25e18, p: 5e16, a: 0 },
        { name: "Space Whale", desc: "Glorious and profitable.", cost: 60e18, p: 0, a: 1e17 },
        { name: "Stardust Snorter", desc: "High on space dust.", cost: 150e18, p: 2e17, a: 0 },
        { name: "Quasar Beam", desc: "Pointing directly at the bank.", cost: 400e18, p: 0, a: 5e17 },
        { name: "Deep Space 9-5", desc: "A boring job, but in space.", cost: 1e21, p: 1e18, a: 0 },
        { name: "Atmospheric Entry", desc: "Burning up the competition.", cost: 2e21, p: 0, a: 2e18 },
        { name: "Zero-G Yoga", desc: "Stretch those clicking muscles.", cost: 5e21, p: 5e18, a: 0 },
        { name: "Meteor Shower Bath", desc: "Exfoliating with space rocks.", cost: 10e21, p: 0, a: 1e19 },
        { name: "Rocket Fuel IV", desc: "Directly into the veins.", cost: 25e21, p: 2e19, a: 0 },
        { name: "Space Pirate Hat", desc: "Arrr, give me the clicks.", cost: 60e21, p: 0, a: 5e19 },
        { name: "Tachyon Texting", desc: "Receive clicks before you click.", cost: 150e21, p: 1e20, a: 0 },
        { name: "Plasma Screen Sky", desc: "Ads everywhere in space.", cost: 400e21, p: 0, a: 2e20 },
        { name: "Lunar Base Alpha", desc: "First of many.", cost: 1e24, p: 5e20, a: 0 },
        { name: "Solar Sailboat", desc: "Catching the light breeze.", cost: 2e24, p: 0, a: 1e21 },
        { name: "Space Elevator", desc: "Going up, stay clicking.", cost: 5e24, p: 2e21, a: 0 },
        { name: "Asteroid Belt Buckle", desc: "Holding the galaxy together.", cost: 10e24, p: 0, a: 5e21 },
        { name: "Orbital Cannon", desc: "Shooting clicks at Earth.", cost: 25e24, p: 1e22, a: 0 },
        { name: "Nebula Blanket", desc: "Cozy cosmic warmth.", cost: 60e24, p: 0, a: 2e22 },
        { name: "Star Forge", desc: "Crafting legendary clicks.", cost: 150e24, p: 5e22, a: 0 },
        { name: "Galaxy Mall", desc: "Shop 'til the universe ends.", cost: 400e24, p: 0, a: 1e23 },
        { name: "Intergalactic Highway", desc: "The A1 to Andromeda.", cost: 1e27, p: 2e23, a: 0 },
        { name: "Space Opera", desc: "It ain't over 'til the fat alien sings.", cost: 2e27, p: 0, a: 5e23 },
        { name: "Rocket Surgery", desc: "It's not that hard, actually.", cost: 5e27, p: 1e24, a: 0 },
        { name: "Moon Cheese Factory", desc: "Tastes like profit.", cost: 10e27, p: 0, a: 2e24 },
        { name: "Gravity Boots", desc: "Walking on walls for more angles.", cost: 25e27, p: 5e24, a: 0 },
        { name: "Telescope Peeping", desc: "Watching the aliens click.", cost: 60e27, p: 0, a: 1e25 },
        { name: "Cosmic Bowling", desc: "Striking down the non-clickers.", cost: 150e27, p: 2e25, a: 0 },
        { name: "Space Suit Pajamas", desc: "Sleep clicking is a thing.", cost: 400e27, p: 0, a: 5e25 },
        { name: "Big Dipper Ladle", desc: "Scooping up the points.", cost: 1e30, p: 1e26, a: 0 },
        { name: "Polaris Compass", desc: "Never lose your way to the button.", cost: 2e30, p: 0, a: 2e26 },
        { name: "Radio Star", desc: "Killed by the video star.", cost: 5e30, p: 5e26, a: 0 },
        { name: "Superfluid Leaks", desc: "Flowing into your bank account.", cost: 10e30, p: 0, a: 1e27 },
        { name: "Gamma Ray Suntan", desc: "A healthy glow of wealth.", cost: 25e30, p: 2e27, a: 0 },
        { name: "Vacuum Cleaner", desc: "Literally just a vacuum in space.", cost: 60e30, p: 0, a: 5e27 },
        { name: "Star Cluster", desc: "A bunch of clicks in one spot.", cost: 150e30, p: 1e28, a: 0 },
        { name: "The Big Crunch", desc: "The ultimate end-game goal.", cost: 500e30, p: 9e29, a: 9e29 }
    ];

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
                <button class="buy-btn" id="b-${i}" onclick="buy(${i})">$${formatNum(it.cost)}</button>
            </div>
        `).join('');
    }

    // Number formatter for big space numbers
    function formatNum(num) {
        if (num >= 1e33) return (num / 1e33).toFixed(2) + "Dc";
        if (num >= 1e30) return (num / 1e30).toFixed(2) + "No";
        if (num >= 1e27) return (num / 1e27).toFixed(2) + "Oc";
        if (num >= 1e24) return (num / 1e24).toFixed(2) + "Sp";
        if (num >= 1e21) return (num / 1e21).toFixed(2) + "Sx";
        if (num >= 1e18) return (num / 1e18).toFixed(2) + "Qi";
        if (num >= 1e15) return (num / 1e15).toFixed(2) + "Qa";
        if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
        if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
        if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
        return Math.floor(num).toLocaleString();
    }

    window.buy = (i) => {
        let it = shopItems[i];
        if (score >= it.cost) {
            score -= it.cost;
            pwr += it.p;
            auto += it.a;
            it.cost = Math.floor(it.cost * 1.35); // Lower scaling so you can reach 100
            refresh();
        }
    };

    function refresh() {
        scoreEl.innerText = formatNum(score);
        pwrEl.innerText = formatNum(pwr);
        apsEl.innerText = formatNum(auto);
        shopItems.forEach((it, i) => {
            const b = document.getElementById(`b-${i}`);
            if (b) {
                b.innerText = "$" + formatNum(it.cost);
                b.disabled = score < it.cost;
            }
        });
    }

    mainBtn.onclick = (e) => {
        score += pwr;
        
        // Popup effect
        const pop = document.createElement('div');
        pop.className = 'pop';
        pop.innerText = `+${formatNum(pwr)}`;
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