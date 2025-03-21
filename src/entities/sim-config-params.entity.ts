import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ConvergenceTest } from "./convergence-test.entity";
import { SimConfig } from "./sim-config.entity";
import { RandomStreamType } from "aethon-arion-pipeline";
import { SimSet } from "./sim-set.entity";

@Entity()
@Unique(["days", "randomStreamType"])
export class SimConfigParams extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => ConvergenceTest, (convergenceTest) => convergenceTest.simConfigParams)
    convergenceTests: ConvergenceTest[];

    @OneToMany(() => SimConfig, (simConfig) => simConfig.simConfigParams)
    simConfigs: SimConfig[];

    @OneToMany(() => SimSet, (simConfig) => simConfig.simConfigParams)
    simSets: SimSet[];

    @Column()
    days: number;

    @Column()
    randomStreamType: RandomStreamType;
}
