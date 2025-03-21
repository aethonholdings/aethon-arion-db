import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { SimConfigParams } from "./sim-config-params.entity";
import { ConfiguratorParams } from "./configurator-params.entity";
import { StateType } from "aethon-arion-pipeline";
import { SimConfig } from "./sim-config.entity";

@Entity()
@Unique(["simConfigParams", "configuratorParams"])
export class ConvergenceTest extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SimConfigParams, (simConfigParams) => simConfigParams.convergenceTests, {
        onDelete: "CASCADE",
        eager: true
    })
    @JoinColumn({ name: "simConfigParamsId" })
    simConfigParams: SimConfigParams;

    @ManyToOne(() => ConfiguratorParams, (configuratorParams) => configuratorParams.convergenceTests, {
        onDelete: "CASCADE",
        eager: true
    })
    @JoinColumn({ name: "configuratorParamsId" })
    configuratorParams: ConfiguratorParams;

    @OneToMany(() => SimConfig, (simConfig) => simConfig.convergenceTest)
    simConfigs: SimConfig[];

    @Column({ default: 0 })
    orgConfigCount: number;

    @Column({ default: 0 })
    simConfigCount: number;

    @Column({ default: 0 })
    completedSimConfigCount: number;

    @Column({ default: 0 })
    resultCount: number;

    @Column({ default: 0 })
    dispatchedRuns: number;

    @Column({ type: "float", nullable: true })
    avgPerformance: number;

    @Column({ type: "float", nullable: true })
    stdDevPerformance: number;

    @Column({ nullable: true })
    processingTimeSec: number;

    @Column({ nullable: false, default: "pending" })
    state: StateType;
}
