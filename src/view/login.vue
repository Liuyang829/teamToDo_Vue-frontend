<template>
    <div class="login">
        <Form ref="formCustom" :model="loginForm" :rules="loginRule">
            <FormItem  prop="username">
                <Input type="text" placeholder="用户名" v-model="loginForm.username"/>
            </FormItem>
            <FormItem  prop="password">
                <Input type="password" placeholder="密码" v-model="loginForm.password"/>
                <a href="javascript:" class="forget-psw">忘记密码？</a>
            </FormItem>
            <FormItem>
                <Button type="primary" long @click="handleSubmit('formCustom')">登录</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRule: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请填写密码", trigger: "blur" },
          // { type: "string", min: 6, message: "密码至少6位", trigger: "blur" }
        ]
      }
    };
  },
  
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let formData = new FormData();

          formData.append("email",this.loginForm.username);
          formData.append("password",this.loginForm.password);
          

          this.axios
            .post("http://localhost:8090/login/", formData)
            .then(res => {
              if(res.data.code==200)
              {
                  this.$Message.success("Success!");
                  this.$router.push("home");
              }
              else{
                this.$Message.error("请输入正确的用户名密码");
              }
            })
            .catch(res => {
              console.log(res);
            });

        } else {
          this.$Message.error("请输入正确的用户名密码");
        }
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.login {
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
}
</style>
