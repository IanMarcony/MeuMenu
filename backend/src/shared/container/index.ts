import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import StoresRepository from '@modules/stores/infra/typeorm/repositories/StoresRepository';
import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import StatusRepository from '@modules/stores/infra/typeorm/repositories/StatusRepository';
import IStatusRepository from '@modules/stores/repositories/IStatusRepository';
import ContractTypeRepository from '@modules/stores/infra/typeorm/repositories/ContractTypeRepository';
import IContractTypesRepository from '@modules/stores/repositories/IContractTypesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IStoresRepository>(
  'StoreRepository',
  StoresRepository,
);

container.registerSingleton<IStatusRepository>(
  'StatusRepository',
  StatusRepository,
);

container.registerSingleton<IContractTypesRepository>(
  'ContractTypeRepository',
  ContractTypeRepository,
);
