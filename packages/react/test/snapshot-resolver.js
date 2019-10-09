module.exports = {
    resolveSnapshotPath: (testPath, snapshotExtension) => `${testPath}${snapshotExtension}`,
    
    resolveTestPath: (snapshotFilePath, snapshotExtension) =>
        snapshotFilePath.replace(snapshotExtension, ''),

    testPathForConsistencyCheck: '../../src/components/button/button.test.tsx',
};
