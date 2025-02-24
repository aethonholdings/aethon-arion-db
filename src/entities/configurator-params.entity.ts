import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ConvergenceTest } from "./convergence-test.entity";
import { OrgConfig } from "./org-config.entity";
import { ConfiguratorParamData, ConfiguratorParamsDTO } from "aethon-arion-pipeline";

@Entity()
@Unique(["configuratorName", "hash"])
export class ConfiguratorParams<T extends ConfiguratorParamData> extends BaseEntity implements ConfiguratorParamsDTO<T> {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => ConvergenceTest, (convergenceTest) => convergenceTest.simConfigParams)
    convergenceTests: ConvergenceTest<T>[];

    @OneToMany(() => OrgConfig, (orgConfig) => orgConfig.configuratorParams)
    orgConfigs: OrgConfig<T>[];

    @Column({ nullable: false })
    @Index("MODEL_NAME")
    modelName: string;

    @Column({ nullable: false })
    @Index("CONFIGURATOR_NAME")
    configuratorName: string;

    @Column({ type: "json", nullable: true })
    data: T;

    @Column()
    @Index("HASH")
    hash: string;
}
