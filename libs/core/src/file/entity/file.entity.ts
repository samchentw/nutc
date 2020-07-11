import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';



@Entity()
export class File{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    filename:string

    @Column()
    originalname:string;

    @Column()
    size:number;

    @CreateDateColumn({ type: 'timestamp' })
    createTime:Date;

    @Column({length:10})
    mimetype:string;

    // @Column()
    // destination:string;

    @Column( { default: false })
    isDelete:boolean;

    @Column()
    url:string;

}