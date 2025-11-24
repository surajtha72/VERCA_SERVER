
import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { ProductMaster } from "./ProductMaster";
import { ProductSupply } from "./ProductSupply";

@Entity()
export class IndentProducts {
  @PrimaryColumn({ name: "id" })
  Id: string;

  @ManyToOne(() => ProductSupply, {nullable: true})
  @JoinColumn({ name: "indent_id" })
  IndentId: ProductSupply;

  @ManyToOne(() => ProductMaster, {nullable: true})
  @JoinColumn({ name: "product_id" })
  ProductId: ProductMaster;

  @Column({ name: "available_qty", default: null  })
  AvailableQty: number;

  @Column({ name: "rate", type: "float", default: null })
  Rate: number;

  @Column({ name: "requested_qty", default: null })
  RequestedQty: number;

  @Column({ name: "approved_qty", default: null })
  ApprovedQty: number;

  @Column({ name: "dispatch_qty", default: null  })
  DispatchQty: number;

  @Column({ name: "received_qty", default: null })
  ReceivedQty: number;

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
