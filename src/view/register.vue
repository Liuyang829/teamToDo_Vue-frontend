<template>
  <div class="homepage-hero-module">
    <div class="video-container">
      <div class="register">
        <Form ref="formCustom" :model="registerForm" :rules="registerRule">
          <FormItem prop="email">
            <Input type="text" placeholder="邮箱" v-model="registerForm.email">
              <Icon type="ios-mail-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>

          <FormItem prop="username">
            <Input type="text" placeholder="用户名" v-model="registerForm.username">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" placeholder="密码" v-model="registerForm.password">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" long @click="handleSubmit('formCustom')">注册</Button>
          </FormItem>
        </Form>
      </div>

      <div :style="fixStyle" class="filter"></div>
      <video :style="fixStyle" autoplay loop class="fillWidth">
        <source
          src="http://bmob-cdn-20136.b0.upaiyun.com/2019/03/03/d82f9ed0403634d080c1153d4a1d144d.mp4"
          type="video/mp4"
        >
        <source
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
      registerForm: {
        email: "",
        username: "",
        password: ""
      },
      registerRule: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请填写密码", trigger: "blur" },
          { type: "string", min: 6, message: "密码至少6位", trigger: "blur" }
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

          formData.append("email", this.registerForm.email);
          formData.append("name", this.registerForm.username);
          formData.append("password", this.registerForm.password);

          let config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          };

          this.axios
            .post("http://localhost:8090/register/", formData, config)
            .then(res => {
              console.log(res);
            })
            .catch(res => {
              console.log(res);
            });

          this.$Message.success("Success!");
          this.$router.push({ path: "/" });
        } else {
          this.$Message.error("请输入正确的用户名密码");
        }
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


<style lang="scss" scoped>
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
.register {
  position: fixed;
  width: 340px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .forget-psw {
    position: absolute;
    right: 0;
    bottom: -28px;
    color: #a6a6a6;
  }
  z-index: 999;
}
</style>
