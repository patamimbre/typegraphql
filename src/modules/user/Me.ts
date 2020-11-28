import { User } from "../../entity/User";
import { Ctx, Query, Resolver } from "type-graphql";
import { MyContext } from "../types/MyContext";

@Resolver(User)
export class MeResolver {
    @Query(() => User, { nullable: true })
    async me(
        @Ctx() ctx: MyContext,
    ): Promise<User | null> {
        const { userId } = ctx.req.session!

        if (!userId) return null;
        return await User.findOne( userId ) || null;
    }
}