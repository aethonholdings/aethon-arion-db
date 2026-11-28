import { SimConfig } from "./entities/sim-config.entity";
import { User } from "./entities/user.entity";
import { AuthorisedNode } from "./entities/authorised-node.entity";
import { NodeProcess } from "./entities/node-process.entity";
import { OrgConfig } from "./entities/org-config.entity";
import { Result } from "./entities/result.entity";
import { SimSet } from "./entities/sim-set.entity";
import { StateSpacePoint } from "./entities/state-space-point.entity";
import { SimConfigParams } from "./entities/sim-config-params.entity";
import { ConfiguratorParams } from "./entities/configurator-params.entity";
import { ConvergenceTest } from "./entities/convergence-test.entity";
import { OptimiserState } from "./entities/optimiser-state.entity";
import { Run } from "./entities/run.entity";

/** All Arion entity classes, for TypeORM `entities` configuration. */
export const entities = [
    SimConfig,
    OrgConfig,
    Result,
    SimSet,
    StateSpacePoint,
    SimConfigParams,
    ConfiguratorParams,
    ConvergenceTest,
    OptimiserState,
    Run,
    User,
    AuthorisedNode,
    NodeProcess
];
