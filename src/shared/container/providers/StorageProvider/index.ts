/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { container } from 'tsyringe';

import { LocalStorageProvider } from './implementations/LocalStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';
import { type IStorageProvider } from './IStorageProvider';

const disk = process.env.disk ?? 'local';

const diskStorage: Record<
  string,
  typeof LocalStorageProvider | typeof S3StorageProvider
> = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[disk],
);
