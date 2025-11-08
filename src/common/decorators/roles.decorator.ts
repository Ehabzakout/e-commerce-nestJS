import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<string[]>();

export const Public = () => SetMetadata('PUBLIC', true);
