import { createClient } from "./client";


const supabase = createClient();

export async function uploadSchoolImage(file: File, folder: string) {
  const ext = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("school-assets")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("school-assets")
    .getPublicUrl(fileName);

  return data.publicUrl;
}