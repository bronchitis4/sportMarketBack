export class AddToCartDto {
    readonly product_id: number;
    readonly quantity: number;
    readonly size?: string;
}
