import { IGroupRepository } from ".";

// TODO
export class GroupPSQLRepository implements IGroupRepository {
    private static repository?: IGroupRepository
    public static createRepository = () => {
        if (!GroupPSQLRepository.repository) {
            GroupPSQLRepository.repository = new GroupPSQLRepository();
        }
        return GroupPSQLRepository.repository as IGroupRepository;
    }
};