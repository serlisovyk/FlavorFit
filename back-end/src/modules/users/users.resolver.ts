import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  User,
  type UserUpdateInput,
} from '../../../prisma/generated/models/user';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'profile' })
  @Auth()
  getProfile(@CurrentUser('id') id: string) {
    return this.usersService.findById(id);
  }

  @Mutation(() => User)
  @Auth()
  updateProfile(@CurrentUser('id') id: string, @Args() input: UserUpdateInput) {
    return this.usersService.updateProfile(id, input);
  }
}
