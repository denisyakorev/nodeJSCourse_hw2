import {IGroupController, IUserController} from "../controllers";
import {IGroupService, IUserService} from "../services";
import {IGroupRepository} from "../data-access/groupRepository";
import {IUserRepository} from "../data-access/userRepository";

const TYPES = {
    IUserService: Symbol.for("IUserService"),
    IGroupService: Symbol.for("IGroupService"),
    IUserRepository: Symbol.for("IUserRepository"),
    IGroupRepository: Symbol.for("IGroupRepository"),
};

export { TYPES };