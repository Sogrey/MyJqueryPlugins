/***
 * Websql 操作
 @ Editor       Sogrey
 @ version      1.0.0
 @ DependOn     jQuery
 @ Date         2017-08-15
 ***/
(function(window, $) {

	var $ = $ ? $ : jQuery;
	var _colSuffix = "Index"

	var sogreyWebsql = SogreyWebsql = {
		editor: 'Sogrey',
		version: '1.0.0',
		date: '2017-08-15',
		jQueryVersion: $.fn.jquery,
		helpName: "SogreyWebsql APIs",
		help: function() {
			if(typeof(SogreyCommon) == "undefined") return "[404] I'm sorry! jquery-sogrey-common.js was not found！";
			return SogreyCommon._h(apiData);
		}
	}

	function log(object) {
		if(typeof(SogreyCommon) == "undefined") console.log(object);
		else SogreyCommon.log(object);
	}

	function error(object) {
		if(typeof(SogreyCommon) == "undefined") console.error(object);
		else SogreyCommon.error(object);
	}
	//打开/创建数据库
	SogreyWebsql.openDatabase = function(dbName, dbVersion, desc, size, callback) {
		if(null == callback) {
			return openDatabase(dbName, dbVersion, desc, size);
		} else {
			return openDatabase(dbName, dbVersion, desc, size, callback);
		}
	}
	//打开/创建数据库（使用配置）
	SogreyWebsql.openDatabaseWithDBData = function() {
		return SogreyWebsql.openDatabase(DBData.DBName, DBData.DBVersion, DBData.desc, 2 * 1024 * 1024, null);
	}
	//打开/创建数据库（使用配置 , 待回调）
	SogreyWebsql.openDatabaseWithDBDataCallback = function(callback) {
		return SogreyWebsql.openDatabase(DBData.DBName, DBData.DBVersion, DBData.desc, 2 * 1024 * 1024, callback);
	}
	//创建表
	SogreyWebsql.createTableWithDBData = function() {
		return SogreyWebsql.createTableWithDBDataCallback(null)
	}
	//创建表
	SogreyWebsql.createTableWithDBDataCallback = function(callback) {
		var db = SogreyWebsql.openDatabaseWithDBData()
		db.transaction(function(tx) {
			for(var i = 0; i < DBData.db.length; i++) {
				var cols = ""
				var colsArray = new Array(); //定义一数组 
				colsArray = DBData.db[i].cols.split("|"); //字符分割 
				for(var j = 0; j < colsArray.length; j++) {
					cols += colsArray[j]
					if(j < colsArray.length - 1) {
						cols += ","
					}
				}
				tx.executeSql('CREATE TABLE IF NOT EXISTS ' + DBData.db[i].tableName + ' (' + DBData.db[i].keyPath + ' unique, ' + cols + ')');
			}
			if(typeof(callback) === "function") {
				callback(tx)
			}
		});
		return db
	}
	//插入数据
	SogreyWebsql.insrert = function(tableName, dataMap) {
		//		var key1 = '动态key1';
		//		var key2 = '动态key2';
		//		var map = {};
		//		map[key1] = 1;
		//		map[key2] = 2;
		//
		//		console.log(map[key1]); //结果是1.
		//		console.log(map[key2]); //结果是2.
		//
		//		//如果遍历map
		//		for(var prop in map) {
		//			if(map.hasOwnProperty(prop)) {
		//				console.log('key is ' + prop + ' and value is' + map[prop]);
		//			}
		//		}
		SogreyWebsql.createTableWithDBDataCallback(function(tx) {
			var keys = "";
			var values = "";
			for(var prop in dataMap) {

				if(dataMap.hasOwnProperty(prop)) {
					console.log('key is ' + prop + ' and value is' + dataMap[prop]);
					keys += "'" + prop + "',"
					values += "'" + dataMap[prop] + "',"
				}
			}
			keys = keys.substr(0, keys.length - 1)
			values = values.substr(0, values.length - 1)
			log('INSERT INTO ' + tableName + ' (' + keys + ') VALUES (' + values + ')')
			tx.executeSql('INSERT INTO ' + tableName + ' (' + keys + ') VALUES (' + values + ')');
		})
	}
	//删除数据
	SogreyWebsql.delete = function(tableName, whereArg, whereValue) {
		whereArg = " WHERE " + whereArg
		if(whereArg == "" || typeof(whereValue) == "undefined")
			whereArg = ""
		var whereValueArray = []
		if(whereValue != "" && typeof(whereValue) != "undefined")
			whereValueArray = whereValue.split("|")

		var db = SogreyWebsql.createTableWithDBData()
		db.transaction(function(tx) {
			//			DELETE * FROM 表名 WHERE 条件
			tx.executeSql('DELETE FROM ' + tableName + whereArg, whereValueArray, function(tx1, results) {
				console.log(results)
			}, null);
		});
	}
	//删除全部
	SogreyWebsql.deleteAll = function(tableName) {

		var db = SogreyWebsql.createTableWithDBData()
		db.transaction(function(tx) {
			//			DELETE * FROM 表名 WHERE 条件
			tx.executeSql('DELETE FROM ' + tableName, [], function(tx1, results) {
				console.log(results)
			}, null);
		});
	}
	//更新数据
	SogreyWebsql.update = function(tableName, setArg, whereArg, whereValue) {
		whereArg = " SET " + setArg + " WHERE " + whereArg
		if(whereArg == "" || typeof(whereValue) == "undefined")
			whereArg = ""
		var whereValueArray = []
		if(whereValue != "" && typeof(whereValue) != "undefined")
			whereValueArray = whereValue.split("|")

		var db = SogreyWebsql.createTableWithDBData()
		db.transaction(function(tx) {
			//			UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
			tx.executeSql('UPDATE ' + tableName + whereArg, whereValueArray, function(tx1, results) {
				console.log(results)
			}, null);
		});
	}
	//查询数据
	SogreyWebsql.query = function(tableName, whereArg, whereValue) {
		whereArg = " where " + whereArg
		if(whereArg == "" || typeof(whereValue) == "undefined")
			whereArg = ""
		var whereValueArray = []
		if(whereValue != "" && typeof(whereValue) != "undefined")
			whereValueArray = whereValue.split("|")

		var db = SogreyWebsql.createTableWithDBData()
		db.transaction(function(tx) {
			tx.executeSql('SELECT * FROM ' + tableName + whereArg, whereValueArray, function(tx1, results) {
				console.log(results)
			}, null);
		});
	}
	var apiData = {
		title: SogreyWebsql.helpName,
		version: SogreyWebsql.version,
		jqueryVersion: SogreyWebsql.jQueryVersion,
		otherRelyOn: [{
			name: "jquery-sogrey-common.js",
			version: "1.0.0"
			//SogreyCommon.version
		}], //其他依赖项
		field: [
			/*{
						fieldName: "isDebug",
						type: "boolean",
						desc: "true输出日志，false则不"
					}*/
		],
		functions: [{
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
			},
			{
				funName: "SogreyWebsql.openDatabase(dbName, dbVersion, desc, size,callback)",
				desc: "打开数据库，不存在则创建",
				params: [{
					paramName: "dbName",
					desc: "数据库名"
				}, {
					paramName: "dbVersion",
					desc: "数据库版本号"
				}, {
					paramName: "desc",
					desc: "描述"
				}, {
					paramName: "size",
					desc: "数据库大小"
				}, {
					paramName: "callback",
					desc: "[可选]创建回调会在创建数据库后被调用"
				}]
			},
			{
				funName: "SogreyWebsql.openDatabaseWithDBData()",
				desc: "使用配置打开数据库，不存在则创建",
				params: []
			},
			{
				funName: "SogreyWebsql.openDatabaseWithDBDataCallback(callback)",
				desc: "打开数据库，不存在则创建，带回调",
				params: [{
					paramName: "callback",
					desc: "创建回调会在创建数据库后被调用"
				}]
			},
			{
				funName: "SogreyWebsql.createTableWithDBData()",
				desc: "创建表,需配置DBData.db字段",
				params: []
			},
			{
				funName: "SogreyWebsql.createTableWithDBDataCallback(callback)",
				desc: "创建表,需配置DBData.db字段",
				params: [{
					paramName: "callback",
					desc: "创建回调会在创建表后被调用"
				}]
			},
			{
				funName: "SogreyWebsql.insrert(tableName, dataMap)",
				desc: "向表tableName中插入数据",
				params: [{
					paramName: "tableName",
					desc: "表名"
				}, {
					paramName: "dataMap",
					desc: "要插入的数据；dataMap是个map,定义参考 ：\n                   var key = '动态key';\n                   var map = {};\n                   map[key1] = 'value';"
				}]
			},
			{
				funName: "SogreyWebsql.delete(tableName, whereArg, whereValue)",
				desc: "删除tableName中数据",
				params: [{
					paramName: "tableName",
					desc: "表名"
				}, {
					paramName: "whereArg",
					desc: "删除条件；例如 'id=? and name=?' "
				}, {
					paramName: "whereValue",
					desc: "删除条件中替换?的值('|'分割);例如 '1|李雷' "
				}]
			},
			{
				funName: "SogreyWebsql.deleteAll(tableName)",
				desc: "删除tableName中全部数据",
				params: [{
					paramName: "tableName",
					desc: "表名"
				}]
			},
			{
				funName: "SogreyWebsql.update(tableName, setArg, whereArg, whereValue)",
				desc: "更新tableName中数据",
				params: [{
					paramName: "tableName",
					desc: "表名"
				}, {
					paramName: "setArg",
					desc: "要更新的新数据；例如 'name=?' "
				}, {
					paramName: "whereArg",
					desc: "要更新的条件；例如 'id=?' "
				}, {
					paramName: "whereValue",
					desc: "前两个参数中替换?的值('|'分割);例如 '李雷|1' "
				}]
			},
			{
				funName: "SogreyWebsql.query(tableName, whereArg, whereValue)",
				desc: "查询tableName中数据",
				params: [{
					paramName: "tableName",
					desc: "表名"
				}, {
					paramName: "whereArg",
					desc: "查询条件；例如 'id=? and name=?' "
				}, {
					paramName: "whereValue",
					desc: "查询条件中中替换?的值('|'分割);例如 '李雷|1' "
				}]
			}
		]
	}
	//数据库表结构
	var DBData = {
		DBName: "demo1",
		DBVersion: 1,
		desc: "Bim 5D webapp 数据库",
		db: [{
			tableName: "users", //表名
			keyPath: "userId", //主键
			cols: "userName" //除主键外其他字段列名
		}, {
			tableName: "baseData", //表名
			keyPath: "id",
			cols: "name|desc" //字段列名
		}]
	}
	window.sogreyWebsql = window.SogreyWebsql = SogreyWebsql;
})(window, jQuery);

//http://www.runoob.com/html/html5-web-sql.html