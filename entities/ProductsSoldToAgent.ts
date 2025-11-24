import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductSalesToAgent } from "./ProductSalesToAgent";
import { ProductMaster } from "./ProductMaster";
import { User } from "./User";

@Entity()
export class ProductsSoldToAgent{
    @PrimaryGeneratedColumn({name: "id"})
    Id: number;

    @ManyToOne(()=>ProductSalesToAgent, { nullable: true })
    @JoinColumn({ name: "product_sales_to_agent"})
    ProductSalesToAgent: ProductSalesToAgent;

    @ManyToOne(()=>ProductMaster, { nullable: true })
    @JoinColumn({ name: "product_id"})
    ProductId: ProductMaster;
    
    @Column({name: "quantity", default: null})
    Quantity: number;

    @Column({name: "rate", default: null})
    Rate: number;

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