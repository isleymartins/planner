export interface Trip {
    id: string
    destination: string
    starts_at: string
    ends_at: string
    emails_to_invite: Participant[]
    owner_email: string
}
export interface Activities {
    _id: string
    tripId: string
    date: string
    activities: Activity[]
}
export interface Activity {
    _id: string
    title: string
    occurs_at: string
    description: string
}
export interface Participant {
    // user: string;
    email: string;
    is_confirmed: boolean;
}
export interface User {
    user: string;
    email: string;
}