const input = require('sync-input')

// I have added new coffee to the coffee types

let exitStatus = false;
let supplies = {water: 400, milk: 540, beans: 120, cups: 9, money: 550};
const nameOfSupplies = {water: 'water', milk: 'milk', beans: 'coffee beans', cups: 'disposable cups', money: 'money'};
const coffee = {espresso: {water: 250, milk: 0, beans: 16, cups: 1, money: -4},
    latte: {water: 350, milk: 75, beans: 20, cups: 1, money: -7},
    cappuccino: {water: 200, milk: 100, beans: 12, cups: 1, money: -6},
    filter: {water: 250, milk: 0, beans: 20, cups: 1, money: -5}};

function writeStatus() {
    console.log("\nThe coffee machine has:");
    console.log(`${supplies.water} ml of water`);
    console.log(`${supplies.milk} ml of milk`);
    console.log(`${supplies.beans} g of coffee beans`);
    console.log(`${supplies.cups} disposable cups`);
    console.log(`$${supplies.money} of money`);
}

function checkSupplies(nameOfCoffee) {
    let isEnough = true;
    for (let key in supplies) {
        if (supplies[key] < coffee[nameOfCoffee][key]) {
            isEnough &= false;
            console.log(`Sorry, not enough ${nameOfSupplies[key]}!`);
        }
    }
    return isEnough;
}

function createCoffee(nameOfCoffee) {
    let isEnough = checkSupplies(nameOfCoffee);
    if (isEnough) {
        console.log("I have enough resources, making you a coffee!");
        for (let key in supplies) {
            supplies[key] -= coffee[nameOfCoffee][key];
        }
    }
}

function buyCoffee() {
    console.log("\nWhat do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, 4 - filter, back - to main menu:");
    let typeOfCoffee = input();
    switch (typeOfCoffee) {
        case '1':
            createCoffee('espresso');
            break;
        case '2':
            createCoffee('latte');
            break;
        case '3':
            createCoffee('cappuccino');
            break;
        case '4':
            createCoffee('filter');
            break;
        case 'back':
            break;
    }
}

function takeMoney() {
    console.log(`\nI gave you $${supplies.money}\n`);
    supplies.money = 0;
}

function fill() {
    console.log("\nWrite how many ml of water do you want to add:");
    supplies.water += Number(input());
    console.log("Write how many ml of milk do you want to add:");
    supplies.milk += Number(input());
    console.log("Write how many grams of coffee beans do you want to add:");
    supplies.beans += Number(input());
    console.log("Write how many disposable cups of coffee do you want to add:");
    supplies.cups += Number(input());
}

function menu() {
    console.log("\nWrite action (buy, fill, take, remaining, exit):");
    let action = input();
    switch (action) {
        case 'buy':
            buyCoffee();
            break;
        case 'fill':
            fill();
            break;
        case 'take':
            takeMoney();
            break;
        case 'remaining':
            writeStatus();
            break;
        case 'exit':
            exitStatus = true;
            break;
    }
}

while (!exitStatus) {
    menu();
}