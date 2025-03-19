import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ModelParamsDTO, SimSetDTO, StateType } from "aethon-arion-pipeline";
import { OptimiserState } from "./optimiser-state.entity";

@Entity()
export class SimSet extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "longtext", nullable: true })
    description: string;

    @Column()
    modelName: string;

    @Column()
    optimiserName: string;

    @Column({ type: "json" })
    modelParams: ModelParamsDTO;

    @Column()
    state: StateType;

    @OneToMany(() => OptimiserState, (optimiserState) => optimiserState.simSet)
    optimiserStates: OptimiserState[];

    toDTO(): SimSetDTO {
        return this as SimSetDTO;
    }
}
