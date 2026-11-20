import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SimConfig } from "./sim-config.entity";
import { ConfiguratorParams } from "./configurator-params.entity";

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

    // 1-based index of the org config within its convergence test; seeds its random draws so that replicate k of
    // every optimiser point shares the same draws (common random numbers). Null for older records
    @Column({ nullable: true })
    replicate: number;

    // model-specific diagnostics computed by the configurator (e.g. C1 influence stability and consensus time)
    @Column({ type: "json", nullable: true })
    diagnostics: any;

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

    @Column({ type: "double" })
    priorityIntensity: number;

    @Column({ type: "double" })
    influenceIntensity: number;

    @Column({ type: "double" })
    judgmentIntensity: number;

    @Column({ type: "double" })
    incentiveIntensity: number;

    @Column({ nullable: false})
    type: string;

}
