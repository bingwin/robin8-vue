const host = 'http://192.168.50.50:3001/brand_api/v2'
const domain = ''
const searchHost = 'http://api_prod.robin8.net:8080/api/v1/r1'
const searchHostKey = '&application_id=local-001&application_key=vue-001'

const config = {
  host,
  domain,

  // 登陆
  loginUrl: `${host}/sessions/sign_in`,

  // 注册
  regUrl: `${host}/sessions/sign_up`,

  // 获取手机验证码
  phoneCodeUrl: `${host}/codes/get_phone_code`,

  // 获取邮箱验证码
  emailCodeUrl: `${host}/codes/get_email_code`,

  // 活动 创建post，列表get，详情:id get
  creationsUrl: `${host}/creations`,

  // 上传图片post 参数image
  uploadImageUrl: `${host}/creations/upload_image`,

  // 基本信息 tags and trademarks get
  baseInfosUrl: `${host}/base_infos`,

  // 待合作列表get
  pendingTendersUrl: `${host}/kols/pending_tenders`,

  // 合作中列表get
  unpayTendersUrl: `${host}/kols/unpay_tenders`,

  // 已完成列表get
  paidTendersUrl: `${host}/kols/paid_tenders`,

  // 立即支付post
  // payTendersUrl: `${host}/tenders/:creation_id/tender`

  // 首页接口开始------------------------
  // analytics trend 微博
  trendsWeibo: `${searchHost}/weibo/brand/trend?${searchHostKey}`,

  // analytics trend 微信
  trendsWeixin: `${searchHost}/weixin/brand/trend?${searchHostKey}`,

  // analytics concept 微博
  conceptWeibo: `${searchHost}/weibo/brand/tag_cloud_distribution?${searchHostKey}`,

  // analytics concept 微信
  conceptWeixin: `${searchHost}/weixin/brand/tag_cloud_distribution?${searchHostKey}`,

  // analytics competitor 微博
  competitorWeibo: `${searchHost}/weibo/brand/competitors?${searchHostKey}`,

  // analytics competitor 微信
  competitorWeixin: `${searchHost}/weixin/brand/competitors?${searchHostKey}`,

  // analytics sentiment 微博
  sentimentWeibo: `${searchHost}/weibo/brand/sentiments?${searchHostKey}`,

  // analytics sentiment 微信
  sentimentWeixin: `${searchHost}/weixin/brand/sentiments?${searchHostKey}`,

  // Recommended Kols 微博
  kolsWeibo: `${searchHost}/weibo/brand/recommended_kols?${searchHostKey}`,

  // Recommended Kols 微信
  kolsWeixin: `${searchHost}/weixin/brand/recommended_kols?${searchHostKey}`,

  // top post 微博
  topPostWeibo: `${searchHost}/weibo/brand/top_posts?${searchHostKey}`,

  // top post 微信
  topPostWeixin: `${searchHost}/weixin/brand/top_posts?${searchHostKey}`,

  // 首页接口结束------------------------
}

module.exports = config
