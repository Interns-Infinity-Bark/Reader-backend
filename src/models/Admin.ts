import { Table, Column, Model, PrimaryKey, AutoIncrement, Unique, AllowNull } from 'sequelize-typescript';

@Table
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

    toJSON() {
        return {
            id: this.id,
            username: this.username
        };
    }
}
