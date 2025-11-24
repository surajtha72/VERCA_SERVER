import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { User } from "./User";
import { Roles } from "./Roles";
import { Permissions } from "./Permissions";

@Entity()
export class RoleHasPermissions {
  @PrimaryGeneratedColumn({ name: "id" })
  Id: number;

  @ManyToOne(() => Roles, { nullable: true })
  @JoinColumn({ name: "role_id" })
  Roles: Roles;
  
  @ManyToOne(() => Permissions, { nullable: true })
  @JoinColumn({ name: "permission_id" })
  Permissions: Permissions;

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