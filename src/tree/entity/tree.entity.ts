import {Entity, Tree, Column, PrimaryGeneratedColumn, TreeChildren, TreeParent, CreateDateColumn} from "typeorm";

@Entity()
@Tree("closure-table")
export class TreeEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @TreeChildren()
    children: TreeEntity[];

    @TreeParent()
    parent: TreeEntity;

    @CreateDateColumn({ type: 'timestamp' })
    createTime:Date;
}