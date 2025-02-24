import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SimConfig } from "./sim-config.entity";
import { ConfiguratorParamData, OrgConfigDTO } from "aethon-arion-pipeline";
import { ConfiguratorParams } from "./configurator-params.entity";

@Entity()
export class OrgConfig<T extends ConfiguratorParamData> extends BaseEntity implements OrgConfigDTO<T> {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => SimConfig, (simConfig) => simConfig.orgConfig)
    simConfigs: SimConfig<T>[];

    @ManyToOne(() => ConfiguratorParams, (configuratorParams) => configuratorParams.orgConfigs, { onDelete: "CASCADE" })
    @JoinColumn({ name: "configuratorParamsId" })
    configuratorParams: ConfiguratorParams<T>;

    @Column({ nullable: false })
    @Index("CONFIGURATORNAME")
    configuratorName: string;

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
}
