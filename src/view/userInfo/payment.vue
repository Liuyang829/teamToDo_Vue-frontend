<template>
    <div class="user-payment">
        <Card :shadow="true">
            <p class="user-payment__title">账号状态</p>
            <div class="user-payment__content">
                <span>已加入企业</span>
                <ul>
                    <li>
                        <i></i>
                        <span class="enterprise-name">贵州兰光科技有限公司</span>
                        <Tag color="error">已到期</Tag>
                    </li>
                    <li>
                        <i></i>
                        <span class="enterprise-name">贵州兰光科技有限公司</span>
                        <Tag color="error">已到期</Tag>
                    </li>
                    <li>
                        <i></i>
                        <span class="enterprise-name">贵州兰光科技有限公司</span>
                        <Tag color="error">已到期</Tag>
                    </li>
                    <li>
                        <i></i>
                        <span class="enterprise-name">贵州兰光科技有限公司</span>
                        <Tag color="error">已到期</Tag>
                    </li>
                    <li>
                        <i></i>
                        <span class="enterprise-name">贵州兰光科技有限公司</span>
                        <Tag color="error">已到期</Tag>
                    </li>
                </ul>
            </div>
        </Card>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.user-payment {
    &__title {
        font-size: 16px;
        font-weight: bold;
        color: #000;
        margin-bottom: 20px;
    }
    &__content {
        display: flex;
        & > span {
            display: block;
            width: 100px;
            margin-right: 20px;
            color: gray;
        }
        li {
            display: flex;
            align-items: center;
            margin-bottom: 5px;
            & > i {
                display: block;
                margin-right: 10px;
                width: 5px;
                height: 5px;
                border-radius: 50%;
                background-color: cornflowerblue;
            }
        }
        li .enterprise-name {
            margin-right: 20px;
        }
    }
}
</style>
