import commonJs from '@javascripts/common.js'

let authorization = ''
let localAuthorization = commonJs.getLocalData('robin8Authorization')
console.log('当前token：' + localAuthorization)
try {
  if (!!localAuthorization && localAuthorization != '') {
    authorization = localAuthorization
  }
} catch (e) {}

let nickname = ''
let localNickname = commonJs.getLocalData('robin8UserName')
console.log('当前nickname：' + localNickname)
try {
  if (!!localNickname && localNickname != '') {
    nickname = localNickname
  }
} catch (e) {}

let mobile = ''
let localMobile = commonJs.getLocalData('robin8Mobile')
console.log('当前mobile：' + localMobile)
try {
  if (!!localMobile && localMobile != '') {
    mobile = localMobile
  }
} catch (e) {}

let account = ''
let localAccount = commonJs.getLocalData('robin8Account')
console.log('当前account：' + localAccount)
try {
  if (!!localAccount && localAccount != '') {
    account = localAccount
  }
} catch (e) {}

export default {
  authorization,
  nickname,
  mobile,
  account
}