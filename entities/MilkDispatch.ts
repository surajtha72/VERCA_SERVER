import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { TransporterVehicles } from "./TransporterVehicles";
import { RouteMaster } from "./RouteMaster";
import { MilkCollections } from "./MilkCollections";

@Entity()
export class MilkDispatch {
    @PrimaryColumn({ name: "id", type: "uuid" })
    Id: string;

    @ManyToOne(() => RouteMaster, { nullable: true })
    @JoinColumn({ name: "route_id" })
    RouteId: RouteMaster;
    
    @ManyToOne(() => TransporterVehicles, { nullable: true })
    @JoinColumn({ name: "transporter_vehicle_id" })
    TransporterVehicleId: TransporterVehicles;
    
    @Column({ name: "start_fat", type: 'float', default: null })
    StartFat: number;
    
    @Column({ name: "start_snf", type: 'float', default: null })
    StartSnf: number;
    
    @Column({ name: "start_clr", type: 'float', default: null })
    StartClr: number;
    
    @Column({ name: "end_fat", type: 'float', default: null })
    EndFat: number;
    
    @Column({ name: "end_snf", type: 'float', default: null })
    EndSnf: number;
    
    @Column({ name: "end_clr", type: 'float', default: null })
    EndClr: number;
    
    @Column({ name: "weight", type: 'float', default: null })
    Weight: number;

    @Column({ name: "dispatched_at", nullable: true, type: 'datetime' })
    DispatchedAt: Date;

    @Column({ name: "is_active", default: true })
    IsActive: boolean;

    // @ManyToOne(()=> MilkCollections, {nullable: true})
    // @JoinColumn({name: "milk_collection_ids"})
    // MilkCollectionsIds: MilkCollections;

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