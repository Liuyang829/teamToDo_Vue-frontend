<template>
  <div class="header">
    <Poptip trigger="click" content="content" placement="bottom-start">
        <a href="javascript:" class="header-left">
          <Icon type="ios-list" />
          <p>深圳402科技有限公司</p>
        </a>
        <div class="header-left-pop" slot="content">
          <Card icon="ios-options" :padding="0" shadow style="width: 300px;">
              <CellGroup>
                  <Cell title="创建企业" selected/>
                  <Cell title="test">
                    <Badge class="header-badge" text="剩于14天" slot="extra" />
                  </Cell>
                  <Cell title="贵州蓝关科技有限公司">
                    <Badge class="header-badge" text="已到期" slot="extra" />
                  </Cell>
                  <Cell title="个人项目"/>
              </CellGroup>
          </Card>
        </div>
    </Poptip>
    
    <Poptip trigger="click" content="content">
      <div class="header-center">
        <h1>diandianrenwu</h1>
        <Icon type="md-apps" />
      </div>
      <div class="header-center-pop" slot="content">
        <div class="header-center-pop-item">
          <Icon class="header-center-pop-icon" type="logo-linkedin" />
          <span>Teambition</span>
        </div>
        <div class="header-center-pop-item">
          <Icon class="header-center-pop-icon" type="md-contacts" />
          <span>成员</span>
        </div>
        <div class="header-center-pop-item">
          <Icon class="header-center-pop-icon" type="md-pie" />
          <span>统计</span>
        </div>
        <div class="header-center-pop-item">
          <Icon class="header-center-pop-icon" type="md-settings" />
          <span>管理后台</span>
        </div>
      </div>
    </Poptip>
    <div class="header-right">
      <a href="javascript:" class="btn">工作台</a>
      <a href="javascript:" class="btn">日历</a>
      <Icon type="ios-help-circle-outline" />
      <Icon type="ios-notifications-outline" />
      <Icon type="md-text" />
      <Poptip >
        
      </Poptip>
      <Poptip class="avatar-wrap" placement="bottom-end">
        <Avatar size="large" class="avatar" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
        <div class="poptip-content" slot="content">
          <Card icon="ios-options" :padding="0" shadow style="width: 300px;">
              <CellGroup>
                  <Cell title="创建企业" selected/>
                  <Cell title="个人项目" />
                  <Divider />
                  <Cell title="账号设置"/>
                  <Cell title="偏好设置" />
                  <Cell title="切换至国际服务器" label="正在使用中国大陆服务器" />
                  <Divider />
                  <Cell title="退出" />
              </CellGroup>
          </Card>
        </div>
    </Poptip>
    </div>
  </div>
</template>

<script>
export default {
  name: "IHeader",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: 50px;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  .header-left {
    padding: 10px;
    display: flex;
    align-items: center;
    color: gray;
  }
  .header-left:hover {
    color: #3da8f5;
  }
  .header-center {
    padding: 10px 0;
    display: flex;
    align-items: center;
    color: #333;
    cursor: pointer;
  }
  .header-center h1 {
    font-size: 18px;
  }
  .avatar-wrap {
    cursor: pointer;
  }
  .header-center-pop {
    width: 180px;
    padding: 20px;
    padding-bottom: 0;
    display: flex;
    flex-wrap: wrap;
    color: #3da8f5;
    &-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 70px;
      margin-bottom: 20px;
      span {
        color: #333;
      }
    }
    &-icon {
      font-size: 40px;
    }
  }
  & > div,
  & > a {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: gray;
    i {
      margin: 0 6px;
      font-size: 18px;
    }
    .btn {
      padding: 0 16px;
      border-right: 1px solid #e5e5e5;
      color: gray;
      &:hover {
        color: #3da8f5;
      }
    }
  }
  .avatar {
    margin-left: 10px;
  }
}
</style>
