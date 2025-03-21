import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ModelParamsDTO, SimSetDTO, StateType } from "aethon-arion-pipeline";
import { OptimiserState } from "./optimiser-state.entity";
import { SimConfigParams } from "./sim-config-params.entity";

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

    @ManyToOne(() => SimConfigParams, (simConfigParams) => simConfigParams.simSets)
    @JoinColumn({ name: "simConfigParamsId", referencedColumnName: "id" })
    simConfigParams: SimConfigParams;

}
