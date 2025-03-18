import { OptimiserData, StateType } from "aethon-arion-pipeline";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SimSet } from "./sim-set.entity";

@Entity()
export class OptimiserState extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SimSet, (simSet) => simSet.modelStates)
    @JoinColumn({ name: "simSetId", referencedColumnName: "id" })
    simSet: SimSet;

    @Column({ nullable: false })
    step: number;

    @Column({ type: "timestamp" })
    start: Date;

    @Column({ type: "timestamp" })
    end: Date;

    @Column({ nullable: true })
    durationSec: number;

    @Column({ nullable: true })
    percentComplete: number;

    @Column({ nullable: false })
    status: StateType;

    @Column({ type: "json", nullable: true })
    state: OptimiserData;
}
