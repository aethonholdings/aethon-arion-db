import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

/**
 * An operator account. Its credentials authorise calculation nodes (see AuthorisedNode). Created and disabled with the
 * server command line; the password is stored only as an scrypt hash (`scrypt$<N>$<r>$<p>$<salt>$<hash>`, base64).
 */
@Entity()
@Index("USERNAME", ["username"], { unique: true })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 64 })
    username: string;

    @Column({ length: 255 })
    passwordHash: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    // a disabled user can no longer authorise nodes; nodes it authorised keep their keys until revoked
    @Column({ type: "timestamp", nullable: true })
    disabledAt: Date | null;
}
