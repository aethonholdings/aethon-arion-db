import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrgConfig } from "./org-config.entity";
import { Result } from "./result.entity";
import { SimSet } from "./sim-set.entity";
import { StateType } from "../types/db.types";

@Entity()
export class SimConfig extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => OrgConfig, (orgConfig) => orgConfig.id, {onDelete: "CASCADE"})
    @JoinColumn({ name: "orgConfigId", referencedColumnName: "id" })
    orgConfig: OrgConfig;

    @Column()
    @Index("ORGCONFIG")
    orgConfigId: number;

    @OneToMany(() => Result, (result) => result.simConfig)
    results: Result[];

    @ManyToOne(() => SimSet, (simSet) => simSet.simConfigs, {onDelete: "CASCADE"})
    @JoinColumn({ name: "simSetId", referencedColumnName: "id" })
    simSet: SimSet;

    @Column()
    @Index("SIMSET")
    simSetId: number;

    @Column()
    dispatchedRuns: number;

    @Column()
    runCount: number;

    @Column()
    randomStreamType: "static" | "random";

    @Column({ type: "timestamp", nullable: true })
    start: Date;

    @Column({ type: "timestamp", nullable: true })
    end: Date;

    @Column({nullable: true})
    durationSec: number;

    @Column()
    days: number;

    @Column({type: "float", nullable: true})
    avgPerformance: number;

    @Column({type: "float", nullable: true})
    stdDevPerformance: number;

    @Column({type: "float", nullable: true})
    entropy: number;

    @Column()
    converged: boolean;

    @Column({nullable: false, default: "pending"})
    state: StateType;
}
