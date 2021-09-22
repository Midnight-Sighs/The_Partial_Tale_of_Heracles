// $(document).ready(function() {
//     $('.chapter[data-type=CH01-2]').on('click', function(){
//         $(this).toggleClass('active');
//     });
// });

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
        $('.chapter[data-type="CH01-1"]').on('click', function(){
            $(this).toggleClass('active');
        });
    });
    alert("You may now proceed to Chapter One: Encounter on the Road")
}
function continueNemeanLion(){
    $(document).ready(function() {
        $('.chapter[data-type="CH01-2"]').on('click', function(){
            $(this).toggleClass('active');
        });
    });
    alert("You may now proceed to Chapter One: The Nemean Lion")
}
function disableButtonTwoChapterOneOne(){
    $(document).ready(function() {
    $('.buttonTwo[data-type="CH01-1"]').on('click', function(){
        $(this).toggleClass('disabled');
    });
});
}
//#endregion

//Utility Functions
//#region 
function d20(){
    let diceRoll = Math.floor(Math.random() * 21)
    return diceRoll
}
function d10(){
    let diceRoll = Math.floor(Math.random() * 11)
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
let jab = new Attacks("jab", 5, "A wound up uppercut surprises the opponent with a shot to the chin!", null);
let hook = new Attacks("left hook", 10, "From the side, the left hook connects with the opponents skull!", null);
let tackle = new Attacks("tackle", 8, "Take the opponent by surprise and tackle them to the ground!", "pinning");
let pummel = new Attacks("pummel", 15, "While the opponent is down, you take advantage of them!", null);
//armed attacks
let slash = new Attacks("slash", 10, "A blade slashes across the opponent's torso!", "bleeding");
let stab = new Attacks("stab", 15, "The blade pierces the skin and goes deep, leaving a puncture wound.", "bleeding");
//special attacks
let strangle = new Attacks("strangle", 25, "That opponent never stood a change against the might!", null);
//creature attacks
let swipe = new Attacks("swipe", 10, "The creatures swipes its class across its opponent!");
let bite = new Attacks ("bite", 15, "The creatures grasps its opponent in its jaws and clamps down tight, tearing off a chunk of flesh.");
let roar = new Attacks("roar", 3, "While a roar itself does not hurt an enemy, it throws them off guard.  In the heat of battle, the opponent becomes clumsy and injures themself.")


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
        this.hp = this.totalHP;
        this.initiative = Math.round(this.speed / 2);
        this.defense = Math.round(this.vitality + this.armor);
        this.attackNames = [];
        determineAttacks(this);
        this.equippedArmor = [];
        this.hasShield = false;
        this.weapon = null;
        this.status = null;
        this.attack = null;
    }
}

function determineAttacks(character){
    if(character.level == 1 && character.type == "player"){
        character.attackNames = [jab, tackle, pummel];
    }
    if(character.type == "NPC"){
        character.attackNames = [jab, tackle, hook];
    }
    if(character.type == "armedNPC"){
        character.attackNames = [slash, stab];
    }
    if(character.type == "Creature"){
        character.attackNames = [swipe, bite, roar];
    }
}

function levelUp(character){
    character.totalHP += 10;
    character.hp = character.totalHP;
    character.level += 1;
    console.log(`Your new total HP is ${character.totalHP}.  Your current HP is ${character.hp}.  Your new level is ${character.level}.`)
}

let herc = new Character("Heracles", "player", 35, 5, 15, 0);
let impUnarmed = new Character("Underworld Imp","NPC", 5, 2, 5, 0);
let impArmed = new Character ("Underworld Imp", "armedNPC", 8, 4, 8, 5)
impArmed.weapon = dagger;
let crab = new Character("Giant Crab", "Creature", 15, 0, 8, 15);
let wildMenOne = new Character("Unknown Fighter","armedNPC", 5, 5, 1, 0);
wildMenOne.weapon = club;
let wildMenTwo = new Character("Unknown Armed Peasant", "NPC", 0, 5, 1, 0);
let lion = new Character("Nemean Lion", "Creature", 200, 10, 15, 15);
//#endregion

//Flavor Text
//#region 
function opponentSeemsBloody(target){
    let bloodied = ""
    if(target.hp <= 0){
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
        this.type = ""
    }
}

let bracers = new Armors("bracers", 5);
let chestPlate = new Armors("chest plate", 15);
let helm = new Armors("helm", 8);
let shieldOfTheGods = new Armors("shield of the Gods", 20);
shieldOfTheGods.type = "shield";
let lionHide = new Armors("hide of the Nemean Lion",25);
lion.equippedArmor = lionHide;

function hasShield(character){
    for(i = 0; i<character.equippedArmor.length; i++){
        if(character.equippedArmor[i].type == "shield"){
            character.hasShield = true;
        }
    }
}
function shieldDefense(character){
    hasShield(character)
    if(character.hasShield == true){
        let shieldBonus = true;
        return shieldBonus;
    }
}
function determineArmorDefenseOnDefend(character){
    bonusArmor = 0;
    for(i=0; 0<character.equippedArmor.lenth; i++){
        bonusArmor += character.equippedArmor[i].armorValue;
    }
    let shieldBonus = shieldDefense(character);
    if(shieldBonus = true){
        bonusArmor *=2;
    }
}
function determineArmoredDefense(character){
    bonusArmor = 0;
    if(character.equippedArmor=[]){
        bonusArmor = 0;
    }
    else{
        for(i=0; 0<character.equippedArmor.lenth; i++){
        bonusArmor += character.equippedArmor[i].armorValue;
        }
    }
    return bonusArmor;
}
function displayArmor(character){
    let printArmor = "Equipped armor is: "
        for(let i = 0; i<character.equippedArmor.length; i++){
            printArmor += `- ${character.equippedArmor[i].name} `
        }
        return printArmor;
}
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
    armorBonus = determineArmoredDefense(target);
    totalDamage = damage - (target.armor+armorBonus);
    if(totalDamage <0){
        totalDamage =0;
    }
    target.hp -= totalDamage;
    return totalDamage;
}
function calculateDamageWithDefense(attacker, target){
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
    armorBonus = determineArmorDefenseOnDefend(target);
    totalDamage = damage - (target.armor+armorBonus);
    if(totalDamage =0){
        totalDamage = 0;
    }
    target.hp -= totalDamage;
    return totalDamage;
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
    if(attackChoice.toLowerCase() == "strangle" && target.name == "Nemean Lion"){
        attacker.attack = strangle;
        return;
    }
    else{
        for(let i = 0; i < attacker.attackNames.length; i++){
            if(attackChoice.toLowerCase() == attacker.attackNames[i].name){
                let turnAttack = attacker.attackNames[i];
                attacker['attack']=turnAttack
            }
        } 
    }  
}
function randomAttackNPC(computer, player){
    number = Math.floor(Math.random() * computer.attackNames.length);
    computer.attack = computer.attackNames[number];
    computerDamage = calculateDamage(computer, player);
    return computerDamage;
}
function randomAttackWithDefenseNPC(computer, player){
    number = Math.floor(Math.random() * computer.attackNames.length);
    computer.attack = computer.attackNames[number];
    computerDamage = calculateDamageWithDefense(computer, player);
    return computerDamage;
}
function attackPhase(attacker, target){
    chooseBasicAttack(attacker, target);
    let attackerDamage = calculateDamage(attacker, target);
    let computerDamage = randomAttackNPC(target, attacker);
    let bloodied = opponentSeemsBloody(target);
    alert(`${attacker.attack.flavorText} You did ${attackerDamage} to your opponent and they did ${computerDamage} to you.\n You currently have ${attacker.hp} health left. ${bloodied}`)
    console.log(`Your damage dealt: ${attackerDamage} \nComputer damage Dealt: ${computerDamage} \nYour HP: ${attacker.hp} out of ${attacker.totalHP}\n Computer HP: ${target.hp} out of ${target.totalHP}`)
}
function attackPhaseWithDefend(attacker, target){
    attackOrDefend = promptFor("Would you like to attack or defend?", attackDefend);
    if(attackOrDefend.toLowerCase() == "attack"){
        attackPhase(attacker, target);
    }
    if(attackOrDefend.toLowerCase()=="defend"){
        let computerDamage = randomAttackWithDefenseNPC(target, attacker);
        if(computerDamage <=0){
            computerDamageDisplay = "You managed to block and evade all damage!"
        }
        else{
            computerDamageDisplay = `Your opponent did ${computerDamage} to you.`
        }

        alert(`As you defended, you dealt no damage this turn.  ${computerDamageDisplay}`)
        console.log(`Your current HP is ${attacker.hp} out of ${attacker.totalHP}\n Computer HP: ${target.hp} out of ${target.totalHP}`)
    }
}
function attackWithLionBossUnlockStrangle(attacker, target){
    turn = 1;
    while(turn<=5){
        attackOrDefend = promptFor("Would you like to attack or defend?", attackDefend);
        if(attackOrDefend.toLowerCase() == "attack"){
            chooseBasicAttack(attacker, target)
            if(attacker.attack.name == "strangle"){
                attackerDamage = 115;
                target.hp -= attackerDamage;
                alert(`That was very effective against your opponent! `)
                let computerDamage = randomAttackNPC(target, attacker);
                let bloodied = opponentSeemsBloody(target);
                alert(`${attacker.attack.flavorText} You did ${attackerDamage} to your opponent and they did ${computerDamage} to you.\n You currently have ${attacker.hp} health left. ${bloodied}`)
                console.log(`Your damage dealt: ${attackerDamage} \nComputer damage Dealt: ${computerDamage} \nYour HP: ${attacker.hp} out of ${attacker.totalHP}\n Computer HP: ${target.hp} out of ${target.totalHP}`)
            }
            else{
                let attackerDamage = calculateDamage(attacker, target);
                let computerDamage = randomAttackNPC(target, attacker);
                let bloodied = opponentSeemsBloody(target);
                alert(`${attacker.attack.flavorText} You did ${attackerDamage} to your opponent and they did ${computerDamage} to you.\n You currently have ${attacker.hp} health left. ${bloodied}`)
                console.log(`Your damage dealt: ${attackerDamage} \nComputer damage Dealt: ${computerDamage} \nYour HP: ${attacker.hp} out of ${attacker.totalHP}\n Computer HP: ${target.hp} out of ${target.totalHP}`)
            }
        }
        if(attackOrDefend.toLowerCase()=="defend"){
            let computerDamage = randomAttackWithDefenseNPC(target, attacker);
            if(computerDamage <=0){
                computerDamageDisplay = "You managed to block and evade all damage!"
            }
            else{
                computerDamageDisplay = `Your opponent did ${computerDamage} to you.`
            }
            alert(`As you defended, you dealt no damage this turn.  ${computerDamageDisplay}`)
            console.log(`Your current HP is ${attacker.hp} out of ${attacker.totalHP}\n Computer HP: ${target.hp} out of ${target.totalHP}`)
        }
        if(attacker.hp <=0){
            alert("you have died.  Thank you for playing.  We hope you enjoyed.  If you'd like to play again, please refresh this window.")
            turn = 5;
        }
        if(target.hp <=0){
            alert("You have slain the Lion!")
            turn = 5;
        }
        if(turn == 3){
            for(let i = 0; i<attacker.attackNames.length; i++){
                if(attacker.attackNames[i] != strangle){
                    noStrangle = true;
                }
                if(attacker.attackNames[i] == strangle){
                    noStrangle = false;
                    break;
                }
            }
            if(noStrangle == true){
                attacker.attackNames.push(strangle);
                alert("In the midst of combat, you have an idea to defeat the lion.  While basic weapons will not penetrate it's hide, it still requires the ability to breathe....")
                alert("You have unlocked the ability to strangle!")
            }
        }
        turn++
    }
}

//#endregion

//Nemean Lion
//#region 
function strangeMenCombat(player){
    alert("The armed man sees that your intentions toward them are not pure and charges to attack you!");
    while(wildMenOne.hp > 0 && player.hp > 0){
        attackPhase(player, wildMenOne);
    }
    if(player.hp <= 0){
        alert("You have died.  Thank you for attempting to play through this epic tale!  Please refresh or revist and try again one day.")
        return;
    }
    else if(wildMenOne.hp <=0 && player.hp >0){
        alert("Seeing his comrade fall in combat, another man attempts to attack you!");
        while(wildMenTwo.hp>0 && player.hp>0){
            attackPhase(player, wildMenTwo);
        }
        if(player.hp <= 0){
            alert("You have died.  Thank you for attempting to play through this epic tale!  Please refresh or revist and try again one day.");
        }
        if(wildMenTwo.hp <=0){
            alert("The second man was slain and the others in the group have fled, leaving you alone in the middle of a field.  You decide to investigate where they came from.");
            onToNemeanLion(herc);
        }
    }
}
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
            player.attackNames.push(strangle);
            onToNemeanLion(herc);
        }
        else{
            alert("You decide that they don't look the sort to be trusted and shift your posture to a fighting stance.")
         strangeMenCombat(player);
        }
    }
    else{
        alert("You decide that they don't look the sort to be trusted and shift your posture to a fighting stance.")
     strangeMenCombat(player);
    }
}
function onToNemeanLion(player){
    levelUp(herc)
    continueNemeanLion()
}
function observeNemeanLion(player){
    alert("You stealthily creep up closer to the Lion so you can get a better look at it.  You watch in awe at what would make a normal man cry as a pack of wild dogs think they can overtake the Lion.  With a roar and a few swipes of its mighty paws, the Lion quickly overcomes his foes.")
    observePrompt = promptFor("Would you like to continue observing?  Yes or no?  If you select no, you will charge into battle.", yesNo)
    if(observePrompt.toLowerCase() == "yes"){
        investigateObject = promptFor("You shift a bit as your legs begin to cramp and in doing so, your knee nudges something very solid and very sharp.  Would you like to investigate it?", yesNo)
        if(investigateObject.toLowerCase() == "yes"){
            alert("Upon further investigation, you discover that your knee had encountered a very sturdy looking shield.  It looks old and worn, as if it were a family heirloom, but it looks as if it were crafted by the Gods themselves.")
            takeShield = promptFor("Would you like to take the old shield?(yes) Or are you so sure of your strength that you don't need the battered looking thing?(no)", yesNo)
            if(takeShield.toLowerCase() == "yes"){
                alert("You have found the Shield of the Gods!  While old and battered, the sturdiness of it leads you to believe that it has protected many warriors.")
                player.equippedArmor.push(shieldOfTheGods)
                currentlyEquipped = displayArmor(player);
                console.log(currentlyEquipped);
            }
        }
    }
}
function attackNemeanLion(player, target){
    alert("You charge at the Nemean Lion and try to take it off guard, but the Lion is swift and ready for you as you approach.  You two clash into battle.");
    attackWithLionBossUnlockStrangle(player, target)
}
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

function attackDefend(input){
    if(input.toLowerCase() =="attack"||input.toLowerCase()=="defend"){
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

