import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

interface INotification {
    color: 'success' | 'danger' | 'warning' | 'info' | '';
    message: string;
    onToastEnd: () => void;
}

const Notification = ({color, message, onToastEnd}: INotification) => {

    const showToast = async () => {
        const toast = Swal.mixin({
            toast: true,
            position: 'bottom-start',
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
            customClass: {
                popup: `color-${color}`,
            },
            didClose: () => {
                onToastEnd(); // Chama o callback quando o toast fechar
            },
        });
        toast.fire({
            title: message,
        });
    };

    useEffect(() => {
        if (message == '' || color == ""){
            return
        }
        showToast();
    }, [color, message, onToastEnd]);

    return null;
}

export default Notification;
