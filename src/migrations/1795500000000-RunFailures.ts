import { MigrationInterface, QueryRunner } from "typeorm";

/** Failure reports on run tickets. */
export class RunFailures1795500000000 implements MigrationInterface {
    name = "RunFailures1795500000000";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `run` ADD `failedAt` timestamp NULL, ADD `error` text NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `run` DROP COLUMN `error`, DROP COLUMN `failedAt`");
    }
}
