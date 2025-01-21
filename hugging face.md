```python

from huggingface_hub import HfApi
>>> api = HfApi()
>>> api.upload_file(
...     path_or_fileobj="block-sorting-with-weight-train.zip",
...     path_in_repo="block-sorting-with-weight-train.zip",
...     repo_id="Tendourisu/block-sorting-with-weight-train.",
...     repo_type="dataset",
... )

```