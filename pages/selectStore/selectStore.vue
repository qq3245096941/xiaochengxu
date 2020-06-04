<!-- 选择门店 -->
<template>
	<view>
		<view style="padding: 20rpx;display: flex;align-items: center;">
			<van-icon name="location-o" />
			<text style="margin-left: 10rpx;font-size: 25rpx;">{{address}}</text>
		</view>
		<view @click="clickStore(store)" :key="index" class="content" v-for="(store,index) in storeList">
			<van-image fit="cover" width="150rpx" height="150rpx" :src="store.storeTax" />
			<view style="margin-left: 10rpx;">
				<view class="storeName">{{store.storeName}}</view>
				<view class="distance">距离我：{{store.distance}}km</view>
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
				storeList: [],
				address: ''
			}
		},
		methods: {
			/*  */
			clickStore({
				storeId
			}) {
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2];
				prevPage.$vm.distributionWay.store.id = storeId;
				uni.navigateBack({
					delta: 1
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
					distranceX: longitude,
					distranceY: latitude,
					storeProvince: address.province
				}
			})).data.list.map(item => {
				item.storeTax = post.url + item.storeTax;
				// item.distance = (item.distance/1000).toFixed(2);
				return item;
			})
			
			this.storeList = this.storeList.sort((a,b)=>{
				return a.distance - b.distance
			})

			post.getLocation().then(data => {
				this.address = data.address.province + data.address.city + data.address.district
			})
		}
	}
</script>

<style>
	.content {
		display: flex;
		height: 150rpx;
		padding: 20rpx;
		border-bottom: 1rpx solid #e8eaec;
		position: relative;
	}
	
	.content .distance{
		color: #ff9900;
		font-size: 23rpx;
	}

	.storeName {
		color: #17233d;
		font-size: 35rpx;
	}

	.storeAddress {
		color: #515a6e;
		font-size: 23rpx;
	}
</style>
