import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Organization } from "./Organization";
import { User } from "./User";

@Entity()
export class CollectionEntry{
    @PrimaryGeneratedColumn({name: "id"})
    Id: number;

    @ManyToOne(()=>Organization, {nullable: true})
    @JoinColumn({name: "organization_unit_id"})
    OrganizationUnitId: Organization;

    @Column({name: "status", length: 20, default: null})
    Status: string;

    @Column({ name: "is_active", default: true })
    IsActive: boolean;

    @Column({name:"request_for", length: 20, default: null})
    RequestFor : string;

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