import { MigrationInterface, QueryRunner } from "typeorm";

export class Baseline1795204842990 implements MigrationInterface {
    name = 'Baseline1795204842990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // databases created before migrations were introduced (via synchronize) already have this schema;
        // in that case the baseline is only recorded as applied
        if (await queryRunner.hasTable("sim_set")) return;
        await queryRunner.query(`CREATE TABLE \`optimiser_state\` (\`id\` int NOT NULL AUTO_INCREMENT, \`stepCount\` int NOT NULL, \`modelName\` varchar(255) NOT NULL, \`optimiserName\` varchar(255) NOT NULL, \`start\` timestamp NOT NULL, \`end\` timestamp NULL, \`durationSec\` int NULL, \`percentComplete\` int NULL, \`status\` varchar(255) NOT NULL, \`optimiserData\` json NULL, \`converged\` tinyint NOT NULL, \`performance\` int NULL, \`simSetId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sim_set\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` longtext NULL, \`modelName\` varchar(255) NOT NULL, \`optimiserName\` varchar(255) NOT NULL, \`configuratorName\` varchar(255) NOT NULL, \`optimiserParams\` json NOT NULL, \`state\` varchar(255) NOT NULL, \`currentOptimiserStateId\` int NULL, \`simConfigParamsId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sim_config_params\` (\`id\` int NOT NULL AUTO_INCREMENT, \`days\` int NOT NULL, \`randomStreamType\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_67431113165373d6f28683b533\` (\`days\`, \`randomStreamType\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`convergence_test\` (\`id\` int NOT NULL AUTO_INCREMENT, \`orgConfigCount\` int NOT NULL DEFAULT '0', \`simConfigCount\` int NOT NULL DEFAULT '0', \`completedSimConfigCount\` int NOT NULL DEFAULT '0', \`resultCount\` int NOT NULL DEFAULT '0', \`dispatchedRuns\` int NOT NULL DEFAULT '0', \`avgPerformance\` float NULL, \`stdDevPerformance\` float NULL, \`state\` varchar(255) NOT NULL DEFAULT 'pending', \`converged\` tinyint NOT NULL DEFAULT 0, \`simConfigParamsId\` int NULL, \`configuratorParamsId\` int NULL, UNIQUE INDEX \`IDX_8ad3ae23e477398251039a05ad\` (\`simConfigParamsId\`, \`configuratorParamsId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`configurator_params\` (\`id\` int NOT NULL AUTO_INCREMENT, \`modelName\` varchar(255) NOT NULL, \`configuratorName\` varchar(255) NOT NULL, \`data\` json NULL, \`hash\` varchar(255) NOT NULL, \`multipleOrgConfigs\` tinyint NOT NULL, INDEX \`MODEL_NAME\` (\`modelName\`), INDEX \`CONFIGURATOR_NAME\` (\`configuratorName\`), INDEX \`HASH\` (\`hash\`), UNIQUE INDEX \`IDX_260dfcfe7f2e844a0022ee29e7\` (\`configuratorName\`, \`hash\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`org_config\` (\`id\` int NOT NULL AUTO_INCREMENT, \`clockTickSeconds\` int NOT NULL, \`agentCount\` int NOT NULL, \`board\` json NOT NULL, \`agentSet\` json NOT NULL, \`plant\` json NOT NULL, \`reporting\` json NOT NULL, \`priorityIntensity\` float NOT NULL, \`influenceIntensity\` float NOT NULL, \`judgmentIntensity\` float NOT NULL, \`incentiveIntensity\` float NOT NULL, \`type\` varchar(255) NOT NULL, \`configuratorParamsId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`state_space_point\` (\`id\` int NOT NULL AUTO_INCREMENT, \`clockTick\` int NOT NULL, \`resultId\` int NOT NULL, \`board\` json NOT NULL, \`agentStates\` json NOT NULL, \`plant\` json NOT NULL, \`reporting\` json NOT NULL, \`priorityTensor\` json NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`result\` (\`id\` int NOT NULL AUTO_INCREMENT, \`simConfigId\` int NOT NULL, \`orgConfigId\` int NOT NULL, \`runCount\` int NOT NULL, \`nodeId\` varchar(255) NOT NULL, \`start\` timestamp NOT NULL, \`end\` timestamp NOT NULL, \`durationSec\` int NOT NULL, \`clockTick\` int NOT NULL, \`board\` json NOT NULL, \`agentStates\` json NOT NULL, \`priorityTensor\` json NOT NULL, \`plant\` json NOT NULL, \`reporting\` json NOT NULL, \`priorityIntensity\` float NOT NULL, \`performance\` float NOT NULL, \`agentCount\` int NOT NULL, \`modelName\` varchar(255) NOT NULL, \`configuratorName\` varchar(255) NOT NULL, \`configuratorParams\` json NOT NULL, INDEX \`SIMCONFIG\` (\`simConfigId\`), INDEX \`ORGCONFIG\` (\`orgConfigId\`), INDEX \`MODELNAME\` (\`modelName\`), INDEX \`CONFIGURATORNAME\` (\`configuratorName\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sim_config\` (\`id\` int NOT NULL AUTO_INCREMENT, \`orgConfigId\` int NOT NULL, \`simConfigParamsId\` int NOT NULL, \`convergenceTestId\` int NOT NULL, \`dispatchedRuns\` int NOT NULL, \`runCount\` int NOT NULL, \`start\` timestamp NULL, \`end\` timestamp NULL, \`durationSec\` int NULL, \`avgPerformance\` float NULL, \`stdDevPerformance\` float NULL, \`entropy\` float NULL, \`converged\` tinyint NOT NULL DEFAULT 0, \`state\` varchar(255) NOT NULL DEFAULT 'pending', \`saveStateSpace\` tinyint NOT NULL DEFAULT 0, \`days\` int NOT NULL, \`randomStreamType\` varchar(255) NOT NULL, INDEX \`ORGCONFIG\` (\`orgConfigId\`), INDEX \`SIMCONFIGPARAMS\` (\`simConfigParamsId\`), INDEX \`CONVERGENCETEST\` (\`convergenceTestId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`optimiser_state_convergence_tests_convergence_test\` (\`optimiserStateId\` int NOT NULL, \`convergenceTestId\` int NOT NULL, INDEX \`IDX_bd76d112422369544bfe103c75\` (\`optimiserStateId\`), INDEX \`IDX_df95b901b183877959ccac8908\` (\`convergenceTestId\`), PRIMARY KEY (\`optimiserStateId\`, \`convergenceTestId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`optimiser_state\` ADD CONSTRAINT \`FK_2f61911b0e2b0e3072a101e7c08\` FOREIGN KEY (\`simSetId\`) REFERENCES \`sim_set\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sim_set\` ADD CONSTRAINT \`FK_0763ad6dba726a9af9547b6810c\` FOREIGN KEY (\`simConfigParamsId\`) REFERENCES \`sim_config_params\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`convergence_test\` ADD CONSTRAINT \`FK_b36614bf46f54b36e3c7de2ff0d\` FOREIGN KEY (\`simConfigParamsId\`) REFERENCES \`sim_config_params\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`convergence_test\` ADD CONSTRAINT \`FK_85f8eb801377fc7d1174fdff3ac\` FOREIGN KEY (\`configuratorParamsId\`) REFERENCES \`configurator_params\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`org_config\` ADD CONSTRAINT \`FK_8eb8dca8cdbd08aaa89e63270d7\` FOREIGN KEY (\`configuratorParamsId\`) REFERENCES \`configurator_params\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`state_space_point\` ADD CONSTRAINT \`FK_ddbbe392a38c76e090a9b49f0bb\` FOREIGN KEY (\`resultId\`) REFERENCES \`result\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`result\` ADD CONSTRAINT \`FK_d21a33971a674bc57ee28248a4e\` FOREIGN KEY (\`simConfigId\`) REFERENCES \`sim_config\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sim_config\` ADD CONSTRAINT \`FK_fc7a41786d164c24f365114b427\` FOREIGN KEY (\`orgConfigId\`) REFERENCES \`org_config\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sim_config\` ADD CONSTRAINT \`FK_73c592adf6fde3ccfb9d8f54cdf\` FOREIGN KEY (\`simConfigParamsId\`) REFERENCES \`sim_config_params\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sim_config\` ADD CONSTRAINT \`FK_2ef87372a67aab23185db125f81\` FOREIGN KEY (\`convergenceTestId\`) REFERENCES \`convergence_test\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`optimiser_state_convergence_tests_convergence_test\` ADD CONSTRAINT \`FK_bd76d112422369544bfe103c75c\` FOREIGN KEY (\`optimiserStateId\`) REFERENCES \`optimiser_state\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`optimiser_state_convergence_tests_convergence_test\` ADD CONSTRAINT \`FK_df95b901b183877959ccac89081\` FOREIGN KEY (\`convergenceTestId\`) REFERENCES \`convergence_test\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`optimiser_state_convergence_tests_convergence_test\` DROP FOREIGN KEY \`FK_df95b901b183877959ccac89081\``);
        await queryRunner.query(`ALTER TABLE \`optimiser_state_convergence_tests_convergence_test\` DROP FOREIGN KEY \`FK_bd76d112422369544bfe103c75c\``);
        await queryRunner.query(`ALTER TABLE \`sim_config\` DROP FOREIGN KEY \`FK_2ef87372a67aab23185db125f81\``);
        await queryRunner.query(`ALTER TABLE \`sim_config\` DROP FOREIGN KEY \`FK_73c592adf6fde3ccfb9d8f54cdf\``);
        await queryRunner.query(`ALTER TABLE \`sim_config\` DROP FOREIGN KEY \`FK_fc7a41786d164c24f365114b427\``);
        await queryRunner.query(`ALTER TABLE \`result\` DROP FOREIGN KEY \`FK_d21a33971a674bc57ee28248a4e\``);
        await queryRunner.query(`ALTER TABLE \`state_space_point\` DROP FOREIGN KEY \`FK_ddbbe392a38c76e090a9b49f0bb\``);
        await queryRunner.query(`ALTER TABLE \`org_config\` DROP FOREIGN KEY \`FK_8eb8dca8cdbd08aaa89e63270d7\``);
        await queryRunner.query(`ALTER TABLE \`convergence_test\` DROP FOREIGN KEY \`FK_85f8eb801377fc7d1174fdff3ac\``);
        await queryRunner.query(`ALTER TABLE \`convergence_test\` DROP FOREIGN KEY \`FK_b36614bf46f54b36e3c7de2ff0d\``);
        await queryRunner.query(`ALTER TABLE \`sim_set\` DROP FOREIGN KEY \`FK_0763ad6dba726a9af9547b6810c\``);
        await queryRunner.query(`ALTER TABLE \`optimiser_state\` DROP FOREIGN KEY \`FK_2f61911b0e2b0e3072a101e7c08\``);
        await queryRunner.query(`DROP INDEX \`IDX_df95b901b183877959ccac8908\` ON \`optimiser_state_convergence_tests_convergence_test\``);
        await queryRunner.query(`DROP INDEX \`IDX_bd76d112422369544bfe103c75\` ON \`optimiser_state_convergence_tests_convergence_test\``);
        await queryRunner.query(`DROP TABLE \`optimiser_state_convergence_tests_convergence_test\``);
        await queryRunner.query(`DROP INDEX \`CONVERGENCETEST\` ON \`sim_config\``);
        await queryRunner.query(`DROP INDEX \`SIMCONFIGPARAMS\` ON \`sim_config\``);
        await queryRunner.query(`DROP INDEX \`ORGCONFIG\` ON \`sim_config\``);
        await queryRunner.query(`DROP TABLE \`sim_config\``);
        await queryRunner.query(`DROP INDEX \`CONFIGURATORNAME\` ON \`result\``);
        await queryRunner.query(`DROP INDEX \`MODELNAME\` ON \`result\``);
        await queryRunner.query(`DROP INDEX \`ORGCONFIG\` ON \`result\``);
        await queryRunner.query(`DROP INDEX \`SIMCONFIG\` ON \`result\``);
        await queryRunner.query(`DROP TABLE \`result\``);
        await queryRunner.query(`DROP TABLE \`state_space_point\``);
        await queryRunner.query(`DROP TABLE \`org_config\``);
        await queryRunner.query(`DROP INDEX \`IDX_260dfcfe7f2e844a0022ee29e7\` ON \`configurator_params\``);
        await queryRunner.query(`DROP INDEX \`HASH\` ON \`configurator_params\``);
        await queryRunner.query(`DROP INDEX \`CONFIGURATOR_NAME\` ON \`configurator_params\``);
        await queryRunner.query(`DROP INDEX \`MODEL_NAME\` ON \`configurator_params\``);
        await queryRunner.query(`DROP TABLE \`configurator_params\``);
        await queryRunner.query(`DROP INDEX \`IDX_8ad3ae23e477398251039a05ad\` ON \`convergence_test\``);
        await queryRunner.query(`DROP TABLE \`convergence_test\``);
        await queryRunner.query(`DROP INDEX \`IDX_67431113165373d6f28683b533\` ON \`sim_config_params\``);
        await queryRunner.query(`DROP TABLE \`sim_config_params\``);
        await queryRunner.query(`DROP TABLE \`sim_set\``);
        await queryRunner.query(`DROP TABLE \`optimiser_state\``);
    }

}
