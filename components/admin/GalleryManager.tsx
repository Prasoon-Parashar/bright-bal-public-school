"use client";



import { useEffect, useMemo, useState } from "react";

import { ChevronDown, Loader2, Trash2, UploadCloud, X } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import {

  GALLERY_BUCKET,

  categoriesOf,

  groupCollections,

  storagePathFromUrl,

  type Collection,

  type GalleryRow,

} from "@/lib/gallery";



const MAX_MB = 8;



const slug = (s: string) =>

  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "gallery";



type Msg = { type: "ok" | "error"; text: string } | null;



export default function GalleryManager({ initialRows }: { initialRows: GalleryRow[] }) {

  const supabase = useMemo(() => createClient(), []);





  const [rows, setRows] = useState<GalleryRow[]>(initialRows);

  const [title, setTitle] = useState("");

  const [category, setCategory] = useState("");

  const [description, setDescription] = useState("");

  const [editing, setEditing] = useState<string | null>(null);

  const [draft, setDraft] = useState("");

  const [files, setFiles] = useState<File[]>([]);

  const [inputKey, setInputKey] = useState(0);

  const [busy, setBusy] = useState(false);

  const [progress, setProgress] = useState("");

  const [message, setMessage] = useState<Msg>(null);

  const [filter, setFilter] = useState("all");

  const [open, setOpen] = useState<string | null>(null);

   const [manageFiles, setManageFiles] = useState<File[]>([]);

const [manageInputKey, setManageInputKey] = useState(0);

const [manageBusy, setManageBusy] = useState(false);



  const previews = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);

  useEffect(() => () => previews.forEach((u) => URL.revokeObjectURL(u)), [previews]);



  const collections = useMemo(() => groupCollections(rows), [rows]);

  const categories = useMemo(() => categoriesOf(collections), [collections]);

  const visible =

    filter === "all"

      ? collections

      : collections.filter((c) => c.category.toLowerCase() === filter);



  const titles = collections.map((c) => c.title);



  /* Re-use the exact spelling of an existing title / category */

  const canonicalTitle = () =>

    titles.find((t) => t.toLowerCase() === title.trim().toLowerCase()) ?? title.trim();

  const canonicalCategory = () =>

    categories.find((c) => c.key === category.trim().toLowerCase())?.name ?? category.trim();



  async function handleUpload(e: React.FormEvent) {

    e.preventDefault();

    const t = canonicalTitle();

    const c = canonicalCategory();

    const d = description.trim();



    if (!t || !c) return setMessage({ type: "error", text: "Please enter both Gallery Title and Category." });

    if (files.length === 0) return setMessage({ type: "error", text: "Please choose at least one photo." });

    if (files.some((f) => f.size > MAX_MB * 1024 * 1024))

      return setMessage({ type: "error", text: `Each photo must be smaller than ${MAX_MB} MB.` });



    setBusy(true);

    setMessage(null);



    const uploaded: { title: string; category: string; description: string | null; image_url: string }[] = [];

    let failed = 0;



    for (let i = 0; i < files.length; i++) {

      setProgress(`Uploading ${i + 1} of ${files.length}...`);

      const file = files[i];

      const path = `${slug(t)}/${Date.now()}-${i}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;



      const { error } = await supabase.storage

        .from(GALLERY_BUCKET)

        .upload(path, file, { cacheControl: "3600", upsert: false });



      if (error) {

        failed++;

        continue;

      }



      const { data } = supabase.storage.from(GALLERY_BUCKET).getPublicUrl(path);

      uploaded.push({ title: t, category: c, description: d || null, image_url: data.publicUrl });

    }



    if (uploaded.length > 0) {

      const { data, error } = await supabase

        .from("gallery")

        .insert(uploaded)

        .select("id,title,image_url,category,description,created_at");



      if (error) {

        setMessage({ type: "error", text: `Photos uploaded but saving failed: ${error.message}` });

      } else {

        setRows((prev) => [...((data ?? []) as GalleryRow[]), ...prev]);

        setMessage({

          type: failed ? "error" : "ok",

          text: failed

            ? `${uploaded.length} photo(s) added, ${failed} failed.`

            : `${uploaded.length} photo(s) added to "${t}".`,

        });

        setFiles([]);

        setInputKey((k) => k + 1);

        setTitle("");

        setDescription("");

      }

    } else {

      setMessage({ type: "error", text: "Upload failed. Check the bucket name and permissions." });

    }



    setProgress("");

    setBusy(false);

  }






async function addPhotosToCollection(c: Collection) {

  if (manageFiles.length === 0) return;



  const oversized = manageFiles.find(

    (file) => file.size > MAX_MB * 1024 * 1024

  );



  if (oversized) {

    setMessage({

      type: "error",

      text: `Each photo must be under ${MAX_MB} MB.`,

    });

    return;

  }



  setManageBusy(true);

  setMessage(null);



  const uploaded: { path: string; image_url: string }[] = [];



  try {

    for (let i = 0; i < manageFiles.length; i++) {

      const file = manageFiles[i];



      const path = `${slug(c.title)}/${Date.now()}-${i}-${file.name.replace(

        /[^a-zA-Z0-9._-]/g,

        "_"

      )}`;



      const { error: uploadError } = await supabase.storage

        .from(GALLERY_BUCKET)

        .upload(path, file);



      if (uploadError) throw uploadError;



      const { data } = supabase.storage

        .from(GALLERY_BUCKET)

        .getPublicUrl(path);



      uploaded.push({

        path,

        image_url: data.publicUrl,

      });

    }



    const newRows = uploaded.map((photo) => ({

      title: c.title,

      category: c.category,

      description: c.description || null,

      image_url: photo.image_url,

    }));



    const { data, error } = await supabase

      .from("gallery")

      .insert(newRows)

      .select("id,title,image_url,category,description,created_at");



    if (error) throw error;



    setRows((prev) => [...(data as GalleryRow[]), ...prev]);

    setManageFiles([]);

    setManageInputKey((prev) => prev + 1);



    setMessage({

      type: "ok",

      text: `${data.length} photo(s) added to "${c.title}".`,

    });

  } catch (error) {

    // Remove uploaded files if the database insert fails.

    if (uploaded.length > 0) {

      await supabase.storage

        .from(GALLERY_BUCKET)

        .remove(uploaded.map((photo) => photo.path));

    }



    setMessage({

      type: "error",

      text:

        error instanceof Error

          ? error.message

          : "Failed to add photos to the collection.",

    });

  } finally {

    setManageBusy(false);

  }

}




  async function removeRows(ids: GalleryRow["id"][], urls: string[]) {

    const paths = urls.map(storagePathFromUrl).filter((p): p is string => !!p);

    if (paths.length) await supabase.storage.from(GALLERY_BUCKET).remove(paths);



    const { error } = await supabase.from("gallery").delete().in("id", ids);

    if (error) {

      setMessage({ type: "error", text: `Delete failed: ${error.message}` });

      return;

    }

    setRows((prev) => prev.filter((r) => !ids.includes(r.id)));

  }



  /* Picking an existing title fills in its category + description */

  function handleTitleChange(value: string) {

    setTitle(value);

    const match = collections.find((c) => c.title.toLowerCase() === value.trim().toLowerCase());

    if (match) {

      if (!category.trim()) setCategory(match.category);

      if (!description.trim()) setDescription(match.description);

    }

  }



  async function saveDescription(ids: GalleryRow["id"][]) {

    const value = draft.trim() || null;

    const { error } = await supabase.from("gallery").update({ description: value }).in("id", ids);

    if (error) {

      setMessage({ type: "error", text: `Could not save description: ${error.message}` });

      return;

    }

    setRows((prev) => prev.map((r) => (ids.includes(r.id) ? { ...r, description: value } : r)));

    setEditing(null);

  }



  return (

    <div className="space-y-8">

      {/* ================= UPLOAD FORM ================= */}

      <form

        onSubmit={handleUpload}

        className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm [color-scheme:light] sm:p-8"

      >

        <div className="flex items-center gap-4">

          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#C62828]">

            <UploadCloud size={26} />

          </span>

          <div>

            <h2 className="text-2xl font-black text-[#101B33]">Upload Gallery Photos</h2>

            <p className="text-slate-500">Photos with the same title and category form one collection.</p>

          </div>

        </div>



        <div className="mt-7 grid gap-5 md:grid-cols-2">

          <div>

            <label className="text-sm font-bold text-[#101B33]">Gallery Title</label>

            <input

              list="gallery-titles"

              value={title}

              onChange={(e) => handleTitleChange(e.target.value)}

              placeholder="e.g. Janmashtami"

              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white text-[#101B33] caret-[#C62828] placeholder:text-slate-400 px-4 py-3.5 outline-none transition focus:border-[#C62828] focus:ring-4 focus:ring-red-100"

            />

            <datalist id="gallery-titles">

              {titles.map((t) => (

                <option key={t} value={t} />

              ))}

            </datalist>

            <p className="mt-1.5 text-xs text-slate-400">Pick an existing title to add more photos to it.</p>

          </div>



          <div>

            <label className="text-sm font-bold text-[#101B33]">Category</label>

            <input

              list="gallery-categories"

              value={category}

              onChange={(e) => setCategory(e.target.value)}

              placeholder="e.g. Cultural, Academics, Sports"

              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white text-[#101B33] caret-[#C62828] placeholder:text-slate-400 px-4 py-3.5 outline-none transition focus:border-[#C62828] focus:ring-4 focus:ring-red-100"

            />

            <datalist id="gallery-categories">

              {categories.map((c) => (

                <option key={c.key} value={c.name} />

              ))}

            </datalist>

            <p className="mt-1.5 text-xs text-slate-400">Type anything new, or pick one you already used.</p>

          </div>

        </div>



        <div className="mt-5">

          <label className="text-sm font-bold text-[#101B33]">

            Description <span className="font-normal text-slate-400">(optional)</span>

          </label>

          <textarea

            value={description}

            onChange={(e) => setDescription(e.target.value)}

            rows={3}

            maxLength={400}

            placeholder="e.g. Students celebrated Janmashtami with dance, songs and dahi handi."

            className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-white text-[#101B33] caret-[#C62828] placeholder:text-slate-400 px-4 py-3.5 outline-none transition focus:border-[#C62828] focus:ring-4 focus:ring-red-100"

          />

          <p className="mt-1.5 text-xs text-slate-400">{description.length}/400 • shown with this collection on the website</p>

        </div>



        <div className="mt-6">

          <label className="text-sm font-bold text-[#101B33]">Select Photos</label>

          <div className="mt-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-4">

            <input

              key={inputKey}

              type="file"

              accept="image/*"

              multiple

              onChange={(e) =>

                setFiles(Array.from(e.target.files ?? []).filter((f) => f.type.startsWith("image/")))

              }

              className="block w-full text-sm text-slate-600 file:mr-4 file:cursor-pointer file:rounded-xl file:border-0 file:bg-[#C62828] file:px-5 file:py-2.5 file:font-bold file:text-white hover:file:bg-[#B71C1C]"

            />



            {previews.length > 0 && (

              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-8">

                {previews.map((src, i) => (

                  // eslint-disable-next-line @next/next/no-img-element

                  <img key={src} src={src} alt={`Preview ${i + 1}`} className="aspect-square w-full rounded-xl object-cover" />

                ))}

              </div>

            )}

            {files.length > 0 && (

              <p className="mt-3 text-xs font-semibold text-slate-500">{files.length} photo(s) selected</p>

            )}

          </div>

        </div>



        {message && (

          <p

            className={`mt-5 rounded-xl px-4 py-3 text-sm font-semibold ${

              message.type === "ok" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"

            }`}

          >

            {message.text}

          </p>

        )}



        <button

          type="submit"

          disabled={busy}

          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#C62828] to-[#E53935] py-4 font-bold text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"

        >

          {busy ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}

          {busy ? progress || "Uploading..." : "Upload All Photos"}

        </button>

      </form>



      {/* ================= COLLECTIONS ================= */}

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

        <div className="flex flex-wrap items-end justify-between gap-3">

          <div>

            <h2 className="text-2xl font-black text-[#101B33]">Your Collections</h2>

            <p className="text-slate-500">

              {collections.length} collection(s) • {rows.length} photo(s)

            </p>

          </div>

        </div>



        {/* Filter */}

        <div className="mt-5 flex flex-wrap gap-2">

          {[{ key: "all", name: "All", count: collections.length }, ...categories].map((c) => (

            <button

              key={c.key}

              type="button"

              onClick={() => setFilter(c.key)}

              className={`rounded-full px-4 py-2 text-sm font-bold transition ${

                filter === c.key

                  ? "bg-[#C62828] text-white shadow-md shadow-red-500/20"

                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"

              }`}

            >

              {c.name} <span className="opacity-70">({c.count})</span>

            </button>

          ))}

        </div>



        {visible.length === 0 ? (

          <p className="mt-8 rounded-2xl bg-slate-50 p-10 text-center text-slate-500">

            No photos here yet. Upload some above.

          </p>

        ) : (

          <div className="mt-6 space-y-4">

            {visible.map((c) => {

              const isOpen = open === c.key;

              return (

                <div key={c.key} className="overflow-hidden rounded-2xl border border-slate-200">

                  <div className="flex flex-wrap items-center gap-4 p-4">

                    {/* eslint-disable-next-line @next/next/no-img-element */}

                    <img src={c.cover} alt={c.title} className="h-16 w-16 rounded-xl object-cover" />

                    <div className="min-w-0 flex-1">

                      <p className="truncate text-lg font-extrabold text-[#101B33]">{c.title}</p>

                      <div className="mt-1 flex items-center gap-2 text-xs">

                        <span className="rounded-full bg-red-50 px-2.5 py-1 font-bold text-[#C62828]">{c.category}</span>

                        <span className="text-slate-500">{c.photos.length} photo(s)</span>

                      </div>

                      {c.description && (

                        <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">{c.description}</p>

                      )}

                      <button

                        type="button"

                        onClick={() => {

                          setEditing(editing === c.key ? null : c.key);

                          setDraft(c.description);

                        }}

                        className="mt-1.5 text-xs font-bold text-[#1565C0] hover:underline"

                      >

                        {c.description ? "Edit description" : "+ Add description"}

                      </button>

                    </div>



                    <button

                      type="button"

                      onClick={() => setOpen(isOpen ? null : c.key)}

                      className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3.5 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200"

                    >

                      Manage photos

                      <ChevronDown size={16} className={`transition ${isOpen ? "rotate-180" : ""}`} />

                    </button>

                    <button

                      type="button"

                      onClick={() => {

                        if (confirm(`Delete the whole collection "${c.title}" (${c.photos.length} photos)?`))

                          removeRows(c.photos.map((p) => p.id), c.photos.map((p) => p.image_url));

                      }}

                      className="inline-flex items-center gap-1.5 rounded-xl bg-red-50 px-3.5 py-2 text-sm font-bold text-[#C62828] hover:bg-red-100"

                    >

                      <Trash2 size={15} /> Delete

                    </button>

                  </div>



                  {editing === c.key && (

                    <div className="border-t border-slate-100 bg-slate-50/60 p-4">

                      <textarea

                        value={draft}

                        onChange={(e) => setDraft(e.target.value)}

                        rows={3}

                        maxLength={400}

                        placeholder="Write a short description for this collection"

                        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#101B33] caret-[#C62828] placeholder:text-slate-400 outline-none focus:border-[#C62828] focus:ring-4 focus:ring-red-100"

                      />

                      <div className="mt-3 flex gap-2">

                        <button

                          type="button"

                          onClick={() => saveDescription(c.photos.map((p) => p.id))}

                          className="rounded-xl bg-[#C62828] px-4 py-2 text-sm font-bold text-white hover:bg-[#B71C1C]"

                        >

                          Save

                        </button>

                        <button

                          type="button"

                          onClick={() => setEditing(null)}

                          className="rounded-xl bg-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-300"

                        >

                          Cancel

                        </button>

                      </div>

                    </div>

                  )}



                  {isOpen && (



                    <div className="grid grid-cols-3 gap-3 border-t border-slate-100 bg-slate-50/60 p-4 sm:grid-cols-5 lg:grid-cols-8">

                        <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-4">

  <h3 className="font-bold text-[#101B33]">

    Add photos to {c.title}

  </h3>



  <p className="mt-1 text-sm text-slate-500">

    Selected photos will automatically use the existing collection's

    title, category and description.

  </p>



  <input

    key={`${c.key}-${manageInputKey}`}

    type="file"

    accept="image/*"

    multiple

    onChange={(e) =>

      setManageFiles(

        Array.from(e.target.files ?? []).filter((f) =>

          f.type.startsWith("image/")

        )

      )

    }

    className="mt-3 block w-full text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-[#C62828] file:px-4 file:py-2 file:font-bold file:text-white"

  />



  {manageFiles.length > 0 && (

    <p className="mt-2 text-sm font-semibold text-slate-600">

      {manageFiles.length} photo(s) selected

    </p>

  )}



  <button

    type="button"

    disabled={manageBusy || manageFiles.length === 0}

    onClick={() => addPhotosToCollection(c)}

    className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#C62828] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#B71C1C] disabled:cursor-not-allowed disabled:opacity-50"

  >

    {manageBusy ? (

      <Loader2 size={16} className="animate-spin" />

    ) : (

      <UploadCloud size={16} />

    )}

    {manageBusy ? "Uploading..." : "Add Photos to Collection"}

  </button>

</div>

                      {c.photos.map((p) => (

                        <div key={p.id} className="group relative">

                          {/* eslint-disable-next-line @next/next/no-img-element */}



                          <img src={p.image_url} alt={c.title} className="aspect-square w-full rounded-xl object-cover" />

                          <button

                            type="button"

                            aria-label="Delete photo"

                            onClick={() => {



                              if (confirm("Delete this photo?")) removeRows([p.id], [p.image_url]);

                            }}

                            className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition hover:bg-[#C62828] group-hover:opacity-100"

                          >

                            <X size={14} />

                          </button>

                        </div>

                      ))}

                    </div>

                  )}

                </div>

              );

            })}

          </div>

        )}

      </section>

    </div>

  );

}