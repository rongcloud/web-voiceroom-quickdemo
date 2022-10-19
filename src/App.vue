<template>
  <div id="app">
    <div v-show="false" id="cdn-video-player"></div>
    <div>
      appkey:
      <el-input v-model="appkey" size="mini" style="width: 200px" />
      <el-button
        size="mini"
        type="primary"
        v-on:click="start"
        style="margin-left: 20px"
        >appkey初始化</el-button
      >
      <el-button
        size="mini"
        type="primary"
        v-on:click="changeUser"
        style="margin-left: 20px"
        >切换用户</el-button
      >
      usertoken:<el-input
        size="mini"
        v-model="usertoken"
        style="width: 200px"
      ></el-input>
      <el-button
        size="mini"
        type="primary"
        v-on:click="connect"
        style="margin-left: 20px"
        >token连接</el-button
      >
    </div>
    <div>
      房间ID:
      <el-input
        size="mini"
        v-model="roomid"
        title="可依据开发者工具创建房间，生成房间id、房间名称，作为观众方加入，也可作为房主主动创建并加入一个自定义id、名称的房间"
        placeholder="输入房间ID"
        class="inputID"
      />
      房间名称:
      <el-input
        size="mini"
        v-model="roomname"
        placeholder="输入房间名称，非必填"
        class="inputID"
      />

      <el-button
        style="margin-left: 20px"
        size="small"
        title="主动打开播放器"
        round
        type="warning"
        @click="openPlayer"
      >
        safari打开播放器</el-button
      >
    </div>
    <div></div>
    <div class="block">
      <div>模拟房主操作</div>
      <el-button
        size="mini"
        @click="createAndJoinRoom"
        title="创建并加入新创建房间中"
      >
        创建并加入房间
      </el-button>
      是否启用状态锁:<el-checkbox
        size="mini"
        type="checkbox"
        v-model="CRenableSeatStateLock"
        id="enableSeatStateLock"
      />
      <el-button size="mini" @click="leaveRoom">离开房间</el-button><br />
      <div>
        <el-button
          size="mini"
          title="将一个指定并已经在麦上的用户踢下麦"
          @click="kickUserFromSeat(kickUserId)"
        >
          指定用户下麦</el-button
        >用户id:
        <el-input size="mini" v-model="kickUserId" class="inputID" />
      </div>
      <div>
        <el-button
          size="mini"
          title="发送一个邀请指定用户上麦的消息"
          @click="pickUserToSeat(pickUserId)"
        >
          邀请用户上麦</el-button
        >用户id:
        <el-input size="mini" v-model="pickUserId" class="inputID" />
      </div>
      <div>
        <el-button
          size="mini"
          title="将一个已存在房间中的用户踢出房间"
          @click="kickUserFromRoom(kickUserRoomId)"
        >
          踢用户出房间</el-button
        >用户id:
        <el-input v-model="kickUserRoomId" class="inputID" size="mini" />
      </div>
      <div>
        <el-button
          size="mini"
          title="控制指定麦位的静音与否"
          @click="muteSeat(muteSeatIndex, ismute)"
        >
          单麦闭麦</el-button
        >麦位序号:
        <el-input v-model="muteSeatIndex" class="inputOther" size="mini" />
        是否静音:
        <el-checkbox type="checkbox" v-model="ismute" id="ismute" size="mini" />
        <!-- <input v-model="ismute" /> -->
      </div>
      <div>
        <el-button
          size="mini"
          title="控制指定麦位的锁定与否"
          @click="lockSeat(lockSeatIndex, isLocked)"
        >
          单麦锁座</el-button
        >麦位序号:
        <el-input v-model="lockSeatIndex" class="inputOther" size="mini" />
        是否锁麦:
        <el-checkbox
          v-model="isLocked"
          type="checkbox"
          id="isLocked"
          size="mini"
        />
      </div>
      <div>
        <el-button
          size="mini"
          @click="setRoomInfo(seatCountValue, isFreeEnterSeatValue)"
          title="可以设置房间信息,包括房间设置几坐，自由上麦/申请上麦操作"
        >
          设置座位数/上麦模式（自由/申请）</el-button
        >座位:
        <el-input
          v-model="seatCountValue"
          class="inputOther"
          size="mini"
        /><br />
        自由/申请上麦：<el-checkbox
          size="mini"
          v-model="isFreeEnterSeatValue"
          type="checkbox"
          id="isFreeEnterSeatValue"
        /><br />
      </div>
      <div>
        <el-button
          size="mini"
          title="全麦静麦/解锁全麦(操作0号座位之外所有座位)"
          @click="muteOtherSeats(muteOtherValue)"
        >
          全麦闭麦/开麦</el-button
        >是否闭麦:
        <el-checkbox
          size="mini"
          type="checkbox"
          v-model="muteOtherValue"
          id="muteOtherValue"
        />
      </div>
      <div>
        <el-button
          size="mini"
          title="全麦锁座/解锁全座(操作0号座位和有人座位之外所有座位)"
          @click="lockOtherSeats(lockOtherValue)"
        >
          全麦锁座/解锁</el-button
        >是否锁麦:
        <el-checkbox
          size="mini"
          type="checkbox"
          v-model="lockOtherValue"
          id="lockOtherValue"
        />
      </div>
      <div>
        <el-button
          size="mini"
          title="同意指定id用户排麦请求"
          @click="acceptRequestSeat(acceptRequestSeatId)"
        >
          同意排麦请求</el-button
        >用户id:
        <el-input v-model="acceptRequestSeatId" class="inputID" size="mini" />
      </div>
      <div>
        <el-button
          size="mini"
          title="拒绝指定id用户排麦请求"
          @click="rejectRequestSeat(rejectRequestSeatId)"
        >
          拒绝排麦请求</el-button
        >用户id:
        <el-input v-model="rejectRequestSeatId" class="inputID" size="mini" />
      </div>
      <div>
        <el-button
          size="mini"
          title="静音所有远程音频流"
          @click="muteAllRemoteStreams(muteOtherAll)"
        >
          静音所有远程音频流</el-button
        >是否静音远程:
        <el-checkbox
          type="checkbox"
          v-model="muteOtherAll"
          id="muteOtherAll"
          size="mini"
        />
      </div>
      <div>
        <el-button
          size="mini"
          title="禁用本地麦克风"
          @click="disableAudioRecording(isDisable)"
        >
          禁用本地麦克风</el-button
        >是否禁用本地麦克风:
        <el-checkbox
          type="checkbox"
          v-model="isDisable"
          id="isDisable"
          size="mini"
        />
      </div>
      <div>
        选择歌曲:
        <input
          size="mini"
          type="file"
          id="file"
          value="选择歌曲"
          @change="handleFileChange"
          name="file"
          style="width: 180px"
          accept="audio/*,.mp3"
        />
        <el-button size="mini" title="播放选择本地 MP3 文件" @click="play"
          >播放</el-button
        >
        <el-button
          size="mini"
          title="停止播放已播放 MP3 文件"
          @click="stopCreateTrack"
        >
          停止播放
        </el-button>
      </div>
      <div></div>
    </div>
    <div class="blockT">
      <div>模拟观众操作</div>

      <el-button size="mini" @click="joinRoom">加入房间</el-button>
      是否启用状态锁:<el-checkbox
        size="mini"
        type="checkbox"
        v-model="JOenableSeatStateLock"
        id="enableSeatStateLock"
      />
      <el-button size="mini" @click="leaveRoom">离开房间</el-button>

      <div>
        <el-button
          size="mini"
          title="用户主动发起上麦操作"
          @click="enterSeat(enterseatIndex)"
        >
          用户上麦</el-button
        >麦位序号:
        <el-input size="mini" v-model="enterseatIndex" class="inputOther" />
        extra:<el-input
          v-model="seatupdateExtra"
          class="inputOther"
          size="mini"
        />是否闭麦:
        <el-checkbox
          size="mini"
          type="checkbox"
          v-model="seatmute"
          id="seatmute"
        />
      </div>
      <div>
        <el-button
          size="mini"
          title="用户主动发起下麦操作"
          @click="leaveSeat(leaveseatIndex)"
        >
          用户下麦
        </el-button>
      </div>
      <div>
        <el-button
          size="mini"
          title="用户主动发起跳麦操作"
          @click="switchSeatTo(switchseatIndex)"
        >
          用户跳麦</el-button
        >麦位序号:
        <el-input
          size="mini"
          v-model="switchseatIndex"
          class="inputOther"
        /><br />
        prextra:<el-input
          v-model="prseatextra"
          class="inputOther"
          size="mini"
        />pr是否闭麦:
        <el-checkbox
          size="mini"
          type="checkbox"
          v-model="prmute"
          id="prmute"
        /><br />
        toextra:<el-input
          v-model="toseatextra"
          class="inputOther"
          size="mini"
        />to是否闭麦:
        <el-checkbox size="mini" type="checkbox" v-model="tomute" id="tomute" />
      </div>

      <div>
        <el-button
          size="mini"
          title="更新指定麦位"
          @click="updateSeatInfoExtra()"
        >
          更新指定麦位</el-button
        >麦位序号:
        <el-input
          v-model="updateSeatIndex"
          size="mini"
          class="inputOther"
        />extra:<el-input
          v-model="updateExtra"
          class="inputOther"
          size="mini"
        />
        ismute:<el-checkbox
          size="mini"
          type="checkbox"
          v-model="updateIsMute"
          id="prmute"
        />
      </div>
      <el-button size="mini" title="用户主动发起请求排麦" @click="requestSeat"
        >请求排麦</el-button
      ><br />
      <el-button
        size="mini"
        title="用户主动发起取消排麦"
        @click="cancelRequestSeat"
      >
        取消排麦</el-button
      ><br />
      <el-button
        size="mini"
        title="查询并展示已发起申请上麦的ID集合"
        @click="getRequestSeatUserIds"
      >
        申请上麦集合</el-button
      ><br />
      <div>
        <div v-for="(item, i) in this.RequestSeatUserIds" :key="i">
          {{ item }}
        </div>
      </div>
      <div>
        <el-button size="mini" v-on:click="clearSeatState"
          >清理麦位异常状态</el-button
        >
        <br />
        <el-button size="mini" v-on:click="enableSeatStateLocked"
          >麦位状态锁</el-button
        >是否启用:<el-checkbox
          size="mini"
          type="checkbox"
          v-model="enableSeatStateLock"
          id="enableSeatStateLock"
        />
        <br />
        <el-button size="mini" v-on:click="isDisableAudioRecording"
          >获取本地的麦克风的禁用标识</el-button
        >
      </div>
      <div>
        <el-button
          size="mini"
          title="查询并展示最新麦位信息集合"
          @click="getLatestSeatInfo"
        >
          最新麦位信息</el-button
        ><br />
        <div v-for="(item, i) in seatInfoList" :key="i">
          <span>{{ i }}号麦位</span>{{ item }}
        </div>
      </div>
      <br />
    </div>
  </div>
</template>

<script >
export default {
  name: "App",
  data: () => {
    return {
      appkey: "",
      usertoken: "",
      user: "",
      roomid: "",
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
      muteOtherAll: true,
      isDisable: true,
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
      updateIsMute: true,
      RequestSeatUserIds: [],
      userId: "",
      roomname: "",
      seatNum: "",
      seatInfoList: [],
      roomInfo: {},
      music: null,
      seatupdateExtra: "",
      seatmute: true,
      prseatextra: "",
      prmute: true,
      toseatextra: "",
      tomute: true,
      enableSeatStateLock: true,
      CRenableSeatStateLock: true,
      JOenableSeatStateLock: true,
      isDisableAudioRecordingUserid: "",
    };
  },
  created() {},
  methods: {
    //注册
    start: function () {
      if (!this.appkey) {
        this.$message("请填写appkey");
        return;
      }
      try {
        this.$RongIMLib.init({
          appkey: this.appkey,
        });
        const rtcClient = this.$RongIMLib.installPlugin(
          this.$RongRTCLib.installer
        );
        this.$RCVoiceRoomLib.init({
          RongIMLib: this.$RongIMLib,
          RongRTCLib: rtcClient,
        });
      } catch (error) {
        console.log(error);
      }
    },

    //im 链接
    async connect() {
      if (!this.usertoken) {
        this.$message("请填写usertoken");
        return;
      }

      await this.$RongIMLib.connect(this.usertoken);
    },

    //清理 麦位异常状态
    clearSeatState() {
      this.$RCVoiceRoomLib.clearSeatState();
    },

    /**
     * 是否启用麦位状态锁，处理多端抢麦问题。SDK默认不启用。
     * 注意：
     * 1、如果不启用，会有多端同事抢麦的问题
     * 2、如果启用，需服务端接入异常退出的场景，并移除服状态锁的KV对，key：RCSPlaceHolderKey_seat_+ 麦位索引
     *
     * @param enable true: 启用，false: 不启用
     */
    enableSeatStateLocked() {
      this.$RCVoiceRoomLib
        .enableSeatStateLocked(this.enableSeatStateLock)
        .then((result) => {
          console.log("enableSeatStateLocked success:", result);
        });
    },

    //创建并加入房间
    async createAndJoinRoom() {
      if (this._data.roomid == "") {
        this.$message("房间id不能为空");
        return;
      }
      if (this._data.roomname == "") {
        //如果房间名称为空则设置为与id相同  roomname 是可选参数
        this._data.roomname = this._data.roomid;
      }
      await this.$RCVoiceRoomLib.createAndJoinRoom(
        this._data.roomid,
        {
          roomName: this._data.roomname,
          seatCount: 9,
          extra: "挂在房间信息上的信息",
        },
        this.CRenableSeatStateLock
      );
    },

    //接入已创建房间
    async joinRoom() {
      if (!this._data.roomid) {
        this.$message("房间id不能为空");
        return;
      }
      await this.$RCVoiceRoomLib.joinRoom(
        this._data.roomid,
        this.JOenableSeatStateLock
      );
    },

    //离开房间
    async leaveRoom() {
      if (!this.roomid) {
        this.$message("不在房间中");
        return;
      }
      if (this.player) {
        await this.player.remove();
        this.player = null;
      }
      await this.$RCVoiceRoomLib.leaveRoom(this._data.roomid);
      this.roomid = "";
      this.seatInfoList = [];
      this.seatInfoList.push();
    },

    //观众上麦
    enterSeat: async function (enterseatIndex) {
      if (enterseatIndex == null) {
        this.$message("请输入麦位序号");
      } else {
        if (this.player) {
          await this.player.remove();
          this.player = null;
        }
        await this.$RCVoiceRoomLib.enterSeat(Number(enterseatIndex), {
          extra: this.seatupdateExtra,
          isMute: this.seatmute,
        });
      }
    },

    //主播下麦
    leaveSeat: async function () {
      await this.$RCVoiceRoomLib.leaveSeat();
    },

    //跳麦
    switchSeatTo: async function (switchseatIndex) {
      if (switchseatIndex == null) {
        this.$message("请输入麦位序号");
      } else {
        await this.$RCVoiceRoomLib.switchSeatTo(
          switchseatIndex,
          {
            extra: this.prseatextra,
            isMute: this.prmute,
          },
          {
            extra: this.toseatextra,
            isMute: this.tomute,
          }
        );
      }
    },

    //申请排麦
    requestSeat: async function () {
      this.$RCVoiceRoomLib.requestSeat();
    },

    //取消排麦申请
    cancelRequestSeat: async function () {
      this.$RCVoiceRoomLib.cancelRequestSeat();
    },

    //获取申请排麦的userlist
    getRequestSeatUserIds: async function () {
      this.RequestSeatUserIds =
        await this.$RCVoiceRoomLib.getRequestSeatUserIds();
      this.RequestSeatUserIds.push();
    },

    //同意指定id用户排麦请求
    acceptRequestSeat: async function (acceptRequestSeatId) {
      if (acceptRequestSeatId == null) {
        this.$message("请输入同意用户id");
      } else {
        await this.$RCVoiceRoomLib
          .acceptRequestSeat(acceptRequestSeatId)
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    //拒绝指定id用户排麦请求
    rejectRequestSeat: async function (rejectRequestSeatId) {
      if (rejectRequestSeatId == null) {
        this.$message("请输入拒绝用户id");
      } else {
        await this.$RCVoiceRoomLib
          .rejectRequestSeat(rejectRequestSeatId)
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    //踢人下麦
    kickUserFromSeat: async function (kickUserId) {
      if (!kickUserId) {
        this.$message("请输入指定麦位id");
      } else {
        await this.$RCVoiceRoomLib.kickUserFromSeat(kickUserId);
      }
    },

    //邀请人上麦(消息)
    pickUserToSeat: async function (pickUserId) {
      if (pickUserId == null) {
        this.$message("请输入指定麦位id");
      } else {
        await this.$RCVoiceRoomLib.pickUserToSeat(pickUserId);
      }
    },

    //踢人出房间
    kickUserFromRoom: async function (kickUserRoomId) {
      if (kickUserRoomId == null) {
        this.$message("请输入指定麦位id");
      } else {
        await this.$RCVoiceRoomLib.kickUserFromRoom(kickUserRoomId);
      }
    },

    //静麦
    muteSeat: async function (muteSeatIndex, ismute) {
      if (muteSeatIndex == null) {
        this.$message("麦位序号");
      } else {
        await this.$RCVoiceRoomLib.muteSeat(muteSeatIndex, ismute);
      }
    },

    //锁麦
    lockSeat: async function (lockSeatIndex, isLocked) {
      if (lockSeatIndex == null) {
        this.$message("麦位序号");
      } else {
        await this.$RCVoiceRoomLib.lockSeat(lockSeatIndex, isLocked);
      }
    },

    //静所有麦位
    muteOtherSeats: async function (muteOtherValue) {
      await this.$RCVoiceRoomLib.muteOtherSeats(muteOtherValue);
    },

    //锁所有麦位（有人的除外）
    lockOtherSeats: async function (lockOtherValue) {
      await this.$RCVoiceRoomLib.lockOtherSeats(lockOtherValue);
    },

    //设置房间信息
    setRoomInfo: async function (seatCountValue, isFreeEnterSeatValue) {
      console.log(this.roomInfo);
      const roominfo = {
        isFreeEnterSeat: isFreeEnterSeatValue,
        isLockAll: this.roomInfo["isLockAll"],
        isMuteAll: this.roomInfo["isMuteAll"],
        roomName: this.roomInfo["roomName"] || this.roomid,
        seatCount: seatCountValue, //麦位数量
      };
      if (seatCountValue == null) {
        this.$message("麦位序号");
      } else {
        console.log(roominfo);
        await this.$RCVoiceRoomLib.setRoomInfo(roominfo);
      }
    },

    //静音所有远端
    muteAllRemoteStreams: async function (muteOtherAll) {
      await this.$RCVoiceRoomLib.muteAllRemoteStreams(muteOtherAll);
    },

    //静音自己
    disableAudioRecording: async function (isDisable) {
      await this.$RCVoiceRoomLib.disableAudioRecording(isDisable);
    },

    //更新指定麦位的extra字段
    updateSeatInfoExtra: async function () {
      if (this.updateSeatIndex == null) {
        this.$message("请输入麦位序号");
      } else {
        await this.$RCVoiceRoomLib.updateSeatInfo(
          this.updateSeatIndex,
          this.updateExtra,
          this.updateIsMute
        );
      }
    },

    //播放自定义音乐
    play: async function () {
      if (!this.music) {
        this.$message("请选择 music");
        return;
      }
      await this.$RCVoiceRoomLib.createTrack(this.music);
    },

    //停止播放音乐
    stopCreateTrack: async function () {
      if (!this.music) {
        this.$message("暂无 music");
        return;
      }
      await this.$RCVoiceRoomLib.stopCreateTrack();
    },

    //上传mp3文件
    handleFileChange: function (e) {
      this.music = e.target.files[0];
    },

    //主动打开播放器
    openPlayer: async function () {
      this.$RCVoiceRoomLib.enableSpeaker();
    },

    //获取指定用户的麦克风的禁用标识
    isDisableAudioRecording() {
      this.$RCVoiceRoomLib
        .isDisableAudioRecording(this.isDisableAudioRecordingUserid)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //获取实时麦位信息
    getLatestSeatInfo: async function () {
      if (this.roomid) {
        this._data.seatInfoList =
          await this.$RCVoiceRoomLib.getLatestSeatInfo();
      } else {
        this._data.seatInfoList = [];
      }
    },
  },
  mounted() {
    //监听麦位信息变更
    this.$RCVoiceRoomLib.on("seatInfoDidUpdate", (seatInfoList) => {
      console.log("seatInfoList", seatInfoList);
      this.seatInfoList = seatInfoList;
      this.seatInfoList.push();
    });

    //监听房间信息变更
    this.$RCVoiceRoomLib.on("roomInfoDidUpdate", (roomInfo) => {
      this.roomInfo = roomInfo;
      this.$forceUpdate();
    });

    //被邀请上麦
    this.$RCVoiceRoomLib.on("RCPickerUserSeatContent", (info) => {
      if (info.targetId == this.$RCVoiceRoomLib.im.userId) {
        this.$confirm(
          `您被${info.sendUserId} 邀请上麦，是否同意？`,
          "是否同意上麦",
          {
            confirmButtonText: "同意",
            cancelButtonText: "拒绝",
            showClose: false,
          }
        )
          .then(async () => {
            try {
              const fintSeat = await this.$RCVoiceRoomLib.findSeat();
              await this.$RCVoiceRoomLib.enterSeat(fintSeat);
              await this.$RCVoiceRoomLib.notifyVoiceRoom(
                "VoiceRoomAgreeManagePick",
                {
                  content: info.targetId,
                  name: "VoiceRoomAgreeManagePick",
                  totalMemberCount: 0,
                }
              );
            } catch (error) {
              console.log(error);
            }
          })
          .catch(async () => {
            await this.$RCVoiceRoomLib.notifyVoiceRoom(
              "VoiceRoomRejectManagePick",
              {
                content: info.targetId,
                name: "VoiceRoomRejectManagePick",
                totalMemberCount: 0,
              }
            );
          });
      }
    });

    //收到同意邀请上麦消息
    this.$RCVoiceRoomLib.on("VoiceRoomAgreeManagePick", () => {
      this.$message("用户连线成功");
    });

    //收到拒绝邀请上麦消息
    this.$RCVoiceRoomLib.on("VoiceRoomRejectManagePick", () => {
      this.$message("用户拒绝邀请");
    });

    //被抱下麦
    this.$RCVoiceRoomLib.on("KickSeatReceived", () => {
      this.$message("您已被抱下麦");
    });

    //申请上麦被同意
    this.$RCVoiceRoomLib.on("RequestSeatAccepted", () => {
      this.$message("请上麦被同意");
    });

    //申请上麦人员发生变化上报
    this.$RCVoiceRoomLib.on("RequestSeatListChanged", async () => {
      this.RequestSeatUserIds =
        await this.$RCVoiceRoomLib.getRequestSeatUserIds();
      this.RequestSeatUserIds.push();
    });

    //请上麦被拒绝
    this.$RCVoiceRoomLib.on("RequestSeatRejected", () => {
      this.$message("请上麦被拒绝");
    });

    //被踢出房间
    this.$RCVoiceRoomLib.on("RCKickUserOutRoomContent", async (parm) => {
      if (parm.targetId == this.$RCVoiceRoomLib.im.userId) {
        this.$message("您已被踢出房间");
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    });

    //房间被销毁
    this.$RCVoiceRoomLib.on("ChatroomDestroyed", async () => {
      this.$message("房间被销毁");
      setTimeout(() => {
        location.reload();
      }, 1000);
    });

    //账号被顶掉
    this.$RCVoiceRoomLib.on("ConnectioBreakOff", () => {
      this.$message("账号被顶掉");
      setTimeout(() => {
        location.reload();
      }, 1000);
    });
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
  font-size: 14px;
}
.block {
  width: 40%;
  float: left;
  text-align: left;
  margin-left: 20%;
}
.blockT {
  width: 40%;
  float: left;
  text-align: left;
}

.inputID {
  width: 200px !important;
}
.inputOther {
  width: 50px !important;
}
.blockTitle {
  float: left;
  text-align: left;
}
</style>
