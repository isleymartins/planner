export interface Trip {
    id: string
    destination: string
    starts_at: string
    ends_at: string
    emails_to_invite: String[]
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