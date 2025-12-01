# 1. 使用 Node 环境
FROM node:20

# 2. 设置工作目录
WORKDIR /app

# 3. 复制依赖
COPY package*.json ./

# 4. 【关键】强制安装所有依赖 (包括 Vite)
RUN npm install

# 5. 复制代码
COPY . .

# 6. 设置端口
ENV PORT=8080

# 7. 【关键】改回用 Vite 直接启动
# 既然你已经修好了 allowedHosts，这个命令现在就是最好用的！
CMD ["npx", "vite", "--host", "0.0.0.0", "--port", "8080"]
