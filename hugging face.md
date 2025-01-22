```python

from huggingface_hub import HfApi
	 api = HfApi()
	 api.upload_file(
     path_or_fileobj="block-sorting-with-weight-train.zip",
     path_in_repo="block-sorting-with-weight-train.zip",
     repo_id="Tendourisu/block-sorting-with-weight-train",
     repo_type="dataset",
)

```


- hugging face 的连接解决方案：
```shell 
# 安装huggingface_hub包
pip install huggingface_hub
# 通过镜像站来登陆hf
HF_ENDPOINT=https://hf-mirror.com huggingface-cli login
# 输入你的令牌token（从hf的网站上获取）
# 如果想避免重复认证，可以使用git config --global credential.helper store开启git辅助验证助手并在
# Add token as git credential? (Y/n)时选择y

然后推送你想推送的文件：HF_ENDPOINT=https://hf-mirror.com huggingface-cli upload Tendourisu/block-sorting-with-weight-train block-sorting-with-weight-train.zip
```