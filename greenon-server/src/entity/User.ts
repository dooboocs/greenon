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

/**
 * @swagger
 *  components:
 *    securitySchemas:
 *      bearerAuth:
 *        type: http
 *        schema: bearer
 *        bearerFormat: JWT
 *      basicAuth:
 *        type: http
 *        schema: basic
 *    schemas:
 *      Token:
 *        type: object
 *        properties:
 *          token:
 *            type: string
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *          password:
 *             type: string
 *             format: password
 *          phone:
 *            type: string
 */

@Entity({ name: "User" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  phone: string;

  @Column({ default: "user" })
  role: string;

  @Column({ default: "local" })
  stratgey: string;

  @OneToMany(() => Device, (device) => device.user, {
    cascade: true,
  })
  devices: Device[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      if (this.password) {
        this.password = await bcrypt.hash(this.password, 10);
      }
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
      "KeyForJWTToken"
    );
  }
}
