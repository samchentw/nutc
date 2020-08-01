import Swal from 'sweetalert2'

export default{
    success(message){
        return Swal.fire({
            title: '系統訊息',
            text: message,
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: '確定'
            });
    },

    error(message){
        return Swal.fire({
            title: '系統訊息',
            text: message,
            icon: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: '確定'
        });
    },

    confirm(){
        
    }
    
}