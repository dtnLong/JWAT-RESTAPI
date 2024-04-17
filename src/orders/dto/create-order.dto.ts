import { IsNotEmpty, IsNumber, IsIn, Min } from "class-validator";
import { ORDER_PAYMENT_TYPE_ARR } from "src/common/constants";

export class CreateOrderDto {
    @IsNumber({}, { message: "Invalid customer Id!" })
    @Min(1, { message: "Invalid customer Id!" })
    @IsNotEmpty({ message: "Invalid customer Id!" })
    customerId: number;

    @IsIn(ORDER_PAYMENT_TYPE_ARR, { message: "Invalid payment type!"})
    @IsNotEmpty({ message: "Invalid payment type!" })
    paymentType: string;

    @IsNumber({}, { message: "Invalid total amount!" })
    @Min(0, { message: "Invalid total amount!" })
    total: number;
}