/**
 * Created by Jamey McElveen on 7/6/17.
 */

import conf from '../../package.json';

export default class BuildBase {
  constructor() {
    this.version = conf.version;
  }
};