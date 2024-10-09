import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablesUserLog1728400385349 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` 
        CREATE TABLE public.user (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT now(),
            updated_at TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "user_email_key" UNIQUE ("email")
        );
        `);
    await queryRunner.query(
      ` 
            CREATE TABLE public.log (
                action VARCHAR(255) NOT NULL,
                id SERIAL PRIMARY KEY,
                data TEXT NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT now()
            );
    `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user";`);
    await queryRunner.query(`DROP TABLE "log";`);
  }
}
