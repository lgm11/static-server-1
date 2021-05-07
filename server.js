var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

  
    response.statusCode = 200
    const filePath = path === '/' ? '/index.html' : path//把路径赋值给x,例如8888/index.html中的/index.html就是path.并且判断当用户访问/根目录的时候直接返回index.html
    const index = filePath.lastIndexOf('.')//把路径中.的位置下标找出来
    const suffix = filePath.substring(index)//把.以及后面的子字符串取出
    const fileTypes = {
        '.html':'text/html',
        '.css':'text/css',
        '.js':'text/javascript',
        '.pnd':'image/png',
        '.jpg':'image/jpeg'
    }//用一个哈希表代替if else判断
    response.setHeader('Content-Type', `${fileTypes[suffix] || 'text/html'};charset=utf-8`)//把后缀取到并在哈希表对应再取出。然后设置一个兜底。当用户输入的文件类型不是我们以上设置的，就默认为html
    let content 
    try {
        content = fs.readFileSync(`./public${filePath}`)
    } catch (error) {
        content = '文件不存在'
        response.statusCode = 404
    }
    response.write(content)
    response.end()
  

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
