import { Entity, Tree, Column, PrimaryGeneratedColumn, TreeChildren, TreeParent, CreateDateColumn, JoinColumn } from "typeorm";

@Entity()
@Tree("closure-table")
export class TreeEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @TreeChildren()
    children: TreeEntity[];

    @TreeParent()
    parent: TreeEntity;

    @CreateDateColumn({ type: 'timestamp' })
    createTime: Date;
}