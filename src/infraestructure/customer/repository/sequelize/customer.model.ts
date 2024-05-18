import {Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "customers",
    timestamps: false
})
export default class CustomerModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    // private _name: string;
    // private _id: string;
    // private _address!: Address;
    // private _active: boolean = false;
    // private _rewardPoints: number = 0;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare active: boolean;

    @Column({allowNull: false})
    declare rewardPoints: number;

    @Column({allowNull: false})
    declare street: string

    @Column({allowNull: false})
    declare number: string

    @Column({allowNull: false})
    declare city: string

    @Column({allowNull: false})
    declare state: string

    @Column({allowNull: false})
    declare zipCode: string


}