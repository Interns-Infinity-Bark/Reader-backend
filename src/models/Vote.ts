import {
    Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, DataType, AllowNull, Default, HasMany, IsDate,
    BelongsTo
} from 'sequelize-typescript';
import User from './User';
import UserVote from './UserVote';

@Table({
    timestamps: true
})
export default class Vote extends Model<Vote> {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @AllowNull(false)
    @Column(DataType.TEXT)
    title: string;

    // todo
    @AllowNull(false)
    @Column(DataType.JSON)
    content: object;

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
            user: this.userId,
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
