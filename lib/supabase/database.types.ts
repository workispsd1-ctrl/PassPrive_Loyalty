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
          category: string | null
          created_at: string
          id: string
          is_demo: boolean
          location: string | null
          location_limit: number | null
          logo_url: string | null
          name: string
          owner_id: string | null
          owner_name: string | null
          phone: string | null
          plan_id: string | null
          subscribed_at: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          is_demo?: boolean
          location?: string | null
          location_limit?: number | null
          logo_url?: string | null
          name: string
          owner_id?: string | null
          owner_name?: string | null
          phone?: string | null
          plan_id?: string | null
          subscribed_at?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          is_demo?: boolean
          location?: string | null
          location_limit?: number | null
          logo_url?: string | null
          name?: string
          owner_id?: string | null
          owner_name?: string | null
          phone?: string | null
          plan_id?: string | null
          subscribed_at?: string | null
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
          logo_emoji: string | null
          logo_url: string | null
        }
        Insert: {
          address?: string | null
          business_name: string
          card_id: string
          created_at?: string
          id?: string
          logo_emoji?: string | null
          logo_url?: string | null
        }
        Update: {
          address?: string | null
          business_name?: string
          card_id?: string
          created_at?: string
          id?: string
          logo_emoji?: string | null
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
      card_memberships: {
        Row: {
          business_id: string
          card_id: string
          id: string
          joined_at: string
          location_id: string | null
          member_id: string
          stamps_count: number
        }
        Insert: {
          business_id: string
          card_id: string
          id?: string
          joined_at?: string
          location_id?: string | null
          member_id: string
          stamps_count?: number
        }
        Update: {
          business_id?: string
          card_id?: string
          id?: string
          joined_at?: string
          location_id?: string | null
          member_id?: string
          stamps_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "card_memberships_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "card_memberships_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "stamp_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "card_memberships_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "card_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "card_memberships_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      reward_redemptions: {
        Row: {
          business_id: string
          card_id: string
          id: string
          member_id: string
          redeemed_at: string
          reward_id: string | null
        }
        Insert: {
          business_id: string
          card_id: string
          id?: string
          member_id: string
          redeemed_at?: string
          reward_id?: string | null
        }
        Update: {
          business_id?: string
          card_id?: string
          id?: string
          member_id?: string
          redeemed_at?: string
          reward_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reward_redemptions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reward_redemptions_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "stamp_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reward_redemptions_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reward_redemptions_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
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
      stamp_events: {
        Row: {
          business_id: string
          card_id: string
          created_at: string
          event_type: string
          id: string
          location_id: string | null
          member_id: string
          stamps: number
        }
        Insert: {
          business_id: string
          card_id: string
          created_at?: string
          event_type: string
          id?: string
          location_id?: string | null
          member_id: string
          stamps?: number
        }
        Update: {
          business_id?: string
          card_id?: string
          created_at?: string
          event_type?: string
          id?: string
          location_id?: string | null
          member_id?: string
          stamps?: number
        }
        Relationships: [
          {
            foreignKeyName: "stamp_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stamp_events_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "stamp_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stamp_events_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "card_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stamp_events_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_dashboard_monthly: {
        Args: { p_business_id: string; p_year: number }
        Returns: {
          month: number
          redemptions: number
          stamps: number
        }[]
      }
      get_dashboard_stats: {
        Args: { p_business_id: string }
        Returns: {
          joined_this_year: number
          redemptions_this_year: number
          stamps_this_year: number
          total_members: number
        }[]
      }
      register_business: {
        Args: {
          p_business_name: string
          p_category: string
          p_location: string
          p_owner_name: string
          p_phone: string
        }
        Returns: string
      }
      subscribe_business: {
        Args: { p_business_id: string; p_plan_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
