import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669076106081 implements MigrationInterface {
    name = 'default1669076106081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "autores" ("idautor" SERIAL NOT NULL, "nome" text NOT NULL, "pais_origem" text NOT NULL, "idlivro" integer, CONSTRAINT "PK_e4673042104830b68432c271c0d" PRIMARY KEY ("idautor")); COMMENT ON COLUMN "autores"."nome" IS 'Nome do autor'; COMMENT ON COLUMN "autores"."pais_origem" IS 'Pais de origem do autor'`);
        await queryRunner.query(`CREATE TABLE "clientes" ("idcliente" SERIAL NOT NULL, "matricula" text NOT NULL, "nome" text NOT NULL, "telefone" integer NOT NULL, "livros_locado" integer, CONSTRAINT "PK_64f7120af52a190efd70c321737" PRIMARY KEY ("idcliente")); COMMENT ON COLUMN "clientes"."matricula" IS 'Matricula do Cliente'; COMMENT ON COLUMN "clientes"."nome" IS 'Nome do Cliente'; COMMENT ON COLUMN "clientes"."telefone" IS 'Telefone do Cliente'; COMMENT ON COLUMN "clientes"."livros_locado" IS 'Quantidade de Livro que o Cliente tem locado'`);
        await queryRunner.query(`CREATE TABLE "emprestimos" ("idemprestimo" SERIAL NOT NULL, "data_emprestimo" date NOT NULL, "data_retorno" date NOT NULL, "data_devolucao" date NOT NULL, "dias_atraso" integer NOT NULL, "idlivro" integer, "idcliente" integer, CONSTRAINT "PK_7c9994207aba0f26edab7df1f66" PRIMARY KEY ("idemprestimo"))`);
        await queryRunner.query(`CREATE TABLE "livros" ("idlivro" SERIAL NOT NULL, "isbn" text NOT NULL, "titulo" text NOT NULL, "editora" text NOT NULL, "ano_publicacao" text NOT NULL, "status" text NOT NULL, CONSTRAINT "PK_66e39fb181b296f655d94a438b6" PRIMARY KEY ("idlivro")); COMMENT ON COLUMN "livros"."isbn" IS 'Código ISBN do Livro'; COMMENT ON COLUMN "livros"."titulo" IS 'Título do livro'; COMMENT ON COLUMN "livros"."editora" IS 'Editora do livro'; COMMENT ON COLUMN "livros"."ano_publicacao" IS 'Ano de publicação do livro'; COMMENT ON COLUMN "livros"."status" IS 'Status: DISPONIVEL, LOCADO, DANIFICADO'`);
        await queryRunner.query(`ALTER TABLE "autores" ADD CONSTRAINT "FK_4f0c3dbddff9411b5d7387991cd" FOREIGN KEY ("idlivro") REFERENCES "livros"("idlivro") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "emprestimos" ADD CONSTRAINT "FK_d9a56f052c790ae91cc13bf3326" FOREIGN KEY ("idlivro") REFERENCES "livros"("idlivro") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "emprestimos" ADD CONSTRAINT "FK_34205bb519a7f8b296b6ee339cb" FOREIGN KEY ("idcliente") REFERENCES "clientes"("idcliente") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "emprestimos" DROP CONSTRAINT "FK_34205bb519a7f8b296b6ee339cb"`);
        await queryRunner.query(`ALTER TABLE "emprestimos" DROP CONSTRAINT "FK_d9a56f052c790ae91cc13bf3326"`);
        await queryRunner.query(`ALTER TABLE "autores" DROP CONSTRAINT "FK_4f0c3dbddff9411b5d7387991cd"`);
        await queryRunner.query(`DROP TABLE "livros"`);
        await queryRunner.query(`DROP TABLE "emprestimos"`);
        await queryRunner.query(`DROP TABLE "clientes"`);
        await queryRunner.query(`DROP TABLE "autores"`);
    }

}
