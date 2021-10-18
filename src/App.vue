<template>
  <div id="app">
    <div>appkey: <input v-model="appkey" /></div>
    <div>usertoken: <input v-model="usertoken" /></div>
    <p>
      YmSBbNsfRwwI5PzVHL3RtGIXiK7UziXWPic5kDh9BJY=@0fv3.cn.rongnav.com;0fv3.cn.rongcfg.com
    </p>
    <div>
      <button v-on:click="start">开始初始化</button>
      <button v-on:click="connect">使用token连接</button>
    </div>
    <div>roomid: <input v-model="roomid" /></div>
    <div>roomname: <input v-model="roomname" /></div>
    <div class="block">
      <div>主播操作</div>

      <button v-on:click="createAndJoinRoom">createAndJoinRoom</button>
      <button v-on:click="leaveRoom">leaveRoom</button>
    </div>
    <div class="block">
      <div>观众操作</div>

      <button v-on:click="joinRoom">joinRoom</button>
      <button v-on:click="leaveRoom">leaveRoom</button>
    </div>
    <div>
      麦位信息
      <div v-for="(item, index) in seatInfoList" :key="index">
        | 当前状态:{{ item.status }} | 是否静音:{{ item.mute }} | 用户id:{{
          item.userId
        }}
        | 自定义:{{ item.extra }}
        
      </div>
    </div>
    <div>
      rtc用户操作
        <div>麦位序号: <input v-model="seatNum" /></div>
        <div>目标用户id: <input v-model="userId" /></div>
        <button v-on:click="enterSeat">上麦</button>
        <button v-on:click="leaveSeat">下麦</button>
    </div>
  </div>
</template>

<script>
import sdk from "/Users/cuifengbo/work/RCVoiceRoomLib-Web/dist/main.js";
//import sdk from 'rcvoiceroomlib'
export default {
  name: "App",
  data: () => {
    return {
      appkey: "25wehl3u21chw",
      usertoken:
        "uWgFAOO3fH4CcOmUAuGjAWRn2CMgdJTbX5Cxn5ZSuW8=@0fv3.cn.rongnav.com;0fv3.cn.rongcfg.com",
      roomid: "",
      roomname: "",
      seatInfoList: [],
      seatNum:'',
      userId:''
    };
  },
  mounted() {
    window.a = sdk;
    console.log("----------------");
  },
  methods: {
    start: function () {
      sdk.init(this._data.appkey);
      sdk.on("ready", () => {
        console.log("sdk初始化完成");
      });
      sdk.on("update", () => {
        console.log("sdk初始化完成");
      });
      sdk.on("onSeatInfoUpdate",()=>{
        this._data.seatInfoList = sdk.seatInfoList;
      })
      sdk.on("onRoomInfoUpdate",()=>{
        console.log('RoomInfo:' , sdk.roomInfo);
      })
    },
    connect(){
      sdk.connect(this._data.usertoken);
    },
    createAndJoinRoom() {
      if (this._data.roomid == "") {
        alert("房间id不能为空");
        return;
      }
      if (this._data.roomname == "") {
        //如果房间名称为空则设置为与id相同  roomname 是可选参数
        this._data.roomname = this._data.roomid;
      }
      sdk.createAndJoinRoom({
        roomId: this._data.roomid,
        roomName: this._data.roomname,
      });
    },
    joinRoom() {
      sdk.joinRoom(this._data.roomid);
    },
    leaveRoom() {
      sdk.leaveRoom(this._data.roomid);
    },
    enterSeat() {
      sdk.rtc.enterSeat();
    },
    leaveSeat(){
      sdk.rtc.leaveSeat();
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.block {
  width: 50%;
  float: left;
}
</style>
