import { User } from "./accounts/entity/User"
import { AppDataSource } from "./data-source"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.name = "Timber"
    user.email = "Saw"
    user.password = "sdasad"
    user.phone = 57574564
    user.address = "rua sebastião"
    user.avatar = "trick"
    user.created_at = new Date()
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
