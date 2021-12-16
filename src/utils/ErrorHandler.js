const ErrorHandler = (error) => {
    let message = ""
    if(error!== undefined && error!==null){
        if(error.response!== undefined && error.response!==null){
            let data = error.response.data.message;
            if(data.non_field_errors!== undefined && data.non_field_errors!==null){
                message = data.non_field_errors;
            }
            else if(data.phone!== undefined && data.phone!==null){
                message = data.phone;
            }
            
            else if(data.password!== undefined && data.password!==null){
                message = data.phone;
            }
            else if(data.otp!== undefined && data.otp!==null){
                message = data.otp;
            }
            else{
                message = "Please try after sometime";
            }
             
        }else{
            message = "Please try after sometime";
        }

    }else{
       message="Please try after sometime";
    }

    return message;
}

export default ErrorHandler;