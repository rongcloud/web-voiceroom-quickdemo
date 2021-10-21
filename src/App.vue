<template>
  <div id="app">
    <div>appkey: <input v-model="appkey" /></div>
    <div>usertoken: <input v-model="usertoken" style="width: 800px" /></div>
    <p>
      lRfa2J9VTfoF9BBMmpGw8t2QLXfrldGNyY21wXbbeFKscMS08fzM9ts5peb8z1U4yfTDyWlj9ukgqqP9HOUIug==@4d1h.cn.rongnav.com;4d1h.cn.rongcfg.com
    </p>
    <div>
      <button v-on:click="start">开始初始化</button>
      <button v-on:click="connect">使用token连接</button>
    </div>
    <div>
      roomid:
      <input
        v-model="roomid"
        title="可依据开发者工具创建房间，生成房间id、房间名称，作为观众方加入，也可作为房主主动创建并加入一个自定义id、名称的房间"
        placeholder="输入roomid"
        class="inputID"
      />
    </div>
    <div>
      roomname:
      <input
        v-model="roomname"
        placeholder="输入roomname，非必填"
        class="inputID"
      />
    </div>
    <div class="block">
      <div>模拟房主操作</div>
      <button @click="createAndJoinRoom" title="创建并加入新创建房间中">
        createAndJoinRoom
      </button>
      <button @click="leaveRoom">leaveRoom</button><br />
      <div>
        <button
          title="将一个指定并已经在麦上的用户踢下麦"
          @click="kickUserFromSeat(kickUserId)"
        >
          指定用户下麦</button
        >用户id:
        <input v-model="kickUserId" />
      </div>
      <div>
        <button
          title="发送一个邀请指定用户上麦的消息"
          @click="pickUserToSeat(pickUserId)"
        >
          抱用户上麦</button
        >用户id:
        <input v-model="pickUserId" />
      </div>
      <div>
        <button
          title="将一个已存在房间中的用户踢出房间"
          @click="kickUserFromRoom(kickUserRoomId)"
        >
          踢出房间</button
        >用户id:
        <input v-model="kickUserRoomId" />
      </div>
      <div>
        <button
          title="控制指定麦位的静音与否"
          @click="muteSeat(muteSeatIndex, ismute)"
        >
          单麦闭麦</button
        >麦位序号: <input v-model="muteSeatIndex" class="inputOther" />
        是否静音:
        <input type="checkbox" v-model="ismute" id="ismute" />
        <!-- <input v-model="ismute" /> -->
      </div>
      <div>
        <button
          title="控制指定麦位的锁定与否"
          @click="lockSeat(lockSeatIndex, isLocked)"
        >
          单麦锁座</button
        >麦位序号: <input v-model="lockSeatIndex" class="inputOther" />
        是否锁麦:
        <input v-model="isLocked" type="checkbox" id="isLocked" />
      </div>
      <div>
        <button
          @click="
            setRoomInfo(
              seatCountValue,
              isFreeEnterSeatValue
            )
          "
          title="可以设置房间信息,包括房间设置几坐，自由上麦/申请上麦操作"
        >
          设置座位数/上麦模式（自由/申请）</button
        >座位: <input v-model="seatCountValue" class="inputOther" /><br />
        上麦自由/申请：<input
          v-model="isFreeEnterSeatValue"
          type="checkbox"
          id="isFreeEnterSeatValue"
        /><br />
        <!-- 全麦操作/锁坐：<input
          type="checkbox"
          v-model="isLockAll"
          id="isLockAll"
        /><br />
        全麦操作/静麦：<input
          type="checkbox"
          v-model="isMuteAll"
          id="isMuteAll"
        /><br />
        房间名称<input v-model="roomName" /> -->
      </div>
      <div>
        <button
          title="全麦静麦/解锁全麦(操作0号座位之外所有座位)"
          @click="muteOtherSeats(muteOtherValue)"
        >
          全麦闭麦/开麦</button
        >是否闭麦:
        <input type="checkbox" v-model="muteOtherValue" id="muteOtherValue" />
      </div>
      <div>
        <button
          title="全麦锁座/解锁全座(操作0号座位和有人座位之外所有座位)"
          @click="lockOtherSeats(lockOtherValue)"
        >
          全麦锁座/解锁</button
        >是否锁麦:
        <input type="checkbox" v-model="lockOtherValue" id="lockOtherValue" />
      </div>
      <div>
        <button
          title="同意指定id用户排麦请求"
          @click="acceptRequestSeat(acceptRequestSeatId)"
        >
          同意排麦请求</button
        >用户id:
        <input v-model="acceptRequestSeatId" />
      </div>
      <div>
        <button
          title="拒绝指定id用户排麦请求"
          @click="rejectRequestSeat(rejectRequestSeatId)"
        >
          拒绝排麦请求</button
        >用户id:
        <input v-model="rejectRequestSeatId" />
      </div>
    </div>
    <div class="block">
      <div>模拟观众操作</div>
      <button @click="joinRoom">joinRoom</button>
      <button @click="leaveRoom">leaveRoom</button>

      <div>
        <button title="用户主动发起上麦操作" @click="enterSeat(enterseatIndex)">
          用户上麦</button
        >麦位序号:
        <input v-model="enterseatIndex" class="inputOther" />
      </div>
      <div>
        <button title="用户主动发起下麦操作" @click="leaveSeat(leaveseatIndex)">
          用户下麦
        </button>
      </div>
      <div>
        <button
          title="用户主动发起跳麦操作"
          @click="switchSeatTo(switchseatIndex)"
        >
          用户跳麦</button
        >麦位序号:
        <input v-model="switchseatIndex" />
      </div>
      <div>
        <div v-for="(item, i) in this.RequestSeatUserIds" :key="i">
          {{ item }}
        </div>
      </div>
      <div>
        <button
          title="更新指定麦位的extra字段"
          @click="updateSeatInfo(updateSeatIndex, updateExtra)"
        >
          更新extra字段</button
        >麦位序号: <input v-model="updateSeatIndex" /><br />extra:<input
          v-model="updateExtra"
        />
      </div>

      <!-- <button @click="disConnect">主动断开连接</button><br /> -->
      <button title="用户主动发起请求排麦" @click="requestSeat">请求排麦</button
      ><br />
      <button title="用户主动发起取消排麦" @click="cancelRequestSeat">
        取消排麦</button
      ><br />
      <button title="模拟发送消息动作" @click="sendMessage">发送消息</button
      ><br />
      <button
        title="查询并展示已发起申请上麦的ID集合"
        @click="getRequestSeatUserIds"
      >
        申请上麦集合</button
      ><br />
      <div>
        <button title="查询并展示最新麦位信息集合" @click="getLatestSeatInfo">
          最新麦位信息</button
        ><br />
        <div v-for="(item, i) in seatInfoList" :key="i">
          <span>{{ i }}号麦位</span>{{ item }}
        </div>
      </div>
      <br />
      <div>
        rtc用户操作
        <div>麦位序号: <input v-model="seatNum" /></div>
        <div>目标用户id: <input v-model="userId" /></div>
        <button v-on:click="enterSeat">上麦</button>
        <button v-on:click="leaveSeat">下麦</button>
      </div>
    </div>

    <div>
    
       <!-- <div v-for="(item, index) in seatInfoList" :key="index">
        | 当前状态:{{ item.status }} | 是否静音:{{ item.mute }} | 用户id:{{
          item.userId
        }}
        | 自定义:{{ item.extra }}
      </div> -->
    </div>
  </div>
</template>

<script>
//import sdk from "/Users/cuifengbo/work/RCVoiceRoomLib-Web/dist/main.js";
import sdk from "rcvoiceroomlib-v1"; 
export default {
  name: "App",
  data: () => {
    return {
      // appkey: "25wehl3u21chw",
      // usertoken:
      //   "uWgFAOO3fH4CcOmUAuGjAWRn2CMgdJTbX5Cxn5ZSuW8=@0fv3.cn.rongnav.com;0fv3.cn.rongcfg.com",
      appkey: "pvxdm17jpw7ar",
      usertoken:
        "dJHlYAI0iZXYwg3eA2qr71PLrtzG3RtcdGqDfPiZBqSIa660hwvkMds5peb8z1U4NxwKhS40Bvft/3I7XtXazA==@4d1h.cn.rongnav.com;4d1h.cn.rongcfg.com",
      roomid: "Q7Jv4lIYQMwpXmsJAh6qw4",
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
      seatNum: "",
      seatInfoList:[],
      roomInfo:{}
    };
  },
 
  mounted() {
    window.a = sdk;
    console.log("----------------");
  },
  watch:{
      seatInfoList:{//深度监听，可监听到对象、数组的变化
          handler(val, oldVal){
              console.log("b.c: "+val, oldVal);
          },
          deep:true //true 深度监听
      }
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
        console.log("onSeatInfoUpdate");
        this._data.seatInfoList = sdk.seatInfoList;
        this.$forceUpdate()
      });
      sdk.on("onRoomInfoUpdate", () => {
        console.log("RoomInfo:", sdk.roomInfo);
        this._data.roomInfo = sdk.roomInfo;
        this.$forceUpdate()
      });
    },
    getLatestSeatInfo: async function () {
      this._data.seatInfoList = sdk.seatInfoList
      //  this.$set(this.seatInfoList,index,sdk.seatInfoList)
      let list = await sdk.getLatestSeatInfo()
      console.log("远端数据",list);
      this.$forceUpdate();
      
      //需要执行一次强制刷新更新本地ui层展示
    },
    connect() {
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
      //sdk.onec("joinroom")
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
      isFreeEnterSeatValue
    ) {
      console.log(sdk.roomInfo);
      const roominfo = {
        isFreeEnterSeat: isFreeEnterSeatValue,
        isLockAll: sdk.roomInfo['isLockAll'],
        isMuteAll: sdk.roomInfo['isMuteAll'],
        roomName: sdk.roomInfo['roomName']||'1234',
        seatCount: seatCountValue, //麦位数量
      };
      
      if (seatCountValue == null) {
        alert("麦位序号");
      } else {
        console.log(roominfo);
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
   
    sendMessage: function () {
      const message = {
        messageType: "RC:VRLRefreshMsg", // 'RC:TxtMsg'
        content: { name: "RCUserOnSeatSpeakingKey_0", content: 1 },
      };
      sdk.sendMessage(message);
      // const name = "RCAudienceLeaveRoom",
      //   content = "265e3bf0-fafe-40f0-9521-63929501db78";

      // sdk.notifyVoiceRoom(name, content);
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
/* .title {
  position: absolute;
  left: 30%;
} */
.block {
  width: 30%;
  float: left;
  text-align: left;
  margin-left: 20%;
}
.inputID {
  width: 300px;
}
.inputOther {
  width: 50px;
}
.blockTitle {
  float: left;
  text-align: left;
}
</style>
