// You are Hercules, the greatest of the Greek Heroes! You have been tasked by King Eurystheus to slay the vicious Nemean Lion, defeat the impossible nine-headed Lernaean Hydra, and capture the guard dog of the underworld—Cerberus.
$(document).ready(function() {
    $('.chapter[data-type=CH01]').on('click', function(){
        $(this).toggleClass('active');
    });
});
// Features:  
// As a developer, I want to make at least five commits with descriptive messages. 
// As a user, I want an engaging story to be told using alerts. 
// XXX As a user, I want Hercules (and each enemy), to have health, attack power, and an array of attack names saved in an object literal.
// XXX As a user, I want the ability to select Hercules’ attack using a menu prompt.
// XXX As a user, I want the foe’s attack to be chosen at random.
// As a user, I want the results of each attack to be logged in the console. 
// As a developer, I want to use an Attack() function that will terminate when Hercules or an enemy’s health reaches zero. 
// As a developer, I want my RunGame() function to call my other functions in a logical order that will determine game flow.
// As a developer, I want all of my functions to have a Single Responsibility. Remember, each function should do just one thing! 

//HTML Functions
//#region 
$(document).ready(function() {
    $('.welcome').on('click', function(){
        $(this).toggleClass('active');
    });
});
function welcomeYes(){
    $(document).ready(function() {
        $('.chapter[data-type="CH00"]').on('click', function(){
            $(this).toggleClass('active');
        });
    });
    alert("You may now proceed to the Introduction.")
}
function welcomeNo(){
    alert("We're sorry that you think you don't understand how to use yes and no buttons!  However, you just pushed the \"no\" button!  I think you know more than you give yourself credit for.  You should try that again.")
}
function continueToChapterOne(){
    $(document).ready(function() {
        $('.chapter[data-type="CH01"]').on('click', function(){
            $(this).toggleClass('active');
        });
    });
    alert("You may now proceed to Chapter One: The Nemean Lion.")
}

//#endregion

//Utility Functions
//#region 
function d20(){
    let diceRoll = Math.floor(Math.random() * 21)
    return diceRoll
}
function canPummel(defender){
    if(defender.status == "pinned"){
        console.log("The target is pinned, you may pummel");
        return true;
    }
    else{
        return false;
    }
}
function pinOpponent(defender){
    defender.status = "pinned"
    alert("The target is pinned.")
    console.log("The target is pinned.")
}
//#endregion

//Weapons
//#region 
class Weapons{
    constructor(name, damage){
        this.name = name;
        this.damage = damage;
    }
}

let sword = new Weapons("Sword", 5);
let club = new Weapons("Club", 3);
let mace = new Weapons("Mace", 8);
let dagger = new Weapons("Dagger", 2);

//#endregion

//Attacks
//#region
class Attacks{
    constructor(name, attackPower, flavorText, status) {
        this.name = name;
        this.attackPower = attackPower;
        this.flavorText = flavorText;
        this.status = status;
    }
}
//basic attacks/NPC attacks
let punch = new Attacks("jab", 5, "A wound up uppercut surprises the opponent with a shot to the chin!", null)
let hook = new Attacks("left hook", 10, "From the side, the left hook connects with the opponents skull!", null)
let tackle = new Attacks("tackle", 8, "Take the opponent by surprise and tackle them to the ground!", "pinning")
let pummel = new Attacks("pummel", 15, "While the opponent is down, you take advantage of them!", null)
//armed attacks
let slash = new Attacks("slash", 15, "A blade slashes across the opponent's torso!", "bleeding")
let stab = new Attacks("stab", 20, "The blade pierces the skin and goes deep, leaving a puncture wound.", "bleeding")
//special attacks
let strangle = new Attacks("strangle", 25, "That opponent never stood a change against the might!", null)

//#endregion

//Characters
//#region 
class Character {
    constructor(name, type, vitality, speed, attackPower, armor) {
        this.name = name;
        this.type = type;
        this.level = 1;
        this.vitality = vitality;
        this.speed = speed;
        this.attackPower = attackPower;
        this.armor = armor;
        this.totalHP = Math.round(this.vitality + 25);
        this.hp = this.totalHP
        this.initiative = Math.round(this.speed / 2);
        this.defense = Math.round(this.vitality + this.armor);
        this.attackNames = []
        determineAttacks(this)
        this.weapon = null;
        this.status = null;
        this.attack = null;
    }
}

function determineAttacks(character){
    if(character.level == 1 && character.type == "player"){
        character.attackNames = [punch, tackle, pummel]
    }
    if(character.type == "NPC"){
        character.attackNames = [punch, tackle, hook]
    }
    if(character.type == "armedNPC"){
        character.attackNames = [slash, stab]
    }
}

let herc = new Character("Heracles", "player", 30, 5, 15, 0, 0);
let impUnarmed = new Character("Underworld Imp","NPC", 5, 2, 5, 0);
let impArmed = new Character ("Underworld Imp", "armedNPC", 8, 4, 8, 5)
impArmed.weapon = dagger;
let crab = new Character("Giant Crab", "NPC", 15, 0, 8, 15);
let wildMenOne = new Character("Unknown Fighter","armedNPC", 10, 5, 2, 5, 0);
wildMenOne.weapon = club;
let wildMenTwo = new Character("Unknown Armed Peasant", "NPC", 0, 5, 1, 3, 0);
//#endregion

//Flavor Text
//#region 
function opponentSeemsBloody(target){
    let bloodied = ""
    if(target.hp == 0){
        bloodied = "The target has fallen and they are now dead."
    }
    else if(target.hp <= target.totalHP/4){
        bloodied = "The target looks bloody and are barely holding on."
    }
    else if(target.hp <= target.totalHP/2){
        bloodied = "The target looks like they're having a rough time carrying on."
    }
    else if(target.hp<=target.totalHP/1.3){
        bloodied = "The target looks like they're still functioning alright."
    }
    else{
        bloodied = "The target is just fine."
    }
    return bloodied
}
//#endregion

//Armor
//#region 
class Armors{
    constructor(name, armorValue){
        this.name = name;
        this.armorValue = armorValue;
    }
}

let bracers = new Armors("Bracers", 5);
let chestPlate = new Armors("Chest Plate", 15);
let helm = new Armors("Helm", 8);
//#endregion

//Attack Functions
//#region 
function calculateDamage(attacker, target){
    let damage = 0;
    let weaponDamage = 0;
    if(attacker.weapon == null){
        weaponDamage = 0;
    }
    else{
        weaponDamage = attacker.weapon.damage;
    }
    if(attacker.attack.status == "pinning"){
        pinOpponent(target);
    }
    damage = attacker.attackPower + weaponDamage + attacker.attack.attackPower;
    target.hp -= damage;
    return damage;
}
function displayAttackNames(attacker){
    let displayAttacks = "Available Attacks are: "
    for(let i = 0; i<attacker.attackNames.length; i++){
        displayAttacks += `-- ${attacker.attackNames[i].name}`
    }
    return displayAttacks;
}
function chooseBasicAttack(attacker, target){
    let displayAttacks = displayAttackNames(attacker);
    alert(displayAttacks);
    attackChoice = promptFor("Whick attack would you like to do?", validAttackNames)
    if(attackChoice.toLowerCase() == "pummel" && canPummel(target) == false){
        alert("This target is not pinned and cannot be pummeled.  Please select again.");
        chooseBasicAttack(attacker, target);
    }
    else{
        for(let i = 0; i < attacker.attackNames.length; i++){
            if(attackChoice == attacker.attackNames[i].name){
                let turnAttack = attacker.attackNames[i];
                attacker['attack']=turnAttack
            }
        } 
    }  
}
function determineAttacks(character){
    if(character.level == 1 && character.type == "player"){
        character.attackNames = [punch, tackle, pummel]
    }
    if(character.type == "NPC"){
        character.attackNames = [punch, tackle, hook]
    }
    if(character.type == "armedNPC"){
        character.attackNames = [slash, stab]
    }
}
function randomAttackNPC(computer, player){
    number = Math.floor(Math.random() * computer.attackNames.length);
    computer.attack = computer.attackNames[number];
    computerDamage = calculateDamage(computer, player);
    return computerDamage;
}
function attackPhase(attacker, target){
    chooseBasicAttack(attacker, target);
    let attackerDamage = calculateDamage(attacker, target);
    let computerDamage = randomAttackNPC(target, attacker);
    let bloodied = opponentSeemsBloody(target);
    alert(`You did ${attackerDamage} to your opponent and they did ${computerDamage} to you.\n You currently have ${attacker.hp} health left. ${bloodied}`)
}
//#endregion

//Nemean Lion
//#region 

function strangeMenConversation(player){
    alert('"Ho, stranger!  We come from two days walk up north.  There\'s danger about up there!"');
    believe_men = promptFor("Do you believe the strangers and wish to continue speaking to them(yes)? Or do have a bad feeling them and want to attack (no)?", yesNo);
    if(believe_men.toLowerCase() == "yes"){
        alert('You ask:\n "Why do you vagabonds plague this road?"');
        alert('"Sorry sir.  But our village was attacked and when the chaos ensued, people weren\'t careful and our whole village is burned to the ground and we leave to seek help.  You look a mighty sort.  Might you be the type to help us?"');
        helpThem = promptFor("Will you see what the villagers need?(yes)  Or have you changed your mind and wish to attack them?(no)", yesNo);
        if(helpThem.toLowerCase() == "yes"){
            alert('"OH! Thank the Gods!  If you can help, that would be marvelous!" His exhaustion is momentarily replaced by relief and ecstacy.\n  However, it fades quickly.  "The creature that attacked our village was a hungry lion.  This wasn\'t your normal lion, though.  His fur seemed to be made of solid gold.  Some of the men, though, have heard whispers.  They\'ve heard this lion\'s fur cannot be penetrated by spear or shield.  One must kill him with only your bare hands.  Go in peace, stranger.');
            alert('You have unlocked the attack "strangle".');
            player.attacks.push(strangle);
        }
        else{
            attackPhase(player, wildMenOne);
        }
    }
    else{
        attackPhase(player, wildMenOne);
    }
}

//#endregion

//Game Flow
//#region 

//#endregion

//Validations
//#region 
function promptFor(question, valid){
    let isValid;
    do{
      var response = prompt(question).trim();
      isValid = valid(response);
    } while(response === ""  ||  isValid === false)
    return response;
  }

function yesNo(input){
    if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
      return true;
    }
    else{
      return false;
    }
  }

function validAttackNames(input){
    if(input.toLowerCase() == "left hook" || input.toLowerCase() == "jab" || input.toLowerCase() == "tackle"||input.toLowerCase() == "pummel"||input.toLowerCase() == "slash"||input.toLowerCase() == "stab"||input.toLowerCase() == "strangle" ){
        return true;
    }
    else{
        return false;
    }
}  

function autoValid(){
    return true;
  }
//#endregion

