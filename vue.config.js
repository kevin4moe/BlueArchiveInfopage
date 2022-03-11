module.exports = {
  publicPath: "/",
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      const argumentos = args;
      argumentos[0].template = "./public/index.html";
      return argumentos;
    });
  },
};
