# 初始化
```
cnpm i -g bower
bower install
```
# 调试CSS
1. 添加工作目录
2. 建立文件映射
3. 编辑CSS文件或者使用样式面板修改样式
4. 保存CSS文件
# less调试
1. 使用npm安装lessc和wr工具
2. 使用lessc命令编译less文件
3. 调试器启动[重新加载生成的css]模式
4. 使用wr命令跟踪文件修改实时编译
```
cnpm i -g less
cnpm i -g wr
wr "lessc duang.less duang.css" duang.less
lessc --source-map duang.less duang.css
# 注释
```
# CSS vs LESS
CSS
* 原生支持，无需安装工具
* 可以直接用样式面板修改源码，实时保存
* 代码繁琐，可维护性差
less
* 代码简洁，可维护性好
* 需要工具支持
* 不可用样式面板直接修改 
详细配置查看简书[css调试奇技淫巧](https://www.jianshu.com/p/675eab418b02)
# 