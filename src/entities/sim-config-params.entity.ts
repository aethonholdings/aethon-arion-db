import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ConvergenceTest } from "./convergence-test.entity";
import { SimConfig } from "./sim-config.entity";
import { ConfiguratorParamData, RandomStreamType, SimConfigParamsDTO } from "aethon-arion-pipeline";

@Entity()
@Unique(["days", "randomStreamType"])
export class SimConfigParams<T extends ConfiguratorParamData> extends BaseEntity implements SimConfigParamsDTO<T> {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => ConvergenceTest, (convergenceTest) => convergenceTest.simConfigParams)
    convergenceTests: ConvergenceTest<T>[];

    @OneToMany(() => SimConfig, (simConfig) => simConfig.simConfigParams)
    simConfigs: SimConfig<T>[];

    @Column()
    days: number;

    @Column()
    randomStreamType: RandomStreamType;
}
