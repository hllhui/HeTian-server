/**
 * Created by lianghaohui on 2018/7/11.
 */
const path = require('path');
const fs = require('fs');
const sendToWormhole = require('stream-wormhole');
const Controller = require('egg').Controller;
const awaitWriteStream = require('await-stream-ready').write;

class UploadController extends Controller {
  async upload() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const filename = path.basename(stream.filename);

    const target = path.join(this.config.baseDir, 'app/public/video', filename);
    const writeStream = fs.createWriteStream(target);

    // const name = 'public/' + path.basename(stream.filename);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
      // result = await ctx.service.db.upload_video({
      //   name: filename,
      //   address: 'http://localhost:7001/update/video/' + filename
      // });
      ctx.body = {
        result: 'success',
        fields: stream.fields,
      };
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }
  }
}

module.exports = UploadController;