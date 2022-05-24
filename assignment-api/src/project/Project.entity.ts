import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../auth/User.entity";
import {CoreEntity} from "../commons/CoreEntity";

@Entity()
export class Project extends CoreEntity {


    constructor(project: Partial<Project>) {
        super()
        Object.assign(this, project)
    }

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: bigint


    @Column({type: "text"})
    project_name: string
  
    @Column({type: "text", nullable: true})
    project_title: string

    @Column({type: "text", nullable: true})
    project_description: string

    @Column({type: "text" , nullable: true})
    project_task: string


    @Column({type: "text", default: "OPEN"})
    project_status: string


    @Column('boolean', {default: false})
    enroll_status: boolean = false;

    @Column({default: 0})
    status: number          // 1, 2, 3, 4

    @Column({default: 0})
    total_project_members: number         


    @ManyToOne(() => User, user => user.projects, {
        onDelete: 'CASCADE'
    })
    user: User;




}