import { Payment } from "../models/Payment";

const payments: Payment[] = [];

export function getAllPayments(): Payment[] {
    return payments;
}

export function getPaymentById(id: number): Payment | undefined {
    return payments.find(p => p.payment_id === id);
}

export function createPayment(payment: Payment): void {
    payments.push(payment);
}

export function editPayment(id: number, payment: Payment): boolean {
    const paymentIndex = payments.findIndex(p => p.payment_id === id);
    if (paymentIndex === -1) {
        return false;
    }
    payments[paymentIndex] = { ...payment, payment_id: id };
    return true;
}

export function deletePayment(id: number): boolean {
    const paymentIndex = payments.findIndex(p => p.payment_id === id);
    if (paymentIndex === -1) {
        return false;
    }
    payments.splice(paymentIndex, 1);
    return true;
}