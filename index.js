import { fifaData } from './fifa.js';
console.log(fifaData);

console.log('its working');

// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data*/

//(a) Home Team name for 2014 world cup final
let worldCupFinal2014 = fifaData.filter(element => element["Stage"] === "Final" && element["Year"] === 2014);

console.log(worldCupFinal2014);

console.log(worldCupFinal2014[0]["Home Team Name"]);

//(b) Away Team name for 2014 world cup final
console.log(worldCupFinal2014[0]["Away Team Name"]);

//(c) Home Team goals for 2014 world cup final
console.log(worldCupFinal2014[0]["Home Team Goals"]);

//(d) Away Team goals for 2014 world cup final
console.log(worldCupFinal2014[0]["Away Team Goals"]);

//(e) Winner of 2014 world cup final
let worldCupWinner = function (array) {
    let winner = "";
    array.forEach(function(element){
        if (element["Home Team Goals"] > element["Away Team Goals"]) {
            winner = element["Home Team Name"];
        } else if (element["Away Team Goals"] > element["Home Team Goals"]) {
            winner = element["Away Team Name"]
        } else if (element["Home Team Goals"] === element["Away Team Goals"]){
            winner = "Tie";
        }
    });
    return winner
} 

console.log(worldCupWinner(worldCupFinal2014));

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(data) {

    return data.filter((element) => element["Stage"] === "Final");

};

console.log(getFinals(fifaData));

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(callback) {

    return callback.map(element => element["Year"]);

}

console.log(getYears(getFinals(fifaData)));

/* Task 4: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

///USING forEach
// function getWinners(callback) {
//     let winners = [];
//     callback.forEach(function(element){
//         if (element["Home Team Goals"] > element["Away Team Goals"]) {
//             winners.push(element["Home Team Name"]);
//         } else if (element["Away Team Goals"] > element["Home Team Goals"]) {
//             winners.push(element["Away Team Name"]);
//         } else if (element["Home Team Goals"] === element["Away Team Goals"]) {
//             if (element["Win conditions"].includes(element["Home Team Name"])) {
//                 winners.push(element["Home Team Name"])
//             } else if (element["Win conditions"].includes(element["Away Team Name"])) {
//                 winners.push(element["Away Team Name"])
//             }
//         }
//     });
//     return winners
// };

//USING .map
function getWinners(callback) {
    return callback.map(function(element){
        if (element["Home Team Goals"] > element["Away Team Goals"]) {
            return element["Home Team Name"];
        } else if (element["Away Team Goals"] > element["Home Team Goals"]) {
            return element["Away Team Name"];
        } else if (element["Home Team Goals"] === element["Away Team Goals"]) {
            if (element["Win conditions"].includes(element["Home Team Name"])) {
                return element["Home Team Name"];
            } else if (element["Win conditions"].includes(element["Away Team Name"])) {
                return element["Away Team Name"];
            }
        }
    });
};

console.log(getWinners(getFinals(fifaData)));

/* Task 5: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(callback1, callback2, callback3, data) {
    let years = callback1(callback3(data));
    let winners = callback2(callback3(data));
    let winnersByYear = winners.map((element, index) => `In ${years[index]}, ${element} won the world cup!`);
    return winnersByYear;
};

console.log(getWinnersByYear(getYears, getWinners, getFinals, fifaData));

/* Task 6: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {
    let averageGoals = data.reduce(function(accumulator, element) {
        accumulator["Home"] = accumulator["Home"] + element["Home Team Goals"];
        accumulator["Away"] = accumulator["Away"] + element["Away Team Goals"];
        return accumulator;
    }, {Home: 0, Away: 0});
    averageGoals.Home /= data.length;
    averageGoals.Away /= data.length;
    return averageGoals; 
};

console.log(getAverageGoals(fifaData));

// (accumulator["Home"] + element["Home Team Goals"]) / data.length;
//     (accumulator["Away"] + element["Away Team Goals"]) / data.length;

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

// function getCountryWins(callback, data, initials) {
//     let finalsData = callback(data);
//     let counter = 0;
//     finalsData.forEach(function(element){
//         if ()
//     });
// };

// getCountryWins();


/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

// function getGoals(/* code here */) {

//     /* code here */

// };

// getGoals();


/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

// function badDefense(/* code here */) {

//     /* code here */

// };

// badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
