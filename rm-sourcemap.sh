#!/bin/bash

set -e

find ./dist/static/js -name "*.js.map" | xargs rm -rf
# 删除build中直接copy过来的html
find ./dist -name "index.html" | xargs rm -rf

if [ $? -eq 0 ]; then
  echo -e '\033[32msource map 删除完成. \033[0m'
else
  echo -e "\033[31msource map 删除失败！\033[0m"
  exit 1
fi

exit 0
