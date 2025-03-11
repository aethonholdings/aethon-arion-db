import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SimConfig } from "./sim-config.entity";
import { ConfiguratorParams } from "./configurator-params.entity";
import { OrgConfigDTO } from "aethon-arion-pipeline";

@Entity()
export class OrgConfig extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => SimConfig, (simConfig) => simConfig.orgConfig)
    simConfigs: SimConfig[];

    @ManyToOne(() => ConfiguratorParams, (configuratorParams) => configuratorParams.orgConfigs, {
        onDelete: "CASCADE",
        eager: true
    })
    @JoinColumn({ name: "configuratorParamsId" })
    configuratorParams: ConfiguratorParams;

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

    toDTO(): OrgConfigDTO {
        const tmp: any = {
            ...this,
            type: this.configuratorParams.modelName,
            configuratorName: this.configuratorParams.configuratorName,
            simConfigs: this.simConfigs
                ? this.simConfigs.map((simConfig) => {
                      simConfig.toDTO();
                  })
                : null
        };
        return tmp as OrgConfigDTO;
    }
}
