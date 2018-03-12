<template>
  <div id="body">
    <div class="body-top"></div>
    <transition
      appear
      appear-class="custom-appear-class"
      appear-to-class="custom-appear-to-class"
      appear-active-class="custom-appear-active-class"
    >
      <div class="body-main" v-show="!nextFlag">
        <div class="body-main-title">撰写影评</div>
        <div class="body-main-item">
          <div class="left">
            题目
          </div>
          <div class="right">
            <input type="text" placeholder="影评的题目" v-model="filmReviewName">
          </div>
        </div>
        <div class="body-main-item">
          <div class="left">
            标签
          </div>
          <div class="right">
            <input type="text" placeholder="影评的相关标签"  v-model="filmReviewLabel">
          </div>
        </div>
        <div class="body-main-item">
          <div class="left">
            封面图片
          </div>
          <div class="right" style="padding: 0">
            <div class="profile-picture" :style="{ 'background-image' : `url(${filmReviewImg})`}"></div>
            <label class="button">
              <input type="file" name="film-reviewImg" id="film-reviewImg" accept="image/gif,image/jpeg,image/jpg,image/png" @change="changeImage($event)" ref="filmReviewImg">上传图片
            </label>
          </div>
        </div>
        <div class="body-main-bottom">
          <div class="button" @click="clearAll">清空</div>
          <div class="button" @click="next">下一步</div>
        </div>
      </div>
    </transition>
    <div class="body-main" v-show="nextFlag">
      <div class="body-main-title">撰写影评</div>
      <div class="body-main-content">
          <textarea v-model="filmReviewContent">

          </textarea>
      </div>
      <div class="body-main-bottom">
        <div class="button" @click="pre">上一步</div>
        <div class="button" @click="addFilmReview">完成</div>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import filmReviewImg from '../../../assets/icon/filmReview.png'
  export default {
    name: "body",
    data() {
      return {
        filmReviewLabel : '',
        filmReviewName : '',
        filmReviewImg : filmReviewImg,
        nextFlag : 0,
        filmReviewContent : ''

      }
    },
    mounted() {

    },
    methods: {
      changeImage(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        var that = this;
        reader.readAsDataURL(file);
        reader.onload = function () {
          that.filmReviewImg = this.result
        }
      },
      clearAll(){

      },
      next(){
        this.nextFlag = !this.nextFlag;
      },
      pre(){
        this.nextFlag = !this.nextFlag;
      },
      addFilmReview(){
        var reviewData = new FormData();
        console.log(this.$refs.filmReviewImg.files[0])
        reviewData.append('filmReviewImg', this.$refs.filmReviewImg.files[0] ? this.$refs.filmReviewImg.files[0] : '');
        reviewData.append('filmReviewImgFlag', this.$refs.filmReviewImg.files[0] ? '1' : '0');
        reviewData.append('filmReviewName', this.filmReviewName);
        reviewData.append('filmReviewLabel', this.filmReviewLabel);
        reviewData.append('filmReviewContent', this.filmReviewContent);
        reviewData.append('user_id', this.$store.state._id);
        axios.post('/filmReview/addFilmReview', reviewData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then((response) => {
          let res = response.data;
          if(res.status=="1"){
            console.log("添加影评成功");
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @font-face {
    font-family: zhFont;
    src: url("../../../assets/font/beian.ttf");
  }
  #body{
    background-color: #08aba6;
    margin-bottom: -60px;
    min-height: 100%;
    padding-bottom: 60px;
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
          height: 200px;
          width: 100px;
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
      }
    }
    .body-main-content{
      position: relative;
      textarea{
        font-family: zhFont;
        font-weight: bold;
        height: 500px;
        width: 100%;
        outline: none;
        resize: none;
        padding: 20px 20px;
        font-size: 24px;
        line-height: 30px;
        background-color: #f4f39e;
        border-bottom-left-radius: 20px 300px;
        border-bottom-right-radius: 400px 20px;
        border-top-right-radius: 5px 100px;
        box-shadow: 0 2px 10px 1px rgba(0, 0, 0, 0.2);
        text-shadow: 0 1px 0 #F6EF97;
      }
      &:after{
        width: 180px;
        height: 30px;
        content: " ";
        margin-left: -90px;
        border: 1px solid rgba(200, 200, 200, .8);
        background: rgba(254, 254, 254, .6);
        -moz-box-shadow: 0px 0 3px rgba(0, 0, 0, 0.1);
        -webkit-box-shadow: 0px 0 3px rgba(0, 0, 0, 0.1);
        box-shadow: 0px 0 3px rgba(0, 0, 0, 0.1);
        -moz-transform: rotate(-5deg);
        -webkit-transform: rotate(-5deg);
        -o-transform: rotate(-5deg);
        transform: rotate(-5deg);
        position: absolute;
        left: 50%;
        top: -15px;
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
      &:hover{
        background-color: #fff;
        color: #08aba6;
      }
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
