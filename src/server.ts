import 'reflect-metadata';

import {InversifyExpressServer} from "inversify-express-utils";
const express = require('express');
import { Container } from 'inversify';

import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import './ioc/loader';
import {groupService, IGroupService, IJwtService, IUserService, jwtService, userService} from "./services";
import {TYPES} from "./constants/types";
import {GroupDAO, GroupDAOInterface} from './data-access/group';
import {UserDAOInterface, UserDAO} from "./data-access/user";
import {methodLogger} from "./middlewares/methodLogger";
import {errorHandlers, logger} from "./middlewares/errorHandlers";


let container = new Container();
container.bind<IGroupService>(TYPES.IGroupService).to(groupService);
container.bind<GroupDAOInterface>(TYPES.IGroupRepository).to(GroupDAO);
container.bind<IUserService>(TYPES.IUserService).to(userService);
container.bind<UserDAOInterface>(TYPES.IUserRepository).to(UserDAO);
container.bind<IJwtService>(TYPES.IJwtService).to(jwtService);

let server = new InversifyExpressServer(container);
server.setConfig((theApp) => {
    theApp.use(cors());
    theApp.use(express.json());
    theApp.use(methodLogger);
});

const app = server.build();
const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));

app.use(errorHandlers);

process.on('uncaughtException', (err, origin) => {
    logger.error(`Error in process.on uncaughtException: ` + err);
});

process.on('unhandledRejection', (err, origin) => {
    logger.error(`Error in process.on unhandledRejection: ` + err);
});

exports = module.exports = app;