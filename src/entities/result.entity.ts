import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SimConfig } from "./sim-config.entity";
import { StateSpacePoint } from "./state-space-point.entity";
import { ConfiguratorParamData, ConfiguratorParamsDTO, ResultDTO } from "aethon-arion-pipeline";

@Entity()
export class Result extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SimConfig, (simConfig) => simConfig.results, { onDelete: "CASCADE" })
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

    // the dispatch ticket this result answers; unique so that a re-posted result is idempotent. Null for
    // results recorded before run tickets were introduced
    @Column({ nullable: true })
    @Index("RUN", { unique: true })
    runId: number;

    // true when the result arrived after its simConfig had converged; stored, but excluded from statistics
    @Column({ nullable: false, default: false })
    late: boolean;

    @Column({ type: "timestamp" })
    start: Date;

    @Column({ type: "timestamp" })
    end: Date;

    @Column({ type: "double" })
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

    @Column({ type: "double" })
    priorityIntensity: number;

    @Column({ type: "double", nullable: true })
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
