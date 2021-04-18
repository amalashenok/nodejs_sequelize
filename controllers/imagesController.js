exports.upload = (req, res, next) => {
  const { files } = req;

  if (!files)
    res.status(500).json({
      message: 'Произошла ошибка при загрузке изображений',
    });
  else
    res.status(201).json({
      message: 'Файлы загружены',
      data: files,
    });
};
