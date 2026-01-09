export class CreateStoreDTO {
    readonly name: string;
    readonly address: string;
    readonly city: string;
    readonly postal_code?: string;
    readonly phone?: string;
    readonly email?: string;
    readonly opening_hours?: string;
    readonly is_active?: boolean;
}