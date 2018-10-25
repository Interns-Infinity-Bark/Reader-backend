import { Table, Column, Model, PrimaryKey, CreatedAt, IsEmail, AutoIncrement } from 'sequelize-typescript';

@Table
export default class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @IsEmail
    @Column
    email: string;

    @Column
    password: string;

    @Column
    nickname: string;

    @Column
    role: number;

    @Column
    barkable: boolean;

    @CreatedAt
    registeredAt: Date;
}
