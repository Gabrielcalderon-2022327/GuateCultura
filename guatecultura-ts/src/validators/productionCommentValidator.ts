import { ProductionComment } from "../models/ProductionComment";
import {validateRequiredFields,validateMinLength,validateMaxLength} from "./validators";
import { getUserById } from "../services/userService";
import { getProductionById } from "../services/productionService";

const requiredProductionCommentFields: (keyof ProductionComment)[] = [
    "content", "FK_user_id", "FK_production_id"
];

export function validateProductionComment(productionComment: ProductionComment): void {
    validateRequiredFields(productionComment, requiredProductionCommentFields);
    validateMinLength(productionComment.content, 1, "content");
    validateMaxLength(productionComment.content, 1000, "content");

    // FKs EXISTENTES
    getUserById(productionComment.FK_user_id);
    getProductionById(productionComment.FK_production_id);
}