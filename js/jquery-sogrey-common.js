/***
 @ Editor       Sogrey
 @ version      1.0.0
 @ DependOn     jQuery
 @ Date         2017-08-15
 ***/
(function(window, $) {

	var $ = $ ? $ : jQuery;
	var isDebug = true;

	var sogreyCommon = SogreyCommon = {
		editor: 'Sogrey',
		version: '1.0.0',
		date: '2017-08-15',
		jQueryVersion: $.fn.jquery,
		helpName: "SogreyCommon APIs",
		help: function() {
			return SogreyCommon._h(apiData);
		}
	}
	try {
		window.console && window.console.log && (console.log("欢迎使用\n"), console.log("获取帮助,键入  %c SogreyXXX.help()  其中SogreyXXX是你要查看的js全局变量名", "color:red"))
	} catch(e) {}

	//js插件版本信息、字段、方法api帮助信息展示
	SogreyCommon._h = function(apiData) {
		var helpStr = apiData.title + "\n版本号：" + apiData.version + "\n";
		helpStr += apiData.jqueryVersion == null ? "" : "依赖jquery版本：" + apiData.jqueryVersion + "\n";
		helpStr += "\n其他依赖JS：\n";
		if(apiData.otherRelyOn && apiData.otherRelyOn.length > 0) {
			for(var i = 0; i < apiData.otherRelyOn.length; i++) {
				helpStr += "[" + (i + 1) + "]" + apiData.otherRelyOn[i].name + "  版本号：" + apiData.otherRelyOn[i].version + "\n";
			}
		} else {
			helpStr += "    暂无其他依赖。\n";
		}

		helpStr += "\n成员变量:\n\n";
		if(apiData.field && apiData.field.length > 0) {
			for(var i = 0; i < apiData.field.length; i++) {
				helpStr += "[" + (i + 1) + "] " + apiData.field[i].fieldName + " - " + apiData.field[i].type + " ; " + apiData.field[i].desc + "\n";
			}
		} else {
			helpStr += "    暂无成员变量。\n\n";
		}

		helpStr += "\n成员函数:\n\n"
		helpStr += getFunctions(apiData.functions, helpStr)
		return helpStr;
	}

	function getFunctions(functions) {
		var helpStr = "";
		if(functions && functions.length > 0) {
			for(var i = 0; i < functions.length; i++) {
				if(functions[i].isObject) {
					helpStr += "\n【" + functions[i].funName + "】 - " + functions[i].desc + "\n";
					helpStr += getFunctions(functions[i].functions, helpStr)
				} else {
					var params = "无";
					if(functions[i].params.length > 0) {
						params = "";
						for(var j = 0; j < functions[i].params.length; j++) {
							params += functions[i].params[j].paramName + "-" + functions[i].params[j].desc;
							if(j < functions[i].params.length - 1) params += ",";
						}
					}
					helpStr += "[" + (i + 1) + "] " + functions[i].funName + " - " + functions[i].desc + ";  参数：" + params + "\n";
				}
			}
		} else {
			helpStr += "    暂无成员函数。\n\n";
		}
		return helpStr
	}
	// 去除字符串的首尾的空格
	SogreyCommon.trim = function(str) {
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}
	//判断字符串是否为空，返回true说明为空
	SogreyCommon.isEmpty = function(s) {
		return SogreyCommon.JTrim(s) == "";
	}
	//log 日志输出
	SogreyCommon.log = function(str) {
		if(isDebug)
			console.log(str)
	}
	//错误 日志输出
	SogreyCommon.error = function(str) {
		if(isDebug)
			console.error(str)
	}
	//吐司，默认1s
	SogreyCommon.toast = function(msg) {
		SogreyCommon.toastWidthDuration(msg, 1000)
	}
	//吐司
	SogreyCommon.toastWidthDuration = function(msg, duration) {
		duration = isNaN(duration) ? 3000 : duration;
		var m = document.createElement('div');
		m.innerHTML = msg;
		m.style.cssText = "width: 60%;min-width: 150px;margin: auto;max-width: 384px;opacity: 0.7;height: 30px;color: rgb(255, 255, 255);line-height: 30px;text-align: center;border-radius: 5px;position: absolute;top: 40%;left: 50%;margin-left: -30%; z-index: 999999;background: rgb(0, 0, 0);font-size: 12px;";
		document.body.appendChild(m);
		setTimeout(function() {
			var d = 0.5;
			m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
			m.style.opacity = '0';
			setTimeout(function() {
				document.body.removeChild(m)
			}, d * 1000);
		}, duration);
	}

	/**获取参数*/
	SogreyCommon.GetQueryString = function(key, defaultValue) {
		var svalue = location.search.match(new RegExp("[\?\&]" + key + "=([^\&]*)(\&?)", "i"));
		return svalue ? svalue[1] : defaultValue;
	}
	SogreyCommon.GetQueryStringByUrl = function(url, key, defaultValue) {
		var svalue = url.match(new RegExp("[\?\&]" + key + "=([^\&]*)(\&?)", "i"));
		return svalue ? svalue[1] : defaultValue;
	}
	//正则匹配
	SogreyCommon.pattern = {
		//是否匹配
		isMatched: function(pattern, str) {
			var result = str.match(pattern);
			if(result == null) return false;
			return true;
		}
	}

	var apiData = {
		title: SogreyCommon.helpName,
		version: SogreyCommon.version,
		jqueryVersion: SogreyCommon.jQueryVersion,
		otherRelyOn: [
			/*{
						name:"jquery-sogrey-common.js",
						version:"1.0.0"
					}*/
		], //其他依赖项
		field: [{
			fieldName: "isDebug",
			type: "boolean",
			desc: "true输出日志，false则不.正式发布时改为false"
		}],
		functions: [{
				funName: "_h(apiData)",
				desc: "js插件版本信息、字段、方法api帮助信息展示，使用JS插件全局变量名+.help()方法调用即可查询该js信息，例如本js可使用  SogreyCommon.help() ，当然前提是js插件是按照固定的方式配置了api信息，外部js无需调用本方法",
				params: [{
					paramName: "apiData",
					desc: "api配置"
				}]
			}, {
				funName: "trim(s)",
				desc: "去除字符串的首尾的空格",
				params: [{
					paramName: "s",
					desc: "输入的字符串"
				}]
			},
			{
				funName: "isEmpty(s)",
				desc: "判断字符串是否为空，返回true说明为空",
				params: [{
					paramName: "s",
					desc: "输入的字符串"
				}]
			},
			{
				funName: "log(object)",
				desc: "log日志输出",
				params: [{
					paramName: "object",
					desc: "object对象，可以是字符串"
				}]
			},
			{
				funName: "error(object)",
				desc: "error日志输出",
				params: [{
					paramName: "object",
					desc: "object对象，可以是字符串"
				}]
			}, {
				funName: "toast(msg)",
				desc: "吐司Toast,默认持续一秒钟",
				params: [{
					paramName: "msg",
					desc: "要展示的信息文本"
				}]
			}, {
				funName: "toastWidthDuration(msg, duration)",
				desc: "吐司Toast",
				params: [{
					paramName: "msg",
					desc: "要展示的信息文本"
				}, {
					paramName: "duration",
					desc: "持续展示时间，单位豪秒"
				}]
			}, {
				funName: "pattern",
				desc: "正则表达式匹配",
				params: [],
				isObject: true,
				functions: [{
					funName: "isMatched(pattern, str)",
					desc: "是否匹配",
					params: [{
						paramName: "pattern",
						desc: "匹配规则"
					}, {
						paramName: "str",
						desc: "要匹配的字符串"
					}]
				}]
			}, {
				funName: "GetQueryString(key,defaultValue)",
				desc: "获取当前页参数，地址栏地址?后面的 key=value,结果返回value",
				params: [{
					paramName: "key",
					desc: "参数名key"
				}, {
					paramName: "defaultValue",
					desc: "默认值"
				}]
			}, {
				funName: "GetQueryStringByUrl(url,key,defaultValue)",
				desc: "获取指url参数，地址栏地址?后面的 key=value,结果返回value",
				params: [{
					paramName: "url",
					desc: "目标url"
				}, {
					paramName: "key",
					desc: "参数名key"
				}, {
					paramName: "defaultValue",
					desc: "默认值"
				}]
			}
			/*{
				funName: "Request",
				desc: "获取参数",
				params: [],
				isObject: true,
				functions: [{
					funName: "GetQueryString(key)",
					desc: "获取当前页参数，地址栏地址?后面的 key=value,结果返回value",
					params: [{
						paramName: "key",
						desc: "参数名key"
					}]
				}]
			}*/
		]
	}

	window.sogreyCommon = window.SogreyCommon = SogreyCommon;
})(window, jQuery);