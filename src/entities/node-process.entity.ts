import { BaseEntity, Column, Entity, Index, PrimaryColumn } from "typeorm";

/**
 * A node process's latest heartbeat: what it is doing, the run in progress and its counters. One row per process
 * (`<machine id>:<instance>:<process index>`), replaced by each heartbeat; rows not heard from for a day are removed.
 */
@Entity({ name: "node_process" })
@Index("MACHINE", ["machineId"])
export class NodeProcess extends BaseEntity {
    @PrimaryColumn({ length: 255 })
    id: string;

    @Column({ type: "varchar", length: 128 })
    machineId: string;

    @Column({ type: "varchar", length: 128, nullable: true })
    instance: string | null;

    // idle, requesting, simulating, posting (backing-off and draining in later versions)
    @Column({ type: "varchar", length: 16 })
    state: string;

    @Column({ type: "int", nullable: true })
    runId: number | null;

    @Column({ type: "int", nullable: true })
    simConfigId: number | null;

    @Column({ type: "int", nullable: true })
    clockTick: number | null;

    @Column({ type: "int", nullable: true })
    totalClockTicks: number | null;

    @Column({ type: "timestamp", nullable: true })
    runStartedAt: Date | null;

    @Column({ type: "int", default: 0 })
    completedRuns: number;

    @Column({ type: "int", default: 0 })
    failedRuns: number;

    @Column({ type: "int", nullable: true })
    averageRunMs: number | null;

    @Column({ type: "text", nullable: true })
    lastError: string | null;

    @Column({ type: "int", nullable: true })
    memoryMb: number | null;

    // the node code's git commit
    @Column({ type: "varchar", length: 64, nullable: true })
    version: string | null;

    @Column({ type: "timestamp", nullable: true })
    startedAt: Date | null;

    @Column({ type: "timestamp" })
    lastHeartbeatAt: Date;
}
