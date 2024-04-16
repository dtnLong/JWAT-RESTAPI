import { IsNumberString, IsPositive } from 'class-validator';

export class IdParam {
  @IsNumberString({}, { message: "Id must be a number!" })
  @IsPositive({ message: "Id must be a positive number!" })
  id: number;
}
