import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export function SwaggerHeaderDecorator() {
  return applyDecorators(
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer JWT ',
    }),
  );
}
