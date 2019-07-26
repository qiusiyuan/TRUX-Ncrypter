let router = require('express').Router();
let pinyin4js = require('pinyin4js');
const isEmpty = require('../../utils').isEmpty;

router.post('/:uid/edit', editCheck);
router.post('/new', createCheck);

function editCheck(req, res, next){
  let content = req.body.content;
  let errMsg = "";
  if (content === undefined){
    errMsg += "Missing required field: 'content'. ";
  }else if(!Array.isArray(content)){
    errMsg += "Unsupported format of 'content'. Content should be an Array"
  }else if(!_checkEditContent(content)){
    errMsg += "Unsupported format of 'content'. Each item in 'content' should be {fieldName: '', value: ''}, and 'title' must not be empty"
  }
  if (errMsg != ""){
      res.status(422);
      res.json({
          success: false,
          message: errMsg,
      });
      return;
  }
  return next();
}

function createCheck(req, res, next){
  let content = req.body.content;
  let errMsg = "";
  if (content === undefined){
    errMsg += "Missing required field: 'content'. ";
  }else if (isEmpty(content.title)){
    errMsg += "Missing required field: 'title' in 'content' ";
  }
  if (errMsg != ""){
    res.status(422);
    res.json({
      success: false,
      message: errMsg,
    });
    return;
  }
  return next();
}

// =============================== Helper ================================
function _checkEditContent(content){
  let flag = true;
  content.forEach(ele => {
    if (!Object.keys(ele).includes('fieldName') ||!Object.keys(ele).includes('value')){
      flag = false;
    }
    if (ele.fieldName == 'title' && isEmpty(ele.value)){
      flag = false;
    }
  });
  return flag;
}

module.exports = router;