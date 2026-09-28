import { createClient } from "./client";

const supabase = createClient();

export async function uploadFile(
  file: File,
  folder: string
): Promise<string> {
  const ext = file.name.split(".").pop();

  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}.${ext}`;

  const path = `${folder}/${fileName}`;
const { error } = await supabase.storage
  .from("admission-documents")
  .upload(path, file);

if (error) {
  console.error("UPLOAD ERROR:", error);
  alert(JSON.stringify(error));
  throw error;
}
  const { data } = supabase.storage
    .from("admission-documents")
    .getPublicUrl(path);

  return data.publicUrl;
}