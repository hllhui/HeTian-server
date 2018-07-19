/**
 * Created by lianghaohui on 2018/7/10.
 */
'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.createRule = {
      accesstoken: 'string',
      content: 'string',
    };
  }

  // async show() {
  //   const {ctx} = this;
  //   ctx.body = 'hello'
  // }
  //
  async index() {
    const {ctx} = this;
    ctx.body = {
      name: 'Admin',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 0,
    }
  }

  async create() {
    const {ctx} = this;
    ctx.validate(this.createRule);
    const content = JSON.parse(ctx.request.body.content);
    ctx.body = await ctx.service.db.insert_user(content);
  }

  // async update() {
  //   const {ctx} = this;
  // }
  //
  // async destroy() {
  //   const {ctx} = this;
  // }
}

module.exports = UserController;