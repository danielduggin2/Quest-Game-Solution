// the let keyword fixes several unusual behaviors with let 
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;

// players can have multiple items. need an array. Player starts with stick
let inventory = ["stick"];
// let inventory = ["stick", "dagger", "sword"];

// You can access the HTML using the document object, which represents your entire HTML document.
// this is a constant variable bc it will not change
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");

// text, xpText, healthText, goldText, monsterStats, monsterName, monsterHealthText vars
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// weapons
// The value of the currentWeapon variable corresponds to an index in the weapons array. 
// The player starts with a stick, since currentWeapon starts at 0 and weapons[0] is the stick weapon.
const weapons = [
    {
        name: "stick",
        "power": 5
    },

    {
        name: "dagger",
        "power": 30
    },

    {
        name: "war hammer",
        "power": 50
    },

    {
        name: "sword",
        "power": 100
    }
];

const monsters = [
    {
        name: "super mutant",
        "level": 2,
        "health": 15
    },

    {
        name: "fanged beast",
        "level": 8,
        "health": 60
    },

    {
        name: "dragon",
        "level": 20,
        "health": 300
    }
]

// locations var
// object properties are written as key: value pairs
const locations = [
    {
        // this data is essentially the town function before we updated it
        name: "Town Square",
        "button text": ["Go to store", "Go to cave", "Fight Dragon"],
        "button functions": [goStore, goCave, fightDragon],
        "text": "You are in the town square. You see a sign that says \"Store\".",
    },

    {
        // this data is essentially goStore
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        "text": "You enter the store."
    },

    {
        name: "cave",
        "button text": ["Fight super mutant", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        "text": "You enter the cave. You see some monsters."
    },

    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        "text": "You are fighting a monster."
    },

    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, easterEgg],
        "text": "You have defeated the monster! You gain experience pts and find gold!"
    },

    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        "text": "You died. ☠️"
    },

    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        "text": "You defeat the dragon! YOU WIN THE GAME! 🎉"
    },

    {
        name: "easter egg",
        "button text": ["2", "8", "Go to town square?"],
        "button functions": [pickTwo, pickEight, goTown],
        "text": "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
];
// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    // after a monster dies, its stat bar should no longer display
    monsterStats.style.display = "none";
    // this functions updates the user location with the original options
    // need to use the argument we passed into it. We get the button text prop below
    // update innerTexts to get button text from locations array
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];

    // update the functions that run when the buttons are clicked again
    // updates onclick to get button functions from locations array
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];

    // update innerText to equal text from the locations array
    text.innerText = location.text;
}

function goTown(){
    // the commented code used innerText and onClick to specific strings/functions
    // now we will use the update function to use data from the location that is passed into it
    update(locations[0]);

    // The goTown funciton resets buttons 1-3 to the default options
    // The town is like the start of the game where the og options are
    // button1.innerText = "Go to store";
    // button2.innerText = "Go to cave";
    // button3.innerText = "Fight dragon";
    // update the functions that run when the buttons are clicked again
    // button1.onclick = goStore;
    // button2.onclick = goCave;
    // button3.onclick = fightDragon;
    // text.innerText = "You are in the town square. You see a sign that says \"Store\".";
}

function goStore(){
    update(locations[1]);
    // the innerText prop controls the text that appears in an HTML element
    // this code changes the button1 text from..
    // go to store -> Buy 10 Health
    // button1.innerText = "Buy 10 health (10 gold)";
    // button2.innerText = "Buy weapon (30 gold)";
    // button3.innerText = "Go to town square";
    // update the functions that run when the buttons are clicked again
    // button1.onclick = buyHealth;
    // button2.onclick = buyWeapon;
    // button3.onclick = goTown;
    // text.innerText = "You enter the store.";
}

// functions to goCave, fightDragon
function goCave(){
    update(locations[2]);
}



// creating functions buyHealth, buyWeapon, goTown
function buyHealth(){
    if(gold >= 10){
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else{
        text.innerText = "You do not have enough gold to buy health.";
    }
}

function buyWeapon(){
    if(currentWeapon < weapons.length-1){
        if(gold >= 30){
            gold -= 30;
            // increment by 1 (increments to better weapon)
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory;
        } else{
            text.innerText = "You do not have enough gold to buy a weapon.";
        }   
    } else{
        text.innerText = "You already have the most powerful weapon!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
        if(health <= 0){
            lose();
        }
    }
}

// sell weapon
function sellWeapon(){
    if(inventory.length > 1){
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
    } else{
        text.innerText = "Don't sell your only weapon!"
    }
}

// used in the cave 
function fightSlime(){
    fighting = 0;
    goFight();
}

function fightBeast(){
    fighting = 1;
    goFight();
}

function fightDragon(){
    fighting = 2;
    goFight();
}

function goFight(){
    update(locations[3]);
    // assign health based on monster we are fighting
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    // set innerText property of monsterName to be the name of current monster
    monsterName.innerText = monsters[fighting].name;
    // set innerText property of health to the health of the current monster
    monsterHealthText.innerText = monsterHealth;
}

function attack(){
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack with your " + weapons[currentWeapon].name + ".";
    // monsters[fighting].level retrieves the level of the current monster.
    // fighting is the state we are in
    // getting level from monsters list
    health -= getMonsterAttackValue(monsters[fighting].level);
    // health = health -= monsters[fighting].level;
    if(isMonsterHit()){
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    } else{
        text.innerText += " You miss."
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if(health <= 0){
        lose();
    } else if(monsterHealth <= 0){
        // ternary operator: one line if-else
        fighting === 2 ? winGame() : defeatMonster();
    }

    if(Math.random() <= .1 && inventory.length !== 1){
        text.innerText += " Your " + inventory.pop() + " breaks.";
        currentWeapon--;
    }
}

function getMonsterAttackValue(level){
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    return hit > 0 ? hit : 0;
}

function isMonsterHit(){
    return Math.random() > .2 || health < 20;
}

function dodge(){
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";

}

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function lose(){
    update(locations[5]);
}

function winGame(){
    update(locations[6]);
}

function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

function easterEgg(){
    update(locations[7]);
}

function pickTwo(){
    pick(2);
}

function pickEight(){
    pick(8);
}

function pick(guess) {
    const numbers = [];
    while (numbers.length < 10) {
      numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
     // The initialization expression is executed only once, before the loop starts, and is often 
     // used to define and set up the loop variable. 
     // Think of it like declaring a counter to use in your loop.
     // the condition statement, is evaluated at the beginning of every loop iteration. 
     // The loop will continue as long as the condition evaluates to be true.
     // This will increment the initializer i by 1 after each loop.
    for (let i = 0; i < 10; i++) {
      text.innerText += numbers[i] + "\n";
    }
    // The .includes() method determines if an array contains an element and will return either true or false.
    if (numbers.includes(guess)) {
      text.innerText += "Right! You win 20 gold!";
      gold += 20;
      goldText.innerText = gold;
    } else {
      text.innerText += "Wrong! You lose 10 health!";
      health -= 10;
      healthText.innerText = health;
      if (health <= 0) {
        lose();
      }
    }
  }