
import { User } from "src/entities/User";
import { Mutation , Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
    @Mutation(_returns => User)
    hello() {
        return 'hello word'
    }
}
