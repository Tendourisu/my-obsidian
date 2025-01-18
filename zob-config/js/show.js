// 定义视图逻辑
module.exports = async (dv, { files, kwd, showHead, tars, obsidian, scale, li }) => {
  // 处理传入的文件列表
  const processedFiles = files.map(p => {
    const content = tars ? dv.page(p.file.path)[tars] : p.file.content;
    return {
      file: p.file,
      content,
    };
  });

  // 渲染输出
  return dv.list(
    processedFiles.map(({ file, content }) => {
      return li([file, content]);
    })
  );
};