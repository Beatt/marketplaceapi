import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../../users/entities/user.entity'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  sku: string

  @Column()
  amount: number

  @Column()
  price: number

  @Column({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date

  @Column({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date

  @ManyToOne((type) => User, (user) => user.products)
  @JoinColumn({ name: 'user_id' })
  user: User
}
