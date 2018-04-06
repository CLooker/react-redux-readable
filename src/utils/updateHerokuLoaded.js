const updateHerokuLoaded = (herokuLoaded, cb) => !herokuLoaded && cb();

export default updateHerokuLoaded;
