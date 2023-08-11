const shift = 5.82;

const fighterOne = "fighterOne";

const fighterTwo = "fighterTwo";

const oopClassList = {
    attack: "attack",
    fighterHit: "fighterHit",
    miss: "miss"
}

const getAttackedFighter = fighter => {
    return fighter === fighterTwo ? fighterOne : fighterTwo;
}

const getFightStats = (plyrOne) => {
    const [
        atkId, defId, spdId
    ] = plyrOne ? ["fOneAtk", "fOneDef", "fOneSpd"] : ["fTwoAtk", "fTwoDef", "fTwoSpd"];
    return {
        atk: parseFloat(getById(atkId).value || 0),
        def: parseFloat(getById(defId).value || 0),
        spd: parseFloat(getById(spdId).value || 0)
    }
}

const getSpriteDelay = (timeOut, i) => timeOut * (i + 1);

const getRetreatDelay = (fighter) => (fighter.spriteShifts + 1) * fighter.timeOut;

const restrictValue = (id) => {
    const fields = ["fOneAtk", "fOneDef", "fOneSpd"].includes(id) ? [
        "fOneAtk", "fOneDef", "fOneSpd"
    ] : ["fTwoAtk", "fTwoDef", "fTwoSpd"];
    const max = 100;
    const a = parseFloat(getById(fields[0]).value) || 0;
    const b = parseFloat(getById(fields[1]).value) || 0;
    const c = parseFloat(getById(fields[2]).value) || 0;
    if((a + b + c > max) || (a < 0)){
        getById(id).value = 0;
    }
}

class BattleField {
    constructor(fighterOne, fighterTwo){
        this.fighterOne = fighterOne;
        this.fighterTwo = fighterTwo;
    }
    wasHit(ply){
        return Math.random() > (ply.speed / 100);
    }
    decreaseHitPoint(plyOne, plyTwo){
        const difference = plyOne.atk - plyTwo.def;
        let hitPoints = difference <= 0 ? 5 : plyOne.atk - plyTwo.def;
        plyTwo.hp -= hitPoints;
        setTimeout(() => {
            getById(plyTwo.hpId).innerText = plyTwo.hp;
        }, 500);
    }
    fight(plyOne, plyTwo){
        let complete = false;
        const wasHit = this.wasHit(plyTwo);
        if(wasHit){
            plyOne.animateAtk();
            this.decreaseHitPoint(plyOne, plyTwo);
            if(plyTwo.hp <= 0){
                this.resetGame(plyOne, plyTwo);
                complete = true;
            }
        } else {
            plyOne.animateMiss();
        }
        plyOne.retreatFighter();
        if(!complete){
            setTimeout(() => {
                this.fight(plyTwo, plyOne);
            }, 1500);
        }
    }
    resetGame(victor, defeated){
        setTimeout(() => {
            alert(`The winner is ${victor.name}`);
        }, 1000);
        setTimeout(() => {
            victor.hp = 100;
            defeated.hp = 100;
            getById(victor.hpId).innerText = victor.hp;
            getById(defeated.hpId).innerText = defeated.hp;
        }, 2000);
    }
}

class Fighter {
    hp = 100;
    secondPerAnimation = 800;
    spriteShifts = 17;
    timeOut = this.secondPerAnimation / this.spriteShifts;
    constructor(id, hpId, atk, def, speed, name){
        this.id = id;
        this.hpId = hpId;
        this.atk = atk;
        this.def = def;
        this.speed = speed;
        this.name = name;
    }
    positionSprite(position) {
        getById(this.id).style.backgroundPosition = `${position}%`;
    }
    positionFighterToAttack(){
        getById(this.id).classList.add(oopClassList.attack);
    }
    directHit(){
        getById(getAttackedFighter(this.id)).classList.add(oopClassList.fighterHit);
    }
    animateHitMiss(){
        getById(getAttackedFighter(this.id)).classList.add(oopClassList.miss);
    }
    retreatFighter(){
        setTimeout(() => {
            this.positionSprite(this.id, 0);
            getById(this.id).classList.remove(oopClassList.attack);
            getById(getAttackedFighter(this.id)).classList.remove(oopClassList.fighterHit);
            getById(getAttackedFighter(this.id)).classList.remove(oopClassList.miss);
        }, getRetreatDelay(this));
    }
    animateAtk = () => {
        this.positionFighterToAttack();
        let accShift = shift;
        for (let i = 0; i < this.spriteShifts; i++) {
            setTimeout(() => {
                this.positionSprite(accShift);
                accShift += shift;
            }, getSpriteDelay(this.timeOut, i + 1 ));
        }
        setTimeout(() => {
            this.directHit();
        }, 300);
    }
    animateMiss = () => {
        this.positionFighterToAttack();
        let accShift = shift;
        for (let i = 0; i < this.spriteShifts; i++) {
            setTimeout(() => {
                this.positionSprite(accShift);
                accShift += shift;
            }, getSpriteDelay(this.timeOut, i + 1 ));
        }
        setTimeout(() => {
            this.animateHitMiss();
        }, 300);
    }
}

const startBattle = () => {
    const fightOneStats = getFightStats(true);
    const fightTwoStats = getFightStats(false);
    const fighter = new Fighter(
        fighterOne,
        "fighterOneHp",
        fightOneStats.atk,
        fightOneStats.def,
        fightOneStats.spd,
        "player one"
    );
    const fighter2 = new Fighter(
        fighterTwo,
        "fighterTwoHp",
        fightTwoStats.atk,
        fightTwoStats.def,
        fightTwoStats.spd,
        "player two"
    );
    const battle = new BattleField(fighter, fighter2);
    battle.fight(fighter, fighter2);
}