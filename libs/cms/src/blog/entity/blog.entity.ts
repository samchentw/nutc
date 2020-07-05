import { Entity, JoinColumn, Column, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity } from "typeorm";


export class BlogDetail {
    description: string;
    image: string;
}

@Entity()
export class Blog extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamp' })
    createTime: Date;

    @Column()
    title: string;

    @Column("json")
    datas: BlogDetail[];
    // @OneToMany(type => News, News => News.newsType)
    // @JoinColumn()
    // news: News[];

}

