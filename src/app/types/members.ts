export interface BaseMember {
  id?: string
  name: string
  title: string
  image: string
  image_path?: string // Supabase storage path
  created_at?: string
  updated_at?: string
}

export interface ExecMember extends BaseMember {
  // Executive-specific properties can be added here
}

export interface Member extends BaseMember {
  // General member properties can be added here
}

export interface ProjectManager extends BaseMember {
  // Project manager specific properties can be added here
}
