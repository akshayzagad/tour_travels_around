import { useQuery } from "@tanstack/react-query";
import {getTour, getTours} from "../api/tourApi"

export const useTours = (filters = {}) => {
    return useQuery({
        queryKey:["tours", filters],
        queryFn:() => getTours(filters),
    })
}

export const useTour = (id:string) =>{
return useQuery({
    queryKey:["tour", "details", id],
    queryFn:() => getTour(id),
    enabled: !!id,
})
}
