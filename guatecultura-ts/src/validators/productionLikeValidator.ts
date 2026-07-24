import { ProductionLike } from "../models/ProductionLike";
import { validateRequiredFields } from "./validators";
import { getUserById } from "../services/userService";
import { getProductionById } from "../services/productionService";

const requiredProductionLikeFields: (keyof ProductionLike)[] = [
    "FK_user_id", "FK_production_id"
];

export function validateProductionLike(productionLike: ProductionLike): void {
    validateRequiredFields(productionLike, requiredProductionLikeFields);

    // FKs EXISTENTES
    getUserById(productionLike.FK_user_id);
    getProductionById(productionLike.FK_production_id);

    // validación pendiente: unicidad compuesta (FK_user_id + FK_production_id), error DB
}