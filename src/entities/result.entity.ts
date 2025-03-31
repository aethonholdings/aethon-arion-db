import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SimConfig } from "./sim-config.entity";
import { StateSpacePoint } from "./state-space-point.entity";
import { ConfiguratorParamData, ConfiguratorParamsDTO, ResultDTO } from "aethon-arion-pipeline";

@Entity()
export class Result extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SimConfig, (simConfig) => simConfig.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: "simConfigId" })
    simConfig: SimConfig;

    @Column()
    @Index("SIMCONFIG")
    simConfigId: number;

    @Column({ nullable: false })
    @Index("ORGCONFIG")
    orgConfigId: number;

    @OneToMany(() => StateSpacePoint, (stateSpacePoint) => stateSpacePoint.result)
    stateSpace: StateSpacePoint[];

    @Column()
    runCount: number;

    @Column()
    nodeId: string;

    @Column({ type: "timestamp" })
    start: Date;

    @Column({ type: "timestamp" })
    end: Date;

    @Column()
    durationSec: number;

    @Column()
    clockTick: number;

    @Column({ type: "json" })
    board: any;

    @Column({ type: "json" })
    agentStates: number[];

    @Column({ type: "json" })
    priorityTensor: number[][][];

    @Column({ type: "json" })
    plant: number[];

    @Column({ type: "json" })
    reporting: number[];

    @Column({ type: "float" })
    priorityIntensity: number;

    @Column({ type: "float" })
    performance: number;

    @Column({ nullable: false })
    agentCount: number;

    @Column({ nullable: false })
    @Index("MODELNAME")
    modelName: string;

    @Column({ nullable: false })
    @Index("CONFIGURATORNAME")
    configuratorName: string;

    @Column({ type: "json" })
    configuratorParams: ConfiguratorParamsDTO<ConfiguratorParamData>;

}
