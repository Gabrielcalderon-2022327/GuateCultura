import { PaymentStatus } from "./enums/PaymentStatus";

export interface Payment {
    payment_id: number;
    amount: number;
    FK_user_id: number;
    status: PaymentStatus;
    created_at?: Date;
}