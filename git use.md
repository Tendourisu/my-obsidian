#git 

1. 切换到main分支： git checkout main
    
2. 获取上游仓库最新代码： git fetch upstream
    
3. 将本地main分支重置为上游仓库状态： git reset --hard upstream/main
    
4. 强制推送更新到origin远程仓库： git push --force origin main
    
5. 切换到some-changes分支： git checkout some-changes
    
6. 将some-changes分支基于最新的main分支： git rebase main
    
7. 解决可能出现的冲突（如果有）
    
8. 推送更新后的some-changes分支： git push --force origin some-changes


$\frac{1}{n}a_{n+1} = a_n^2+2n$