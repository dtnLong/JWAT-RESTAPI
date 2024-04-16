import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    customerId: number;

    @IsString()
    @IsNotEmpty()
    paymentType: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsNumber()
    total: number;
}
