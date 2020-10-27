/**
 *  jsonForm    
 *  json转 form提交格式  如 a=b&b=C
 */
module.exports = (json) => {
  var str = []
  for (var p in json) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]))
  }
  return str.join("&")
}