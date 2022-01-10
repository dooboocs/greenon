import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Device } from "./Device";

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

  @Column()
  humedity: number;

  @CreateDateColumn()
  created_at: Date;
}
