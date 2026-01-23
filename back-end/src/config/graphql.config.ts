import { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { MODE_ENV } from '../constants';
import { GraphQLContext, MODE } from '../types';

export function getGraphQLConfig(
  configService: ConfigService,
): ApolloDriverConfig {
  return {
    autoSchemaFile: true,
    sortSchema: true,
    playground: configService.get<string>(MODE_ENV) === MODE.DEVELOPMENT,
    context: ({ req, res }: GraphQLContext): GraphQLContext => ({ req, res }),
  };
}
