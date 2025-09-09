#!/bin/bash

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# compare node.js version
version_compare() {
    local version1=$1
    local version2=$2
    
    IFS='.' read -ra ver1_arr <<< "$version1"
    IFS='.' read -ra ver2_arr <<< "$version2"
    
    local max_len=$((${#ver1_arr[@]} > ${#ver2_arr[@]} ? ${#ver1_arr[@]} : ${#ver2_arr[@]}))
    
    for ((i=0; i<max_len; i++)); do
        local v1=${ver1_arr[i]:-0}
        local v2=${ver2_arr[i]:-0}
        
        if ((v1 > v2)); then
            return 1  # version1 > version2
        elif ((v1 < v2)); then
            return 2  # version1 < version2
        fi
    done
    return 0  # version1 == version2
}

if ! command -v node &> /dev/null; then
    echo -e "${RED}error: Node.js does not exist${NC}"
    exit 1
fi

current_version=$(node -v | sed 's/v//')
required_version="22.12.0"

version_compare "$current_version" "$required_version"
result=$?

if [ $result -eq 2 ]; then
    echo -e "${RED}❌ Node.js version is too low${NC}"
    echo -e "${YELLOW}v${required_version} or higher is required${NC}"
    exit 1
fi

# 查找npm run dev进程（更精确的匹配）
dev_pids=$(ps aux | grep -E "npm.*run.*dev|node.*dev" | grep -v grep | awk '{print $2}')

if [ -n "$dev_pids" ]; then
    for pid in $dev_pids; do
        echo -e "${YELLOW}terminating PID: $pid${NC}"
        kill -TERM "$pid" 2>/dev/null
    done
    sleep 2
fi

echo -e "${GREEN}running server...${NC}"
npm run dev
sleep 3