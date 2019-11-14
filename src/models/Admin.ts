import { AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

@Table({
    freezeTableName: true
})
class Admin extends Model<Admin> {
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

export default Admin;
