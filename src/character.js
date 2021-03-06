import { APIUtil } from "./APIUtil";
import {ClassInfo} from "./classInfo"
import { RaceInfo } from "./raceinfo";

const ABILITY_SCORES = ["STR", "DEX", "CON", "INT", "WIS", "CHA"]

class Character {
  constructor(charOptions) {
    this.name = charOptions["name"];
    this.age = charOptions["age"];
    this.gender = charOptions["gender"];
    this.class = charOptions["class"];
    this.race = charOptions["race"]
  }



  createBasicInfo() {
    let basicInfo = document.createElement("div");

    let name = document.createElement("p");
    name.innerHTML = `Name: ${this.name}`;
    let age = document.createElement("p");
    age.innerHTML = `Age: ${this.age}`;
    let gender = document.createElement("p");
    gender.innerHTML = `Gender: ${this.gender}`;
    let charClass = document.createElement("p");
    charClass.innerHTML = `Class: ${this.class}`;
    let race = document.createElement("p");
    race.innerHTML = `Race: ${this.race}`;

    basicInfo.append(name, age, gender, charClass, race)

    return basicInfo
  }

  createStats() {
    let statBlock = document.createElement("div");
    let hitPoints = document.createElement("button");
    hitPoints.innerHTML = "Hit Points(HP): 13/13"
    hitPoints.setAttribute("id", "hit-points")
    statBlock.append(hitPoints)
    statBlock.append(document.createElement("br"))
    
    let armorClass = document.createElement("button")
    armorClass.innerHTML = "Armor Class(AC): 14"
    armorClass.setAttribute("id", "armor-class")
    statBlock.append(armorClass)
    statBlock.append(document.createElement("br"))

    let prof = document.createElement("button")
    prof.innerHTML = "Proficiency Bonus: +2"
    prof.setAttribute("id", "proficiency-bonus")
    statBlock.append(prof)
    statBlock.append(document.createElement("br"))
    statBlock.append(document.createElement("br"))
    let abilityHeader = document.createElement("div")
    abilityHeader.innerHTML = "<strong>Ability Scores and Modifiers</strong>"
    abilityHeader.setAttribute("id", "ability-header")
    statBlock.append(abilityHeader)
    let statElement = document.createElement("div");
    statElement.setAttribute("id", "saving-throws");
    statElement.append(document.createElement("br"))

    const statAndMod = function(stat) {
      let randomStat = Math.floor(Math.random() *6) + 10;

      let statValue = document.createElement("button");
      statValue.classList.add("saving-throw")
      statValue.setAttribute("data-abilityAPI", `${stat.toLowerCase()}`)
      statValue.setAttribute("data-stat-value", `${randomStat}`)
      statValue.innerHTML = stat + `: ${randomStat} ` + `(+${Math.floor((randomStat - 10) / 2)})`;
      statValue.setAttribute("data-stat-mod", `${Math.floor((randomStat - 10) / 2)}`)

      statElement.append(statValue)
      statElement.append(document.createElement("br"))

      return statElement
    }

    ABILITY_SCORES.forEach(stat => {
      let statElement = statAndMod(stat);
      statBlock.append(statElement)
    })

    return statBlock
  }

  createSkillChecks() {
    let skillCheckData = APIUtil.getSkills();

    let skillHTMLElements = document.createElement("div")
    skillHTMLElements.setAttribute("id", "skill-checks");
    
    skillCheckData.then(skillCheckData => {
      skillCheckData.results.forEach(skill => {
        let skillElement = document.createElement("button")
        skillElement.classList.add("skill-check")
        fetch(`https://www.dnd5eapi.co${skill.url}`)
        .then(skillInfo => { return skillInfo.json() })
        .then(skillData => {
          skillElement.innerHTML = `${skillData.name} ` + `(${skillData.ability_score.name})`
        })
        skillElement.setAttribute("data-skillAPI", `${skill.index}`);
        skillHTMLElements.append(skillElement);
      })
    })
    return skillHTMLElements;
  }

  createCharacterSheet() {
    // bunch of helper methods
    let container = document.createElement("div");
    let sheetHeader = document.createElement("h2");
    sheetHeader.innerHTML = "Character Sheet"
    container.append(sheetHeader)
    
    let basicInfo = this.createBasicInfo();
    container.append(basicInfo)
    basicInfo.setAttribute("id", "character-info")
    basicInfo.append(document.createElement("br"))
    
    let statBlock = this.createStats();
    statBlock.setAttribute("id", "stat-block");
    container.append(statBlock);
    
    let skillHeader = document.createElement("div");
    skillHeader.setAttribute("id", "skill-header");
    skillHeader.innerHTML = "<strong>Skills</strong>"
    container.append(skillHeader)
    let skillChecks = this.createSkillChecks();
    container.append(skillChecks);
    
    // let classData = APIUtil.getClassInfo(`${this.class.toLowerCase()}`);
    // classData.then(classData => {
    //   let classProfs = ClassInfo.proficiencies(classData);
    //   classData.saving_throws.forEach(saveProf => {
    //     let save = document.createElement("li")
    //     save.innerHTML = `${saveProf.name} Saving Throws`
    //     classProfs.append(save)
    //   })
    //   container.append(classProfs);
    // })

    // let raceData = APIUtil.getRaceInfo(`${this.race.toLowerCase()}`);
    // let characterTraits = document.createElement("div");
    // characterTraits.innerHTML = "Race Traits and Features"
    
    // raceData.then(raceData => {
    //   raceData.traits.forEach(trait => {
    //     let traitName = document.createElement("li");
    //     traitName.innerHTML = trait.name;
    //     characterTraits.append(traitName)
    //   })
    // })
    // container.append(characterTraits)

    return container
  }
}

export {Character}