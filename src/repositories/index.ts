import UserEntity from '../entities/User';
import BoardEntity from '../entities/Board';
import ColumnEntity from '../entities/Column';
import TaskEntity from '../entities/Task';


export const userRepository = () => {
    return UserEntity;
}

export const boardRepository = () => {
    return BoardEntity;
}

export const columnRepository = () => {
    return ColumnEntity;
}

export const taskRepository = () => {
    return TaskEntity;
}