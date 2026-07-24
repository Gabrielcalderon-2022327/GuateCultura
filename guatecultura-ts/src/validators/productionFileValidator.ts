import { ProductionFile } from "../models/ProductionFile";
import { FileType } from "../models/enums/FileType";
import { validateRequiredFields, validateEnum } from "./validators";
import { getProductionById } from "../services/productionService";

const requiredProductionFileFields: (keyof ProductionFile)[] = [
    "FK_production_id", "file_url", "file_type"
];

export async function validateProductionFile(productionFile: ProductionFile): Promise<void> {
    validateRequiredFields(productionFile, requiredProductionFileFields);
    validateEnum(productionFile.file_type, FileType, "file_type");
    await getProductionById(productionFile.FK_production_id); //FK EXISTENTE
    // validación pendiente: URL válida de file_url
}