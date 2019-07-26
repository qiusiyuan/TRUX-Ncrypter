const pinyin4js = require('pinyin4js');

module.exports.isEmpty = function isEmpty(string){
  return string == undefined || string == null || string.trim() == '';
}

module.exports.toPinyin = function toPinyin(string){
  return pinyin4js.convertToPinyinString(string, '', pinyin4js.WITHOUT_TONE);
}