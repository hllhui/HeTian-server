/**
 * Created by lianghaohui on 2018/7/11.
 */
'use strict';

const Service = require('egg').Service;

class StoreService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async login(content) {
    return await this.app.mysql.get('user', {account: content.userName, password: content.password});
  }

  async get_video() {
    return await this.app.mysql.select('ad_list');
  }

  async del_video(id) {
    return await this.app.mysql.delete('ad_list', {id: id});
  }

  async todayRecord(content) {
    return await this.app.mysql.select('shop', {where: content},);
  }

  async createDailyRecord(content) {
    return await this.app.mysql.insert('shop', content);
  }

  async updateDailyRecord(content) {
    const options = {
      where: {
        shop_id: content.shop_id,
        data: content.data,
      }
    };
    return await this.app.mysql.update('shop', content, options);
  }

  async create_store(content) {
    return await this.app.mysql.insert('store_list', {
      name: content.name,
      address: content.address,
      seller: content.seller,
    });
  }

  async update_store(content) {
    return await this.app.mysql.update('store_list', {
      id: content.id,
      name: content.name,
      address: content.address,
      seller: content.seller,
    });
  }

  async get_store() {
    return await this.app.mysql.select('store_list');
  }

  async get_a_store(id) {
    return await this.app.mysql.get('store_list', {id: id});
  }

  async del_store(id) {
    return await this.app.mysql.delete('store_list', {
      id: id,
    });
  }

  async upload_video(content) {
    const result = await this.app.mysql.insert('ad_list', content);
    return {result}
  }

  async insert_user(content) {
    const his = await this.app.mysql.get('user', {account: content.account});
    if (his === null) {
      const result = await this.app.mysql.insert('user', {
        account: content.account,
        password: content.password,
        type: content.type
      });
      return {result: result.affectedRows === 1, id: result.insertId};
    }
    return {result: false}
  }

}

module.exports = StoreService;