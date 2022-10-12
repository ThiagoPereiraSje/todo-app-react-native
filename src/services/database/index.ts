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
      await this.restore();
      // await this.dropTables();
      // await this.createTables();
    } else {
      console.info('Banco de dados já está iniciado!');
    }
  }
}
