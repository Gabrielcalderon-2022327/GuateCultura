import { Payment } from "../models/Payment";
import { PaymentStatus } from "../models/enums/PaymentStatus";
import {validateRequiredFields,validateEnum,validatePositiveNumber} from "./validators";
import { getUserById } from "../services/userService";

const requiredPaymentFields: (keyof Payment)[] = [
    "amount", "status", "FK_user_id"
];

export async function validatePayment(payment: Payment): Promise<void> {
    validateRequiredFields(payment, requiredPaymentFields);
    validatePositiveNumber(payment.amount, "amount");
    validateEnum(payment.status, PaymentStatus, "status");
    if (payment.FK_user_id !== null && payment.FK_user_id !== undefined) {
        await getUserById(payment.FK_user_id);
    }
}