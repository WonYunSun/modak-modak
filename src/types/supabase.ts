export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      chat_room_members: {
        Row: {
          chat_room_id: string;
          group_id: string;
          id: string;
          is_joined: boolean;
          user_id: string;
        };
        Insert: {
          chat_room_id: string;
          group_id: string;
          id?: string;
          is_joined?: boolean;
          user_id: string;
        };
        Update: {
          chat_room_id?: string;
          group_id?: string;
          id?: string;
          is_joined?: boolean;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'chat_room_members_chat_room_id_fkey';
            columns: ['chat_room_id'];
            isOneToOne: false;
            referencedRelation: 'chat_rooms';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_room_members_group_id_fkey';
            columns: ['group_id'];
            isOneToOne: false;
            referencedRelation: 'groups';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_room_members_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      chat_rooms: {
        Row: {
          created_at: string;
          group_id: string;
          id: string;
          image_url: string;
          name: string;
        };
        Insert: {
          created_at?: string;
          group_id: string;
          id?: string;
          image_url?: string;
          name?: string;
        };
        Update: {
          created_at?: string;
          group_id?: string;
          id?: string;
          image_url?: string;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'chat_rooms_group_id_fkey';
            columns: ['group_id'];
            isOneToOne: false;
            referencedRelation: 'groups';
            referencedColumns: ['id'];
          },
        ];
      };
      comments: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          post_id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          post_id: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          post_id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'comments_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'comments_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      group_members: {
        Row: {
          created_at: string;
          group_id: string;
          id: string;
          is_approved: boolean;
          is_leader: boolean;
          receive_notifications: boolean;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          group_id: string;
          id?: string;
          is_approved?: boolean;
          is_leader?: boolean;
          receive_notifications?: boolean;
          user_id: string;
        };
        Update: {
          created_at?: string;
          group_id?: string;
          id?: string;
          is_approved?: boolean;
          is_leader?: boolean;
          receive_notifications?: boolean;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: '\bgroup_members_group_id_fkey';
            columns: ['group_id'];
            isOneToOne: false;
            referencedRelation: 'groups';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: '\bgroup_members_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      groups: {
        Row: {
          created_at: string;
          description: string;
          id: string;
          image_url: string;
          name: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          id?: string;
          image_url: string;
          name: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: string;
          image_url?: string;
          name?: string;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          chat_room_id: string;
          created_at: string;
          id: string;
          message: string;
          read_by: string[] | null;
          unread_count: number;
          user_id: string;
        };
        Insert: {
          chat_room_id?: string;
          created_at?: string;
          id?: string;
          message?: string;
          read_by?: string[] | null;
          unread_count?: number;
          user_id?: string;
        };
        Update: {
          chat_room_id?: string;
          created_at?: string;
          id?: string;
          message?: string;
          read_by?: string[] | null;
          unread_count?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'messages_chat_room_id_fkey';
            columns: ['chat_room_id'];
            isOneToOne: false;
            referencedRelation: 'chat_rooms';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'messages_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      post_images: {
        Row: {
          created_at: string;
          id: string;
          image_url: string;
          post_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          image_url: string;
          post_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          image_url?: string;
          post_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: '\bpost_images_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
        ];
      };
      posts: {
        Row: {
          content: string | null;
          created_at: string;
          group_id: string;
          id: string;
          schedule_id: string;
          user_id: string;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          group_id: string;
          id?: string;
          schedule_id: string;
          user_id: string;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          group_id?: string;
          id?: string;
          schedule_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'post_schedule_id_fkey';
            columns: ['schedule_id'];
            isOneToOne: false;
            referencedRelation: 'schedules';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'post_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'posts_group_id_fkey';
            columns: ['group_id'];
            isOneToOne: false;
            referencedRelation: 'groups';
            referencedColumns: ['id'];
          },
        ];
      };
      push_notifications: {
        Row: {
          created_at: string;
          group_id: string;
          id: string;
          is_read: boolean;
          target_user_id: string;
          type: string;
        };
        Insert: {
          created_at?: string;
          group_id?: string;
          id?: string;
          is_read?: boolean;
          target_user_id: string;
          type: string;
        };
        Update: {
          created_at?: string;
          group_id?: string;
          id?: string;
          is_read?: boolean;
          target_user_id?: string;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'push_notifications_group_id_fkey';
            columns: ['group_id'];
            isOneToOne: false;
            referencedRelation: 'groups';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'push_notifications_target_user_id_fkey';
            columns: ['target_user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      schedules: {
        Row: {
          created_at: string;
          end_date: string;
          group_id: string;
          id: string;
          memo: string | null;
          name: string;
          start_date: string;
          start_time: string;
        };
        Insert: {
          created_at?: string;
          end_date: string;
          group_id: string;
          id?: string;
          memo?: string | null;
          name: string;
          start_date: string;
          start_time: string;
        };
        Update: {
          created_at?: string;
          end_date?: string;
          group_id?: string;
          id?: string;
          memo?: string | null;
          name?: string;
          start_date?: string;
          start_time?: string;
        };
        Relationships: [
          {
            foreignKeyName: '\bschedules_group_id_fkey';
            columns: ['group_id'];
            isOneToOne: false;
            referencedRelation: 'groups';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          created_at: string;
          id: string;
          nickname: string;
          profile_image: string;
          push_token: string | null;
        };
        Insert: {
          created_at?: string;
          id: string;
          nickname: string;
          profile_image: string;
          push_token?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          nickname?: string;
          profile_image?: string;
          push_token?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes'] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
