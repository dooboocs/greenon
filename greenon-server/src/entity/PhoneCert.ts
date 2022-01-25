import {
  AfterInsert,
  Column,
  Entity,
  getRepository,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "PhoneCert" })
export class PhoneCert {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  verifyCode: string;

  @AfterInsert()
  async destory() {
    await setTimeout(() => {
      getRepository(PhoneCert).remove(this);
    }, 180000);
  }

  verify(code: string) {
    return this.verifyCode === code;
  }
}
