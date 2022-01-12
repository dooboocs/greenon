import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  BeforeInsert,
  getRepository,
  AfterInsert,
} from "typeorm";
import { User } from ".";
import { DeviceData } from "./DeviceData";
import moment from "moment";

/**
 * @swagger
 *  components:
 *    schemas:
 *      Device:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *          name:
 *            type: string
 *          title:
 *            type: string
 *          device_type:
 *            type: string
 *          power:
 *            type: boolean
 *          mode:
 *            type: number
 *          mode_time:
 *            type: string
 *            enum: [seqeunce, 1h, 2h, manual]
 *          motion_control:
 *            type: boolean
 *          space_sterilization:
 *            type: string
 *            enum: [seqeunce, 1h, 2h, manual]
 *          pest_control:
 *            type: string
 *            enum: [seqeunce, 1h, 2h, manual]
 *          water_level:
 *            type: string
 *          medicine:
 *            type: string
 *          user:
 *            $ref: "#/components/schemas/User"
 *          device_data:
 *            $ref: "#/components/schemas/DeviceData"
 *          updated_at:
 *            type: date-time
 *
 */

@Entity({ name: "Device" })
export class Device {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  name: string;

  @Column()
  device_type: string;

  // 전원
  @Column("boolean")
  power: boolean;

  // 모드
  @Column()
  mode: number;

  // 모드 시간
  @Column()
  mode_time: "seqeunce" | "1h" | "2h";

  // 동작제어
  @Column("boolean")
  motion_control: boolean;

  // 공간 제균
  @Column()
  space_sterilization: "1h" | "2h" | "seqeunce" | "manual";

  // 해충 방제
  @Column()
  pest_control: "1h" | "2h" | "seqeunce" | "manual";

  // 수위
  @Column()
  water_level: string;

  // 약품
  @Column()
  medicine: string;

  @OneToMany(() => DeviceData, (deviceData) => deviceData.device, {
    cascade: true,
  })
  device_data: DeviceData[];

  @ManyToOne(() => User, (user) => user.devices, { onDelete: "CASCADE" })
  user: User;

  @UpdateDateColumn()
  updated_at: Date;

  @AfterInsert()
  async syncDeviceData(): Promise<void> {
    this.addDeviceData();
    setInterval(this.addDeviceData.bind(this), 60000);
  }

  async addDeviceData() {
    try {
      const newDeviceData = await getRepository(DeviceData).create({
        bio_air_roll: 50,
        air_quailty: 50,
        food_poisoning: 50,
        find_dust: 50,
        temperature: 20,
        humedity: 0.5,
        device: this,
      });

      getRepository(DeviceData).save(newDeviceData);
      console.log(`Create DeviceData at ${moment().format("HH:mm:ss")}`);
    } catch (err) {
      throw new Error(err);
    }
  }
}
