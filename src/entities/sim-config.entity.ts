import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrgConfig } from "./org-config.entity";
import { Result } from "./result.entity";
import { RandomStreamType, SimConfigDTO, StateType } from "aethon-arion-pipeline";
import { SimConfigParams } from "./sim-config-params.entity";
import { ConvergenceTest } from "./convergence-test.entity";
import { Run } from "./run.entity";

@Entity()
// supports the dispatch query: next unconverged simConfig ordered by convergenceTestId, id
@Index("DISPATCH", ["converged", "convergenceTestId", "id"])
export class SimConfig extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => OrgConfig, (orgConfig) => orgConfig.simConfigs, { onDelete: "CASCADE" })
    @JoinColumn({ name: "orgConfigId", referencedColumnName: "id" })
    orgConfig: OrgConfig;

    @Column()
    @Index("ORGCONFIG")
    orgConfigId: number;

    @OneToMany(() => Result, (result) => result.simConfig)
    results: Result[];

    @OneToMany(() => Run, (run) => run.simConfig)
    runs: Run[];

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

    @Column({ type: "double", nullable: true })
    durationSec: number;

    @Column({ type: "double", nullable: true })
    avgPerformance: number;

    @Column({ type: "double", nullable: true })
    stdDevPerformance: number;

    @Column({ type: "double", nullable: true })
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
