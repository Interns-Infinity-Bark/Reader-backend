import {
    Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, DataType, AllowNull, Default, HasMany
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
    @Column
    endAt: Date;

    @HasMany(() => UserVote)
    userVotes: UserVote[];
}
