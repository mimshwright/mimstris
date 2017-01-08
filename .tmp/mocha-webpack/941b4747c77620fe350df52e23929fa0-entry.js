
    var testsContext = require.context("../../src/test", false);

    var runnable = testsContext.keys();

    runnable.forEach(testsContext);
    