import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ConvergenceTest } from "./convergence-test.entity";
import { OrgConfig } from "./org-config.entity";
import { ConfiguratorParamsDTO } from "aethon-arion-pipeline";

@Entity()
@Unique(["configuratorName", "configuratorParams"])
export class ConfiguratorParams extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => ConvergenceTest, (convergenceTest) => convergenceTest.simConfigParams)
    convergenceTests: ConvergenceTest[];

    @OneToMany(() => OrgConfig, (orgConfig) => orgConfig.orgConfigParams)
    orgConfigs: OrgConfig[];

    @Column({ nullable: false })
    @Index("CONFIGURATORNAME")
    configuratorName: string;

    @Column({ type: "json", nullable: true })
    configuratorParams: ConfiguratorParamsDTO;
}
