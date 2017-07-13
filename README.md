

memcache在内存中缓存数据，减轻数据库压力。

注意事项：
--

memcache是非持久化存储，因此不能存储重要数据(断电或者重启之后，内存会被清空，造成数据丢失)。memcache对内存要求很高，所以尽量使用分布式存储。

memcache是key/value存储，不支持list，array等数据格式。(value不能再次拆分)

memcached是memcache的升级版
