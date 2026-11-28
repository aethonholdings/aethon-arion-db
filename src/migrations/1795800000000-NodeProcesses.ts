import { MigrationInterface, QueryRunner } from "typeorm";

/** Node process heartbeats (node plan step 1.3). */
export class NodeProcesses1795800000000 implements MigrationInterface {
    name = "NodeProcesses1795800000000";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "CREATE TABLE `node_process` (" +
                "`id` varchar(255) NOT NULL, `machineId` varchar(128) NOT NULL, `instance` varchar(128) NULL, " +
                "`state` varchar(16) NOT NULL, `runId` int NULL, `simConfigId` int NULL, `clockTick` int NULL, " +
                "`totalClockTicks` int NULL, `runStartedAt` timestamp NULL, `completedRuns` int NOT NULL DEFAULT 0, " +
                "`failedRuns` int NOT NULL DEFAULT 0, `averageRunMs` int NULL, `lastError` text NULL, `memoryMb` int NULL, " +
                "`version` varchar(64) NULL, `startedAt` timestamp NULL, `lastHeartbeatAt` timestamp NOT NULL, " +
                "INDEX `MACHINE` (`machineId`), PRIMARY KEY (`id`)) ENGINE=InnoDB"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `node_process`");
    }
}
