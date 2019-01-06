import {
    Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, ForeignKey, BelongsTo, DataType
} from 'sequelize-typescript';
import Chapter from './Chapter';
import User from './User';

@Table({
    timestamps: true
})
export default class Comment extends Model<Comment> {
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

    @ForeignKey(() => Chapter)
    @Column
    chapterId: string;

    @BelongsTo(() => Chapter, {
        onDelete: 'CASCADE'
    })
    chapter: Chapter;

    @AllowNull(false)
    @Column(DataType.TEXT)
    content: string;

    toJSON() {
        return {
            id: this.id,
            user: this.userId,
            username: this.user.username,
            chapter: this.chapterId,
            content: this.content,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}
