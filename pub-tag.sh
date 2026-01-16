#!/bin/bash

set -e

echo -e '\033[32mcreate tag start... \033[0m'

# step1. 检测当前分支是否是master分支
current_branch=$(git symbolic-ref --short -q HEAD)
if [[ "$current_branch" != 'master' ]];then
  echo -e '\033[31m当前分支不是master！\033[0m'
  exit 1
fi

# step2. 判断是否有代码未提交
git_status=$(git status)
if [[ "$git_status" =~ "nothing to commit" && "$git_status" =~ "Your branch is up to date with" ]];then
  git pull
elif [[ "$git_status" =~ "nothing to commit" && "$git_status" =~ "Your branch is behind" ]];then
  git pull
else
  echo -e '\033[31m你有代码尚未提交!\033[0m'
  exit 1
fi

# step3. 判断tag是否存在
git fetch --tags

new_tag='v'$(date '+%Y%m%d%H%M%S')

if git rev-parse "$new_tag" >/dev/null 2>&1;then
  echo -e "\033[31m$new_tag已经存在!\033[0m"
  exit 1
fi

# step4. 创建新的tag
while [ -z "$REPLY" ]
do
  read -e -p "Please input commit message: "
done
git tag -a "$new_tag" -m "$REPLY"
git push origin "$new_tag"
echo "new tag: $new_tag"

echo -e '\033[32mcreate tag end. \033[0m'

exit 0

