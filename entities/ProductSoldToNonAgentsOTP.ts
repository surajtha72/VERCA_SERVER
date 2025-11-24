import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductSoldToNonAgentsOTP{
    @PrimaryColumn({name: "farmer_id"})
    SoldToNonAgentsId: number;
    
    @Column({name: "otp", default: null})
    Otp: number;
}