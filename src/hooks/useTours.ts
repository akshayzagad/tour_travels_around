import { useQuery } from "@tanstack/react-query";
import {getTour, getTours} from "../api/tourApi"
import type { Tour } from "../../types/tour";

type TourWithBooking = Tour & { hasBooked: boolean };

export const useTours = (filters = {}) => {
    return useQuery({
        queryKey:["tours", filters],
        queryFn:() => getTours(filters),
    })
}

export const useTour = (id:string) =>{
return useQuery<TourWithBooking>({
    queryKey:["tour", "details", id],
    queryFn:() => getTour(id),
    enabled: !!id,
})
}
