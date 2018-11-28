import {
    Table, Column, Model, PrimaryKey, IsEmail, AutoIncrement, DataType, AllowNull, Unique, Default, HasMany
} from 'sequelize-typescript';
import Vote from './Vote';
import UserVote from './UserVote';

export enum Role {
    USER = 'user',
    MANAGER = 'manager'
}

@Table({
    timestamps: true
})
export default class User extends Model<User> {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @AllowNull(false)
    @IsEmail
    @Unique
    @Column
    email: string;

    @AllowNull(false)
    @Column
    password: string;

    @AllowNull(false)
    @Unique
    @Column
    nickname: string;

    @Default(Role.USER)
    @Column(DataType.ENUM(Role.USER, Role.MANAGER))
    role: Role;

    @Default(true)
    @Column
    isActive: boolean;

    @HasMany(() => Vote)
    votes: Vote[];

    @HasMany(() => UserVote)
    userVotes: UserVote[];

    toJSON() {
        return {
            id: this.id,
            email: this.email,
            nickname: this.nickname,
            role: this.role,
            isActive: this.isActive,
            votes: this.votes,
            userVotes: this.userVotes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}
