import { useQuery } from "@tanstack/react-query";
import {getTours} from "../api/tourApi"

export const useTours = (filters = {}) => {
    return useQuery({
        queryKey:["tours", filters],
        queryFn:() => getTours(filters),
    })
}