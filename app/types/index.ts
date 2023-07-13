import {Listing,User} from "@prisma/client"



export type safeListings = Omit<
    Listing,
    "createdAt"
> & {
    createAt:string;
}
export type SafeUser = Omit<
User,
"createdAt" | "updatedAt" | "emailVarified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVarified: string | null
}