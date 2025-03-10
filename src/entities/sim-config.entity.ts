import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrgConfig } from "./org-config.entity";
import { Result } from "./result.entity";
import { SimSet } from "./sim-set.entity";
import { RandomStreamType, SimConfigDTO, StateType } from "aethon-arion-pipeline";
import { SimConfigParams } from "./sim-config-params.entity";

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

    @ManyToOne(() => SimSet, (simSet) => simSet.simConfigs, { onDelete: "CASCADE" })
    @JoinColumn({ name: "simSetId", referencedColumnName: "id" })
    simSet: SimSet;

    @ManyToOne(() => SimConfigParams, (simConfigParams) => simConfigParams.simConfigs, { onDelete: "CASCADE" })
    @JoinColumn({ name: "simConfigParamsId", referencedColumnName: "id" })
    simConfigParams: SimConfigParams;

    @Column()
    @Index("SIMCONFIGPARAMS")
    simConfigParamsId: number;

    @Column()
    @Index("SIMSET")
    simSetId: number;

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

    @Column()
    converged: boolean;

    @Column({ nullable: false, default: "pending" })
    state: StateType;

    toDTO(): SimConfigDTO {
        return {
            ...this,
            days: this.simConfigParams.days,
            randomStreamType: this.simConfigParams.randomStreamType,
            orgConfig: this.orgConfig.toDTO(),
            results: this.results ? this.results.map((result) => result.toDTO()) : null,
            simSet: this.simSet.toDTO()
        } as SimConfigDTO;
    }
}
