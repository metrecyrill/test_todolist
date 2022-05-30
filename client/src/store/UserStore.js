import {makeAutoObservable} from "mobx"

export default class UserStore {
  constructor() {
    this._isAuth = false
    this._user = {}
    makeAutoObservable(this)
  }

  setIsAuth(bool) {
    this._isAuth = bool
  }

  setData(user) {
    this._user = user
  }

  get isAuth() {
    return this._isAuth
  }
  get data() {
    return this._user
  }
}