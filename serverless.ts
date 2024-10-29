import type { AWS } from '@serverless/typescript';

import home from '@functions/home';
import find from '@functions/find';
import add from '@functions/add';
import auth from '@functions/auth';
import geo from '@functions/geo';
import homeBDUI from '@functions/home/v1';
import mail from '@functions/mail';
import types from '@functions/types';
import filter from '@functions/filter';

const serverlessConfiguration: AWS = {
  service: 'api-lambda-restaurants',
  frameworkVersion: '4',
  plugins: ['serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    profile: '${self:custom.profile.${opt:stage}}',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      MONGODB: '${self:custom.env.${opt:stage}.MONGODB_URL}',
      GOOGLE_KEY: '${self:custom.env.${opt:stage}.GOOGLE_KEY}',
      GOOGLE_API: '${self:custom.env.${opt:stage}.GOOGLE_API}',
      GOOGLE_GMAIL_PASS: '${self:custom.env.${opt:stage}.GOOGLE_GMAIL_PASS}',
      VERSION: '${self:custom.version}',
      STAGE: '${opt:stage}',
    },
    lambdaHashingVersion: '20201221',
  },

  functions: { home, find, add, auth, geo, homeBDUI, mail, types, filter },
  package: { individually: true },
  custom: {
    stage: '${opt:stage}',
    env: '${file(env.json)}',
    version: '2.0.0',
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    profile: {
      prod: 'YaListoApp',
      dev: 'YaListoApp',
    },
  },
};

module.exports = serverlessConfiguration;
