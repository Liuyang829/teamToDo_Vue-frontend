<template>
    <div class="enterprise-tag">
        <div class="enterprise-tag__header">
            <div>
                <p>企业标签</p>
                <a href="javascript:"><Icon type="ios-add-circle" />新建标签</a>
            </div>
            <span>企业级标签， 提供全局性的标签，在所有项目通用</span>
        </div>
        <Divider/>
        <div class="enterprise-tag__search">
            <Input style="width:200px;" prefix="ios-search" v-model="search" placeholder="搜索标签名称"></Input>
        </div>
        <div class="enterprise-tag__table">
            <Table :columns="column" :data="data"></Table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search:'',
            column: [
                {
                    title: '标签名称',
                    key: 'tag_name',
                    render: (h, params) => {
                        return h('Tag', {
                            props: {
                                type: 'dot',
                                color: 'primary'
                            }
                        }, params.row.tag_name)
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (h, params) => {
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type: 'md-create'
                                },
                                style: {
                                    marginRight: '20px',
                                    fontSize: '18px',
                                    cursor: 'pointer'
                                },
                                on: () => {

                                }
                            }),
                            h('Icon', {
                                props: {
                                    type: 'md-trash'
                                },
                                style: {
                                    fontSize: '18px',
                                    cursor: 'pointer'
                                },
                                on: () => {

                                }
                            })
                        ])
                    }
                }
            ],
            data: [
                {
                    tag_name: '搭嘎'
                }
            ]
        }
    }
}
</script>

<style lang="scss">
.enterprise-tag {
    padding: 20px;
    &__header {
        div {
            display: flex;
            justify-content: space-between;
            font-size: 18px;
            color: #000;
            a {
                display: flex;
                align-items: center;
                font-size: 16px;
                i {
                    font-size: 18px;
                    margin-right: 10px;
                }
            }
        }
    }
    &__search {
        margin-bottom: 20px;
    }
}
</style>
