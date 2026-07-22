import { Production } from "../models/Production";

const productions: Production[] = [];

export function getAllProductions(): Production[] {
    return productions;
}

export function getProductionById(id: number): Production | undefined {
    return productions.find(p => p.production_id === id);
}

export function createProduction(production: Production): void {
    productions.push(production);
}

export function editProduction(id: number, production: Production): boolean {
    const productionIndex = productions.findIndex(p => p.production_id === id);
    if (productionIndex === -1) {
        return false;
    }
    productions[productionIndex] = { ...production, production_id: id };
    return true;
}

export function deleteProduction(id: number): boolean {
    const productionIndex = productions.findIndex(p => p.production_id === id);
    if (productionIndex === -1) {
        return false;
    }
    productions.splice(productionIndex, 1);
    return true;
}