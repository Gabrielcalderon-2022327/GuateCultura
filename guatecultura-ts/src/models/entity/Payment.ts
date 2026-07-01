import { PaymentStatus } from "../enums/PaymentStatus";

export interface Payment {
    payment_id: number;
    amount: number;
    FK_user_id?: number | null;
    status: PaymentStatus;
    created_at?: Date;
}