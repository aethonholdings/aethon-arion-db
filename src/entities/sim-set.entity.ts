import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ModelParamsDTO, OptimiserParameters, StateType } from "aethon-arion-pipeline";
import { OptimiserState } from "./optimiser-state.entity";
import { SimConfigParams } from "./sim-config-params.entity";

@Entity()
export class SimSet extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SimConfigParams, (simConfigParams) => simConfigParams.simSets)
    @JoinColumn({ name: "simConfigParamsId", referencedColumnName: "id" })
    simConfigParams: SimConfigParams;

    @OneToMany(() => OptimiserState, (optimiserState) => optimiserState.simSet, {eager: true})
    optimiserStates: OptimiserState[];

    @Column({ type: "longtext", nullable: true })
    description: string;

    @Column()
    modelName: string;

    @Column()
    optimiserName: string;

    @Column()
    configuratorName: string;

    @Column({ type: "json" })
    optimiserParams: OptimiserParameters;

    @Column()
    state: StateType;

    @Column({ nullable: true })
    currentOptimiserStateId: number;

}
