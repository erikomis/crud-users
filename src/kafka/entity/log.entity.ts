import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('log')
export class LogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string;

  @Column()
  data: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_At: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_At: Date;
}
