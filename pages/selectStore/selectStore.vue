<!-- 选择门店 -->
<template>
	<view>
		<view @click="clickStore(store)" :key="index" class="content" v-for="(store,index) in storeList">
			<van-image fit="cover" width="150rpx" height="150rpx" :src="store.storeTax" />
			<view style="margin-left: 10rpx;">
				<view class="storeName">{{store.storeName}}</view>
				<view class="storeAddress">{{store.storeAddress}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import post from '../../post.js'

	export default {
		data() {
			return {
				page: 1,
				rows: 20,
				storeList: []
			}
		},
		methods: {
			/*  */
			clickStore({storeId}){
				let pages = getCurrentPages();
				let prevPage = pages[ pages.length - 2 ];
				prevPage.$vm.distributionWay.store.id = storeId; 
				uni.navigateBack({
					delta:1
				})
			}
		},
		async onLoad() {
			let {
				address,
				latitude,
				longitude
			} = await post.getLocation();

			this.storeList = (await post.gets({
				methods: 'POST',
				url: '/store/storeList',
				data: {
					page: this.page,
					rows: this.rows,
					distranceX: latitude,
					distranceY: longitude,
					storeProvince: address.province
				}
			})).data.list.map(item => {
				item.storeTax = post.url + item.storeTax;
				return item;
			})

			console.log(this.storeList);
		}
	}
</script>

<style>
	.content {
		display: flex;
		height: 150rpx;
		padding: 20rpx;
		border-bottom: 1rpx solid #e8eaec;
	}

	.storeName {
		color: #17233d;
		font-size: 40rpx;
	}

	.storeAddress {
		color: #515a6e;
		font-size: 25rpx;
	}
</style>
