import 'reflect-metadata';

import {InversifyExpressServer} from "inversify-express-utils";
const express = require('express');

import './ioc/loader';
import { Container } from 'inversify';
import {groupService, IGroupService, IUserService, userService} from "./services";
import {TYPES} from "./constants/types";
import {groupRepository, IGroupRepository} from './data-access/groupRepository';
import {IUserRepository, userRepository} from "./data-access/userRepository";
import {methodLogger} from "./middlewares/methodLogger";
import {errorHandlers, logger} from "./middlewares/errorHandlers";

let container = new Container();
container.bind<IGroupService>(TYPES.IGroupService).to(groupService);
container.bind<IGroupRepository>(TYPES.IGroupRepository).to(groupRepository);
container.bind<IUserService>(TYPES.IUserService).to(userService);
container.bind<IUserRepository>(TYPES.IUserRepository).to(userRepository);

let server = new InversifyExpressServer(container);
server.setConfig((theApp) => {
    theApp.use(express.json());
    theApp.use(methodLogger);
    theApp.use(errorHandlers);
});

const app = server.build();
const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));

process.on('uncaughtException', (err, origin) => {
    logger.error(`Error in process.on uncaughtException: ` + err);
});

process.on('unhandledRejection', (err, origin) => {
    logger.error(`Error in process.on unhandledRejection: ` + err);
});

exports = module.exports = app;