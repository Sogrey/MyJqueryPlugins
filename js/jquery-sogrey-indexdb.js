/***
 @ Editor       Sogrey
 @ version      1.0.0
 @ DependOn     jQuery
 @ Date         2017-08-15
 ***/
(function(window, $) {

	var $ = $ ? $ : jQuery;
	//	var isDebug = true;
	var _colSuffix = "Index"

	var sogreyIndexDB = SogreyIndexDB = {
		editor: 'Sogrey',
		version: '1.0.0',
		date: '2017-08-15',
		jQueryVersion: $.fn.jquery,
		helpName: "SogreyIndexDB APIs",
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

	var IDB = {};
	//var dbName = "employeeDb";
	IDB.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	IDB.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
	IDB.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

	IDB.indexedDB.onerror = function(e) {
		error("× Database error: " + e.message)
	};
	//创建数据库
	SogreyIndexDB.createDataBase = function(dbName /*数据库名*/ , dbVersion /*数据库版本号*/ ) {
		if(typeof(dbName) == "undefined") dbName = DBData.DBName;
		if(typeof(dbVersion) == "undefined") dbVersion = DBData.DBVersion;
		log('! Deleting local database');
		var deleteDbRequest = IDB.indexedDB.deleteDatabase(dbName);
		deleteDbRequest.onsuccess = function(event) {
			log('! Database deleted');
			var openRequest = IDB.indexedDB.open(dbName, dbVersion);

			openRequest.onerror = function(e) {
				error("× Database error: " + e.message);
			};
			openRequest.onsuccess = function(event) {
				log("√ Database created");
				IDB.db = openRequest.result;
			};
			openRequest.onupgradeneeded = function(evt) {
				log('! Creating object stores ..............................');
				log("! 当前数据库版本号：" + openRequest.result.version);
				//				if(openRequest.result.version != DBData.DBVersion) { //版本更新
				for(var i = 0; i < DBData.db.length; i++) {
					var tableStore = evt.currentTarget.result.createObjectStore(DBData.db[i].tableName, {
						keyPath: DBData.db[i].keyPath
					});
					var cols = new Array();
					cols = DBData.db[i].cols.split("|");
					for(var j = 0; j < cols.length; j++) {
						tableStore.createIndex(cols[j] + _colSuffix, cols[j], {
							unique: false
						});
					}
				}
				//				}
			};

		};
		deleteDbRequest.onerror = function(e) {
			error("× Database error: " + e.message);
		};
	}
	//初始化数据库
	SogreyIndexDB.initDB = function(tableName, model) {
		//获取事务
		var transaction = IDB.db.transaction([tableName], model);
		//获取表
		var objectStore = transaction.objectStore(tableName);
		return objectStore;
	}

	//打开数据库
	SogreyIndexDB.openDatabase = function(dbName) {
		if(typeof(dbName) == "undefined") dbName = DBData.DBName;
		var openRequest = IDB.indexedDB.open(dbName);
		openRequest.onerror = function(e) {
			error("× Database error: " + e.message);
		};
		openRequest.onsuccess = function(e) {
			IDB.db = openRequest.result;
			log("√ Database opened");
		};
	}
	//删除数据库
	SogreyIndexDB.deleteDatabase = function(dbName) {
		var deleteDbRequest = IDB.indexedDB.deleteDatabase(dbName);
		deleteDbRequest.onsuccess = function(event) {
			// database deleted successfully
			log("√ Database deleted successfully");
		};
		deleteDbRequest.onerror = function(e) {
			error("× Database deleted error: " + e.message);
		};
	}
	//删除表
	SogreyIndexDB.deleteTable = function(tableName) {
		//TODO
	}
	//存储数据
	SogreyIndexDB.insert = function(tableName, dataObject) {
		var store = SogreyIndexDB.initDB(tableName, "readwrite")

		if(IDB != null && IDB.db != null) {
			//			var request = store.put({
			//				"userId": "001",
			//				"userName": "Joe"
			//			});
			var request = store.put(dataObject)
			request.onsuccess = function(e) {
				log("√ insert successfully");
			};

			request.onerror = function(e) {
				error("× insert error: " + e.message);
			};
		}
	}
	//插入数据 集合
	SogreyIndexDB.insertList = function(tableName, dataObjectList) {
		var store = SogreyIndexDB.initDB(tableName, "readwrite")

		if(IDB != null && IDB.db != null && dataObjectList.constructor == Array) {
			for(var i = 0; i < dataObjectList.length; i++) {
				var dataObject = dataObjectList[i];

				var request = store.put(dataObject)
				request.onsuccess = function(e) {
					log("√ insert successfully");
				};

				request.onerror = function(e) {
					error("× insert error: " + e.message);
				};
			}
		}
	}
	//删除数据
	SogreyIndexDB.delete = function(tableName, keyPath) {
		var store = SogreyIndexDB.initDB(tableName, "readwrite")
		var request = store.delete(keyPath);
		//		request.onerror = function(e) {
		//			error("× delete data error: " + request.error);
		//		};
		//		request.onsuccess = function(e) {
		//			var result = e.target.result;
		//			log(e);
		//			log("√ delete data successfully");
		//		}
	}
	//更新数据
	SogreyIndexDB.update = function(tableName, keyPath, dataObject) {
		//TODO
		var store = SogreyIndexDB.initDB(tableName, "readwrite")
		var request = store.get(keyPath);
		request.onsuccess = function(e) {
			var data = e.target.result;
			//			student.name = 'wwww1';
			data = dataObject;
			var requestUpdata = store.put(data);
			requestUpdata.onsuccess = function(e) {
				log("√ update data successfully");
			};

			requestUpdata.onerror = function(e) {
				error("× update data error: " + e.message);
			};
		}
	}

	//查询指定表 指定列指定列值的数据
	SogreyIndexDB.queryByIndexAndValue = function(tableName, colIndex, colValue) {
		try {
			if(IDB != null && IDB.db != null) {
				var store = SogreyIndexDB.initDB(tableName, "readwrite")
				store.index(colIndex + _colSuffix).get(colValue).onsuccess = function(event) {
					var data = event.target.result;
					if(data == null) {
						error("data not found");
					} else {
						var jsonStr = JSON.stringify(data);
						log("√ " + jsonStr);
					}
				};
			}

		} catch(e) {
			error("× " + e.message);
		}
	}
	//查询所有
	SogreyIndexDB.queryAll = function(tableName) {
		try {
			if(IDB != null && IDB.db != null) {
				var store = SogreyIndexDB.initDB(tableName, "readwrite")
				var request = store.openCursor();
				request.onsuccess = function(evt) {
					var cursor = evt.target.result;
					if(cursor) {
						var data = cursor.value;
						var jsonStr = JSON.stringify(data);
						log("√ " + jsonStr);
						$("#result").html(jsonStr.toString())
						cursor.continue();
					}
				};
			}

		} catch(e) {
			error("× " + e.message);
		}
	}

	var apiData = {
		title: SogreyIndexDB.helpName,
		version: SogreyIndexDB.version,
		jqueryVersion: SogreyIndexDB.jQueryVersion,
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
			}, {
				funName: "createDataBase(dbName,dbVersion)",
				desc: "创建数据库（第一次创建数据库或版本升级时更新表，表名和字段在DBData.db中配置）",
				params: [{
						paramName: "dbName",
						desc: "数据库名(可留空，默认为DBData.DBName的值)"
					},
					{
						paramName: "dbVersion",
						desc: "数据库版本号(可留空，默认为DBData.DBVersion的值)"
					}
				]
			},
			{
				funName: "initDB(tableName,model)",
				desc: "初始化数据库",
				params: [{
					paramName: "tableName",
					desc: "表名"
				}, {
					paramName: "model",
					desc: "读写模式（两种）：readwrite可读写，readonly只读"
				}]
			},
			{
				funName: "openDatabase(dbName)",
				desc: "打开数据库",
				params: [{
					paramName: "dbName",
					desc: "数据库名(可略，缺省默认DBData.DBName)"
				}]
			},
			{
				funName: "insert(tableName, dataObject)",
				desc: "插入数据",
				params: [{
						paramName: "tableName",
						desc: "表名"
					},
					{
						paramName: "dataObject",
						desc: "数据实体"
					}
				]
			},
			{
				funName: "insertList(tableName, dataObjectList)",
				desc: "插入数据集合",
				params: [{
						paramName: "tableName",
						desc: "表名"
					},
					{
						paramName: "dataObjectList",
						desc: "数据实体集合"
					}
				]
			},
			{
				funName: "delete(tableName, value)",
				desc: "删除数据",
				params: [{
						paramName: "tableName",
						desc: "表名"
					},
					{
						paramName: "keyPath",
						desc: "创建表的index索引值：keyPath"
					}
				]
			},
			{
				funName: "update(tableName, keyPath, dataObject)",
				desc: "更新数据",
				params: [{
						paramName: "tableName",
						desc: "表名"
					}, {
						paramName: "keyPath",
						desc: "创建表时index索引值：keyPath"
					},
					{
						paramName: "dataObject",
						desc: "更新的数据"
					}
				]
			},
			{
				funName: "queryByIndexAndValue(tableName, colIndex, colValue)",
				desc: "查询指定表 指定列指定列值的数据",
				params: [{
						paramName: "tableName",
						desc: "表名"
					},
					{
						paramName: "colIndex",
						desc: "列字段名(Index自动追加)"
					},
					{
						paramName: "colValue",
						desc: "列值"
					}
				]
			},
			{
				funName: "queryAll(tableName)",
				desc: "查询指定表所有数据",
				params: [{
					paramName: "tableName",
					desc: "表名"
				}]
			}
		]
	}

	var DBData = {
		DBName: "Bim5DApp",
		DBVersion: 1,
		db: [{
			tableName: "users", //表名
			keyPath: "userId",
			cols: "userId|userName" //字段列名
		}]
	}
	window.sogreyIndexDB = window.SogreyIndexDB = SogreyIndexDB;
})(window, jQuery);

//https://segmentfault.com/a/1190000007987481
//https://www.ibm.com/developerworks/cn/web/wa-indexeddb/
//http://blog.csdn.net/rdj_miss/article/details/51285097
//http://www.cnblogs.com/dolphinX/p/3415761.html
//http://www.cnblogs.com/dolphinX/p/3405335.html
//http://blog.csdn.net/wjb820728252/article/details/71246522?locationNum=6&fps=1
//3.4)利用索引加快查询速度index(‘name’) name字段必须在一开始添加字段的时候给它设置为索引，如下：
//
//objectStore.createIndex(“name”, “name”,{unique:false});