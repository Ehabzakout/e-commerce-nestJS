import { PartialType } from '@nestjs/mapped-types';
import { AddToCartDtO } from './create-cart.dto';

export class UpdateCartDto extends PartialType(AddToCartDtO) {}
