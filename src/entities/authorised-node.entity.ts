import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

/**
 * A calculation node authorised to request jobs and post results. Keyed by the node's machine id (stable across
 * restarts; the node's full id adds a per-process instance suffix). The node holds a random key; only its SHA-256
 * hash is stored. A key stays valid until it is revoked or replaced by a new authorisation of the same node.
 */
@Entity({ name: "authorised_node" })
@Index("KEYHASH", ["keyHash"], { unique: true })
export class AuthorisedNode extends BaseEntity {
    @PrimaryColumn({ length: 128 })
    id: string;

    @Column({ type: "char", length: 64 })
    keyHash: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    hostname: string | null;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    authorisedAt: Date;

    @ManyToOne(() => User, { onDelete: "SET NULL", nullable: true })
    @JoinColumn({ name: "authorisedByUserId", referencedColumnName: "id" })
    authorisedBy: User | null;

    @Column({ type: "int", nullable: true })
    authorisedByUserId: number | null;

    @Column({ type: "timestamp", nullable: true })
    lastSeenAt: Date | null;

    @Column({ type: "timestamp", nullable: true })
    revokedAt: Date | null;
}
