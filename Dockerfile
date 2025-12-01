# 1. 使用 Node 环境
FROM node:20

# 2. 设置工作目录
WORKDIR /app

# 3. 复制依赖文件
COPY package*.json ./

# 4. 安装依赖 (这次我们连 serve 工具一起装)
RUN npm install
RUN npm install -g serve

# 5. 复制所有代码
COPY . .

# 6. 【关键一步】执行打包！
# 这会把你的 TS/React 代码编译成浏览器能看懂的 HTML/JS
RUN npm run build

# 7. 暴露端口
ENV PORT=8080
EXPOSE 8080

# 8. 【关键一步】启动生产服务
# 不再用 vite dev，而是用 serve 来运行打包好的 dist 文件夹
CMD ["serve", "-s", "dist", "-l", "8080"]
