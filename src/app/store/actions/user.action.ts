import { User } from 'src/app/user';

export class GetAllDetail {
  static readonly type = '[user] Get';
}

export class SetSelectedUser {
  static readonly type = '[user] Set ';
  constructor(public id: string) {}
}

export class AddUser {
  static readonly type = '[user] Add';
  constructor(public payload: User) {}
}

export class DeleteUser {
  static readonly type = '[user] Delete';
  constructor(public id: string) {}
}

export class UpdateUser {
  static readonly type = '[user] Update';
  constructor(public payload: User, public id: string) {}
}
