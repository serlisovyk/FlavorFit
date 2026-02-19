import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { UserModel } from './models/user.model'
import { UserUpdateInput } from './inputs/user-update.input'
import { UsersService } from './users.service'

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserModel, {
    name: 'profile',
    description: 'Get current user profile',
  })
  @Auth()
  getProfile(@CurrentUser('id') id: string) {
    return this.usersService.findById(id)
  }

  @Mutation(() => UserModel, {
    description: 'Update current user profile',
  })
  @Auth()
  updateProfile(
    @CurrentUser('id') id: string,
    @Args('data') input: UserUpdateInput,
  ) {
    return this.usersService.updateProfile(id, input)
  }
}
