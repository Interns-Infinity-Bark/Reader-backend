import { Table, Column, Model, PrimaryKey, AutoIncrement, Unique, AllowNull } from 'sequelize-typescript';

@Table({
    timestamps: true
})
export default class Admin extends Model<Admin> {
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

    @AllowNull(false)
    @Unique
    @Column
    nickname: string;

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            nickname: this.nickname,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}
