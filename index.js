#! /usr/bin/env node
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
};
async function welcome() {
    let rainbowTitle = chalkAnimation.neon("lets start Welcome to Ariba Adventure Game");
    await sleep();
    rainbowTitle.stop();
    // console.log(`${rainbowTitle} is fine`)
}
await welcome();
let getRandomNumber = (minimum, maximum) => {
    let temp = 0;
    temp = Math.floor(Math.random() * (maximum - minimum)) + minimum;
    return temp;
};
async function AdventureGame() {
    let menueResponse;
    const NameQues = { name: "NameInput", type: 'input' };
    const MenuQues = { name: 'menuInput', type: 'list', choices: ['Play', 'Exit'] };
    const WarQues = { name: 'WarInput', type: 'list', choices: ['Attack', 'Defend', 'Heal', 'Run'] };
    let Questions = [NameQues, MenuQues, WarQues];
    const EnemyAttack = 20;
    let enemyAttack;
    const EnemyHealth = 75;
    let enemyHealth;
    const playerMaxAttack = 50;
    let playerHealth;
    const playerMaxHealth = 100;
    let scorePoints = 0;
    let healingPotions = 3;
    const healingPotionEffect = 30;
    let potionDropChance = 50;
    const enemyList = ['MQM', 'PPP', 'PMNL', 'Punjab league'];
    let playerName;
    let currentEnemy;
    playerName = String((await inquirer.prompt(Questions[0])).NameInput);
    console.log(playerName);
    do {
        menueResponse = String((await inquirer.prompt(Questions[1])).menuInput);
        if (menueResponse === 'Play') {
            let firstRun = true;
            let battleResponse;
            currentEnemy = enemyList[getRandomNumber(0, 4)];
            playerHealth = playerMaxHealth;
            enemyHealth = getRandomNumber(0, EnemyHealth);
            enemyAttack = getRandomNumber(0, EnemyAttack);
            console.log(`\n--------------------------------------------------------------------\n`);
            console.log(`\t\t # ${currentEnemy} has appeared #\n`);
            console.log(`\t\t Attack : ${enemyAttack}, Health : ${enemyHealth} \n`);
            while (enemyHealth > 0 && playerHealth > 0) {
                do {
                    battleResponse = String((await inquirer.prompt(Questions[2])).battleInput);
                    firstRun = false;
                    switch (battleResponse) {
                        case 'Attack': {
                            let playerAttack = getRandomNumber(0, playerMaxAttack);
                            enemyHealth -= playerAttack;
                            playerHealth -= enemyAttack;
                            console.log(`\nYou did ${playerAttack} damage, enemy health : ${enemyHealth}\n`);
                            console.log(`Enemy did ${enemyAttack} damage, your health : ${playerHealth}\n`);
                            break;
                        }
                        case 'Defend': {
                            let nerfedEnemyAttack = getRandomNumber(0, enemyAttack);
                            playerHealth -= nerfedEnemyAttack;
                            if (nerfedEnemyAttack === 0) {
                                console.log("Enemy attack nullified\n");
                            }
                            else if (nerfedEnemyAttack < enemyAttack) {
                                console.log(`\nEnemy attack, reduced by : ${enemyAttack - nerfedEnemyAttack}\n`);
                                console.log(`Your received, ${nerfedEnemyAttack} damaged, Health : ${playerHealth}\n`);
                            }
                            else {
                                console.log("Defense failed\n");
                            }
                            break;
                        }
                        case 'Heal': {
                            if (healingPotions > 0) {
                                if (playerHealth > 70) {
                                    playerHealth = 100;
                                }
                                else {
                                    playerHealth += healingPotionEffect;
                                }
                                healingPotions--;
                                console.log(`Healing potion used,health +${healingPotionEffect}, remaining:${healingPotions}\n`);
                            }
                            else {
                                console.log("No healing potions\n");
                            }
                            break;
                        }
                        case 'Run': {
                            console.log(`\n\t ^_^ ${currentEnemy} gave you a run for your money ^_^\n`);
                            enemyHealth = 0;
                            break;
                        }
                    }
                    if (enemyHealth <= 0 && battleResponse != 'Run') {
                        console.log(`\t --> You defeated ${currentEnemy}, mubarak ho,your score :${scorePoints += 10} <--\n`);
                        let dropChance = getRandomNumber(0, 100);
                        if (dropChance > potionDropChance) {
                            console.log(`\t\tEnemy dropped a potion,potions +1\n`);
                            healingPotions++;
                        }
                        break;
                    }
                    if (playerHealth <= 0) {
                        console.log(`Your health is${playerHealth}, you lost\n`);
                        break;
                    }
                } while (battleResponse != 'Run');
            }
        }
    } while (menueResponse != 'Exit');
    console.log(`Your score, ${scorePoints}\n`);
}
AdventureGame();
