
import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { ProductMaster } from "./ProductMaster";

@Entity()
export class ProductPurchaseQty {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @ManyToOne(() => ProductMaster, {nullable: true})
  @JoinColumn({ name: "product_id" })
  ProductId: ProductMaster;

  @Column({ name: "purchase_date", type: "datetime" })
  PurchaseDate: Date;

  @Column({ name: "invoice_no", length: 100 })
  InvoiceNo: string;

  @Column({ name: "quantity", type: "float", default: null })
  Quantity: number;

  @Column({ name: "is_active" })
  IsActive: boolean;

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
