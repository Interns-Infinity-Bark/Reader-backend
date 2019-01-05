import {
    Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, Unique, Default, HasMany
} from 'sequelize-typescript';
import Comment from './Comment';

@Table
export default class User extends Model<User> {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @AllowNull(false)
    @Unique
    @Column
    username: string;

    @AllowNull(false)
    @Column
    password: string;

    @Default(true)
    @Column
    isActive: boolean;

    @HasMany(() => Comment)
    comments: Comment[];

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            isActive: this.isActive,
            comments: this.comments
        };
    }
}
