/**
 * Created by lianghaohui on 2018/7/11.
 */

const Controller = require('egg').Controller;

class AccountController extends Controller {
  async login() {
    const ctx = this.ctx;
    const content = ctx.request.body;
    const req = await ctx.service.db.login(content);
    if (req !== null) {
      ctx.body = {
        status: 'ok',
        type: content.type,
        currentAuthority: req.type,
      }
    }
  }
}

module.exports = AccountController;