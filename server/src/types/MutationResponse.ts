

import { Field, InterfaceType } from "type-graphql";

@InterfaceType()
export  abstract class IMutationResponse{
    @Field()
    code: Number

    @Field()
    success: boolean

    @Field({nullable: true})
    message?: string

}