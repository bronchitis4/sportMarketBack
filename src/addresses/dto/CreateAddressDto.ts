export class CreateAddressDto {
    readonly full_name: string;
    readonly phone: string;
    readonly street: string;
    readonly city: string;
    readonly postal_code: string;
    readonly country?: string;
    readonly is_default?: boolean;
}
