export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          name: string
          stripe_customer_id: string | null
          subscription_status: string | null
          trial_end: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          stripe_customer_id?: string | null
          subscription_status?: string | null
          trial_end?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          stripe_customer_id?: string | null
          subscription_status?: string | null
          trial_end?: string | null
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          org_id: string | null
          full_name: string | null
        }
        Insert: {
          id: string
          org_id?: string | null
          full_name?: string | null
        }
        Update: {
          id?: string
          org_id?: string | null
          full_name?: string | null
        }
      }
      staff: {
        Row: {
          id: string
          org_id: string
          name: string
          email: string | null
          phone: string | null
          color: string
          created_at: string
        }
        Insert: {
          id?: string
          org_id: string
          name: string
          email?: string | null
          phone?: string | null
          color: string
          created_at?: string
        }
        Update: {
          id?: string
          org_id?: string
          name?: string
          email?: string | null
          phone?: string | null
          color?: string
          created_at?: string
        }
      }
      shifts: {
        Row: {
          id: string
          org_id: string
          staff_id: string
          day_of_week: number
          start_time: string
          end_time: string
          week_start: string
          created_at: string
        }
        Insert: {
          id?: string
          org_id: string
          staff_id: string
          day_of_week: number
          start_time: string
          end_time: string
          week_start: string
          created_at?: string
        }
        Update: {
          id?: string
          org_id?: string
          staff_id?: string
          day_of_week?: number
          start_time?: string
          end_time?: string
          week_start?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
