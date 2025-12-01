# 1. 使用 Node 环境
FROM node:20

# 2. 设置工作目录
WORKDIR /app

# 3. 复制依赖描述文件
COPY package*.json ./

# 4. 【核心】强制安装所有软件（包括 Vite 和 TypeScript）
# Cloud Run 默认不装这些，所以我们要强制它装！
RUN npm install

# 5. 复制剩下的代码
COPY . .

# 6. 设置端口变量
ENV PORT=8080

# 7. 启动命令：强制开启 8080 端口，不走 package.json 那些弯路
CMD ["npx", "vite", "--host", "0.0.0.0", "--port", "8080"]
