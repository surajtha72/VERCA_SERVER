import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { User } from "./User";
import { RouteMaster } from "./RouteMaster";
import { Organization } from "./Organization";

@Entity()
export class RouteStops {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @ManyToOne(() => RouteMaster, { nullable: true })
  @JoinColumn({ name: "route_id" })
  RouteId: RouteMaster;
  
  @Column({ name: "sequence_no", default: null })
  SequenceNo: number;
  
  @ManyToOne(() => Organization, { nullable: true })
  @JoinColumn({ name: "stop_id" })
  StopId: Organization;

  
  @Column({ name: "travel_kms", type: 'float', default: null })
  TravelKms: number;

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
