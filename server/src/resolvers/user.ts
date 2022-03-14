import { User } from "../entities/User";
import { Arg, Mutation, Resolver } from "type-graphql";
import * as argon2 from "argon2";
import { UserMutationResponse } from "../types/UserMutationResponse";
import { RegisterInput } from "../types/RegisterInput";
import { validateRegisterInput } from "../utils/validateRegisterInput";
import { LoginInput } from "../types/LoginInput";

@Resolver()
export class UserResolver {
  @Mutation((_returns) => UserMutationResponse)
  async register(
    @Arg("registerInput") registerInput : RegisterInput,
  ) : Promise<UserMutationResponse> {

    const validateRegisterInputErrors = validateRegisterInput(registerInput)
    if(validateRegisterInputErrors !== null)
      return { code: 400, success: false, ...validateRegisterInputErrors}

    try {
      const {username , email, password} = registerInput
      const existingUser = await User.findOne({
          where: [{username}, {email}]
      });
      if (existingUser) 
      return {
        code: 400,
        success: false,
        message: 'Duplcated username or email',
        error: [
          {field: existingUser.username === username ? 'username' : 'email',
        message: `${existingUser.username === username ? 'usernam' : 'email'} already taken `}
        ]
      };

      const hashedPassword = await argon2.hash(password);

      const newUser = User.create({
        username,
        password: hashedPassword,
        email,
      });

      return {
        code: 200,
        success: true,
        message: 'Username registration successful',
        user:  await User.save(newUser)
      }

      


    } catch (error) {
      console.log(error);
      return {
        code: 500,
        success: false,
        message: `Internol server error ${error.message}`,
    
          
      };
      
    }
  }

  @Mutation(_return => UserMutationResponse)
  async login(@Arg('loginInput') {usernameOrEmail, password} : LoginInput) : Promise<UserMutationResponse> {
    try {
      const existingUser = await User.findOne(usernameOrEmail.includes('@') 
      ? {email: usernameOrEmail}
      : {username: usernameOrEmail}
    )
    
    if(!existingUser) 
    return {
      code: 400,
      success: false,
      message: 'User or emailnot found',
      error: [{field: usernameOrEmail, message: 'username or email incorrect'}]
    }

    const passwordValid = await argon2.verify(existingUser.password, password)  
    if(!passwordValid) {
      return {
        code: 400,
        success: false,
        message: 'Password is wrong',
        error: [{ field: password, message: 'wrong password'}]
      }
    }

    return { code: 200, success: true, message: 'Logged in successfully', user: existingUser}
    } catch (error) {
      console.log(error);
      return {
        code: 500,
        success: false,
        message: `Internol server error ${error.message}`,        
      };
      
    }
    
  }
}
