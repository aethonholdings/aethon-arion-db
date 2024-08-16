import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SimConfig } from "./sim-config.entity";
import { ConfiguratorParamsDTO } from "@arion/pipeline";

@Entity()
export class OrgConfig extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => SimConfig, (simConfig) => simConfig.orgConfig)
    simConfigs: SimConfig[];

    @Column()
    type: string;

    @Column()
    clockTickSeconds: number;

    @Column()
    agentCount: number;

    @Column({ type: "json" })
    board: any;

    @Column({ type: "json" })
    agentSet: {
        priorityTensor: number[][][];
        influenceTensor: number[][][][];
        judgmentTensor: number[][][][];
        incentiveTensor: number[][][][];
    };

    @Column({ type: "json" })
    plant: any;

    @Column({ type: "json" })
    reporting: any;

    @Column({ type: "float" })
    priorityIntensity: number;

    @Column({ type: "float" })
    influenceIntensity: number;

    @Column({ type: "float" })
    judgmentIntensity: number;

    @Column({ type: "float" })
    incentiveIntensity: number;

    @Column({ nullable: false})
    @Index("CONFIGURATORNAME")
    configuratorName: string;

    @Column({ type: "json", nullable: true })
    configuratorParams: ConfiguratorParamsDTO;
}
