const { Sequelize, DataTypes } = require("sequelize");
const readline = require("readline-sync");
const jwt = require("jsonwebtoken");

let User;

main();

async function main() {
    await initDatabase();

    let userData = await askUserData();
    console.log(userData);

    await registerUser(userData.username, userData.password, userData.type);

    let loginData = await askLoginData();
    console.log(loginData);

    let token = await login(loginData.username, loginData.password);
    console.log(token);

    showPermissions(token);
}

async function initDatabase() {
    const sequelize = new Sequelize("sqlite::memory:");

    User = sequelize.define("User", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        type: DataTypes.INTEGER,
    });

    await sequelize.sync();
}

async function askUserData() {
    const username = readline.question("Username: ");
    const password = readline.question("Password: ");
    const type = readline.question("Type (1.Casual, 2.Special): ");
    return { username, password, type };
}

async function registerUser(username, password, type) {
    await User.create({
        username: username,
        password: password,
        type: type,
    });
}

async function createTokenJWT(username) {
    var token = await jwt.sign({ username: username }, "DatesSecret");
    return token;
}

async function login(username, password) {
    let user = await User.findOne({
        where: {
            username: username,
            password: password,
        },
    });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    let token = await createTokenJWT(username);

    return token;
}

async function askLoginData() {
    const username = readline.question("Username: ");
    const password = readline.question("Password: ");
    return { username, password };
}

async function showPermissions(token) {
    let decoded = await jwt.verify(token, "DatesSecret");
    let user = await User.findOne({
        where: {
            username: decoded.username,
        },
    });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    switch (user.type) {
        case 1:
            getDay().then((day) => console.log(day));
            break;
        case 2:
            sum(Number(readline.question("num1: ")), Number(readline.question("num2: "))).then(
                (result) => console.log(result)
            );
            break;
        default:
            console.log("Invalid type");
    }
}

async function getDay() {
    return new Date().getDate();
}

async function sum(a, b) {
    return a + b;
}