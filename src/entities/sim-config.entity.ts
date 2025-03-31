import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrgConfig } from "./org-config.entity";
import { Result } from "./result.entity";
import { RandomStreamType, SimConfigDTO, StateType } from "aethon-arion-pipeline";
import { SimConfigParams } from "./sim-config-params.entity";
import { ConvergenceTest } from "./convergence-test.entity";

@Entity()
export class SimConfig extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => OrgConfig, (orgConfig) => orgConfig.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: "orgConfigId", referencedColumnName: "id" })
    orgConfig: OrgConfig;

    @Column()
    @Index("ORGCONFIG")
    orgConfigId: number;

    @OneToMany(() => Result, (result) => result.simConfig)
    results: Result[];

    @ManyToOne(() => SimConfigParams, (simConfigParams) => simConfigParams.simConfigs, {
        onDelete: "CASCADE",
        eager: true
    })
    @JoinColumn({ name: "simConfigParamsId", referencedColumnName: "id" })
    simConfigParams: SimConfigParams;

    @Column()
    @Index("SIMCONFIGPARAMS")
    simConfigParamsId: number;

    @ManyToOne(() => ConvergenceTest, (convergenceTest) => convergenceTest.simConfigs, {
        onDelete: "CASCADE",
        eager: true
    })
    @JoinColumn({ name: "convergenceTestId", referencedColumnName: "id" })
    convergenceTest: ConvergenceTest;

    @Column()
    @Index("CONVERGENCETEST")
    convergenceTestId: number;

    @Column()
    dispatchedRuns: number;

    @Column()
    runCount: number;

    @Column({ type: "timestamp", nullable: true })
    start: Date;

    @Column({ type: "timestamp", nullable: true })
    end: Date;

    @Column({ nullable: true })
    durationSec: number;

    @Column({ type: "float", nullable: true })
    avgPerformance: number;

    @Column({ type: "float", nullable: true })
    stdDevPerformance: number;

    @Column({ type: "float", nullable: true })
    entropy: number;

    @Column({ nullable: false, default: false })
    converged: boolean;

    @Column({ nullable: false, default: "pending" })
    state: StateType;

    @Column({ nullable: false, default: false })
    saveStateSpace: boolean;

    @Column({ nullable: false })
    days: number;

    @Column({ nullable: false })
    randomStreamType: RandomStreamType;
}
