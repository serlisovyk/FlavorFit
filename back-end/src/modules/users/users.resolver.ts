import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserModel } from './models/user.model';
import { UserUpdateInput } from './inputs/user-update.input';
import { UsersService } from './users.service';
import {
  GET_PROFILE_QUERY_DESCRIPTION,
  UPDATE_PROFILE_MUTATION_DESCRIPTION,
} from './users.constants';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserModel, {
    name: 'profile',
    description: GET_PROFILE_QUERY_DESCRIPTION,
  })
  @Auth()
  getProfile(@CurrentUser('id') id: string) {
    return this.usersService.findById(id);
  }

  @Mutation(() => UserModel, {
    description: UPDATE_PROFILE_MUTATION_DESCRIPTION,
  })
  @Auth()
  updateProfile(
    @CurrentUser('id') id: string,
    @Args('data') input: UserUpdateInput,
  ) {
    return this.usersService.updateProfile(id, input);
  }
}
