<template>
  <div class="campaign-detail-container">
    <create-process
      :renderData="processStatus"
      class="mt20"
    ></create-process>

    <div class="panel default-panel mt20">
      <div class="panel-body">
        <status-area :statusData="detailData.status"></status-area>

        <div class="line-title">{{$t('lang.information')}}</div>
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.name.title')}}:</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.name}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.description.title')}}:</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.description}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.brandName.title')}}:</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.trademark_name}}</p>
            </div>
          </div>
        </div>

        <div class="line-title">{{$t('lang.creations.campaignInfo')}}</div>
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.platform.title')}}:</div>
            <div class="col-sm-8">
              <div class="row">
                <div
                  v-for="item in detailData.terraces"
                  :key="item.terrace_id"
                  class="col-sm-6 platform-item"
                >
                  <div class="col-sm-3 text-center">
                    <div class="check-icon checked">
                      <img :src="item.avatar" alt="" class="icon-img" />
                    </div>
                  </div>
                  <div class="col-sm-8">
                    <!-- <p class="form-control-static">{{item.name}}曝光值:{{item.exposure_value}}</p> -->
                    <!--  -->
                    <p class="form-control-static">{{$t('lang.exposure')}}: {{item.exposure_value}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.picture.title')}}:</div>
            <div class="col-sm-8">
              <div class="upload-imgs-list">
                <div class="upload-img-item">
                  <img :src="detailData.img_url" alt="" class="upload-img" />
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.time.title')}}:</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.time_range}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.kolNumber.title')}}:</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.pre_kols_count}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.budget.title')}}:</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.pre_amount}}</p>
            </div>
          </div>
          <div v-if="detailData.notice" class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.precaution.title')}}:</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.notice}}</p>
            </div>
          </div>
        </div>

        <div class="line-title">{{$t('lang.creations.bigVRequirement')}}</div>
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.tags.title')}}:</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.industries}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.price.title')}}:</div>
            <div class="col-sm-8">
              <p class="form-control-static">{{detailData.price_range}}</p>
            </div>
          </div>
          <!-- <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.followerAge.title')}}:</div>
            <div class="col-sm-8">
              <p class="form-control-static">18～40</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.followerGender.title')}}:</div>
            <div class="col-sm-8">
              <p class="form-control-static">女</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3 control-label">{{$t('lang.creations.followerDistrict.title')}}:</div>
            <div class="col-sm-8">
              <p class="form-control-static">北京 / 上海 / 深圳</p>
            </div>
          </div> -->
        </div>

        <div v-if="kolsList.length > 0">
          <div class="line-title">{{$t('lang.creations.bigVSelected')}}</div>
          <div class="kols-list clearfix">
            <kols-list-item
              v-for="(item, index) in kolsList"
              :key="item.profile_id"
              :renderStatus="kolRenderStatus"
              :renderData="item"
              :routerData="kolRouterData"
            ></kols-list-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import KolsListItem from '@components/KolsListItem'
import CreateProcess from './components/CreateProcess'
import StatusArea from './components/StatusArea'
import { mapState } from 'vuex'

export default {
  name: 'CreationDetail',
  components: {
    CreateProcess,
    StatusArea,
    KolsListItem
  },
  data () {
    return {
      processStatus: {
        current: 1,
        index: 0
      },
      detailData: {},
      kolRenderStatus: {
        hasLiked: false,
        hasMsg: false,
        hasChecked: false,
        hasInflunce: false,
        hasCart: false,
        hasDelete: false
      },
      kolsList: [],
      kolRouterData: {
        type: '',
        keywords: ''
      }
    }
  },
  methods: {
    getDetailData () {
      axios.get(apiConfig.creationsUrl + '/' + this.$route.params.id, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleGetDetailDataSucc)
    },
    handleGetDetailDataSucc (res) {
      console.log(res)
      let resData = res.data
      if (res.status == 200 && resData) {
        console.log(resData)
        this.detailData = resData
        if (resData.status == 'ended' || resData.status == 'finished' || resData.status == 'closed') {
          this.processStatus.current = 4
          this.processStatus.index = 3
        }

        this.kolRouterData.keywords = resData.trademark_keywords

        let _kolsList = this.kolsList
        let _kolItem
        resData.selected_kols.forEach(item => {
          _kolItem = commonJs.buildObjData('avatar_url', item.avatar_url)
          _kolItem.profile_id = item.profile_id
          _kolItem.profile_name = item.profile_name
          _kolItem.description_raw = item.description_raw
          _kolItem.bigv_url = !!item.bigv_url && item.bigv_url != '' ? item.bigv_url : ''
          _kolItem.checked = false
          _kolItem.terrace_avatar = item.terrace_avatar
          _kolsList.push(_kolItem)
        })
        console.log(_kolsList)

        let _terraces = resData.terraces
        _terraces.forEach(item => {
          console.log(item)
          switch (item.short_name) {
            case 'public_wechat_account':
              this.kolRouterData.type = '1'
              break
            case 'weibo':
              this.kolRouterData.type = '0'
              break
            case 'xiaohongshu':
              this.kolRouterData.type = '2'
              break
            case 'douyin':
              this.kolRouterData.type = '5'
              break
            case 'bilibili':
              this.kolRouterData.type = '4'
              break
            case 'kuaishou':
              this.kolRouterData.type = '3'
              break
            case 'instagram':
              this.kolRouterData.type = '6'
              break
            case 'youtube':
              this.kolRouterData.type = '7'
              break
            case 'facebook':
              this.kolRouterData.type = '8'
              break
            default:
              this.kolRouterData.type = '1'
          }
        })
      }
    }
  },
  mounted () {
    this.getDetailData()
  },
  computed: {
    ...mapState(['authorization'])
  }
}
</script>

<style lang="scss" scoped>
.platform-item {
  margin: 10px 0;
}
.kols-list {
  padding: 24px 60px;
  & > .kols-list-item {
    float: left;
    width: 33.33333%;
    padding: 0 10px;
  }
}
</style>
