/**
 *
 * Investigar el patrón promesa
 * 
 **/

const funcionConCallback = (x, y, callback) => {
    const resultado = x + y;

    return setTimeout(() => {
        callback(resultado);
    }, 1000);
};

funcionConCallback(5, 10, (resultado) => {
    console.log("Callback: ", resultado);
});
//(\)
console.log("Fin del callback");

const funcionConPromesa = (x, y) => {
    const resultado = x + y;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(resultado);
        }, 2000);
    });
};

funcionConPromesa(10, 10).then((resultado) => {
    console.log("Promesa: ", resultado);
    //Funcion a ejecutar cuando se resuelva la promesa
    console.log("Ejecutando función raíz de resolución de la promesa");
});

console.log("Fin de la promesa");

const funcionConPromesaThen = (x, y) => {
    const resultado = x + y;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(resultado);
        }, 3000);
    });
};

async function main() {
    await funcionConPromesaThen(2, 23)
        .then((resultado) => {
            console.log("Promesa con then: ", resultado);
            console.log("Ejecutando función raíz de resolución de la promesa");
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(resultado / 5);
                }, 2000);
            });
        })
        .then((resultado) => {
            console.log("Promesa con then dividido: ", resultado);
            //.catch sirve para manejar el reject de la promesa
        })
        .catch((reject) => {
            console.log("Error: ", reject);
        });

    await console.log("Fin de la promesa con then");
}

main();

async function main2() {
    await funcionConPromesa(10, 87).then((resultado) => {
        console.log("Promesa: ", resultado);
    });
}

main2();

const funcionConPromesaDividir = (x, y) => {
    return new Promise((resolve, reject) => {
        if (y === 0) {
            reject("No se puede dividir entre 0");
        }
        const resultado = x / y;
        setTimeout(() => {
            resolve(resultado);
        }, 2000);
    });
};

funcionConPromesaDividir(10, 0)
    .then((resultado) => {
        console.log("Promesa División: ", resultado);
    })
    .catch((reject) => {
        console.log("Error: ", reject);
    });
