import {
    AllowNull,
    AutoIncrement,
    Column,
    Default,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    Unique
} from 'sequelize-typescript';
import Comment from './Comment';

@Table({
    freezeTableName: true
})
class User extends Model<User> {
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

export default User;
