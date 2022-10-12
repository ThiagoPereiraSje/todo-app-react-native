import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';

SQLite.DEBUG(false);
SQLite.enablePromise(true);

const db_name = 'todo.db';

export default class Database {
  static instance: SQLiteDatabase;

  static async open() {
    console.info('Abrindo Conexão com o Banco de Dados!');

    try {
      if (!this.instance) {
        this.instance = await SQLite.openDatabase({
          name: db_name,
          location: 'default',
        });
        console.info('Banco de Dados Aberto com Sucesso!');
      }
    } catch (e) {
      console.error('SQLite Erro: ' + (e.message || e));
    }
  }

  static async close() {
    console.info('Fechando a Conexão com o Banco de Dados!');

    try {
      await this.instance.close();
      console.info('Banco de Dados Fechado com Sucesso!');
    } catch (e) {
      console.error('SQLite Erro: ' + (e.message || e));
    }
  }

  static async delete() {
    console.info('Excluindo o Banco de Dados!');

    try {
      await SQLite.deleteDatabase({name: db_name, location: 'default'});
      console.info('Banco de Dados Excluído com Sucesso!');
    } catch (e) {
      console.error('SQLite Erro: ' + (e.message || e));
    }
  }

  static async dropTables() {
    console.info('Excluindo as Tabelas do Banco de Dados!');

    await this.instance.executeSql('DROP TABLE IF EXISTS tasks;', []);

    console.info('Tabelas Excluídas com Sucesso!');
  }

  static async createTables() {
    console.info('Criando as Tabelas do Banco de Dados!');

    try {
      await this.instance.executeSql(
        'CREATE TABLE IF NOT EXISTS tasks (' +
          'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
          'title VARCHAR(255) NOT NULL,' +
          'subtitle VARCHAR(255) NOT NULL,' +
          'duration UNSIGNED BIG INT,' +
          'runtime UNSIGNED BIG INT,' +
          'completed_time UNSIGNED BIG INT,' +
          'status VARCHAR(50),' +
          'fullyCompletedAt UNSIGNED BIG INT );',
        [],
      );

      console.info('Tabelas criadas com sucesso!');
    } catch (e) {
      console.error('SQLite Erro: ' + (e.message || e));
    }
  }

  static async backup() {
    try {
      const path = RNFS.DownloadDirectoryPath + '/test.txt';
      console.log('path: ', path);
      await RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8');

      console.info('Banco de dados copiado com sucesso!');
    } catch (e) {
      console.error('SQLite Erro: ' + (e.message || e));
    }
  }

  static async restore() {
    try {
      const path = RNFS.DownloadDirectoryPath + '/test.txt';
      const content = await RNFS.readFile(path, 'utf8');

      console.info('conteudo: ', content);
    } catch (e) {
      console.error('SQLite Erro: ' + (e.message || e));
    }
  }

  static async init() {
    if (!this.instance) {
      await this.open();
      // await this.dropTables();
      await this.createTables();
    } else {
      console.info('Banco de dados já está iniciado!');
    }
  }
}
