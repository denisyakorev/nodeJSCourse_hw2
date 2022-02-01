import {IGroupService, IUserService, IJwtService} from "../services";

const TYPES = {
    IUserService: Symbol.for("IUserService"),
    IGroupService: Symbol.for("IGroupService"),
    IJwtService: Symbol.for("IJwtService"),
    IUserRepository: Symbol.for("IUserRepository"),
    IGroupRepository: Symbol.for("IGroupRepository"),
};

export { TYPES };