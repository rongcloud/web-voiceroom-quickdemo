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
      <button @click="createAndJoinRoom">createAndJoinRoom</button>
      <button @click="leaveRoom">leaveRoom</button><br />
      <div>
        <button @click="kickUserFromSeat(kickUserId)">将指定麦位下麦</button
        >用户id:
        <input v-model="kickUserId" />
      </div>
      <div>
        <button @click="pickUserToSeat(pickUserId)">抱用户上麦</button>用户id:
        <input v-model="pickUserId" />
      </div>
      <div>
        <button @click="kickUserFromRoom(kickUserRoomId)">将用户踢出房间</button
        >用户id:
        <input v-model="kickUserRoomId" />
      </div>
      <div>
        <button @click="muteSeat(muteSeatIndex, ismute)">将某个麦位静音</button
        >麦位序号: <input v-model="muteSeatIndex" /><br />
        是否静音:
        <input type="checkbox" v-model="ismute" id="ismute" />
        <!-- <input v-model="ismute" /> -->
      </div>
      <div>
        <button @click="lockSeat(lockSeatIndex, isLocked)">
          将某个麦位锁定</button
        >麦位序号: <input v-model="lockSeatIndex" /><br />
        是否锁麦位:
        <input v-model="isLocked" type="checkbox" id="isLocked" />
      </div>
      <div>
        <button
          @click="
            setRoomInfo(
              seatCountValue,
              isLockAll,
              isMuteAll,
              roomName,
              isFreeEnterSeatValue
            )
          "
        >
          设置房间信息</button
        >座位: <input v-model="seatCountValue" /><br />
        自由/申请上麦:
        <input
          v-model="isFreeEnterSeatValue"
          type="checkbox"
          id="isFreeEnterSeatValue"
        /><br />
        全麦操作/锁坐：<input
          type="checkbox"
          v-model="isLockAll"
          id="isLockAll"
        /><br />
        全麦操作/静麦：<input
          type="checkbox"
          v-model="isMuteAll"
          id="isMuteAll"
        /><br />
        全麦操作roomName：<input v-model="roomName" />
      </div>
      <div>
        <button @click="muteOtherSeats(muteOtherValue)">全麦静音/开麦</button
        >是否静音:
        <input type="checkbox" v-model="muteOtherValue" id="muteOtherValue" />
      </div>
      <div>
        <button @click="lockOtherSeats(lockOtherValue)">全麦锁坐/开坐</button
        >是否锁麦:
        <input type="checkbox" v-model="lockOtherValue" id="lockOtherValue" />
      </div>
      <div>
        <button @click="acceptRequestSeat(acceptRequestSeatId)">
          同意用户排麦请求</button
        >用户id:
        <input v-model="acceptRequestSeatId" />
      </div>
      <div>
        <button @click="rejectRequestSeat(rejectRequestSeatId)">
          拒绝用户排麦请求</button
        >用户id:
        <input v-model="rejectRequestSeatId" />
      </div>
    </div>
    <div class="block">
      <div>观众操作</div>
      <button @click="joinRoom">joinRoom</button>
      <button @click="leaveRoom">leaveRoom</button>

      <div>
        <button @click="enterSeat(enterseatIndex)">用户上麦</button>麦位序号:
        <input v-model="enterseatIndex" />
      </div>
      <div>
        <button @click="leaveSeat(leaveseatIndex)">用户下麦</button>
      </div>
      <div>
        <button @click="switchSeatTo(switchseatIndex)">用户跳麦</button
        >麦位序号:
        <input v-model="switchseatIndex" />
      </div>
      <div>
        <button @click="getRequestSeatUserIds">申请上麦集合</button>
        <div v-for="(item, i) in this.RequestSeatUserIds" :key="i">
          {{ item }}
        </div>
      </div>
      <div>
        <button @click="updateSeatInfo(updateSeatIndex, updateExtra)">
          更新extra字段</button
        >麦位序号: <input v-model="updateSeatIndex" /><br />extra:<input
          v-model="updateExtra"
        />
      </div>
      <button @click="disConnect">主动断开连接</button>
      <button @click="requestSeat">请求排麦</button>
      <button @click="cancelRequestSeat">取消排麦</button><br />
      <button @click="sendMessage">发送消息</button><br />

      <div>
        <button @click="getLatestSeatInfo">最新麦位信息</button><br />
        <div v-for="(item, i) in this.seatInfoList" :key="i">
          <span>{{ i }}号麦位</span>{{ item }}
        </div>
      </div>
    </div>
    <div>
      <!-- 麦位信息 -->
      <!-- <div v-for="(item, index) in seatInfoList" :key="index">
        | 当前状态:{{ item.status }} | 是否静音:{{ item.mute }} | 用户id:{{
          item.userId
        }}
        | 自定义:{{ item.extra }}
      </div> -->
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
      // appkey: "pvxdm17jpw7ar",
      // usertoken:
      //   "wB2pIEjKZhIpPhN9p7Q/0W1AOiPCF2gmNkBLANBrVzlzbbd3zFCcXts5peb8z1U4K8Yv5vmbg1XfnfI4frh+OQ==@4d1h.cn.rongnav.com;4d1h.cn.rongcfg.com",
      roomid: "SRiqTORVQvEjVV7HOnje0E",
      //房主
      kickUserId: null,
      pickUserId: null,
      kickUserRoomId: null,
      muteSeatIndex: null,
      ismute: true,
      lockSeatIndex: null,
      isLocked: true,
      seatCountValue: 9,
      isFreeEnterSeatValue: true,
      isLockAll: false,
      isMuteAll: false,
      roomName: "",
      muteOtherValue: true,
      lockOtherValue: true,
      acceptRequestSeatId: null,
      rejectRequestSeatId: null,
      //观众
      enterseatIndex: null,
      leaveseatIndex: null,
      switchseatIndex: null,
      updateSeatIndex: null,
      updateExtra: "",
      RequestSeatUserIds: [],
      userId: "",
      roomname: "",
      seatInfoList: [],
      seatNum:'',
    
     
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
      sdk.on("onSeatInfoUpdate", () => {
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
    //房主
    kickUserFromSeat: function (kickUserId) {
      if (kickUserId == null) {
        alert("请输入指定麦位id");
      } else {
        sdk.kickUserFromSeat(kickUserId);
      }
    },
    pickUserToSeat: function (pickUserId) {
      if (pickUserId == null) {
        alert("请输入指定麦位id");
      } else {
        sdk.pickUserToSeat(pickUserId);
      }
    },
    kickUserFromRoom: function (kickUserRoomId) {
      if (kickUserRoomId == null) {
        alert("请输入指定麦位id");
      } else {
        sdk.kickUserFromRoom(kickUserRoomId);
      }
    },
    muteSeat: function (muteSeatIndex, ismute) {
      if (muteSeatIndex == null) {
        alert("麦位序号");
      } else {
        sdk.muteSeat(muteSeatIndex, ismute);
      }
    },
    lockSeat: function (lockSeatIndex, isLocked) {
      if (lockSeatIndex == null) {
        alert("麦位序号");
      } else {
        sdk.lockSeat(lockSeatIndex, isLocked);
      }
    },
    setRoomInfo: function (
      seatCountValue,
      isLockAll,
      isMuteAll,
      roomName,
      isFreeEnterSeatValue
    ) {
      const roominfo = {
        isFreeEnterSeat: isFreeEnterSeatValue,
        isLockAll: isLockAll,
        isMuteAll: isMuteAll,
        roomName: roomName,
        seatCount: seatCountValue, //麦位数量
      };
      if (seatCountValue == null) {
        alert("麦位序号");
      } else {
        sdk.setRoomInfo(roominfo);
      }
    },
    muteOtherSeats: function (muteOtherValue) {
      sdk.muteOtherSeats(muteOtherValue);
    },
    lockOtherSeats: function (lockOtherValue) {
      sdk.lockOtherSeats(lockOtherValue);
    },
    acceptRequestSeat: function (acceptRequestSeatId) {
      if (acceptRequestSeatId == null) {
        alert("请输入同意用户id");
      } else {
        sdk.acceptRequestSeat(acceptRequestSeatId);
      }
    },
    rejectRequestSeat: function (rejectRequestSeatId) {
      if (rejectRequestSeatId == null) {
        alert("请输入拒绝用户id");
      } else {
        sdk.rejectRequestSeat(rejectRequestSeatId);
      }
    },
    //观众
    enterSeat: function (enterseatIndex) {
      if (enterseatIndex == null) {
        alert("请输入麦位序号");
      } else {
        sdk.enterSeat(Number(enterseatIndex));
      }
    },
    leaveSeat: function () {
      sdk.leaveSeat();
    },
    switchSeatTo: function (switchseatIndex) {
      if (switchseatIndex == null) {
        alert("请输入麦位序号");
      } else {
        sdk.switchSeatTo(switchseatIndex);
      }
    },
    disConnect: function () {
      sdk.disConnect();
    },
    getRequestSeatUserIds: async function () {
      this.RequestSeatUserIds = await sdk.getRequestSeatUserIds();
    },
    updateSeatInfo: function (updateSeatIndex, updateExtra) {
      if (updateSeatIndex == null) {
        alert("请输入麦位序号");
      } else {
        sdk.updateSeatInfo(updateSeatIndex, updateExtra);
      }
    },
    requestSeat: function () {
      sdk.requestSeat();
    },
    cancelRequestSeat: function () {
      sdk.cancelRequestSeat();
    },
    getLatestSeatInfo: async function () {
      this.seatInfoList = await sdk.getLatestSeatInfo();
    },
    sendMessage: function () {
      // const message = {
      //   messageType: "RC:VRLRefreshMsg", // 'RC:TxtMsg'
      //   content: { name: "RCUserOnSeatSpeakingKey_0", content: 9 },
      // };
      //  sdk.sendMessage(message);
      const name = "RCAudienceLeaveRoom",
        content = "265e3bf0-fafe-40f0-9521-63929501db78";

      sdk.notifyVoiceRoom(name, content);
    },
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
