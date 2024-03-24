import upload from '@config/upload';
import fs from 'fs';
import { resolve } from 'path';

import { type IStorageProvider } from '../IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
  async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/`, file),
    );

    return file;
  }

  async deleteFile(file: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/`, file);

    try {
      await fs.promises.stat(filename);
    } catch {
      return;
    }
    await fs.promises.unlink(filename);
  }
}

export { LocalStorageProvider };
