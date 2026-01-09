export class CreateShippingMethodDto {
    readonly name: string;
    readonly type?: string;
    readonly description?: string;
    readonly is_active?: boolean;
    readonly price?: number;
    readonly min_delivery_days?: number;
    readonly max_delivery_days?: number;
}