

memcache在内存中缓存数据，减轻数据库压力。

注意事项：
--

memcache是非持久化存储，因此不能存储重要数据(断电或者重启之后，内存会被清空，造成数据丢失)。memcache对内存要求很高，所以尽量使用分布式存储。

memcache是key/value存储，不支持list，array等数据格式。(value不能再次拆分)

memcached是memcache的升级版

在mac下：brew install memcached之后，直接brew services start memcached启动memcached，如果加上参数-d是守护进程的方式。
参数-l指定IP地址，127.0.0.1。-p指定一个端口号，-m为它分配多少内存(可以先使用150)。

启动之后，可以通过ps -ef | grep  memcached查看进程，发现进程中有memcached。至此memcached的服务端安装就结束了。

接下来是客户端的安装：brew install libmemcached。安装php扩展下载地址为：http://pecl.php.net/package/memcache 。

/usr/local/Cellar/php56


