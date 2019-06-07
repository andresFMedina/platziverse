'use strict'

const setupDatabase = require('./lib/db');
const setupAgentModel = require('./models/agent');
const setupMetricModel = require('./models/metric');

module.exports = async function (config) {
    const sequelize = setupDatabase(config);
    const AgentModel = setupAgentModel(config);
    const MetricModel = setupMetricModel(config);

    AgentModel.hasMany(MetricModel);
    MetricModel.belongsTo(AgentModel);

    await sequelize.authenticate();

    if(config.setup){
        await sequelize.sync({force: true}) //force: true --> en caso de que la db exista la crea otra vez borrando todo        
    }

    //sequelize.sync();

    const Agent = {}
    const Metric = {}

    return {
        Agent,
        Metric
    }
}
