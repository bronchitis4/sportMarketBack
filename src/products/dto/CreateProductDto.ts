export class CreateProductDto {
    readonly name: string;
    readonly description?: string;
    readonly price: number;
    readonly old_price?: number;
    readonly brand_id: number;
    readonly category_ids: number[];
    readonly clothing_sizes?: string[];
    readonly shoe_sizes?: string[];
}