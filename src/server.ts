import 'reflect-metadata';

import {InversifyExpressServer} from "inversify-express-utils";
const express = require('express');

import './ioc/loader';
import { Container } from 'inversify';

let container = new Container();
let server = new InversifyExpressServer(container);

server.setConfig((theApp) => {
    theApp.use(express.json());
});

const app = server.build();
const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));

exports = module.exports = app;