import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if(user.name == undefined ||
      user.email == undefined ||
      user.username == undefined ||
      user.password == undefined ||
      user.role == undefined
    ) {
      return false;
    } else {
      if(user.role === "teacher") {
        if(user.className == undefined) {
          return false;
        }
      } else {
        if(user.classId == undefined) {
          return false;
        }
      }
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateClassId(classId) {
    if (classId.match(/^[0-9a-fA-F]{24}$/)) {
      return true;
    } else {
      return false;
    }
  }
}
