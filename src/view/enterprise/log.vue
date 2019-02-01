<template>
    <div class="enterprise-log">
        <div class="enterprise-log__header">
            <p>操作日志</p>
            <Button type="primary">导出</Button>
        </div>
        <div class="enterprise-log__search">
            <Form :model="searchForm" label-position="top">
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="日期（单次操作不能超过一年）">
                            <Row :gutter="16">
                                <Col span="11">
                                    <DatePicker type="date" :value="searchForm.start_time" placeholder="请选择开始时间"></DatePicker>
                                </Col>
                                <Col span="2">
                                    ——
                                </Col>
                                <Col span="11">
                                    <DatePicker type="date" :value="searchForm.end_time" placeholder="请选择结束时间"></DatePicker>
                                </Col>
                            </Row>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <Row :gutter="16">
                            <Col span="12">
                                <FormItem label="成员">
                                    <Select v-model="searchForm.name">
                                        <Option value="">全部</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="操作类型">
                                    <Select v-model="searchForm.type">
                                        <Option value="">全部</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </div>
        <div class="enterprise-log__table">
            <Table :height="`${windowHeight-390}`"  :columns="columns" :data="data"></Table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            windowHeight: 0,
            searchForm: {
                start_time: '',
                end_time: '',
                name: '',
                type: ''
            },
            options3: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                }
            },
            columns: [
                {
                    title: '用户',
                    key: 'user',
                    render: (h, params) => {
                        return h('div', {
                            attrs: {
                                class: 'user-info'
                            }
                        },[
                            h('div', [
                                h('Avatar', {
                                    props: {
                                        icon: 'ios-person',
                                        size: 'small'
                                    }
                                }),
                                h('span',{}, params.row.user)
                            ]),
                            h('span',{}, params.row.ip)
                        ])
                    }
                },
                {
                    title: '操作',
                    key: 'type'
                },
                {
                    title: '内容',
                    key: 'content'
                },
                {
                    title: '项目',
                    key: 'project'
                },
                {
                    title: '时间',
                    key: 'date'
                }
            ],
            data: [
                {
                    user: '陈波',
                    img: '',
                    ip: '111.121.73.235',
                    type: '复制项目',
                    content: '原项目产品进度',
                    project: '产品进度',
                    date: '今天 16:40'
                }
            ]
        }
    },
    created() {
        this.windowHeight = document.documentElement.clientHeight;
    }
}
</script>

<style lang="scss">
    .enterprise-log {
        &__header {
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            border-bottom: 1px #eeeeee solid;
            p {
                font-size: 16px;
            }
        }
        &__search, &__table {
            padding: 0 20px;
        }
        .user-info {
            margin: 5px 0;
            div {
                margin-bottom: 5px;
                .ivu-avatar {
                    margin-right: 10px;
                }
            }
        }
    }
</style>
