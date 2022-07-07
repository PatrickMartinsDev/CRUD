import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { v4 as uuidv4 } from "uuid";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    phone: number

    @Column()
    address: string

    @Column()
    avatar: string

    @Column()
    created_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}
