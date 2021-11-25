import {IGroupService, IUserService} from "../services";
import {GroupDAOInterface} from "../data-access/group";
import {UserDAOInterface} from "../data-access/user";

const TYPES = {
    IUserService: Symbol.for("IUserService"),
    IGroupService: Symbol.for("IGroupService"),
    IUserRepository: Symbol.for("IUserRepository"),
    IGroupRepository: Symbol.for("IGroupRepository"),
};

export { TYPES };