<template>
  <div class="homepage-hero-module">
    <div class="video-container">
      <div class="login">
        <h1 class="title">TeamToDo</h1>
        <Form ref="formCustom" :model="loginForm" :rules="loginRule">
          <FormItem prop="email">
            <Input type="text" placeholder="邮箱" v-model="loginForm.email"/>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" placeholder="密码" v-model="loginForm.password"/>
          </FormItem>
          <Row :gutter="16">
            <Col span="12">
              <Button type="primary" long @click="handleSubmit('formCustom')">登录</Button>
            </Col>
            <Col span="12">
              <Button type="primary" long @click="toRegister('formCustom')">注册</Button>
            </Col>
          </Row>
        </Form>
      </div>

      <div :style="fixStyle" class="filter"></div>
      <video :style="fixStyle" autoplay loop class="fillWidth">
        <source
          muted
          src="http://bmob-cdn-20136.b0.upaiyun.com/2019/03/03/d82f9ed0403634d080c1153d4a1d144d.mp4"
          type="video/mp4"
        >
        <source
          muted
          src="http://bmob-cdn-20136.b0.upaiyun.com/2019/03/03/1d6754b740beef7c80d3604741b18045.webm"
          type="video/webm"
        >
      </video>
      <!-- <div class="poster hidden" v-if="!vedioCanPlay">
        <img
          :style="fixStyle"
          src="http://bmob-cdn-20136.b0.upaiyun.com/2019/03/03/f3ee2d86403102c3802fbd0212cb680b.jpg"
          alt=" "
        >
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fixStyle: "",
      loginForm: {
        email: "",
        password: ""
      },
      loginRule: {
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [
          { required: true, message: "请填写密码", trigger: "blur" }
          // { type: "string", min: 6, message: "密码至少6位", trigger: "blur" }
        ]
      }
    };
  },

  created: function() {
    // 主页添加键盘事件,注意,不能直接在焦点事件上添加回车
    var that = this;
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key == 13) {
        that.handleSubmit("formCustom");
      }
    };
  },

  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let formData = new FormData();

          formData.append("email", this.loginForm.email);
          formData.append("password", this.loginForm.password);

          this.axios
            .post("http://localhost:8090/login/", formData)
            .then(res => {
              if (res.data.code == 200) {
                console.log(res.data.data);
                localStorage.setItem("userInfo", JSON.stringify(res.data.data));

                this.$Message.success("Success!");
                this.$router.push("home");
              } else {
                this.$Message.error("请输入正确的邮箱和密码");
              }
            })
            .catch(res => {
              console.log(res);
            });
        } else {
          this.$Message.error("请输入正确的邮箱和密码");
        }
      });
    },

    toRegister(name) {
      this.$refs[name].validate(valid => {
        this.$router.push("register");
      });
    }
  },
  mounted: function() {
    window.onresize = () => {
      const windowWidth = document.body.clientWidth;
      const windowHeight = document.body.clientHeight;
      const windowAspectRatio = windowHeight / windowWidth;
      let videoWidth;
      let videoHeight;
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth;
        videoHeight = videoWidth * 0.5625;
        this.fixStyle = {
          height: windowWidth * 0.5625 + "px",
          width: windowWidth + "px",
          "margin-bottom": (windowHeight - videoHeight) / 2 + "px",
          "margin-left": "initial"
        };
      } else {
        videoHeight = windowHeight;
        videoWidth = videoHeight / 0.5625;
        this.fixStyle = {
          height: windowHeight + "px",
          width: windowHeight / 0.5625 + "px",
          "margin-left": (windowWidth - videoWidth) / 2 + "px",
          "margin-bottom": "initial"
        };
      }
    };
    window.onresize();
  }
};
</script>


<style scoped>
.homepage-hero-module,
.video-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}
.video-container .poster img,
.video-container video {
  z-index: 0;
  position: absolute;
}
.video-container .filter {
  z-index: 1;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
}
.login {
  position: fixed;
  width: 340px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}
.title {
  color: aliceblue;
  text-align: center;
  font-size: 60px;
}
/* .centre {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 999;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
} */
</style>
