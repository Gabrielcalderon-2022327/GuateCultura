export interface Tip {
    tip_id: number;
    amount: number;
    FK_creator_id: number;
    FK_payment_id: number;
    created_at?: Date;
}