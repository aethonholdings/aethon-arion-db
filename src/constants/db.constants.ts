import { StateSpacePoint } from "aethon-arion-pipeline";
import { ConfiguratorParams } from "../entities/configurator-params.entity";
import { ConvergenceTest } from "../entities/convergence-test.entity";
import { OrgConfig } from "../entities/org-config.entity";
import { Result } from "../entities/result.entity";
import { SimConfigParams } from "../entities/sim-config-params.entity";
import { SimConfig } from "../entities/sim-config.entity";
import { SimSet } from "../entities/sim-set.entity";

export const entities = [
    SimSet,
    SimConfig,
    OrgConfig,
    ConfiguratorParams,
    ConvergenceTest,
    SimConfigParams,
    Result,
    StateSpacePoint
];
