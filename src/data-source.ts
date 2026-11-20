import { DataSource } from "typeorm";
import { entities } from "./entities";
import { migrations } from "./migrations";

/**
 * DataSource used only by the TypeORM CLI to generate and run migrations, e.g.
 *   ARION_DB_HOST=localhost ARION_DB_USER=root ARION_DB_PASSWORD=... ARION_DB_NAME=arion \
 *   npx typeorm-ts-node-commonjs migration:generate -d src/data-source.ts src/migrations/<Name>
 * The server runs the same migrations through its own TypeORM configuration (`migrations` export).
 */
export default new DataSource({
    type: "mysql",
    host: process.env.ARION_DB_HOST || "localhost",
    port: Number(process.env.ARION_DB_PORT || 3306),
    username: process.env.ARION_DB_USER || "root",
    password: process.env.ARION_DB_PASSWORD || "",
    database: process.env.ARION_DB_NAME || "arion",
    synchronize: false,
    entities: entities,
    migrations: migrations
});
