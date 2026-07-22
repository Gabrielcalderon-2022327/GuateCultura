import { ProductionLike } from "../models/ProductionLike";

const productionLikes: ProductionLike[] = [];

export function getAllProductionLikes(): ProductionLike[] {
    return productionLikes;
}

export function getProductionLikeById(id: number): ProductionLike | undefined {
    return productionLikes.find(pl => pl.production_like_id === id);
}

export function createProductionLike(productionLike: ProductionLike): void {
    productionLikes.push(productionLike);
}

export function editProductionLike(id: number, productionLike: ProductionLike): boolean {
    const productionLikeIndex = productionLikes.findIndex(pl => pl.production_like_id === id);
    if (productionLikeIndex === -1) {
        return false;
    }
    productionLikes[productionLikeIndex] = { ...productionLike, production_like_id: id };
    return true;
}

export function deleteProductionLike(id: number): boolean {
    const productionLikeIndex = productionLikes.findIndex(pl => pl.production_like_id === id);
    if (productionLikeIndex === -1) {
        return false;
    }
    productionLikes.splice(productionLikeIndex, 1);
    return true;
}