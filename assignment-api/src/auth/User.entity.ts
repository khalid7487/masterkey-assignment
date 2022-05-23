import {
    BeforeInsert,
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import bcrypt from "bcrypt";
import {classToPlain, Exclude} from "class-transformer";
import {IsEmail, Length} from "class-validator";
import {Role} from "./Role.entity";
import {CoreEntity} from "../commons/CoreEntity";
import { Project } from "../project/Project.entity";

@Entity()
export class User extends CoreEntity {

    constructor(user: Partial<User>) {
        super()
        Object.assign(this, user)
    }

    // @Exclude()
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: bigint

    @Column({default: 0})
    status: number          // 1, 2, 3, 4

    @Column()
    @Length(3, 255, {message: 'First Name must be at least 3 characters long'})
    firstname: string

    @Column()
    @Length(3, 255, {message: 'Last name must be at least 3 characters long'})
    lastname: string

    @Index({unique: true})
    @Column({nullable: true})
    @IsEmail()
    email: string

    @Exclude()
    @Column()
    @Length(4, 255, {message: 'Password must be at least 6 characters long'})
    password: string

    @Index({unique: true})
    @Column()
    @Length(11, 15, {message: 'Number must be 15 characters long'})
    phone: string

    @Column({nullable: true})
    dateOfbirth: string

    @Index({unique: true})
    @Column({nullable: true})
    username: string

    @Column({nullable: true})
    user_status: string

    @Column({nullable: true})
    address: string


    @ManyToMany(() => Role, {
        nullable: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinTable()
    roles: Role[]

    @Column({type: "text", nullable: true})
    profile_image: string



    @OneToMany(() => Project, Project => Project.user, {
        nullable: true, cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    projects: Project[];


    // @OneToOne(() => Identity, {
    //     nullable: true, cascade: true,
    //     onDelete: 'CASCADE',
    //     onUpdate: 'CASCADE'
    // })
    // @JoinColumn()
    // identity: Identity;


    @Column({nullable: true})
    short_bio: string

    @Column({nullable: true})
    bio: string



    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 6)
    }

    toJSON() {
        return classToPlain(this)
    }

}
