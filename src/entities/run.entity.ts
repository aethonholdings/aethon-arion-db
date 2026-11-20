import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SimConfig } from "./sim-config.entity";

/**
 * A dispatch ticket: one simulation run of a SimConfig handed to a calculation node. The ticket id is returned to
 * the node with the job and posted back with the result, which makes result posting idempotent; the runIndex
 * (1-based, per SimConfig) seeds the node's random streams so that every run is distinct and reproducible.
 */
@Entity()
@Index("SIMCONFIG_RUNINDEX", ["simConfigId", "runIndex"], { unique: true })
export class Run extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SimConfig, (simConfig) => simConfig.runs, { onDelete: "CASCADE" })
    @JoinColumn({ name: "simConfigId", referencedColumnName: "id" })
    simConfig: SimConfig;

    @Column()
    simConfigId: number;

    @Column()
    runIndex: number;

    @Column()
    nodeId: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    dispatchedAt: Date;

    @Column({ type: "timestamp", nullable: true })
    completedAt: Date;

    @Column({ nullable: true })
    resultId: number;
}
