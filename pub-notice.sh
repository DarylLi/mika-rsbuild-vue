#!/bin/bash

set -e

# jenkins部署时才发上线通知，本地build prod时不触发
if [ ! $JENKINS_URL ];then
  exit 0
fi

echo -e '推送上线通知...'

pub_tag=$(git describe --tags)

pub_time=$(date "+%Y-%m-%d %H:%M:%S") 

git_comment=$(git tag -l -n $pub_tag)
git_comment_len=${#git_comment}
tag_len=${#pub_tag}
tag_len=$(($tag_len+1))

describe=${git_comment:$tag_len:$git_comment_len}

content="标题：上线通知\n项目：【FE】$npm_package_name-$npm_package_description\n版本：$pub_tag\n时间：$pub_time\n描述：$describe"

echo -e $content

# curl 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=043c3c5d-b7ab-473f-a2e1-5fb080731077' \
#   -H 'Content-Type: application/json' \
#   -d '{"msgtype": "text","text": {"content": "'"$content"'"}}'

# curl 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=03057ed6-3a09-4b8d-9f3a-de9c0fd289af' \
# -H 'Content-Type: application/json' \
# -d '{"msgtype": "text","text": {"content": "'"$content"'"}}'

exit 0
