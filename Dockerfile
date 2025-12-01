# 1. 拿一个干净的 Node 环境
FROM node:20

# 2. 设个家目录
WORKDIR /app

# 3. 把 package.json 拿过来
COPY package*.json ./

# 4. 【关键】安装所有依赖 + 一个简单的网页服务器 (serve)
RUN npm install
RUN npm install -g serve

# 5. 把所有代码拿过来
COPY . .

# 6. 【关键】打包！把 React 代码变成浏览器能懂的 HTML/JS
# 之前这里报错是因为代码有问题，现在你代码修好了，这里一定能过！
RUN npm run build

# 7. 告诉服务器端口是 8080
ENV PORT=8080
EXPOSE 8080

# 8. 【关键】启动！
# 不用 vite 了，直接用 serve 运行打包好的 dist 文件夹
# -s: 单页应用模式 (防止刷新报错)
# -l 8080: 强制监听 8080 端口
CMD ["serve", "-s", "dist", "-l", "8080"]
