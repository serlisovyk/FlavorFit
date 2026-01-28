import { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { isDev } from '../utils';
import { GraphQLContext } from '../types';

export function getGraphQLConfig(
  configService: ConfigService,
): ApolloDriverConfig {
  return {
    autoSchemaFile: true,
    sortSchema: true,
    playground: isDev(configService),
    context: ({ req, res }: GraphQLContext): GraphQLContext => ({ req, res }),
  };
}
