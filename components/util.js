function formatDate(date) {
  // 格式化日期时间的函数
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  // 返回格式化后的日期时间字符串
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function getCurrentTimestamp() {
  return Date.now();
}
 
// 生成一个指定长度的随机数
function generateRandomNumber(length) {
  let randomNumber = '';
  for (let i = 0; i < length; i++) {
    randomNumber += Math.floor(Math.random() * 10);
  }
  return randomNumber;
}
 
// 生成订单号
function generateOrderNumber() {
  const timestamp = getCurrentTimestamp();
  const randomPart = generateRandomNumber(6); // 生成6位随机数
  return `ORD${timestamp}${randomPart}`;
}
 
// 导出函数
module.exports = {
  formatDate: formatDate,
  generateOrderNumber:generateOrderNumber
  // 你可以在这里添加更多的实用函数
};