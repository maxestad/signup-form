module.exports = {
  '*.ts': ['eslint --fix', 'prettier --write --ignore-unknown'],
  '*.html': 'prettier --write --ignore-unknown',
  '*.scss': 'prettier --write --ignore-unknown',
};
