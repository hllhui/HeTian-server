/**
 * Created by lianghaohui on 2018/7/10.
 */
'use strict';

const Controller = require('egg').Controller;

class StoreController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.createRule = {
      accesstoken: 'string',
      content: 'string',
    };
  }

  async show() {
    const {ctx} = this;
    const srote_id = ctx.params.id;
    ctx.body = await ctx.service.db.get_a_store(srote_id);
  }

  async index() {
    const {ctx} = this;
    ctx.body = await ctx.service.db.get_store();
  }

  async create() {
    const {ctx} = this;
    const content = ctx.request.body;
    const req = await ctx.service.db.create_store(content);
    ctx.body = req.insertId
  }

  async update() {
    const {ctx} = this;
    const content = ctx.request.body;
    const req = await ctx.service.db.update_store(content);
    ctx.body = content.id
  }

  async destroy() {
    const {ctx} = this;
    const srote_id = ctx.params.id;
    ctx.body = await ctx.service.db.del_store(srote_id);
  }
}

module.exports = StoreController;