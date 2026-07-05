import { useQuery } from "@tanstack/react-query";
import {getTours} from "../api/tourApi"

export const useTours = () => {
    return useQuery({
        queryKey:["tours"],
        queryFn:getTours
    })
}