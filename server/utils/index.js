module.exports.isEmpty = function isEmpty(string){
  return string == undefined || string == null || string.trim() == '';
}

module.exports.toPinyin = function toPinyin(string){
  var  pinyin4js = require('pinyin4js');
  return pinyin4js.convertToPinyinString(string, pinyin4js.WITHOUT_TONE);
}