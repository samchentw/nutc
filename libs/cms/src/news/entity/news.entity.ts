import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, BaseEntity } from "typeorm";
import { NewsType } from './newsType.entity';
import { Expose } from "class-transformer";
import { ImageIdAndUrlDto } from "@app/core/file/service/file.service";

export class NewsDetail {
    sequence: number;
    subtitle: string;
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

    // @Column({ type: "text" })
    // @Expose()
    // description: string;

    // @Column()
    // @Expose()
    // url: string;

    @Column()
    @Expose()
    isActive: boolean;

    // @Column('simple-json')
    // @Expose()
    // images: ImageIdAndUrlDto[];

    @Column('simple-json')
    newsDetails: NewsDetail[];

    @ManyToOne(type => NewsType, NewsType => NewsType.news)
    newsType: NewsType;

}
