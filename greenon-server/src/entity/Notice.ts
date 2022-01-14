import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "Notice" })
export class Notice {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: true })
  photoURL: string;

  @Column({ default: 0 })
  view_count: number;

  @CreateDateColumn()
  created_at: Date;
}
