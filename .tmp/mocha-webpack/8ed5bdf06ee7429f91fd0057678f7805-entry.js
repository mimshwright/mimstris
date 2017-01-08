
    var testsContext = require.context("../../test", false);

    var runnable = testsContext.keys();

    runnable.forEach(testsContext);
    