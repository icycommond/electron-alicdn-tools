// This file is auto-generated, don't edit it
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import * as $Cdn20180510 from '@alicloud/cdn20180510';
import * as $Util from '@alicloud/tea-util';
const { default: Cdn20180510 } = require("@alicloud/cdn20180510");
const { Config } = require("@alicloud/openapi-client");

// import * as $tea from '@alicloud/tea-typescript';
// import * as dotenv from 'dotenv';
// dotenv.config();

export default class Client {

  /**
   * @remarks
   * 使用AK&SK初始化账号Client
   * @returns Client
   * 
   * @throws Exception
   */
  createClient() {
    // 工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考。
    // 建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html。
    let config = new Config({
      // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID。
      accessKeyId: process.env['ALIBABA_CLOUD_ACCESS_KEY_ID'],
      // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
      accessKeySecret: process.env['ALIBABA_CLOUD_ACCESS_KEY_SECRET'],
    });
    // Endpoint 请参考 https://api.aliyun.com/product/Cdn
    config.endpoint = `cdn.aliyuncs.com`;
    // console.log(config);
    
    return new Cdn20180510(config);
  }

  async main(objectType: string, objectPath: string): Promise<string> {

    let client = this.createClient();
    let refreshObjectCachesRequest = new $Cdn20180510.RefreshObjectCachesRequest({
      objectPath,
      objectType
    });
    let runtime = new $Util.RuntimeOptions({ });
    try {
      // 复制代码运行请自行打印 API 的返回值
      const result = await client.refreshObjectCachesWithOptions(refreshObjectCachesRequest, runtime);
      return result.statusCode === 200 ? '刷新成功' : '刷新失败';
    } catch (error: any) {
      // 此处仅做打印展示，请谨慎对待异常处理，在工程项目中切勿直接忽略异常。
      // 错误 message
      console.log(error.message);
      // 诊断地址
      // console.log(error.data["Recommend"]);
      return error.message;
    }    
  }

}

// Client.main(process.argv.slice(2));