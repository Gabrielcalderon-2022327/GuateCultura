import { Production } from "../models/Production";
import {ProductionVisibility } from "../models/enums/ProductionVisibility";
import { ProductionCategory } from "../models/enums/ProductionCategory";
import {validateRequiredFields,validateMaxLength,validateEnum} from "./validators";
import { getCreatorById } from "../services/creatorService";

const requiredProductionFields: (keyof Production)[] = [
    "FK_creator_id", "title", "visibility"
];

export function validateProduction(production: Production): void {
    validateRequiredFields(production, requiredProductionFields);
    validateMaxLength(production.title, 100, "title");
    validateEnum(production.visibility, ProductionVisibility, "visibility");
    validateEnum(production.category, ProductionCategory, "category")

    getCreatorById(production.FK_creator_id); // VALIDAR FK
}