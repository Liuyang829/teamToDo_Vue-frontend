<template>
  <div>
    <Row>
      <Col span="6" offset="8">
        <div class="projecttitle">
          <p align="center">{{projectInfo.name}}</p>
        </div>
      </Col>
      <Col span="6" offset="4">
        <div align="right">
          <Button @click="DrawerValue1 = true" type="primary">Open</Button>
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
    <Drawer title="项目详情" v-model="DrawerValue1" width="500" :mask-closable="false" :styles="styles">
      <Form :model="formItem">
        <FormItem label="Input">
          <Input v-model="formItem.input" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="Select">
          <Select v-model="formItem.select">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="DatePicker">
          <Row>
            <Col span="11">
              <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
            </Col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="11">
              <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="Radio">
          <RadioGroup v-model="formItem.radio">
            <Radio label="male">Male</Radio>
            <Radio label="female">Female</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="Checkbox">
          <CheckboxGroup v-model="formItem.checkbox">
            <Checkbox label="Eat"></Checkbox>
            <Checkbox label="Sleep"></Checkbox>
            <Checkbox label="Run"></Checkbox>
            <Checkbox label="Movie"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="Switch">
          <i-switch v-model="formItem.switch" size="large">
            <span slot="open">On</span>
            <span slot="close">Off</span>
          </i-switch>
        </FormItem>
        <FormItem label="Slider">
          <Slider v-model="formItem.slider" range></Slider>
        </FormItem>
        <FormItem label="Text">
          <Input
            v-model="formItem.textarea"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem>
          <Button type="primary">Submit</Button>
          <Button style="margin-left: 8px">Cancel</Button>
        </FormItem>
      </Form>
    </Drawer>
  </div>
</template>

<script>
export default {
  data() {
    // console.log(this.$route.params.title);
    return {
      projectInfo: "",
      show: true,
      DrawerValue1: false,
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      formItem: {
        input: "",
        select: "",
        radio: "male",
        checkbox: [],
        switch: true,
        date: "",
        time: "",
        slider: [20, 50],
        textarea: ""
      }
    };
  },
  created: function() {
    this.projectInfo = this.$route.params.item;
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