import {
    Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, ForeignKey, BelongsTo
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

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User, {
        onDelete: 'CASCADE'
    })
    user: User;

    @ForeignKey(() => Vote)
    @Column
    voteId: number;

    @BelongsTo(() => Vote, {
        onDelete: 'CASCADE'
    })
    vote: Vote;

    @AllowNull(false)
    @Column
    option: number;

    toJSON() {
        return {
            id: this.id,
            user: this.userId,
            vote: this.voteId,
            option: this.option,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}
