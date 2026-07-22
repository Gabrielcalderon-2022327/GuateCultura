import { ProductionFavorite } from "../models/ProductionFavorite";

const productionFavorites: ProductionFavorite[] = [];

export function getAllProductionFavorites(): ProductionFavorite[] {
    return productionFavorites;
}

export function getProductionFavoriteById(id: number): ProductionFavorite | undefined {
    return productionFavorites.find(pf => pf.production_favorite_id === id);
}

export function createProductionFavorite(productionFavorite: ProductionFavorite): void {
    productionFavorites.push(productionFavorite);
}

export function editProductionFavorite(id: number, productionFavorite: ProductionFavorite): boolean {
    const productionFavoriteIndex = productionFavorites.findIndex(pf => pf.production_favorite_id === id);
    if (productionFavoriteIndex === -1) {
        return false;
    }
    productionFavorites[productionFavoriteIndex] = { ...productionFavorite, production_favorite_id: id };
    return true;
}

export function deleteProductionFavorite(id: number): boolean {
    const productionFavoriteIndex = productionFavorites.findIndex(pf => pf.production_favorite_id === id);
    if (productionFavoriteIndex === -1) {
        return false;
    }
    productionFavorites.splice(productionFavoriteIndex, 1);
    return true;
}