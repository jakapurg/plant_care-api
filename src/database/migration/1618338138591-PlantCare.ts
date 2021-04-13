import { MigrationInterface, QueryRunner } from 'typeorm';

export class PlantCare1618338138591 implements MigrationInterface {
  name = 'PlantCare1618338138591';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "plant" ADD "care" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "plant" DROP COLUMN "care"`);
  }
}
