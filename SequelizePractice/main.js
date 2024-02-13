const { Sequelize, DataTypes } = require("sequelize");

//Configuring the connection to the database
//Schema, User, password, object with the configuration
const sequelize = new Sequelize("{TableName}", "{UserName}", "{PasswordName}", {
    host: "localhost",
    dialect: "mysql", //Type of database (postgres, mysql, mariadb, sqlite, mssql)
});

main();

//Autoexcect method
async function main() {
    //Defining the models
    //Model name, fields, options
    const usuario = sequelize.define("Usuario", {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    const pedido = sequelize.define("Pedido", {
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        precio: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    //Defining the relationships
    //One to many relationship
    usuario.hasMany(pedido);
    pedido.belongsTo(usuario);

    //Synchronizing the models with the database
    await sequelize
        .sync()
        .then(() => {
            console.log("All models were synchronized successfully.");
        })
        .catch((error) => {
            console.error(
                "An error occurred while synchronizing the models:",
                error
            );
        });

    try {
        console.log(
            "----------------------------Creating users----------------------------"
        );
        const usuario1 = await usuario.create({
            nombre: "Carlos",
            apellido: "Santana",
        });
        const usuario2 = await usuario.create({
            nombre: "Miguel",
            apellido: "Garza",
        });
        const usuario3 = await usuario.create({
            nombre: "Valeria",
            apellido: "Aguilar",
        });
        const listaUsuarios = (array = [usuario1, usuario2, usuario3]);
        listaUsuarios.forEach((user) => {
            console.log(user.toJSON());
        });

        console.log(
            "----------------------------Creating orders----------------------------"
        );
        const pedido1 = await pedido.create({
            descripcion: "TERRENEITOR",
            cantidad: 1,
            precio: 1000,
            estado: "En espera",
        });

        const pedido2 = await pedido.create({
            descripcion: "XBOX",
            cantidad: 2,
            precio: 5000,
            estado: "En espera",
        });

        const pedido3 = await pedido.create({
            descripcion: "laptop",
            cantidad: 1,
            precio: 8000,
            estado: "En espera",
        });

        const listaPedidos = (array = [pedido1, pedido2, pedido3]);
        listaPedidos.forEach((order) => {
            console.log(order.toJSON());
        });

        console.log(
            "----------------------------Associating orders with users----------------------------"
        );
        await usuario1
            .addPedido(pedido1)
            .then((result) => {
                console.log(result.toJSON());
            })
            .catch((error) => {
                console.log(error);
            });
        await usuario2
            .addPedido(pedido2)
            .then((result) => {
                console.log(result.toJSON());
            })
            .catch((error) => {
                console.log(error);
            });

        console.log(
            "----------------------------Associating orders by users ID----------------------------"
        );
        //Consult the id of the user, this could happen if you do not have the user instance
        const usuarioID = await usuario.findByPk(3);
        //Validate if the user exists
        if (!usuarioID) {
            console.log("User not found");
            return;
        }
        //Associate the order with the user
        await usuarioID
            .addPedido(pedido3)
            .then((result) => {
                console.log(result.toJSON());
            })
            .catch((error) => {
                console.log(error);
            });

        console.log(
            "----------------------------Consulting users with orders----------------------------"
        );
        const usersOrders = await usuario
            .findAll({
                //Inculde the orders(object)
                include: pedido,
            })
            .then((result) => {
                console.log(result.map((user) => user.toJSON()));
            })
            .catch((error) => {
                console.log(error);
            });

        console.log(
            "----------------------------Updating user----------------------------"
        );
        const usuarioToUpdate = await usuario.findByPk(1);
        console.log(usuarioToUpdate.toJSON());
        await usuarioToUpdate.update({ nombre: "Alberto" });
        console.log(usuarioToUpdate.toJSON());

        console.log(
            "----------------------------Deleting order----------------------------"
        );
        const orderToDelete = await pedido.findByPk(3);
        console.log(orderToDelete.toJSON());
        await orderToDelete
            .destroy()
            .then((result) => {
                console.log(result.toJSON());
            })
            .catch((error) => {
                console.log(error);
            });

        console.log(
            "----------------------------Update user with where----------------------------"
        );
        /**
        const userToUpdate = await usuario.update(
            { nombre: "Carlos" },
            {
                where: {
                    id: 1,
                },
            }
        ); 
        */

        const updateId = 3;
        const userToUpdate = {
            nombre: "Mario",
            apellido: "Armenta",
        };
        const userUpdated = await usuario.update(userToUpdate, {
            where: {
                id: updateId,
            },
        });
        console.log(userUpdated);

        console.log(
            "----------------------------Deleting user with where----------------------------"
        );
        const deleteId = 3;
        const userToDelete = await usuario.destroy({
            where: {
                id: deleteId,
            },
        });

        //Testing the connection
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
