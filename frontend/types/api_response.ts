
export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number,
    public errors?: Record<string, string>
  ) {
    super(message);
  }
}


export interface ApiResponse<T>{
    success:boolean
    message:string
    data?:T
    errors?:Record<string,string>
    meta?:any
}

