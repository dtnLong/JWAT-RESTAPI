import { IsIn, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { ORDER_PAYMENT_TYPE_ARR, ORDER_STATUS_ARR } from 'src/common/constants';

export class UpdateOrderDto {
    @IsNumber({}, { message: "Invalid customer Id!" })
    @Min(1, { message: "Invalid customer Id!" })
    @IsOptional()
    customerId?: number;

    @IsIn(ORDER_PAYMENT_TYPE_ARR, { message: "Invalid payment type!"})
    @IsString({ message: "Invalid payment type!"})
    @IsOptional()
    paymentType?: string;

    @IsIn(ORDER_STATUS_ARR, { message: "Invalid order status!"})
    @IsString({ message: "Invalid order status!"})
    @IsOptional()
    status?: string;

    @IsNumber({}, { message: "Invalid total amount!" })
    @Min(0, { message: "Invalid total amount!" })
    @IsOptional()
    total?: number;
}
