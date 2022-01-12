import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Device } from "./Device";

/**
 * @swagger
 *  components:
 *    schemas:
 *      DeviceData:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *          device:
 *            $ref: "#/components/schemas/Device"
 *          bio_air_roll:
 *            type: number;
 *          air_quailty:
 *            type: number;
 *          food_poisoning:
 *            type: number;
 *          find_dust:
 *            type: number;
 *          temperature:
 *            type: number;
 *          humedity:
 *            type: number;
 *          created_at:
 *            type: date-time
 */

@Entity({ name: "DeviceData" })
export class DeviceData {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Device, (device) => device.device_data, {
    onDelete: "CASCADE",
  })
  device: Device;

  @Column()
  bio_air_roll: number;

  @Column()
  air_quailty: number;

  @Column()
  food_poisoning: number;

  @Column()
  find_dust: number;

  @Column()
  temperature: number;

  @Column({ type: "float" })
  humedity: number;

  @CreateDateColumn()
  created_at: Date;
}
