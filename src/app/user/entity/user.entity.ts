import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column()
  @ApiProperty()
  phone: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  created_at: string;

  @CreateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updated_at: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty()
  deleted_at: string;
}
