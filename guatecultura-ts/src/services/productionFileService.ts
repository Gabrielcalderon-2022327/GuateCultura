import { ProductionFile } from "../models/ProductionFile";

const productionFiles: ProductionFile[] = [];

export function getAllProductionFiles(): ProductionFile[] {
    return productionFiles;
}

export function getProductionFileById(id: number): ProductionFile | undefined {
    return productionFiles.find(pf => pf.file_id === id);
}

export function createProductionFile(productionFile: ProductionFile): void {
    productionFiles.push(productionFile);
}

export function editProductionFile(id: number, productionFile: ProductionFile): boolean {
    const productionFileIndex = productionFiles.findIndex(pf => pf.file_id === id);
    if (productionFileIndex === -1) {
        return false;
    }
    productionFiles[productionFileIndex] = { ...productionFile, file_id: id };
    return true;
}

export function deleteProductionFile(id: number): boolean {
    const productionFileIndex = productionFiles.findIndex(pf => pf.file_id === id);
    if (productionFileIndex === -1) {
        return false;
    }
    productionFiles.splice(productionFileIndex, 1);
    return true;
}