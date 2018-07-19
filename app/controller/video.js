/**
 * Created by lianghaohui on 2018/7/10.
 */
'use strict';

const Controller = require('egg').Controller;

class VideoController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.createRule = {
      accesstoken: 'string',
      content: 'string',
    };
  }

  async show() {
    const {ctx} = this;
    this.ctx.body = 'hello'
  }

  async index() {
    const {ctx} = this;
    this.ctx.body = await ctx.service.db.get_video();
  }

  async create() {
    const {ctx} = this;
    // ctx.validate(this.createRule);
    const content = ctx.request.body;
    const params = {
      name:content.name,
      start:content.start,
      end:content.end,
      address:content.address,
    };
    ctx.body = await ctx.service.db.upload_video(params);
  }

  async update() {
    const {ctx} = this;
  }

  async destroy() {
    const {ctx} = this;
    const video_id = ctx.params.id;
    ctx.body = await ctx.service.db.del_video(video_id);
  }
}

module.exports = VideoController;