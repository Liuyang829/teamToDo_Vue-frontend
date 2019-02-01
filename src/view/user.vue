<template>
    <div class="user-content">
        <div class="user-content__left">
           <div class="user-info">
                <Avatar class="avatar" src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="large" />
                <div>
                    <p>陈波</p>
                    <span>1140051672@qq.com</span>
                </div>
            </div>
            <div class="user-content__nav">
                <router-link :class="{'active': $route.name == item.to}" class="user-content__nav__item" v-for="item in navList" :key="item.to" :to="{name: item.to}">{{item.lable}}</router-link>
            </div>
        </div>
        <div class="user-content__right" >
            <transition name="nav" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navList: [
                {
                    lable: '个人信息',
                    to: 'user_info'
                },
                {
                    lable: '账号密码',
                    to: 'user_account'
                },
                {
                    lable: '第三方账号',
                    to: 'user_third'
                },
                {
                    lable: '账号状态',
                    to: 'user_payment'
                }
            ]
        }
    }
}
</script>

<style lang="scss">
.user-content {
    width: 980px !important;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    &__left {
        width: 300px;
    }
    &__right {
        flex: 1;
        margin-left: 20px;
    }
    &__nav {
        background-color: #fff;
        border-radius: 5px;
        box-shadow: rgba(0,0,0,.0470588) 0 2px 3px 0;
        &__item {
            display: block;
            padding: 15px 20px;
            box-shadow: 0 1px 0 rgba(0,0,0,.05);
            font-size: 18px;
            color: grey;
            &:hover {
                color: grey;
                background-color: rgba(0,0,0,.01);
            }
            &.active {
                font-weight: bold;
                color: #000
            }
        }
    }
    .user-info {
        height: 100px;
        padding: 20px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: rgba(0,0,0,.0470588) 0 2px 3px 0;
        .avatar {
            margin-right: 15px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
        }
        p {
            font-size: 18px;
            font-weight: bold;
            color: #000;
        }
    }
    .nav-enter-active, .nav-leave-active {
        transition: all .4s cubic-bezier(.25,1.18,.86,.89);
    }
    .nav-enter, .nav-leave-to /* .fade-leave-active 在低于版本 2.1.8 中 */ {
        opacity: 0;
        transform: translate(5px, 15px);
    }
}
</style>
