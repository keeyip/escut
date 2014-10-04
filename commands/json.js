module.exports = {
    about: {
        arguments: '',
        description: '',
        examples: [
        ]
    },
    run: run
};

function run(config) {
    return JSON.stringify(config.queryResults, null, 4)
}
