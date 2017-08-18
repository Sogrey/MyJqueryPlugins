# MyJqueryPlugins
我的jquery插件


> 欢迎使用
>
>获取帮助,键入   SogreyXXX.help()  其中SogreyXXX是你要查看的js全局变量名

### SogreyCommon APIs

	版本号：1.0.0
	依赖jquery版本：3.0.0
	其他依赖JS：
	    暂无其他依赖。
	
	成员变量:
	
	[1] isDebug - boolean ; true输出日志，false则不.正式发布时改为false
	
	成员函数:
	
	[1] _h(apiData) - js插件版本信息、字段、方法api帮助信息展示，使用JS插件全局变量名+.help()方法调用即可查询该js信息，例如本js可使用  SogreyCommon.help() ，当然前提是js插件是按照固定的方式配置了api信息，外部js无需调用本方法;  参数：apiData-api配置
	[2] trim(s) - 去除字符串的首尾的空格;  参数：s-输入的字符串
	[3] isEmpty(s) - 判断字符串是否为空，返回true说明为空;  参数：s-输入的字符串
	[4] log(object) - log日志输出;  参数：object-object对象，可以是字符串
	[5] error(object) - error日志输出;  参数：object-object对象，可以是字符串
	[6] toast(msg) - 吐司Toast,默认持续一秒钟;  参数：msg-要展示的信息文本
	[7] toastWidthDuration(msg, duration) - 吐司Toast;  参数：msg-要展示的信息文本,duration-持续展示时间，单位豪秒
	
	【pattern】 - 正则表达式匹配
	[1] isMatched(pattern, str) - 是否匹配;  参数：pattern-匹配规则,str-要匹配的字符串
	
	【Request】 - 获取参数
	[1] GetQueryString(key) - 获取当前页参数，地址栏地址?后面的 key=value,结果返回value;  参数：key-参数名key

### SogreyIndexDB APIs

	版本号：1.0.0
	依赖jquery版本：2.1.0
	其他依赖JS：
	[1]jquery-sogrey-common.js  版本号：1.0.0
	
	成员变量:
	
	    暂无成员变量。
	
	
	成员函数:
	
	[1] log(object) - log日志输出;  参数：object-object对象，可以是字符串
	[2] error(object) - error日志输出;  参数：object-object对象，可以是字符串
	[3] createDataBase(dbName,dbVersion) - 创建数据库（第一次创建数据库或版本升级时更新表，表名和字段在DBData.db中配置）;  参数：dbName-数据库名(可留空，默认为DBData.DBName的值),dbVersion-数据库版本号(可留空，默认为DBData.DBVersion的值)
	[4] initDB(tableName,model) - 初始化数据库;  参数：tableName-表名,model-读写模式（两种）：readwrite可读写，readonly只读
	[5] openDatabase(dbName) - 打开数据库;  参数：dbName-数据库名(可略，缺省默认DBData.DBName)
	[6] insert(tableName, dataObject) - 插入数据;  参数：tableName-表名,dataObject-数据实体
	[7] insertList(tableName, dataObjectList) - 插入数据集合;  参数：tableName-表名,dataObjectList-数据实体集合
	[8] delete(tableName, value) - 删除数据;  参数：tableName-表名,keyPath-创建表的index索引值：keyPath
	[9] update(tableName, keyPath, dataObject) - 更新数据;  参数：tableName-表名,keyPath-创建表时index索引值：keyPath,dataObject-更新的数据
	[10] queryByIndexAndValue(tableName, colIndex, colValue) - 查询指定表 指定列指定列值的数据;  参数：tableName-表名,colIndex-列字段名(Index自动追加),colValue-列值
	[11] queryAll(tableName) - 查询指定表所有数据;  参数：tableName-表名




### SogreyWebsql APIs



	版本号：1.0.0
	依赖jquery版本：3.0.0
	其他依赖JS：
	[1]jquery-sogrey-common.js  版本号：1.0.0
	
	成员变量:
	
	    暂无成员变量。
	
	
	成员函数:
	
	[1] log(object) - log日志输出;  参数：object-object对象，可以是字符串
	[2] error(object) - error日志输出;  参数：object-object对象，可以是字符串
	[3] SogreyWebsql.openDatabase(dbName, dbVersion, desc, size,callback) - 打开数据库，不存在则创建;  参数：dbName-数据库名,dbVersion-数据库版本号,desc-描述,size-数据库大小,callback-[可选]创建回调会在创建数据库后被调用
	[4] SogreyWebsql.openDatabaseWithDBData() - 使用配置打开数据库，不存在则创建;  参数：无
	[5] SogreyWebsql.openDatabaseWithDBDataCallback(callback) - 打开数据库，不存在则创建，带回调;  参数：callback-创建回调会在创建数据库后被调用
	[6] SogreyWebsql.createTableWithDBData() - 创建表,需配置DBData.db字段;  参数：无
	[7] SogreyWebsql.createTableWithDBDataCallback(callback) - 创建表,需配置DBData.db字段;  参数：callback-创建回调会在创建表后被调用
	[8] SogreyWebsql.insrert(tableName, dataMap) - 向表tableName中插入数据;  参数：tableName-表名,dataMap-要插入的数据；dataMap是个map,定义参考 ：
	                   var key = '动态key';
	                   var map = {};
	                   map[key1] = 'value';
	[9] SogreyWebsql.delete(tableName, whereArg, whereValue) - 删除tableName中数据;  参数：tableName-表名,whereArg-删除条件；例如 'id=? and name=?' ,whereValue-删除条件中替换?的值('|'分割);例如 '1|李雷' 
	[10] SogreyWebsql.deleteAll(tableName) - 删除tableName中全部数据;  参数：tableName-表名
	[11] SogreyWebsql.update(tableName, setArg, whereArg, whereValue) - 更新tableName中数据;  参数：tableName-表名,setArg-要更新的新数据；例如 'name=?' ,whereArg-要更新的条件；例如 'id=?' ,whereValue-前两个参数中替换?的值('|'分割);例如 '李雷|1' 
	[12] SogreyWebsql.query(tableName, whereArg, whereValue) - 查询tableName中数据;  参数：tableName-表名,whereArg-查询条件；例如 'id=? and name=?' ,whereValue-查询条件中中替换?的值('|'分割);例如 '李雷|1' 


### SogreyCookie APIs

	版本号：1.0.0
	
	其他依赖JS：
	[1]jquery-sogrey-common.js  版本号：1.0.0
	
	成员变量:
	
	    暂无成员变量。
	
	
	成员函数:
	
	[1] log(object) - log日志输出;  参数：object-object对象，可以是字符串
	[2] error(object) - error日志输出;  参数：object-object对象，可以是字符串
	[3] SogreyCookie.setCookie(key, value) - 设置cookie;  参数：key-cookie 的key,value-cookie 的值
	[4] SogreyCookie.setCookies(keys, values) - 设置多个cookie;  参数：keys-cookie 的key ,多个key以“|”分隔，例如key：id|name,values-cookie 的值 ,多个值以“|”分隔,且个数与key须一致，例如对应前面keys 对应value：1|李雷
	[5] SogreyCookie.getCookie(key) - 读取cookie，不存在则返回null;  参数：key-cookie 的key
	[6] SogreyCookie.getCookie(key) - 删除cookie;  参数：key-cookie 的key