import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ConvergenceTest } from "./convergence-test.entity";
import { OrgConfig } from "./org-config.entity";
import { ConfiguratorParamsDTO } from "aethon-arion-pipeline";

@Entity()
@Unique(["configuratorName", "hash"])
export class ConfiguratorParams extends BaseEntity implements ConfiguratorParamsDTO {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => ConvergenceTest, (convergenceTest) => convergenceTest.simConfigParams)
    convergenceTests: ConvergenceTest[];

    @OneToMany(() => OrgConfig, (orgConfig) => orgConfig.configuratorParams)
    orgConfigs: OrgConfig[];

    @Column({ nullable: false })
    @Index("CONFIGURATOR_NAME")
    configuratorName: string;

    @Column({ type: "json", nullable: true })
    data: any;

    @Column({ nullable: false })
    @Index("HASH")
    hash: string;
}
