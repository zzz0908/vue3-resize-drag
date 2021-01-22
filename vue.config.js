
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'?"./":"/",
  pages: {
    index: {
      // page 的入口
      entry: 'src/demo/main.ts',
    },
  }
}
