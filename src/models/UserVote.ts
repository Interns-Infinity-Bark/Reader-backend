import {
    Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, ForeignKey
} from 'sequelize-typescript';
import User from './User';
import Vote from './Vote';

@Table({
    timestamps: true
})
export default class UserVote extends Model<UserVote> {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column
    user: number;

    @AllowNull(false)
    @ForeignKey(() => Vote)
    @Column
    vote: number;

    @AllowNull(false)
    @Column
    option: number;
}
