/**
 * 时间戳。一般用于不希望URL加载时有缓存的场景
 * @type {Date}
 * @private
 */
var _curTime = (new Date()).valueOf();

/**
 * 标识当前系统运行于何种模式，IS_RELEASE=true，即发布模式 ；IS_RELEASE=false，即DEBUG模式。
 * @type {boolean}
 */
var IS_DEBUG = true;
/**
 * UI系统中调用API数据的前缀地址
 * @type {string}
 */
var API_PATH_PREFIX = "";


