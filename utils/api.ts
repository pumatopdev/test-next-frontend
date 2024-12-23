import axios, {isAxiosError} from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/tasks",
});

const handleError = (err: any): {
  success: false,
  message: string
} => {
  if (isAxiosError(err)) {
    if (err.response) {
      return {
        success: false,
        message: err.response.data.message
      }
    }
    if (err.request) {
      return {
        success: false,
        message: err.request.data.message
      }
    }
  }
  return {
    success: false,
    message: err
  }
}

export const getTasks = async() => {
  try {
    const response = await api.get("/");
    if(response.data.success){
      return { success:true, data: response.data.data };
    }
    else {
      return { success:false, message: response.data.message };
    }
  } catch (error) {
    return handleError(error);
  }
}

export const createTasks = async(task:{title: string; color: string}) => {
  try {
    const response = await api.post("/createTasks", task);
    if(response.data.success){
      return { success:true, data: response.data.data };
    }
    else {
      return { success:false, message: response.data.message };
    }
  } catch (error) {
    return handleError(error);
  }
}

export const updateTasks = async(task: { id: string; title: string; color: string; }) => {
  try {
    const response = await api.put(`/updateTasks/${task.id}`, task);
    if(response.data.success){
      return { success:true, data: response.data.data };
    }
    else {
      return { success:false, message: response.data.message };
    }
  } catch (error) {
    return handleError(error);
  }
}

export const deleteTasks = async(id:string) => {
  try {
    const response = await api.delete(`/deleteTasks/${id}`);
    if(response.data.success){
      return { success:true};
    }
    else {
      return { success:false, message: response.data.message };
    }
  } catch (error) {
    return handleError(error);
  }
}
