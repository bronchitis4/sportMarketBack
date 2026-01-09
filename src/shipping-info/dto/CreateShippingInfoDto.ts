export class CreateShippingInfoDto {
    readonly order_id: number;
    readonly shipping_method_id: number;
    readonly shipping_cost: number;
    readonly store_id?: number;
    readonly shipping_address_id?: number;
    readonly tracking_number?: string;
    readonly estimated_delivery_date?: Date;
    readonly shipping_status?: string;
    readonly notes?: string;
}
