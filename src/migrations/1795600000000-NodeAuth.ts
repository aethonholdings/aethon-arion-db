import { MigrationInterface, QueryRunner } from "typeorm";

/** Operator accounts and authorised calculation nodes (node authentication). */
export class NodeAuth1795600000000 implements MigrationInterface {
    name = "NodeAuth1795600000000";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "CREATE TABLE `user` (" +
                "`id` int NOT NULL AUTO_INCREMENT, " +
                "`username` varchar(64) NOT NULL, " +
                "`passwordHash` varchar(255) NOT NULL, " +
                "`createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
                "`disabledAt` timestamp NULL, " +
                "UNIQUE INDEX `USERNAME` (`username`), " +
                "PRIMARY KEY (`id`)) ENGINE=InnoDB"
        );
        await queryRunner.query(
            "CREATE TABLE `authorised_node` (" +
                "`id` varchar(128) NOT NULL, " +
                "`keyHash` char(64) NOT NULL, " +
                "`hostname` varchar(255) NULL, " +
                "`authorisedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
                "`authorisedByUserId` int NULL, " +
                "`lastSeenAt` timestamp NULL, " +
                "`revokedAt` timestamp NULL, " +
                "UNIQUE INDEX `KEYHASH` (`keyHash`), " +
                "PRIMARY KEY (`id`)) ENGINE=InnoDB"
        );
        await queryRunner.query(
            "ALTER TABLE `authorised_node` ADD CONSTRAINT `FK_authorised_node_user` FOREIGN KEY (`authorisedByUserId`) " +
                "REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `authorised_node` DROP FOREIGN KEY `FK_authorised_node_user`");
        await queryRunner.query("DROP TABLE `authorised_node`");
        await queryRunner.query("DROP TABLE `user`");
    }
}
