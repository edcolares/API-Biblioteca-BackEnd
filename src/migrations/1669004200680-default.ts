import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669004200680 implements MigrationInterface {
    name = 'default1669004200680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "autores" ("idautor" SERIAL NOT NULL, "nome" text NOT NULL, "pais_origem" text NOT NULL, "idlivro" integer, CONSTRAINT "PK_e4673042104830b68432c271c0d" PRIMARY KEY ("idautor")); COMMENT ON COLUMN "autores"."nome" IS 'Nome do autor'; COMMENT ON COLUMN "autores"."pais_origem" IS 'Pais de origem do autor'`);
        await queryRunner.query(`CREATE TABLE "livros" ("idlivro" SERIAL NOT NULL, "isbn" text NOT NULL, "titulo" text NOT NULL, "editora" text NOT NULL, "ano_publicacao" text NOT NULL, "status" text NOT NULL, CONSTRAINT "PK_66e39fb181b296f655d94a438b6" PRIMARY KEY ("idlivro")); COMMENT ON COLUMN "livros"."isbn" IS 'Código ISBN do Livro'; COMMENT ON COLUMN "livros"."titulo" IS 'Título do livro'; COMMENT ON COLUMN "livros"."editora" IS 'Editora do livro'; COMMENT ON COLUMN "livros"."ano_publicacao" IS 'Ano de publicação do livro'; COMMENT ON COLUMN "livros"."status" IS 'Status: DISPONIVEL, LOCADO, DANIFICADO'`);
        await queryRunner.query(`ALTER TABLE "autores" ADD CONSTRAINT "FK_4f0c3dbddff9411b5d7387991cd" FOREIGN KEY ("idlivro") REFERENCES "livros"("idlivro") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "autores" DROP CONSTRAINT "FK_4f0c3dbddff9411b5d7387991cd"`);
        await queryRunner.query(`DROP TABLE "livros"`);
        await queryRunner.query(`DROP TABLE "autores"`);
    }

}
