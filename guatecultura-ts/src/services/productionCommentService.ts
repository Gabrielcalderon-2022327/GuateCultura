import { ProductionComment } from "../models/ProductionComment";

const productionComments: ProductionComment[] = [];

export function getAllProductionComments(): ProductionComment[] {
    return productionComments;
}

export function getProductionCommentById(id: number): ProductionComment | undefined {
    return productionComments.find(pc => pc.production_comment_id === id);
}

export function createProductionComment(productionComment: ProductionComment): void {
    productionComments.push(productionComment);
}

export function editProductionComment(id: number, productionComment: ProductionComment): boolean {
    const productionCommentIndex = productionComments.findIndex(pc => pc.production_comment_id === id);
    if (productionCommentIndex === -1) {
        return false;
    }
    productionComments[productionCommentIndex] = { ...productionComment, production_comment_id: id };
    return true;
}

export function deleteProductionComment(id: number): boolean {
    const productionCommentIndex = productionComments.findIndex(pc => pc.production_comment_id === id);
    if (productionCommentIndex === -1) {
        return false;
    }
    productionComments.splice(productionCommentIndex, 1);
    return true;
}