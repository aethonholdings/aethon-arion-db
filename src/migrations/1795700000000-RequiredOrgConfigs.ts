import { MigrationInterface, QueryRunner } from "typeorm";

/** Minimum org configs per convergence test, for optimisers that need more than the server default. */
export class RequiredOrgConfigs1795700000000 implements MigrationInterface {
    name = "RequiredOrgConfigs1795700000000";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `convergence_test` ADD `requiredOrgConfigs` int NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `convergence_test` DROP COLUMN `requiredOrgConfigs`");
    }
}
