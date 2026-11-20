import { MigrationInterface, QueryRunner } from "typeorm";

/** Org config replicate index and simulation parameter seed, for common random numbers across optimiser points. */
export class CommonRandomNumbers1795300000000 implements MigrationInterface {
    name = "CommonRandomNumbers1795300000000";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `org_config` ADD `replicate` int NULL");
        await queryRunner.query("ALTER TABLE `sim_config_params` ADD `seed` int NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `sim_config_params` DROP COLUMN `seed`");
        await queryRunner.query("ALTER TABLE `org_config` DROP COLUMN `replicate`");
    }
}
