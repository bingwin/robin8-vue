<template>
  <div class="kol-item">
    <div class="media">
      <div class="media-left media-middle">
        <div class="kol-intro">
          <div class="avatar">
            <img :src="profile.avatar_url" alt="" class="avatar-img" />
          </div>
          <div class="name">{{profile.name}}</div>
          <div class="desc">{{profile.desc}}</div>
          <div class="opaeration-btns">
            <div class="item iconfont icon-details"></div>
            <!-- <div class="item iconfont icon-msg"></div>
            <div class="item iconfont icon-star-fill active"></div> -->
          </div>
        </div>
      </div>
      <div class="media-body media-middle">
        <div class="related-info">
          <p>合计:<span class="price">¥{{profile.price_total}}</span></p>
          <p
            v-for="item in tenders"
            :key="item.id"
          >
            {{item.brand_show_info}}
          </p>
          <kol-articles-list
            v-if="profile.status != 'pending'"
            :articles="tenders"
          ></kol-articles-list>
        </div>
      </div>
      <div class="media-right media-middle kol-ctrl">
        <input
          v-if="profile.status == 'pending'"
          type="checkbox"
          name="kol"
          :checked="checked"
          @click="selectKol(profile.creation_selected_kol_id, profile.price_total)"
        />
        <button
          v-else-if="profile.status == 'uploaded'"
          type="button"
          :disabled="statusText != ''"
          class="btn btn-sm btn-outline btn-blue btn-circle"
          @click="updateStatus()"
        >
          {{statusText != '' ? statusText : '满意'}}
        </button>
        <button
          v-else
          type="button"
          disabled
          class="btn btn-sm btn-outline btn-blue btn-circle disabled"
        >
          {{profile.status_zh}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import KolArticlesList from './KolArticlesList'
import { mapState } from 'vuex'

export default {
  name: 'KolItem',
  components: {
    KolArticlesList
  },
  props: {
    renderData: Object,
    checkedIds: Array
  },
  data () {
    return {
      profile: {},
      tenders: [],
      checked: false,
      statusText: ''
    }
  },
  methods: {
    selectKol (id, price) {
      this.$emit('selectKol', {
        'id': id,
        'price': price
      })
    },
    updateStatus () {
      axios.post(apiConfig.updateStatusUrl, {
        'creation_selected_kol_id': this.profile.creation_selected_kol_id
      }, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleUpdateStatusSucc)
    },
    handleUpdateStatusSucc (res) {
      let resData = res.data
      console.log(resData)
      this.statusText = resData.status_zh
    }
  },
  mounted () {
    // console.log(this.renderData)
    console.log(this.checkedIds)
    this.profile = this.renderData.profile
    this.tenders = this.renderData.tenders

    this.checkedIds.forEach(item => {
      if (this.profile.creation_selected_kol_id == item) {
        this.checked = true
      }
    })
  },
  computed: {
    ...mapState(['authorization'])
  }
}
</script>

<style lang="scss" scoped>
.kol-item {
  padding: 24px 60px 24px 0;
  .kol-intro {
    width: 240px;
    text-align: center;
    .avatar {
      position: relative;
      width: 50px;
      height: 50px;
      margin: 0 auto;
      .avatar-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .name {
      margin-top: 6px;
      font-size: $font-nm-s;
      font-weight: 600;
      color: #9b9b9b;
    }
    .desc {
      font-size: $font-xs;
    }
    .opaeration-btns {
      margin-top: 10px;
      text-align: center;
      font-size: 0;
      .item {
        display: inline-block;
        margin: 0 5px;
        cursor: pointer;
        color: nth($blue, 1);
        &.active {
          color: nth($yellow, 1);
        }
      }
    }
  }
  .related-info {
    line-height: 24px;
    padding-left: 40px;
    border-left: 1px solid #979797;
    font-size: $font-nm-s;
    color: #9b9b9b;
    .price {
      font-size: $font-nm-b;
      color: nth($blue, 1);
    }
  }
  &.active {
    background-color: #f4f5ff;
  }
}
</style>
