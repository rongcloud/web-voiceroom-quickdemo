# rcvoiceroomlib quickdemo

## 线上演示 

[ 语聊房quickdemo演示 ](https://apiv1-rcrtc.rongcloud.cn/webchat)

## 项目安装
```
npm install
```

### 编译并发布
```
npm run serve
```

### 项目简介
本项目为 融云语聊房sdk快速接入的演示项目。
项目中使用到的 appkey 和 usertoken 是通过[ 融云开发者后台 ](https://developer.rongcloud.cn/app/appkey)注册并获取的。

本项目所有远端服务完全由融云im及rtc服务提供，用户无需搭建服务端即可体验sdk提供的全部客户端功能。
如果需要服务端能力及ui搭建需要用户自行开发。

[ sdk详细文档地址 ](https://doc.rongcloud.cn/voiceroom/Web/1.X/intro/intro)

### 项目运行

项目运行 npm run serve 后 顺序执行 

开始初始化 按钮：  输入appkey后点击 必须且只需要调用一次 

使用token连接 按钮：  输入usertoken后点击 必须且只需要调用一次 

roomid 房间id字段： 可依据开发者工具创建房间，生成房间id、房间名称，作为观众方加入，也可作为房主主动创建并加入一个自定义id、名称的房间 

roomname 房间名称字段： 用户自定义房间名称。 不传入时自动生成一个跟roomid相同的房间名称

createAndJoinRoom / joinRoom 两个动作2选一 创建房间是在房间并没有被创建时调用 ，加入房间只能加入已经创建的房间

createAndJoinRoom 按钮：创建并加入一个房间 在输入房间id后调用 必须且只需要调用一次 

joinRoom 按钮：根据房间id 加入一个已经存在的房间 必须且只需要调用一次 

加入房间后 所有功能才可以正常调用。 功能性按钮悬浮会有简单说明

### 项目调试

本项目中同一房间中的用户权利平等均可以调用sdk提供的全部能力，权限相关限制功能需要使用者自行开发限制

| 按钮        | 功能说明                   |
|:------------|:---------------------------------|
| 指定用户下麦   | 将指定id的用户从麦位移除                |
| 抱用户上麦  |  将指定id的用户上到最近可用麦位        |
| 踢出房间 |  将指定id的用户移出房间               |
| 单麦闭麦  |  设置指定麦位的静音状态               |
| 设置座位数/上麦模式（自由/申请）   |      设置房间座位数等信息 设置座位数量后 会将除0号麦位外其他麦位已有用户下麦并重新初始化麦位           |
| 全麦闭麦/开麦  |    设置除当前用户所在麦位外的麦位的静音状态             |
| 全麦锁座/解锁   | 设置出当前用户所在麦位外所有麦位的锁定状态                |
| 同意排麦请求   |  同意指定用户的排麦请求                |
| 拒绝排麦请求   |    拒绝指定用户的排麦请求             |
| 用户上麦   |  将当前用户上到指定的麦位               |
| 用户下麦   |   将当前用户从当前麦位上移除以观众身份进入房间              |
| 用户跳麦   |  将当前已经在麦位上的用户移动到指定的麦位上               |
| 更新extra字段   |  更新指定麦位的extra字段信息 该功能在开发房间自定义功能时使用               |
|  请求排麦  |    当前用户加入申请上麦队列             |
|  取消排麦  |     当前用户离开申请上麦队列            |
|  播放  |     播放选择本地 MP3 文件            |
|  停止播放  |     停止播放已播放 MP3 文件            |
|  取消排麦  |     当前用户离开申请上麦队列            |
|  申请上麦集合  |        当前申请上麦的用户队列         |
| 最新麦位信息   |    点击后会展示语聊房当前的最新麦位信息。详细数据模型请参考[ sdk详细文档地址 ](https://doc.rongcloud.cn/voiceroom/Web/1.X/intro/intro)             |


> 用户如果需要使用融云im提供的其他能力可以再加入房间后访问 RCVoiceRoomLib.im.chatRoom 该对象为当前im聊天室实例 详细文档参考[ 融云im详细文档地址 ](https://doc.rongcloud.cn/im/Web/4.X/index)





