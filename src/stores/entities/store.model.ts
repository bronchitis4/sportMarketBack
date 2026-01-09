import { Column, Model, Table } from "sequelize-typescript";

interface StoreCreationAttrs {
    name: string;
    address: string;
    city: string;
    postal_code?: string;
    phone?: string;
    email?: string;
    opening_hours?: string;
    is_active?: boolean;
}


@Table({ tableName: 'stores', timestamps: true })
export class Store extends Model<Store, StoreCreationAttrs> {

    @Column({ type: 'INTEGER', primaryKey: true, autoIncrement: true }) 
    declare id: number;
    @Column({ type: 'VARCHAR', allowNull: false })  
    declare name: string;
    @Column({ type: 'TEXT', allowNull: false })
    declare address: string;
    @Column({ type: 'VARCHAR', allowNull: false })
    declare city: string;
    @Column({ type: 'VARCHAR', allowNull: true })
    declare postal_code?: string;
    @Column({ type: 'VARCHAR', allowNull: true })
    declare phone?: string;
    @Column({ type: 'VARCHAR', allowNull: true })
    declare email?: string;
    @Column({ type: 'TEXT', allowNull: true })
    declare opening_hours?: string;
    @Column({ type: 'BOOLEAN', allowNull: true, defaultValue: true })
    declare is_active?: boolean;    
    @Column({ type: 'TIMESTAMP', allowNull: true })
    declare createdAt?: Date;
    @Column({ type: 'TIMESTAMP', allowNull: true })
    declare updatedAt?: Date;
}