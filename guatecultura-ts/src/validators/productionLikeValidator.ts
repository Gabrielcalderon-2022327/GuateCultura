import { ProductionLike } from "../models/ProductionLike";
import { validateRequiredFields } from "./validators";
import { getUserById } from "../services/userService";
import { getProductionById } from "../services/productionService";

const requiredProductionLikeFields: (keyof ProductionLike)[] = [
    "FK_user_id", "FK_production_id"
];

export async function validateProductionLike(productionLike: ProductionLike): Promise<void> {
    validateRequiredFields(productionLike, requiredProductionLikeFields);

    // FKs EXISTENTES
    await getUserById(productionLike.FK_user_id);
    await getProductionById(productionLike.FK_production_id);
}