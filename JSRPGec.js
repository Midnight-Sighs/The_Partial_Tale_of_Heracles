// You are Hercules, the greatest of the Greek Heroes! You have been tasked by King Eurystheus to slay the vicious Nemean Lion, defeat the impossible nine-headed Lernaean Hydra, and capture the guard dog of the underworld—Cerberus.

// Features:  
// As a developer, I want to make at least five commits with descriptive messages. 
// As a user, I want an engaging story to be told using alerts. 
// XXXAs a user, I want Hercules (and each enemy), to have health, attack power, and an array of attack names saved in an object literal.
// As a user, I want the ability to select Hercules’ attack using a menu prompt.
// As a user, I want the foe’s attack to be chosen at random.
// As a user, I want the results of each attack to be logged in the console. 
// As a developer, I want to use an Attack() function that will terminate when Hercules or an enemy’s health reaches zero. 
// As a developer, I want my RunGame() function to call my other functions in a logical order that will determine game flow.
// As a developer, I want all of my functions to have a Single Responsibility. Remember, each function should do just one thing! 

//Characters
//#region 
class Character {
    constructor(name, vitality, speed, attackPower, armor) {
        this.name = name;
        this.vitality = vitality;
        this.speed = speed;
        this.attackPower = attackPower;
        this.armor = armor;
        this.hp = Math.round(Hero.vitality + 25);
        this.initiative = Math.round(Hero.speed / 2);
        this.defense = Math.round(Hero.vitality + Hero.armor);
        this.attackNames = []
        this.weapon = null
        this.hasWeapon = false;
    }
}
let herc = new Character("Hercules", 10, 5, 15, 0, 0);
let imp = new Character("Underworld Imp", 5, 2, 5, 0);
let crab = new Character("Giant Crab", 15, 0, 8, 15);
//#endregion

//Attacks
//#region
class Attacks{
    constructor(name, attackPower, flavorText, status) {
        this.name = name;
        this.attackPower = attackPower;
        this.flavorText = flavorText;
        this.status = status;
        this.checkPinned = this.checkIfPinned(this.status)
        this.canPummel = this.canPummel()
    }
    checkIfPinned(status){
        if(status = "pinned"){
            console.log("The target is pinned")
            return true;
        }
        else{
            console.log("The target is not pinned");
            return false;
        }
    }
    canPummel(){
        if(this.checkPinned == true){
            console.log("The target is pinned, you may pummel");
            return true;
        }
        else{
            console.log("The target is not pinned, you cannot pummel");
            return false;
        }
    }
}
let punch = new Attacks("Uppercut", 5, "A wound up uppercut surprises the opponent with a shot to the chin!", null)
let tackle = new Attacks("Tackle", 8, "Take the opponent by surprise and tackle them to the ground!", "pinned")
let pummel = new Attacks("Pummel", 15, "While the opponent is down, you take advantage of them!", null)


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

//Utility Functions
//#region 

function welcome(){
    alert("Welcome!  Many have heard the feats of Hercules and many have scribed the feats in various ways.  I'm here to tell you today that you MAY not have heard it right.  We're going to adventure through some of the 12 Labours that Hercules endured for his cousin, King Eurystheus.  \n\n As you you will have to use buttons to control the flow of things.  Do you understand?  Select yes or no.")
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

function autoValid(){
    return true;
  }
//#endregion

