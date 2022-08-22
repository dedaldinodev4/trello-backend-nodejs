import UserEntity from '../entities/User';
import BoardEntity from '../entities/Board';


export const userRepository = () => {
    return UserEntity;
}

export const boardRepository = () => {
    return BoardEntity;
}