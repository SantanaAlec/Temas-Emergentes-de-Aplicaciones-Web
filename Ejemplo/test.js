const Readline = require('readline-sync');

main();

async function main() {
    let text = Readline.question("Text: ");
    let word = Readline.question("Word: ");
    let newWord = Readline.question("New word: ");

    let newText = await replaceWord(word, newWord, text);
    console.log(newText);
}

async function replaceWord(word, newWord, text) {
    
    return text.replace(word, newWord);
}