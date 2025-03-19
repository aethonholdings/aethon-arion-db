import { OptimiserData, StateType } from "aethon-arion-pipeline";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { SimSet } from "./sim-set.entity";

@Entity()
export class OptimiserState extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SimSet, (simSet) => simSet.optimiserStates, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "simSetId", referencedColumnName: "id" })
    simSet: SimSet;

    @Column({ nullable: false })
    stepCount: number;

    @Column({ nullable: false })
    modelName: string;

    @Column({ nullable: false })
    optimiserName: string;

    @Column({ type: "timestamp" })
    start: Date;

    @Column({ type: "timestamp", nullable: true })
    end: Date;

    @Column({ nullable: true })
    durationSec: number;

    @Column({ nullable: true })
    percentComplete: number;

    @Column({ nullable: false })
    status: StateType;

    @Column({ type: "json", nullable: true })
    optimiserData: OptimiserData;

    @Column({ nullable: false })
    converged: boolean;
}
