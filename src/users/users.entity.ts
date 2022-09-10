import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Role } from "../roles/role.entity";
import { Product } from "../products/product.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column({ name: "created_at", type: "timestamptz"})
  createdAt: Date

  @Column({ name: "updated_at", type: "timestamptz"})
  updatedAt: Date

  @ManyToOne(type => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role

  @OneToMany(type => Product, product => product.user)
  products: Product
}