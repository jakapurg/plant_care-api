import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserPlant1618491981228 implements MigrationInterface {
  name = 'UserPlant1618491981228';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_plant" ("id" SERIAL NOT NULL, "plant_id" integer NOT NULL, "user_id" integer NOT NULL, "last_water_date" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a54821550914b0c11d829eeaed0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_plant" ADD CONSTRAINT "FK_d9d54a1748a5670f98002825406" FOREIGN KEY ("plant_id") REFERENCES "plant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_plant" ADD CONSTRAINT "FK_c9bd3f2baf8decd753f5044fae0" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_plant" DROP CONSTRAINT "FK_c9bd3f2baf8decd753f5044fae0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_plant" DROP CONSTRAINT "FK_d9d54a1748a5670f98002825406"`,
    );
    await queryRunner.query(`DROP TABLE "user_plant"`);
  }
}
