module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/users");
    const wikiRoutes = require("../routes/wikis");
    const upgradeRoutes = require("../routes/upgrade")
  app.use(staticRoutes);
  app.use(userRoutes);
  app.use(wikiRoutes);
  app.use(upgradeRoutes)
  }
}
