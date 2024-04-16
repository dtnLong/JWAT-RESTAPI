import { IsNumberString } from 'class-validator';

export class IdParam {
  @IsNumberString({ no_symbols: true }, { message: "Invalid order Id!" })
  id: number;
}
