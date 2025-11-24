
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { User } from "./User";
import { Transporters } from "./Transporters";
import { RouteMaster } from "./RouteMaster";
import { TransporterVehicles } from "./TransporterVehicles";

@Entity()
export class TransporterContracts {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @ManyToOne(() => Transporters, { nullable: true })
  @JoinColumn({ name: "transporter_id" })
  TransporterId: Transporters;
  
  @ManyToOne(() => RouteMaster, { nullable: true })
  @JoinColumn({ name: "route_id" })
  RouteId: RouteMaster;
  
  @ManyToOne(() => TransporterVehicles, { nullable: true })
  @JoinColumn({ name: "vehicle_id"})
  VehicleId: TransporterVehicles;

  @Column({ name: "start_date" })
  StartDate: Date;
 
  @Column({ name: "end_date"})
  EndDate: Date;
  
  @Column({ name: "pay_terms", length: 100, default: null })
  PayTerms: string;

  @Column({ name: "pay_amount", type: 'bigint', default: null})
  PayAmount: bigint;
  
  @Column({ name: "addl_charge_type", length: 100, nullable: true })
  AddlChargeType: string;
  
  @Column({ name: "addl_charge_amount", type: 'bigint', nullable: true })
  AddlChargeAmount: bigint;
  
  @Column({ name: "status", length: 150, nullable: true })
  Status: string;
  
  @Column({ name: "is_active", default: true })
  IsActive: boolean;

  @Column({ name: "created_at", type: 'datetime' })
  CreatedAt: Date;
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "created_by" })
  CreatedBy: User;

  @Column({ name: "modified_at", nullable: true, type: 'datetime' })
  ModifiedAt: Date;
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "modified_by" })
  ModifiedBy: User;

  @Column({ name: "deleted_at", nullable: true, type: 'datetime' })
  DeletedAt: Date;
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "deleted_by" })
  DeletedBy: User;
}
