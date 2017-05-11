/*eslint-disable */
const path = require("path");

const config = {

    // ----------------------------------
    // Project Structure
    // ----------------------------------
    path_base  :  path.resolve(__dirname),
    dir_client :  "src",
    dir_dist   :  "dist",
    dir_server :  "server",

    // ----------------------------------
    // Compiler Configuration
    // ----------------------------------
    compiler_hash_type       :  "hash",
    compiler_public_path     :  "/",
    compiler_stats           :  {
        chunks : false,
        chunkModules : false,
        colors : true
    },
    compiler_vendors  :  [
        "react",
        "react-dom",
        "react-redux",
        "react-router",
        "react-router-redux",
        "redux",
    ],
};

// ------------------------------------
// Utilities
// ------------------------------------
function base () {
    const args = [config.path_base].concat([].slice.call(arguments))
    return path.resolve.apply(path, args);
}

config.paths = {
    base   : base,
    client : base.bind(null, config.dir_client),
    dist   : base.bind(null, config.dir_dist),
};

module.exports = config;
