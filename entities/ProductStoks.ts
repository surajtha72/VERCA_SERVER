import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Organization } from "./Organization";
import { ProductMaster } from "./ProductMaster";
import { User } from "./User";
import { ProductSupply } from "./ProductSupply";

@Entity()
export class ProductStocks {
    @PrimaryColumn({ name: "id" })
    Id: string;

    @ManyToOne(() => ProductSupply, { nullable: true })
    @JoinColumn({ name: "indentId" })
    IndentId: ProductSupply;

    @ManyToOne(() => Organization, { nullable: true })
    @JoinColumn({ name: "organization_unit" })
    OrganizationUnit: Organization;

    @Column({ name: "available_quantity", default: null })
    AvailableQuantity: number;

    @Column({ name: "dispatch_quantity", default: null })
    DispatchQuantity: number;

    @Column({ name: "total_quantity", default: null })
    TotalQuantity: number;

    @ManyToOne(() => ProductMaster, { nullable: true })
    @JoinColumn({ name: "product_master" })
    ProductMaster: ProductMaster;

    @Column({ name: "created_at", type: "datetime" })
    CreatedAt: Date;
    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "created_by" })
    CreatedBy: User;

    @Column({ name: "modified_at", nullable: true, type: "datetime" })
    ModifiedAt: Date;
    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "modified_by" })
    ModifiedBy: User;

    @Column({ name: "deleted_at", nullable: true, type: "datetime" })
    DeletedAt: Date;
    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "deleted_by" })
    DeletedBy: User;

    @Column({ name: "is_complete", default: false })
    IsComplete: boolean;

}