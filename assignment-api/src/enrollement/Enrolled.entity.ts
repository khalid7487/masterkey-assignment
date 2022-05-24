import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../auth/User.entity";
import { CoreEntity } from "../commons/CoreEntity";

@Entity()
export class Enrolled extends CoreEntity {


    constructor(enrolled: Partial<Enrolled>) {
        super()
        Object.assign(this, enrolled)
    }

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: bigint


    @Column()
    member_id: number

    @Column()
    project_id: number

    @Column('boolean', { default: false })
    enroll_status: boolean = false;

    @Column({ default: 0 })
    status: number          // 1, 2, 3, 4



}