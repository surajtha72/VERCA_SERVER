
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Transporters } from "./Transporters";

@Entity()
export class TransporterVehicles {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @ManyToOne(() => Transporters, { nullable: true })
  @JoinColumn({ name: "transporter_id" })
  TransporterId: Transporters;

  @Column({ name: "is_food_transport_vehicle", default: true })
  IsFoodTransportVehicle: boolean;

  @Column({ name: "vehicleType", default: null })
  VehicleType: string;

  @Column({ name: "registrationNumber", length: 50, default: null })
  RegistrationNo: string;

  @Column({ name: "make", length: 100, default: null })
  Make: string;

  @Column({ name: "model", length: 100, default: null })
  Model: string;

  @Column({ name: "capacity", type: 'bigint', nullable: true })
  Capacity: bigint;

  @Column({ name: "FSSAILicNo", length: 100, default: null })
  FSSAILicNo: string;

  @Column({ name: "FSSAI_lic_expiry_date", type: 'datetime', nullable: true })

  FSSAILicExpiryDate: Date;

  @Column({ name: "insurance", length: 100, default: null })
  Insurance: string;

  @Column({ name: "insuranceExpiryDate", type: 'datetime', nullable: true })
  InsuranceExpiryDate: Date;

  @Column({ name: "is_active", default: true })
  IsActive: boolean;

  @Column({ name: "created_at", type: 'datetime', nullable: true })
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