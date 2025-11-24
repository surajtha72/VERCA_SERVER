import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class WeighbridgeLabData {
    @PrimaryGeneratedColumn({ name: "id" })
    Id: number;


    @Column({ name: "fat", type: "float", default: null })
    Fat: number;

    @Column({ name: "snf", type: "float", default: 0 })
    Snf: number;

    @Column({ name: "clr", type: "float", default: 0 })
    Clr: number;

    @Column({ name: "protein", type: "float", default: null })
    Protein: number;

    @Column({ name: "lactose", type: "float", default: null })
    Lactose: number;

    @Column({ name: "salt", type: "float", default: null })
    Salt: number;

    @Column({ name: "water", type: "float", default: null })
    Water: number;

    @Column({ name: "temperature", type: "float", default: null })
    Temperature: number;

    @Column({ name: "modified_at", nullable: true, type: "datetime" })
    ModifiedAt: Date;
    
}