import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';
import Chapter from './Chapter';
import User from './User';

@Table({
    freezeTableName: true,
    timestamps: true
})
class Comment extends Model<Comment> {
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
            chapter: this.chapterId,
            content: this.content,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

export default Comment;
