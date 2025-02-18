import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1739437488660 implements MigrationInterface {
    name = 'Migration1739437488660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "o_news" ADD "writer" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "o_news" DROP COLUMN "writer"`);
    }

}
