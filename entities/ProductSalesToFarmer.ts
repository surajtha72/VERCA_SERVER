import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Organization } from "./Organization";
import { ProductMaster } from "./ProductMaster";
import { User } from "./User";

@Entity()
export class ProductSalesToFarmer {
    @PrimaryGeneratedColumn({ name: "id" })
    Id: number;

    @Column({ name: "invoice_number", length: 20, default: null })
    InvoiceNumber: string;

    @ManyToOne(() => Organization, { nullable: true })
    @JoinColumn({ name: "sold_to_Farmer" })
    SoldToFarmer: Organization;

    @Column({ name: "total_amount", default: null })
    TotalAmount: number;

    @Column({ name: "payment_mode", length: 10, default: null })
    PaymentMode: string;

    @Column({ name: "paid_amount", default: null })
    PaidAmount: number;

    @Column({ name: "balance", default: null })
    Balance: number;

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

}