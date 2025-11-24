
import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { ProductCategory } from "./ProductCategory";

@Entity()
export class ProductMaster {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @ManyToOne(() => ProductCategory, {nullable: true})
  @JoinColumn({ name: "product_categ_id" })
  ProductCategId: ProductCategory;

  @Column({ name: "product_name", length: 100 })
  ProductName: string;

  @Column({ name: "description", length: 100 })
  Description: string;

  @Column({ name: "supplier_make", length: 100 })
  SupplierMake: string;

  @Column({ name: "batch_no", length: 100 })
  BatchNo: string;

  @Column({ name: "mfg_date", type: "datetime" })
  MfgDate: Date;

  @Column({ name: "exp_date", type: "datetime" })
  ExpDate: Date;

  @Column({ name: "recorder_level", default: null })
  RecorderLevel: number;

  @Column({ name: "lead_time_in_delay", default: null })
  LeadTimeInDelay: number;

  @Column({ name: "unit_qty_uom_id", default: null })
  UnitQtyUomId: number;

  @Column({ name: "unit_qty_purchase_price", type: "float", default: null })
  UnitQtyPurchasePrice: number;

  @Column({ name: "unit_qty_supply_price", type: "float", default: null })
  UnitQtySupplyPrice: number;

  @Column({ name: "tax_on_supply", type: "float", default: null })
  TaxOnSupply: number;

  @Column({ name: "unit_qty_incentive_amount", type: "float", default: null })
  UnitQtyIncentiveAmount: number;

  @Column({ name: "opening_balance_qty", type: "float", default: null })
  OpeningBalanceQty: number;

  @Column({ name: "opening_balance_date", type: "datetime" })
  OpeningBalanceDate: Date;

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
