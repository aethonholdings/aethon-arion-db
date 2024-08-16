import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Result } from "./result.entity";

@Entity()
export class StateSpacePoint extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    clockTick: number;

    @ManyToOne(() => Result, (result) => result.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: "resultId" })
    result: Result;

    @Column()
    resultId: number;

    @Column({ type: "json" })
    board: any;

    @Column({ type: "json" })
    agentStates: number[];

    @Column({ type: "json" })
    plant: number[];

    @Column({ type: "json" })
    reporting: number[];

    @Column({ type: "json" })
    priorityTensor: number[][][];

}

