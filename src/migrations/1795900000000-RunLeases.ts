import { MigrationInterface, QueryRunner } from "typeorm";

/** Run leases (node plan step 2.2). */
export class RunLeases1795900000000 implements MigrationInterface {
    name = "RunLeases1795900000000";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `run` ADD `leaseExpiresAt` timestamp NULL, ADD `reissueCount` int NOT NULL DEFAULT 0");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `run` DROP COLUMN `reissueCount`, DROP COLUMN `leaseExpiresAt`");
    }
}
