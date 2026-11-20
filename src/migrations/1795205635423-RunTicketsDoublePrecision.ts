import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * Run dispatch tickets, idempotent result posting, model versioning, a dispatch index, and double precision for
 * performance statistics and durations.
 *
 * Hand-written: the TypeORM generator emits DROP COLUMN + ADD COLUMN for type changes on MySQL, which would delete
 * the data. MODIFY COLUMN converts in place (int/float to double is lossless).
 */
export class RunTicketsDoublePrecision1795205635423 implements MigrationInterface {
    name = "RunTicketsDoublePrecision1795205635423";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "CREATE TABLE `run` (" +
                "`id` int NOT NULL AUTO_INCREMENT, `simConfigId` int NOT NULL, `runIndex` int NOT NULL, " +
                "`nodeId` varchar(255) NOT NULL, `dispatchedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
                "`completedAt` timestamp NULL, `resultId` int NULL, " +
                "UNIQUE INDEX `SIMCONFIG_RUNINDEX` (`simConfigId`, `runIndex`), PRIMARY KEY (`id`), " +
                "CONSTRAINT `FK_RUN_SIMCONFIG` FOREIGN KEY (`simConfigId`) REFERENCES `sim_config`(`id`) " +
                "ON DELETE CASCADE ON UPDATE NO ACTION" +
                ") ENGINE=InnoDB"
        );
        await queryRunner.query("ALTER TABLE `configurator_params` ADD `modelVersion` varchar(255) NULL");
        await queryRunner.query(
            "ALTER TABLE `result` ADD `runId` int NULL, ADD `late` tinyint NOT NULL DEFAULT 0, " +
                "ADD UNIQUE INDEX `RUN` (`runId`), " +
                "MODIFY `durationSec` double NOT NULL, MODIFY `priorityIntensity` double NOT NULL, " +
                "MODIFY `performance` double NULL"
        );
        await queryRunner.query(
            "ALTER TABLE `optimiser_state` MODIFY `durationSec` double NULL, MODIFY `performance` double NULL"
        );
        await queryRunner.query(
            "ALTER TABLE `convergence_test` MODIFY `avgPerformance` double NULL, MODIFY `stdDevPerformance` double NULL"
        );
        await queryRunner.query(
            "ALTER TABLE `org_config` MODIFY `priorityIntensity` double NOT NULL, " +
                "MODIFY `influenceIntensity` double NOT NULL, MODIFY `judgmentIntensity` double NOT NULL, " +
                "MODIFY `incentiveIntensity` double NOT NULL"
        );
        await queryRunner.query(
            "ALTER TABLE `sim_config` MODIFY `durationSec` double NULL, MODIFY `avgPerformance` double NULL, " +
                "MODIFY `stdDevPerformance` double NULL, MODIFY `entropy` double NULL, " +
                "ADD INDEX `DISPATCH` (`converged`, `convergenceTestId`, `id`)"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE `sim_config` DROP INDEX `DISPATCH`, MODIFY `durationSec` int NULL, " +
                "MODIFY `avgPerformance` float NULL, MODIFY `stdDevPerformance` float NULL, MODIFY `entropy` float NULL"
        );
        await queryRunner.query(
            "ALTER TABLE `org_config` MODIFY `priorityIntensity` float NOT NULL, " +
                "MODIFY `influenceIntensity` float NOT NULL, MODIFY `judgmentIntensity` float NOT NULL, " +
                "MODIFY `incentiveIntensity` float NOT NULL"
        );
        await queryRunner.query(
            "ALTER TABLE `convergence_test` MODIFY `avgPerformance` float NULL, MODIFY `stdDevPerformance` float NULL"
        );
        await queryRunner.query(
            "ALTER TABLE `optimiser_state` MODIFY `durationSec` int NULL, MODIFY `performance` int NULL"
        );
        await queryRunner.query(
            "ALTER TABLE `result` DROP INDEX `RUN`, DROP COLUMN `late`, DROP COLUMN `runId`, " +
                "MODIFY `durationSec` int NOT NULL, MODIFY `priorityIntensity` float NOT NULL, " +
                "MODIFY `performance` float NOT NULL"
        );
        await queryRunner.query("ALTER TABLE `configurator_params` DROP COLUMN `modelVersion`");
        await queryRunner.query("DROP TABLE `run`");
    }
}
