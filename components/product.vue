<template>
    <div class="product">
        <router-link :to="'/product/' + info.id" class="product-main">
            <img :src="info.image">
            <h4>{{ info.name }}</h4>
            <div class="product-color" :style="{ background: colors[info.color]}"></div>
            <div class="product-cost">¥ {{ info.cost }}</div>
            <div class="product-add-cart" @click.prevent="handleCart">加入购物车</div>
        </router-link>
    </div>
</template>
<script>
    export default {
        props: {
            info: Object
        },
        data () { 
            return {
                colors: {
                    '白色': '#ffffff',
                    '黑色': '#020202',
                    '秋日胡杨': '#efa13d',
                    '夏日胡杨': '#4e5148',
                    '秘银色': '#8d8c92',
                    '绿境森林': '#3f8382',
                    '8号色': '#ecd1e0',
                    '深空灰': '#908d94',
                    '玫瑰金': '#fdd7d6'
                }
            }
        },
        methods: {
            handleCart () {
                this.$store.commit('addCart', this.info.id);
            }
        }
    };
</script>
<style scoped>
    .product{
        width: 25%;
        float: left;
    }
    .product-main{
        display: block;
        margin: 16px;
        padding: 16px;
        border: 1px solid #dddee1;
        border-radius: 6px;
        overflow: hidden;
        background: #fff;
        text-align: center;
        position: relative;
        transition: all 0.4s;
    }
    .product-main:hover {
        border: 1px solid #0070c9;
    }
    .product-main img{
        width: 100%;
    }
    h4{
        color: #222;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: all 0.4s;
    }
    .product-main:hover h4{
        color: #0070c9;
    }
    .product-color{
        display: block;
        width: 16px;
        height: 16px;
        border: 1px solid #dddee1;
        border-radius: 50%;
        margin: 6px auto;
    }
    .product-cost{
        color: #de4037;
        margin-top: 6px;
    }
    .product-add-cart{
        opacity: 0;
        padding: 4px 8px;
        background: #2d8cf0;
        color: #fff;
        font-size: 12px;
        border-radius: 3px;
        cursor: pointer;
        position: absolute;
        top: 5px;
        right: 5px;
        transition: all 0.4s;
    }
    .product-main:hover .product-add-cart{
        opacity: 1;
    }
</style>