<template>
  <div>
    <Row>
      <Col span="6" offset="8">
        <div class="projecttitle">
          <p align="center">xiangmu</p>
        </div>
      </Col>
      <Col span="6" offset="4">
        <div align="right">
          <Button @click="value1 = true" type="primary">Open</Button>
          <Drawer
            title="Basic Drawer"
            :closable="false"
            v-model="value1"
            transfer="false"
            inner="true"
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
        </div>
      </Col>
    </Row>

    <br>
    <Row type="flex" justify="center" :gutter="40">
      <Col span="8">
        <p>待分配</p>
        <ul>
          <li>
            <Card long>
              <p slot="title">
                <Icon type="ios-film-outline"></Icon>Classic film
              </p>
              <a href="#" slot="extra" @click.prevent="changeLimit">
                <Icon type="ios-loop-strong"></Icon>Change
              </a>
            </Card>
          </li>

          <li>
            <Button long>Default</Button>
          </li>
        </ul>
      </Col>
      <Col span="8">进行中
        <ul>
          <li>
            <Card long>
              <p slot="title">
                <Dropdown>
                  <a href="javascript:void(0)">
                    <Icon type="ios-arrow-down"></Icon>
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem>驴打滚</DropdownItem>
                    <DropdownItem>炸酱面</DropdownItem>
                    <DropdownItem disabled>豆汁儿</DropdownItem>
                    <DropdownItem>冰糖葫芦</DropdownItem>
                    <DropdownItem divided>北京烤鸭</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </p>
            </Card>
          </li>

          <li>
            <Button long>Default</Button>
          </li>
        </ul>
      </Col>
      <Col span="8">已完成
        <ul>
          <li>
            <Card long>
              <p slot="title">
                <Icon type="ios-film-outline"></Icon>Classic film
              </p>
              <a href="#" slot="extra" @click.prevent="changeLimit">
                <Icon type="ios-loop-strong"></Icon>Change
              </a>
            </Card>
          </li>

          <li>
            <Button long>Default</Button>
          </li>
        </ul>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      value1: false
    };
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.projecttitle {
  font-style: "Hiragino Sans GB";
  color: #464c5b;
  font-size: 20px;
}
</style>