/**
 * Created by lianghaohui on 2018/7/10.
 */
'use strict';

const Controller = require('egg').Controller;

class DailyController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.createRule = {
      accesstoken: 'string',
      content: 'object',
    };
  }

  async show() {
    const {ctx} = this;
    const content = ctx.params.id;
    ctx.body = await ctx.service.db.todayRecord(JSON.parse(content));
  }

  async index() {
    const {ctx} = this;
    ctx.body = 'hello'
  }

  async create() {
    const {ctx} = this;

    const date = new Date();
    const seperator1 = "-";
    const seperator2 = ":";
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    if (month >= 1 && month <= 9)
      month = "0" + month;
    if (strDate >= 0 && strDate <= 9)
      strDate = "0" + strDate;
    if (minute <= 9)
      minute = "0" + minute;
    if (second <= 9)
      second = "0" + second;

    const today = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    const now_time = date.getHours() + seperator2 + minute + seperator2 + second;
    const hour = date.getHours();

    let key = 'morning_open';
    if (hour > 12)
      key = 'afternoon_open';
    const content = {
      data: today,
      shop_id: ctx.request.body.id,
      [key]: now_time,
      name: ctx.request.body.name
    };
    const dailyRecord = await ctx.service.db.todayRecord({data: today, id: ctx.request.body.id});
    if (dailyRecord === null)
      ctx.body = await ctx.service.db.createDailyRecord(content);
    else if (hour > 13 && dailyRecord.afternoon_open === undefined)
      ctx.body = await ctx.service.db.updateDailyRecord(content);
    else
      ctx.body = 'finish'

  }

  async update() {
    const {ctx} = this;
    // ctx.validate(this.createRule);
    const date = new Date();
    const seperator1 = "-";
    const seperator2 = ":";
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    if (month >= 1 && month <= 9)
      month = "0" + month;
    if (strDate >= 0 && strDate <= 9)
      strDate = "0" + strDate;
    if (minute <= 9)
      minute = "0" + minute;
    if (second <= 9)
      second = "0" + second;

    const today = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    const now_time = date.getHours() + seperator2 + minute + seperator2 + second;
    const hour = date.getHours();

    let key = 'morning_close';
    if (hour > 12)
      key = 'afternoon_close';

    const content = {
      data: today,
      shop_id: ctx.request.body.id,
      [key]: now_time,
    };
    ctx.body = await ctx.service.db.updateDailyRecord(content);

  }

}

module.exports = DailyController;
