<template>
    <div id="body">
      <div class="body-top"></div>
      <transition
        appear
        appear-class="custom-appear-class"
        appear-to-class="custom-appear-to-class"
        appear-active-class="custom-appear-active-class"
      >
      <div class="body-main">
        <div class="body-main-title">个人资料</div>
        <div class="body-main-item">
          <div class="left">
            头像
          </div>
          <div class="right" style="padding: 0">
            <div class="profile-picture" :style="{ 'background-image' : `url(${userProfilePicture})`}"></div>
            <label class="button">
              <input type="file" name="profile-picture" id="profile-picture" accept="image/gif,image/jpeg,image/jpg,image/png" @change="changeImage($event)" ref="profilePicture">上传头像
            </label>
          </div>
        </div>
        <div class="body-main-item">
          <div class="left">
            昵称
          </div>
          <div class="right">
            <input type="text" placeholder="填写你的昵称" v-model="userName">
          </div>
        </div>
        <div class="body-main-item">
          <div class="left">
            性别
          </div>
          <div class="right sex">
            <!--<input type="text" placeholder="填写你的性别">-->
            <label class="label-sex"><input name="Sex" type="radio" value="secret" v-model="userGender"><span class="radioInput"></span>保密</label>
            <label class="label-sex"><input name="Sex" type="radio" value="boy" v-model="userGender"><span class="radioInput"></span>男</label>
            <label class="label-sex"><input name="Sex" type="radio" value="girl" v-model="userGender"><span class="radioInput"></span>女</label>
          </div>
        </div>
        <div class="body-main-item">
          <div class="left">
            喜欢的电影类型
          </div>
          <div class="right">
            <input type="text" placeholder="填写你喜欢的电影类型" v-model="userLikeTypes">
          </div>
        </div>
        <div class="body-main-item" style="border-bottom: 1px solid #f1f1f1;">
          <div class="left">
            个人介绍
          </div>
          <div class="right">
            <input type="text" placeholder="填写你擅长的事情，喜欢的事情" v-model="userSelfIntroduction">
          </div>
        </div>
        <div class="body-main-bottom">
          <div class="button" @click="saveChanges">保存修改</div>
          <div class="button" @click="goBack">返回</div>
        </div>
      </div>
      </transition>
    </div>
</template>

<script>
  import axios from 'axios';
    export default {
      name: "body",
      data() {
        return {
          userProfilePicture: '',
          userName: '',
          userGender: '',
          userSelfIntroduction: '',
          userLikeTypes: '',
        }
      },
      mounted() {
        this.getUserInfo();
      },
      methods: {
        changeImage(e) {
          var file = e.target.files[0];
          var reader = new FileReader();
          var that = this;
          reader.readAsDataURL(file);
          reader.onload = function () {
            that.userProfilePicture = this.result
          }
        },
        saveChanges() {
          let infoData = new FormData();
          infoData.append('profilePicture', this.$refs.profilePicture.files[0] ? this.$refs.profilePicture.files[0] : '');
          infoData.append('profilePictureFlag', this.$refs.profilePicture.files[0] ? '1' : '0');
          infoData.append('userName', this.userName);
          infoData.append('userLikeTypes', this.userLikeTypes);
          infoData.append('userSelfIntroduction', this.userSelfIntroduction);
          infoData.append('userGender', this.userGender);
          infoData.append('userId', this.$store.state.userId);
          infoData.append('user_id', this.$store.state._id);
          axios.post('/users/settings', infoData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }).then((response) => {
            let res = response.data;
            if(res.status=="1"){
              axios.get('/users/getUserInfo', {params: {userId: this.$store.state.userId}}).then((response) => {
                let res = response.data;
                if (res.status == '1') {
                  let content = {
                    name:res.result[0].userName,
                    pic:res.result[0].userProfilePicture
                  }
                  this.$store.commit('updateUserInfo1',content);
                } else {
                  console.log(res)
                }
              })
            }
          })
        },
        getUserInfo(){
          axios.get('/users/getUserInfo', {params: {userId: this.$store.state.userId}}).then((response) => {
            let res = response.data;
            if (res.status == '1') {
              this.userProfilePicture = `/users/getImg?imgId=${res.result[0].userProfilePicture}`;
              this.userName = res.result[0].userName;
              this.userGender = res.result[0].userGender;
              this.userSelfIntroduction = res.result[0].userSelfIntroduction;
              this.userLikeTypes = res.result[0].userLikeTypes;
            } else {
              console.log(res)
            }
          })
        },
        goBack(){
          window.history.length > 1
            ? this.$router.go(-1)
            : this.$router.push('/')
        }
      }
    }
</script>

<style scoped lang="less">
  #body{
    background-color: #08aba6;
    margin-bottom: -60px;
    min-height: 100%;
    padding-bottom: 60px;
    min-width: 1024px;
  }
  .body-top{
    height: 140px;
    background: url("../../../assets/bac.jpg") center no-repeat;
    background-size: 100% auto;
  }
  .body-main{
    user-select: none;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, .075);
    width: 800px;
    margin: 60px auto;
    padding: 40px 40px;
    .body-main-title{
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .body-main-item{
      padding: 10px 0;
      border-top: 1px solid #f1f1f1;
      display: flex;
      align-items: center;
      .left{
        width: 30%;
        padding: 20px 5px;
      }
      .right{
        width: 70%;
        padding: 20px 0px;
        cursor: default;
        display: flex;
        align-items: center;
        .profile-picture{
          height: 60px;
          width: 60px;
          border-radius: 100%;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          margin-right: 100px;
          display: inline-block;
        }
        input[type='file']{
          display: none;
        }
        label{
          cursor: pointer;
          display: inline-block;
          font-size: 16px;
          font-weight: normal;
        }
        input[type='text']{
          width: 80%;
          outline: none;
          border: none;
          font-size: 18px;
          overflow: visible;
          &::placeholder{
            color: #dcdcdc;
          }
        }
        input[type='radio']{
          display: none;
        }
        .label-sex{
          margin-right: 15px;
          line-height: 1;
        }
        .radioInput{
          background-color:#fff;
          border:1px solid rgba(0,0,0,0.15);
          border-radius:100%;
          display:inline-block;
          height:16px;
          margin-right:15px;
          margin-top:-1px;
          vertical-align:middle;
          width:16px;
          line-height:1;
          padding: 2px;
        }
        input[type='radio']:checked + .radioInput{
          background-color:#08aba6;
          background-clip: content-box;
        }
      }
    }
    .body-main-bottom{
      margin-top: 50px;
      display: flex;
      justify-content: space-around;
    }
    .button{
      height: 40px;
      width: 140px;
      background-color: #08aba6;
      color: white;
      text-align: center;
      line-height: 40px;
      transition: all 0.3s ease-in-out;
      cursor: pointer;
      border: 1px solid #08aba6;
    }
    .button:hover{
      background-color: #fff;
      color: #08aba6;
    }
  }
  .custom-appear-class{
    opacity: 0;
    transform: translateX(100px);
  }
  .custom-appear-to-class{
    opacity: 1;
  }
  .custom-appear-active-class{
    transition: all 1s;
  }
</style>
