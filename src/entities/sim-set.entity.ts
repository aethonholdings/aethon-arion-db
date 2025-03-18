import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ModelParams, SimSetDTO } from "aethon-arion-pipeline";
import { OptimiserState } from "./optimiser-state.entity";

@Entity()
export class SimSet extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "longtext", nullable: true })
    description: string;

    @Column()
    modelName: string;

    @Column({ type: "json" })
    modelParams: ModelParams;

    @OneToMany(() => OptimiserState, (optimiserState) => optimiserState.simSet)
    modelStates: OptimiserState[];

    toDTO(): SimSetDTO {
        return this as SimSetDTO;
    }
}
