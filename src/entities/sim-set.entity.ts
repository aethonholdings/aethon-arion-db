import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SimConfig } from "./sim-config.entity";
import { StateType } from "../types/db.types";

@Entity()
export class SimSet extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => SimConfig, (simConfig) => simConfig.simSet)
    simConfigs: SimConfig[];

    @Column({type: "longtext", nullable: true})
    description: string;

    @Column()
    type: string;

    @Column({nullable: false, default: "pending"})
    state: StateType;

    @Column({nullable: false, default: 0})
    simConfigCount: number;

    @Column({nullable: false, default: 0})
    completedRunCount: number;

    @Column({nullable: false, default: 0})
    completedSimConfigCount: number;
}