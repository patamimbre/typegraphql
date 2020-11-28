import { hash } from "argon2";
import { User } from "../../entity/User";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { RegisterInput } from "./Register/RegisterInput";

@Resolver(User)
export class RegisterResolver {
    @Query(() => String)
    async hello() {
        return await "Hello world";
    }

    @Mutation(() => User)
    async register(
        @Arg("data") { firstName, lastName, email, password }: RegisterInput,
    ): Promise<User> {
        const hashedPassword = await hash(password);

        const args = { firstName, lastName, email, password: hashedPassword };
        const user = await User.create(args).save()
        return user
    }
}