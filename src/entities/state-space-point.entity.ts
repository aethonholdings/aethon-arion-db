import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Result } from "./result.entity";
import { ConfiguratorParamData, StateSpacePointDTO } from "aethon-arion-pipeline";

@Entity()
export class StateSpacePoint<T extends ConfiguratorParamData> extends BaseEntity implements StateSpacePointDTO<T> {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    clockTick: number;

    @ManyToOne(() => Result, (result) => result.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: "resultId" })
    result: Result<T>;

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
