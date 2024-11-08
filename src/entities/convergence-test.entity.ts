import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { SimConfigParams } from "./sim-config-params.entity";
import { ConfiguratorParams } from "./configurator-params.entity";
import { StateType } from "aethon-arion-pipeline";

@Entity()
@Unique(["simConfigParams", "configuratorParams"])
export class ConvergenceTest extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SimConfigParams, (simConfigParams) => simConfigParams.convergenceTests, { onDelete: "CASCADE" })
    @JoinColumn({ name: "simConfigParamsId" })
    simConfigParams: SimConfigParams;

    @ManyToOne(() => ConfiguratorParams, (configuratorParams) => configuratorParams.convergenceTests, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "configuratorParamsId" })
    configuratorParams: ConfiguratorParams;

    @Column()
    orgConfigCount: number;

    @Column()
    simConfigCount: number;

    @Column()
    resultCount: number;

    @Column()
    dispatchedRuns: number;

    @Column({ type: "float", nullable: true })
    avgPerformance: number;

    @Column({ type: "float", nullable: true })
    stdDevPerformance: number;

    @Column({ default: 0 })
    processingTimeSec: number;

    @Column({ nullable: false, default: "pending" })
    state: StateType;
}
