export class CreateOrderDto {
    readonly shipping_address_id: number;
    readonly shipping_method_id: number;
    readonly shipping_cost: number;
    readonly customer_notes?: string;
}