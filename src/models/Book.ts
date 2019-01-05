import { Table, Column, Model, PrimaryKey, DataType, AllowNull, HasMany } from 'sequelize-typescript';
import Chapter from './Chapter';

@Table({
    timestamps: true
})
export default class Book extends Model<Book> {
    @AllowNull(false)
    @PrimaryKey
    @Column
    id: string;

    @AllowNull(false)
    @Column
    title: string;

    @AllowNull(false)
    @Column
    author: string;

    @AllowNull(false)
    @Column
    category: string;

    @AllowNull(false)
    @Column
    wordCount: number;

    @AllowNull(false)
    @Column(DataType.DECIMAL)
    score: number;

    @AllowNull(false)
    @Column
    cover: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    introduction: string;

    @HasMany(() => Chapter)
    chapters: Chapter[];

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            author: this.author,
            category: this.category,
            wordCount: this.wordCount,
            score: this.score,
            cover: this.cover,
            introduction: this.introduction,
            chapters: this.chapters,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}
