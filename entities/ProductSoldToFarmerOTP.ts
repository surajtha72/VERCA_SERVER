import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductSoldToFarmerOTP{
    @PrimaryColumn({name: "farmer_id"})
    SoldToFarmerId: number;
    
    @Column({name: "otp", default: null})
    Otp: number;
}