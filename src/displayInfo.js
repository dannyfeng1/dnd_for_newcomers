import {ClassInfo} from './classInfo.js'
import {RaceInfo} from './raceinfo.js'
class DisplayInfo {
 

  static createClassInfo(classData) {
    let container = document.createElement("div");

    let classTitle = ClassInfo.title(classData);
    container.append(classTitle);
    
    let description = ClassInfo.description(classData);
    container.append(description);

    let allProficiencies = document.createElement("div")
    allProficiencies.className = "all-proficiencies"
    container.append(allProficiencies)

    let proficiencies = ClassInfo.proficiencies(classData);
    allProficiencies.append(proficiencies)

    let bonusProfs = ClassInfo.bonusProficiencies(classData);
    allProficiencies.append(bonusProfs)


    return container
  }

  static createRaceInfo(raceData) {
    let container = document.createElement("div");

    let raceName = RaceInfo.raceName(raceData);
    container.append(raceName);
    
    let raceDescription = RaceInfo.raceDescription(raceData);
    container.append(raceDescription);

    let traits = RaceInfo.raceTraits(raceData);
    container.append(traits);

    return container
  }
}

export {DisplayInfo}