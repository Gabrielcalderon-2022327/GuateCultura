import { Tip } from "../models/Tip";
import { PaymentStatus } from "../models/enums/PaymentStatus";
import { ValidationException } from "../exceptions/validationException";
import {validateRequiredFields,validatePositiveNumber} from "./validators";
import { getCreatorById } from "../services/creatorService";
import { getPaymentById } from "../services/paymentService";

const requiredTipFields: (keyof Tip)[] = [
    "amount", "FK_creator_id", "FK_payment_id"
];

export async function validateTip(tip: Tip): Promise<void> {
    validateRequiredFields(tip, requiredTipFields);
    validatePositiveNumber(tip.amount, "amount");

    // FKs EXISTENTES
    await getCreatorById(tip.FK_creator_id);
    const payment = await getPaymentById(tip.FK_payment_id);

    // El monto del tip debe coincidir con el del pago
    if (Number(tip.amount) !== Number(payment.amount)) {
        throw new ValidationException(`El monto del tip (${tip.amount}) no coincide con el del pago asociado (${payment.amount})`);
    }

    // El pago debe estar en estado SUCCESS
    if (payment.status !== PaymentStatus.SUCCESS) {
        throw new ValidationException(`El pago asociado debe tener estado SUCCESS`);
    }
}