import {
    Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, DataType, AllowNull, Default, HasMany, IsDate
} from 'sequelize-typescript';
import User from './User';
import { json } from 'sequelize';
import UserVote from './UserVote';

@Table({
    timestamps: true
})
export default class Vote extends Model<Vote> {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column
    user: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    title: string;

    @AllowNull(false)
    @Column(DataType.JSON)
    content: json;

    @Default(false)
    @Column
    private: boolean;

    @Column
    password: string;

    @Default(false)
    @Column
    anonymous: boolean;

    @Default(true)
    @Column
    isActive: boolean;

    @AllowNull(false)
    @IsDate
    @Column
    endAt: Date;

    @HasMany(() => UserVote)
    userVotes: UserVote[];

    toJSON() {
        return {
            id: this.id,
            user: this.user,
            title: this.title,
            content: this.content,
            private: this.private,
            anonymous: this.anonymous,
            endAt: this.endAt,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}
