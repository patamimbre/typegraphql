import { verify } from "argon2";
import { User } from "../../entity/User";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { MyContext } from "../types/MyContext";

@Resolver(User)
export class LoginResolver {
    @Mutation(() => User, { nullable: true })
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() ctx: MyContext,
    ): Promise<User | null> {
        const user = await User.findOne({ where: { email }});

        if (!user) return null;
        
        const valid = await verify(user.password, password);

        if (!valid) return null;

        ctx.req.session.userId = user.id;

        return user;
    }
}