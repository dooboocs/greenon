import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Device } from ".";

@Entity({ name: "User" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ unique: true })
  phone: string;

  @Column({ default: "user" })
  role: string;

  @OneToMany(() => Device, (device) => device.user, {
    cascade: true,
  })
  devices: Device[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      throw new Error(e);
    }
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  async generateToken() {
    return await jwt.sign(
      {
        id: this.id,
      },
      process.env.JWT_SECRET
    );
  }
}
