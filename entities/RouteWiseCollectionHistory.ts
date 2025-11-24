import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { BillingCycleMaster } from "./BillingCycleMaster";
import { User } from "./User";

@Entity()
export class RouteWiseCollectionHistory {
  @PrimaryGeneratedColumn({ name: "hist_id" })
  HistId: number;

  @ManyToOne(() => BillingCycleMaster, { nullable: true })
  @JoinColumn({ name: "cycle_id" })
  BillingCycle: BillingCycleMaster;

  //routeId
  @Column({ name: "id", nullable: true })
  Id: number;

  @Column(({name:"route_name", default: null, length: 200}))
  RouteName: string;

  @Column({ name: "route_owner", nullable: true })
  RouteOwner: number;

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