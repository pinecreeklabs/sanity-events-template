export default $config({
  app(input) {
    return {
      name: 'sanity-events-mgmt',
      home: 'aws',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
    }
  },
  async run() {
    new sst.aws.StaticSite('Web', {
      build: {
        command: 'npm run build',
        output: 'dist',
      },
    })
  },
})
