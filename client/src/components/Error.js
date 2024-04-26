

const Error = ({message}) => {
    return ( 
        <div className="alert alert-danger mt-10" role="alert">
        {message}
      </div>
       );
}
 
export default Error;