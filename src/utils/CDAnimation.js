/**
 * 執行CD動畫效果(遞減呈現)
 * @param {Number} id target
 * @param {Number} finish finish percents
 * @param {Number} total total percents
 */
function runReversal(id, finish, total) {
  switch (id) {
    case 1:
      return rotate(caculateReversal(finish, total).first)
    case 2:
      return rotate(caculateReversal(finish, total).second)
    default:
      return {}
  }
}

/**
 * 設定CSS樣式
 * @param {Number} degree rotate
 */
function rotate(degree) {
  return {
    'transform': `rotate(${degree}deg)`,
    'msTransform': `rotate(${degree}deg)`,
    'MozTransform': `rotate(${degree}degg)`,
    'WebkitTransform': `rotate(${degree}deg)`,
    'OTransform': `rotate(${degree}deg)`,
    'zoom': 1,
  }
}

/**
 * 計算CSS角度(遞減呈現)
 * @param {Number} finish finish percents
 * @param {Number} total total percents
 */
function caculateReversal(finish, total) {
  const remain = total - finish
  let firstHalfAngle = 0
  let secondHalfAngle = 180
  const drawAngle = remain / total * 360
  if (drawAngle >= 180) {
    firstHalfAngle = (drawAngle - 180) * -1
  } else {
    secondHalfAngle = drawAngle * -1
  }
  return {
    first: firstHalfAngle,
    second: secondHalfAngle,
  }
}

/**
 * 計算CSS角度(遞增呈現)
 * @param {Number} finish finish percents
 * @param {Number} all total percents
 */
function caculate(finish, total) {
  let firstHalfAngle = 180
  let secondHalfAngle = 0
  const drawAngle = finish / total * 360
  if (drawAngle <= 180) {
    firstHalfAngle = drawAngle
  } else {
    secondHalfAngle = drawAngle - 180
  }
  return {
    first: firstHalfAngle,
    second: secondHalfAngle,
  }
}

export default runReversal
