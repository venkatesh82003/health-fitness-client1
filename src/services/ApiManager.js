class ApiManager{
    static GetApiCall=async (url)=>{
        return await fetch(url,{
          method:'GET',
          headers:{
            'Authorization':`Bearer ${localStorage.getItem('authtoken')}`
          }
        });
    };
    static PostApiCall=async (url,b)=>{
        return await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${localStorage.getItem('authtoken')}`,
            },
            body:JSON.stringify(b)
        });
    };
    static PutApiCall=async (url,b)=>{
        return await fetch(url,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${localStorage.getItem('authtoken')}`,
            },
            body:JSON.stringify(b)
        });
    };
    static DeleteApiCall=async (url)=>{
        return await fetch(url,{
            method:'DELETE',
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('authtoken')}`
            }
        });
    }
}
export {ApiManager};