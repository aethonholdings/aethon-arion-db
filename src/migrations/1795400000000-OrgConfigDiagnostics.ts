import { MigrationInterface, QueryRunner } from "typeorm";

/** Configurator diagnostics on org configs (C1: influence stability and consensus time). */
export class OrgConfigDiagnostics1795400000000 implements MigrationInterface {
    name = "OrgConfigDiagnostics1795400000000";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `org_config` ADD `diagnostics` json NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `org_config` DROP COLUMN `diagnostics`");
    }
}
