import { Muta , Resolver } from "type-graphql";

@Resolver()
export class HelloResolver {
    @Query(_returns => String)
    hello() {
        return 'hello word'
    }
}
