export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      businesses: {
        Row: {
          created_at: string
          id: string
          name: string
          owner_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          owner_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          owner_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      card_locations: {
        Row: {
          address: string | null
          business_name: string
          card_id: string
          created_at: string
          id: string
          logo_url: string | null
        }
        Insert: {
          address?: string | null
          business_name: string
          card_id: string
          created_at?: string
          id?: string
          logo_url?: string | null
        }
        Update: {
          address?: string | null
          business_name?: string
          card_id?: string
          created_at?: string
          id?: string
          logo_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "card_locations_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "stamp_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      rewards: {
        Row: {
          card_id: string
          created_at: string
          expiry: boolean
          expiry_days: number | null
          id: string
          name: string
          stamps: number
          type: string
        }
        Insert: {
          card_id: string
          created_at?: string
          expiry?: boolean
          expiry_days?: number | null
          id?: string
          name: string
          stamps?: number
          type: string
        }
        Update: {
          card_id?: string
          created_at?: string
          expiry?: boolean
          expiry_days?: number | null
          id?: string
          name?: string
          stamps?: number
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "rewards_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "stamp_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      stamp_cards: {
        Row: {
          bg_color: string
          business_id: string
          business_name: string | null
          created_at: string
          description: string | null
          id: string
          max_stamps_per_visit: number | null
          multi_stamping: boolean
          name: string
          published: boolean
          qr_color: string
          qr_image_url: string | null
          qr_token: string
          qr_url: string | null
          review_link: boolean
          review_url: string | null
          stamp_icon: string | null
          stamp_icon_url: string | null
          stamping_delay: boolean
          stamping_delay_unit: string | null
          stamping_delay_value: number | null
          stamps_required: number
          style_template: string
          terms: string | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          bg_color?: string
          business_id: string
          business_name?: string | null
          created_at?: string
          description?: string | null
          id?: string
          max_stamps_per_visit?: number | null
          multi_stamping?: boolean
          name: string
          published?: boolean
          qr_color?: string
          qr_image_url?: string | null
          qr_token?: string
          qr_url?: string | null
          review_link?: boolean
          review_url?: string | null
          stamp_icon?: string | null
          stamp_icon_url?: string | null
          stamping_delay?: boolean
          stamping_delay_unit?: string | null
          stamping_delay_value?: number | null
          stamps_required?: number
          style_template?: string
          terms?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          bg_color?: string
          business_id?: string
          business_name?: string | null
          created_at?: string
          description?: string | null
          id?: string
          max_stamps_per_visit?: number | null
          multi_stamping?: boolean
          name?: string
          published?: boolean
          qr_color?: string
          qr_image_url?: string | null
          qr_token?: string
          qr_url?: string | null
          review_link?: boolean
          review_url?: string | null
          stamp_icon?: string | null
          stamp_icon_url?: string | null
          stamping_delay?: boolean
          stamping_delay_unit?: string | null
          stamping_delay_value?: number | null
          stamps_required?: number
          style_template?: string
          terms?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stamp_cards_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
