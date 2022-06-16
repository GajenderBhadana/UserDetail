import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/user';
import {
  AddUser,
  DeleteUser,
  GetAllDetail,
  SetSelectedUser,
  UpdateUser,
} from '../actions/user.action';

export class UserStateModel {
  users: User[] = [];
  usersLoaded!: boolean;
  selectedUser!: User | null;
}

@State<UserStateModel>({
  name: 'users',
  defaults: {
    users: [],
    usersLoaded: false,
    selectedUser: null,
  },
})
@Injectable()
export class UserState {
  constructor(private detail: LoginService) {}

  // Get user list from state
  @Selector()
  static getAllDetail(state: UserStateModel) {
    return state.users;
  }

  // Get Loadeduser
  @Selector()
  static userLoaded(state: UserStateModel) {
    return state.usersLoaded;
  }

  // Get Selected Employee from state
  @Selector()
  static selectedUser(state: UserStateModel) {
    return state.selectedUser;
  }

  @Action(GetAllDetail)
  getUsers({ getState, setState }: StateContext<UserStateModel>) {
    return this.detail.getAllDetail().pipe(
      tap((res) => {
        const state = getState();
        setState({
          ...state,
          users: res,
          usersLoaded: true,
        });
      })
    );
  }

  @Action(SetSelectedUser)
  setSelectedUser(
    { getState, setState }: StateContext<UserStateModel>,
    { id }: SetSelectedUser
  ) {
    const state = getState();
    const userList = state.users;
    const index = userList.findIndex((user) => user.id === id);

    if (userList.length > 0) {
      setState({
        ...state,
        selectedUser: userList[index],
      });
    } else {
      return this.detail.getDetail(id).pipe(
        tap((res: User) => {
          const state = getState();
          const userList = [res];

          setState({
            ...state,
            users: userList,
            selectedUser: userList[0],
          });
        })
      );
    }
  }

  // Add user to state
  @Action(AddUser)
  addUsers(
    { getState, patchState }: StateContext<UserStateModel>,
    { payload }: AddUser
  ) {
    return this.detail.createUser(payload).pipe(
      tap((res: User) => {
        const state = getState();

        patchState({
          users: [...state.users, res],
        });
      })
    );
  }

  // Delete user from state
  @Action(DeleteUser)
  deleteUsers(
    { getState, setState }: StateContext<UserStateModel>,
    { id }: DeleteUser
  ) {
    return this.detail.deleteUser(id).pipe(
      tap((res) => {
        const state = getState();
        const userList = state.users;
        const filter = userList.filter((user) => user.id !== id);

        setState({
          ...state,
          users: filter,
        });
      })
    );
  }

  // Update user
  @Action(UpdateUser)
  updateUsers(
    { getState, setState }: StateContext<UserStateModel>,
    { payload, id }: UpdateUser
  ) {
    return this.detail.updateUser(payload, id).pipe(
      tap((res) => {
        console.log(res);
        const state = getState();
        const userList = [...state.users];
        console.log('userlist :', userList);

        const index = userList.findIndex((user) => user.id == id);
        userList[index] = res;

        setState({
          ...state,
          users: userList,
        });
      })
    );
  }
}
