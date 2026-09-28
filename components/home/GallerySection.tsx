import { createClient } from "@/lib/supabase/server";

export default async function GallerySection() {
  const supabase = await createClient();

  const { data: images } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(8);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center mb-14">
          <h2 className="text-5xl font-black">
            Moments From Our
            <span className="text-red-600"> School</span>
          </h2>

          <p className="mt-4 text-slate-600">
            A glimpse into learning, celebrations and activities.
          </p>
        </div>

        <div className="grid gap-5 grid-cols-2 md:grid-cols-4">

          {images?.map((img) => (
            <div
              key={img.id}
              className="group overflow-hidden rounded-3xl shadow-lg"
            >
              <img
                src={img.image_url}
                alt={img.title}
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="bg-white p-4">
                <h3 className="font-semibold text-slate-800 truncate">
                  {img.title}
                </h3>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
