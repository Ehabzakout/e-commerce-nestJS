import { IsMongoId } from 'class-validator';

export class ParamDTO {
  @IsMongoId()
  id: string;
}
