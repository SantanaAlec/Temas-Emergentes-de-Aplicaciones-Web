//Es una función que se puede pasar como argumento a otra función y
//que se ejecuta despues de que se haya completado alguna operación
//Asíncrona.

//Ejemplo de callback
//El callback es la función que se pasa como argumento al final siempre
function modify(array, callback) {
    //Hacemos algo
    array.push("Alec");
    //Ejecutamos nuestro callback simulanndo con un
    //tiempo de espera de 2 segundos
    setTimeout(() => {
        const elm = array.find((elm) => {
            elm === "Sam";
        });

        callback(array);
    }, 2000);
}

const names = ["Leo", "Abraham", "Sam"];

//Se ejecuta primero el parametro de la función console.log y luego el callback
modify(names, (array) => console.log("Modificando el array", array));

console.log(
    "Esto se ejecuta despues del modify sin importar si el callback se ejecutó o no"
);

/**
 * Temporizador con callback
 * Crea una funcion que muestre un mensaje despues de esperar 3 segundos
 * utilizando setTimeout y un callback
 */

function showMessage(callback) {
    setTimeout(() => {
        callback("Mensaje mostrado después de 3 segundos");
    }, 3000);
}

showMessage((message) => {
    console.log(message);
});

/**
 * Operaciones Matemáticas con Callback:
 * Crea una función que realice una operación matemática
 * (suma, resta, multiplicación, división) utilizando dos números
 * y un callback para mostrar el resultado.
 */

function operate(x, y, operation, callback) {
    let result;

    //check if the numbers are valid
    if (isNaN(x) || isNaN(y)) {
        return callback("The numbers are not valid");
    }

    switch (operation) {
        case "add":
            result = x + y;
            break;
        case "substract":
            result = x - y;
            break;
        case "multiply":
            result = x * y;
            break;
        case "divide":
            result = x / y;
            break;
        default:
            result = "Operation not found";
            break;
    }

    callback(result);
}

operate(500, 6345, "add", (result) => {
    console.log("Result = ", result);
});

operate(45, 6345, "substract", (result) => {
    console.log("Result = ", result);
});

operate(65, 12, "multiply", (result) => {
    console.log("Result = ", result);
});

operate(500, 799, "divide", (result) => {
    console.log("Result = ", result);
});

/**
 * Preparación de una Receta
 * Define tres funciones: cortarIngredientes, cocinar y servirPlato.
 * En la función cortarIngredientes, simula el corte de ingredientes. 
 * Utiliza setTimeout para simular el tiempo que tomaría cortar los ingredientes. 
 * Luego, llama al callback que se pasa como argumento.
 */

function cortarIngredientes(ingredientes, callback) {
    setTimeout(() => {
        console.log(`Ingredientes cortados: ${ingredientes}`);
        callback();
    }, 1000);
}

function cocinar(accion, callback) {
    setTimeout(() => {
        console.log(`Ingredientes cocinados: ${accion}`);
        callback();
    }, 1500);
}

function servirPlato(plato) {
    console.log(`Plato servido bon appetit: ${plato}`);
}

function prepararReceta(plato, callback) {
    console.log(`Comenzando preparación: ${plato}`);

    cortarIngredientes("Carne de cerdo", () => {
        cocinar("Ahumando", () => {
            cortarIngredientes("Cebolla", () => {
                cocinar("Freir", () => {
                    cortarIngredientes("Tomate", () => {
                        cocinar("Licuar", () => {
                            servirPlato(plato);
                            callback();
                        });
                    });
                });
            });
        });
    });
}

prepararReceta("Tacos de Chicharrón", () => {
    console.log("Receta terminada");
});