import {
    AllowNull,
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';
import Book from './Book';
import Comment from './Comment';

@Table({
    freezeTableName: true
})
class Chapter extends Model<Chapter> {
    @AllowNull(false)
    @PrimaryKey
    @Column
    id: string;

    @ForeignKey(() => Book)
    @Column
    bookId: string;

    @BelongsTo(() => Book, {
        onDelete: 'CASCADE'
    })
    book: Book;

    @AllowNull(false)
    @Column
    title: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    content: string;

    @Default(false)
    @Column
    isVip: boolean;

    @HasMany(() => Comment)
    comments: Comment[];

    toJSON() {
        return {
            id: this.id,
            book: this.bookId,
            title: this.title,
            content: this.content,
            isVip: this.isVip,
            comments: this.comments
        };
    }
}

export default Chapter;
