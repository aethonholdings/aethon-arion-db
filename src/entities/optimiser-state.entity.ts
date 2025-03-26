import { OptimiserData, StateType } from "aethon-arion-pipeline";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { SimSet } from "./sim-set.entity";
import { ConvergenceTest } from "./convergence-test.entity";

@Entity()
export class OptimiserState extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SimSet, (simSet) => simSet.optimiserStates, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "simSetId", referencedColumnName: "id" })
    simSet: SimSet;

    @ManyToMany(() => ConvergenceTest, (convergenceTest) => convergenceTest.optimiserStates)
    @JoinTable()
    convergenceTests: ConvergenceTest[];

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

    @Column({ type: "json", nullable: true })
    convergenceTestIds: number[];
}
