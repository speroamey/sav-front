import { Injectable } from '@angular/core';
declare let jQuery: any;

@Injectable()
export class Parseur {
  constructor() {}
  parse() {
    let codes = [];
    let url: string = '';
    let method: string = '';
    let match: any;
    return codes;
  }
  formatName(name) {
    if (name.startsWith('search')) {
    } else if (name.startsWith('getAll')) {
    } else if (name.startsWith('create')) {
    } else if (name.startsWith('update')) {
    } else if (name.startsWith('delete')) {
    } else if (name.startsWith('get')) {
    }
    return name;
  }
}
