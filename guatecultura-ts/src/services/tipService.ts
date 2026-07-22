import { Tip } from "../models/Tip";

const tips: Tip[] = [];

export function getAllTips(): Tip[] {
    return tips;
}

export function getTipById(id: number): Tip | undefined {
    return tips.find(t => t.tip_id === id);
}

export function createTip(tip: Tip): void {
    tips.push(tip);
}

export function editTip(id: number, tip: Tip): boolean {
    const tipIndex = tips.findIndex(t => t.tip_id === id);
    if (tipIndex === -1) {
        return false;
    }
    tips[tipIndex] = { ...tip, tip_id: id };
    return true;
}

export function deleteTip(id: number): boolean {
    const tipIndex = tips.findIndex(t => t.tip_id === id);
    if (tipIndex === -1) {
        return false;
    }
    tips.splice(tipIndex, 1);
    return true;
}