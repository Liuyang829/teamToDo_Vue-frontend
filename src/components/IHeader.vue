<template>
  <Row class-name="Row" type="flex" justify="space-between" align="middle" class="code-row-bg">
    <Col class-name="col-left" span="8">
      <div align="left">
        <Input prefix="ios-search"  placeholder="Enter something..." style="width:50%"/>
      </div>
    </Col>
    <Col class-name="col-center" span="8">
      <div align="center">
        <h3>TeamToDo</h3>
      </div>
    </Col>
    <Col class-name="col-right" span="8">
      <div align="right">
        <a href="javascript:" class="btn" @click="calendar">日历</a>
        <Icon type="ios-help-circle-outline"/>
        <Icon type="ios-notifications-outline"/>
        <Icon type="md-text"/>
        <Avatar class="avatar" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
      </div>
    </Col>
  </Row>

  <!-- <div style="width:33%">
        <Poptip trigger="click" content="content" placement="bottom-start">
          <a href="javascript:" class="header-left">
            <Icon type="ios-list"/>
            <p>有丶东西</p>
          </a>
          <div class="header-left-pop" slot="content">
            <Card icon="ios-options" :padding="0" shadow style="width: 300px;">
              <CellGroup>
                <Cell title="创建企业" selected/>
                <Cell title="test">
                  <Badge class="header-badge" text="剩于14天" slot="extra"/>
                </Cell>
                <Cell title="贵州蓝关科技有限公司">
                  <Badge class="header-badge" text="已到期" slot="extra"/>
                </Cell>
                <Cell title="个人项目"/>
              </CellGroup>
            </Card>
          </div>
        </Poptip>
        </div>
    

    

          <div >
            <h1>TeamToDo</h1>
          </div>
     

      
        <div class="header-right">
  <!-- <a href="javascript:" class="btn">工作台</a>-->
  <!-- <a href="javascript:" class="btn" @click="calendar">日历</a>
          <Icon type="ios-help-circle-outline"/>
          <Icon type="ios-notifications-outline"/>
          <Icon type="md-text"/>
          <Poptip></Poptip>
          <Poptip class="avatar-wrap" placement="bottom-end">
            <Avatar
              size="large"
              class="avatar"
              src="https://i.loli.net/2017/08/21/599a521472424.jpg"
            />
            <div class="poptip-content" slot="content">
              <Card icon="ios-options" :padding="0" shadow style="width: 300px;">
                <CellGroup>
                  <Cell title="创建企业" selected/>
                  <Cell title="个人项目"/>
                  <Divider/>
                  <Cell title="账号设置"/>
                  <Cell title="偏好设置"/>
                  <Cell title="切换至国际服务器" label="正在使用中国大陆服务器"/>
                  <Divider/>
                  <Cell title="退出"/>
                </CellGroup>
              </Card>
            </div>
          </Poptip>
  </div>-->
</template>

<script>
export default {
  name: "IHeader",
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("userInfo"))
    };
  },
  methods: {
    calendar() {
      this.$router.push("calendar");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.Row {
  height: 50px;
  background: #fff;
  .col-left{
    padding: 5px;
  }

  .col-center{
    font-size: 20px;
    color:black;
  }

  .col-right{
    padding: 5px;
    font-size: 14px;
    color: gray;

    a {
      margin: 0 10px;
    }
    i {
      margin: 0 10px;
      font-size: 18px;
    }
    .avatar{
      margin: 0px 10px;
    }
  }
  
}
</style>
