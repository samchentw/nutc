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

    error(){

    },

    confirm(text){
        return Swal.fire({
            title: '系統訊息',
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '確定',
            cancelButtonText:'取消'
          });
    }
    
}