import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, BaseEntity } from "typeorm";
import { NewsType } from './newsType.entity';
import { Expose } from "class-transformer";

export class NewsDetail {
    sequence: number;
    description: string;
    ImageId: number;
    ImageUrl: string;
}

@Entity()
export class News extends BaseEntity {

    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @CreateDateColumn({ type: 'timestamp' })
    @Expose()
    createTime: Date;


    @Column()
    @Expose()
    title: string;

    @Column()
    @Expose()
    subtitle: string;

    @Column({ type: "text" })
    @Expose()
    description: string;

    @Column()
    @Expose()
    url: string;

    @Column()
    @Expose()
    isActive: boolean;

    @Column()
    @Expose()
    images: string;

    @Column('json')
    newsDetails: NewsDetail[];

    @ManyToOne(type => NewsType, NewsType => NewsType.news)
    newsType: NewsType;

}
