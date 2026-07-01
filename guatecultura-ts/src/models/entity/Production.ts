import { ProductionCategory } from "../enums/ProductionCategory";
import { ProductionVisibility } from "../enums/ProductionVisibility";

export interface Production {
    production_id: number;
    FK_creator_id: number;
    title: string;
    description?: string | null;
    category?: ProductionCategory | null;
    visibility: ProductionVisibility;
    created_at?: Date;
    updated_at?: Date;
}