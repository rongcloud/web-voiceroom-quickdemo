<template>
  <div id="app">
    <div>appkey: <input v-model="appkey" /></div>
    <div>usertoken: <input v-model="usertoken" /></div>
    <p>YmSBbNsfRwwI5PzVHL3RtGIXiK7UziXWPic5kDh9BJY=@0fv3.cn.rongnav.com;0fv3.cn.rongcfg.com</p>
    <div>
      <button v-on:click="start">开始初始化</button>
    </div>
    <div>
      roomid: <input v-model="roomid" />
    </div>
    
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
  </div>
</template>

<script>
import sdk from "/Users/cuifengbo/work/RCVoiceRoomLib-Web/dist/main.js";

export default {
  name: "App",
  data: () => {
    return {
      appkey: "25wehl3u21chw",
      usertoken:
        "uWgFAOO3fH4CcOmUAuGjAWRn2CMgdJTbX5Cxn5ZSuW8=@0fv3.cn.rongnav.com;0fv3.cn.rongcfg.com",
      roomid: "",
    };
  },
  mounted() {
    window.a = sdk;
    console.log("----------------");
  },
  methods: {
    start: function () {
      let option = {
        appkey: this._data.appkey,
        usertoken: this._data.usertoken,
      };
      sdk.init(option);
      sdk.on("ready", () => {
        console.log("sdk初始化完成");
      });
    },
    createAndJoinRoom(){
      sdk.createAndJoinRoom(this._data.roomid)
    },
    joinRoom(){
      sdk.joinRoom(this._data.roomid)
    },
    leaveRoom(){
      sdk.leaveRoom(this._data.roomid)
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
