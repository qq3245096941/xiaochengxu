<template>
	<view class="Fenlei">
		<view class="list_box">
				<!-- 菜单左边 -->
				<view class="left">
					<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }">
						<view class="item" v-for="(item,index) in leftArray" :key="index" :class="{ 'active':index==leftIndex }"
						 :data-index="index" @tap="leftTap">{{item.name}}</view>
					</scroll-view>
				</view>
				<!-- 菜单右边 -->
				<view class="main">
					<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }" @scroll="mainScroll" :scroll-into-view="scrollInto"
					 scroll-with-animation="true" @touchstart="mainTouch" id="scroll-el">
						<block v-for="(item,index) in leftArray" :key="index">
							<view class="item" :id="'item-'+index">
								<view class="title">
									<view >
										<text class="titleson1"></text>
										<text class="titleson">{{item.name}}</text>
									</view>
								</view>
								<view class="goods">
									<view class="msglist"   v-for="(item2,index2) in item.typeList" :key="index2" @click="classificationTap(item2.name)">
										<view class="msglistimg"><image class="image" 
										:src="'https://xcx.zhongshengzb.com:8089/shoppingImg/images/' + item2.path"
										 mode=""></image></view>
										<view class="msglisttitle">{{item2.name}}</view>
									</view>
								</view>
							</view> 
						</block> 
					</scroll-view>
				</view>
			</view>
	</view>
</template>

<script>
	import post from '../../post.js';
	export default {
			data() {
				return {
					scrollHeight: '500px',
					leftArray: [],
					topArr: [],
					leftIndex: 0,
					isMainScroll: false,
					scrollInto: '',
					tipsTop: '0px'
				}
			},
			onLoad() {
				uni.getSystemInfo({
					success: (res) => {
						/* 设置当前滚动容器的高，若非窗口的告诉，请自行修改 */
						this.scrollHeight = `${res.windowHeight}px`;
						console.log('gaodu', res.windowHeight)
					}
				});
			},
			computed: {
				
			},
			mounted() {
				this.getListData();
				this.getClassList()
			},
			methods: {
				classificationTap(name){
					uni.navigateTo({
						url: "../isSechcCom/isSechcCom?name="+name
					});
				},
				getClassList(){
					const _this = this;
					post.gets({
						method: 'POST',
						url: '/commditytype/searchTypeAll'
					}).then(res => {
						console.log(res,"分类列表")
						//轮播图
						if (res.statusCode === 200) {
							if (res.data.code == 0) {
								_this.leftArray = res.data.typePo;
							}
						}
					});
				},
				/* 获取列表数据 */
				getListData() {
					this.$nextTick(() => {
						this.getElementTop();
					});
				},
				//获取距离顶部的高度
				getScrollTop(selector) {
					return new Promise((resolve, reject) => {
						let query = uni.createSelectorQuery().in(this);
						query.select(selector + '').boundingClientRect(data => {
							resolve(data.top)
						}).exec();
					})
				},
				/* 获取元素顶部信息 */
				async getElementTop() {
					/* Promise 对象数组 */
					let p_arr = [];
	
					/* 遍历数据，创建相应的 Promise 数组数据 */
					for (let i = 0; i < this.leftArray.length; i++) {
						const resu = await this.getScrollTop(`#item-${i}`)
						p_arr.push(resu)
					}
	
					// console.log('p_arr', p_arr)
	
					/* 主区域滚动容器的顶部距离 */
					this.getScrollTop("#scroll-el").then((res) => {
	
						let top = res;
						// #ifdef H5
						top += 43; //因固定提示块的需求，H5的默认标题栏是44px
						// #endif
	
						/* 所有节点信息返回后调用该方法 */
						Promise.all(p_arr).then((data) => {
							console.log('滚动', data)
							this.tipsTop = `${data}px`;
							this.topArr = data;
						});
					})
				},
	
				/* 主区域滚动监听 */
				mainScroll(e) {
					if (!this.isMainScroll) {
						return;
					}
					let top = e.detail.scrollTop;
					let index = -1;
	
					if (top >= this.topArr[this.topArr.length - 1]) {
						index = this.topArr.length - 1;
					} else {
						index = this.topArr.findIndex((item, index) => {
							return this.topArr[index + 1] >= top;
						});
					}
					this.leftIndex = (index < 0 ? 0 : index);
				},
				/* 主区域触摸 */
				mainTouch() {
					this.isMainScroll = true;
				},
				/* 左侧导航点击 */
				leftTap(e) {
					let index = e.currentTarget.dataset.index;
					this.isMainScroll = false;
					this.leftIndex = Number(index);
					this.scrollInto = `item-${index}`;
				}
			}
		}
</script>

<style scoped lang="scss">
.list_box {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
		font-size: 28rpx;

		.left {
			width: 200rpx;
			background-color: #f6f6f6;
			line-height: 80rpx;
			box-sizing: border-box;
			font-size: 32rpx;

			.item {
				padding-left: 20rpx;
				position: relative;
				color:#000000;
				font-size:30rpx;
				text-align:center;
				&:not(:first-child) {
					margin-top: 1px;
					&::after {
						content: '';
						display: block;
						height: 0;
						width: 620upx;
						position: absolute;
						right: 0;
						transform: scaleY(0.5);
						/* 1px像素 */
					}
				}

				&.active,
				&:active {
					background-color: #fff;
					border-left:13rpx solid #C20606;
				}
			}
		}

		.main {
			background-color: #fff;
			padding-left: 20rpx;
			width: 0;
			flex-grow: 1;
			box-sizing: border-box;

			.tips {
				line-height: 64rpx;
				font-size: 24rpx;
				font-weight: bold;
				color: #666;
				height: 64rpx;
				position: fixed;
				top: 44px;
				right: 0;
				width: 530rpx;
				z-index: 10;
				background-color: #fff;
				padding-left: 10rpx;
			}

			.title {
				line-height: 60rpx;
				position: relative;
				font-size: 24rpx;
				font-weight: bold;
				color: #000000;
				height: 60rpx;
				background: #EFEFEF;
				font-weight:800;
				margin: 17rpx 23rpx 14rpx 0  ;
				.titleson1{
					display:inline-block;
					width:6rpx;
					height:22rpx;
					background:rgba(0,0,0,1);
					border-radius:3rpx;
				}
				.titleson{
						margin-left:18rpx;
				}
			}

			.item {
				margin-bottom: 20rpx;
			}
			.goods {
				width:516rpx;
				display: flex;
				margin: 10rpx 0;
				flex-direction: row;
				justify-content: left;
				 flex-wrap: wrap;
				.msglist{
					text-align:center;
					padding-top:12rpx;
					width: 157rpx;
					height:197rpx;
					font-weight:bold;
					.image {
						width: 120rpx;
						height: 120rpx;
						margin-right: 16rpx;
					}
				}
			}
		}
	}
</style>
