import {notification} from 'antd';

export const showSuccessNotification = (type, description) => {
    notification[type]({
        message: 'Успешно',
        description: description
    });
};

export const showErrorNotification = (type, description) => {
    notification[type]({
        message: 'Ошибка',
        description: description
    });
};