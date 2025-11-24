import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class WeighbridgeData {
    @PrimaryGeneratedColumn({name: "id"})
    Id: number;
    
    @Column({name:"weight", type: "float", default: null})
    weight: number;

    @Column({ name: "modified_at", nullable: true, type: "datetime" })
    ModifiedAt: Date;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "modified_by" })
    ModifiedBy: User;
}