import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductSoldToAgentOTP{
    @PrimaryColumn({name: "agent_id"})
    SoldToAgentId: number;
    
    @Column({name: "otp", default: null})
    Otp: number;
}