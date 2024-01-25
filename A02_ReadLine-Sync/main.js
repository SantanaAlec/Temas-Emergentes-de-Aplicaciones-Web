const readline = require("readline-sync");

main();

async function main() {
    let max = 0;
    let total = 0;

    while (true) {
        let num = readline.question("Enter a positive integer (or 0 to end): ");

        num = parseFloat(num);

        //Float condition
        if (!Number.isInteger(num)) {
            console.log("Invalid input. Please try again.");
            continue;
        }

        if (num === 0) {
            break;
        }

        if (num > max) {
            max = num;
            total = 1;
        } else if (num === max) {
            total++;
        }
    }

    console.log(`Maximum value is ${max} and it appears ${total} times.`);
}
