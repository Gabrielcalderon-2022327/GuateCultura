import { FileType } from "./enums/FileType";

export interface ProductionFile {
    file_id: number;
    FK_production_id: number;
    file_url: string;
    file_type?: FileType | null;
}