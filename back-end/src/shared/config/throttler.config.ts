import { ConfigService } from '@nestjs/config';
import { ThrottlerOptions } from '@nestjs/throttler';
import { THROTTLE_LIMIT_ENV, THROTTLE_TTL_ENV } from '../constants';

export function getThrottlerConfig(
  configService: ConfigService,
): ThrottlerOptions[] {
  return [
    {
      ttl: configService.getOrThrow<number>(THROTTLE_TTL_ENV),
      limit: configService.getOrThrow<number>(THROTTLE_LIMIT_ENV),
    },
  ];
}
