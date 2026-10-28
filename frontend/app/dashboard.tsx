'use client';

import { ChangeEvent, DragEvent, useRef, useState } from 'react';

type VideoItem = {
  id: number;
  name: string;
  size: string;
  uploadedAt: string;
  status: 'Ready' | 'Processing' | 'Queued';
  previewUrl?: string;
};



export default function Dashboard() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);



  const handleFiles = (incomingFiles: FileList | null) => {
    if (!incomingFiles) return;

   
   
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
    event.target.value = '';
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  

  const readyCount = videos.filter((video) => video.status === 'Ready').length;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            
            <h1 className="mt-2 text-3xl font-semibold text-white">Video Manager</h1>
          </div>

          <button className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/20">
            New upload
          </button>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/20">
            <p className="text-sm text-slate-400">Total videos</p>
            <div className="mt-3 flex items-end justify-between">
              <span className="text-3xl font-bold text-white">{videos.length}</span>
              <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs text-emerald-300">+12%</span>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              className={`rounded-3xl border border-dashed p-8 text-center transition ${
                isDragging
                  ? 'border-cyan-400 bg-cyan-500/5'
                  : 'border-slate-700 bg-slate-900/80'
              }`}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-2xl text-cyan-300">
                ⤴
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-white">Upload your MP4 files</h2>
              <p className="mt-2 text-sm text-slate-400">
                Drag and drop your videos here or choose files from your device.
              </p>

              <div className="mt-6 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
                >
                  Choose files
                </button>
                <button
                  type="button"
                  className="rounded-full border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-700"
                >
                  Browse library
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4"
                multiple
                onChange={onInputChange}
                className="hidden"
              />
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Recent uploads</h3>
                <button className="text-sm text-cyan-300">View all</button>
              </div>

              <div className="space-y-4">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-3"
                  >
                    <div className="flex h-20 w-28 items-center justify-center overflow-hidden rounded-xl bg-slate-800">
                      {video.previewUrl ? (
                        <video className="h-full w-full object-cover" src={video.previewUrl} muted playsInline />
                      ) : (
                        <span className="text-2xl">🎬</span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-white">{video.name}</p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
                        <span>{video.size}</span>
                        <span>•</span>
                        <span>{video.uploadedAt}</span>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        video.status === 'Ready'
                          ? 'bg-emerald-500/15 text-emerald-300'
                          : video.status === 'Processing'
                            ? 'bg-amber-500/15 text-amber-300'
                            : 'bg-slate-700 text-slate-200'
                      }`}
                    >
                      {video.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
              <h3 className="text-lg font-semibold text-white">Quick actions</h3>
              <div className="mt-4 space-y-3">
                {['Trim video', 'Add subtitles', 'Compress file', 'Export to web'].map((action) => (
                  <button
                    key={action}
                    type="button"
                    className="flex w-full items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-cyan-500/50 hover:text-white"
                  >
                    <span>{action}</span>
                    <span className="text-cyan-300">→</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
              <h3 className="text-lg font-semibold text-white">Processing queue</h3>
              <div className="mt-4 space-y-4">
                <div>
                  
                  <div className="h-2 rounded-full bg-slate-800">
                    <div className="h-2 w-[72%] rounded-full bg-cyan-400" />
                  </div>
                </div>
                <div>
                  
                  <div className="h-2 rounded-full bg-slate-800">
                    <div className="h-2 w-[42%] rounded-full bg-violet-400" />
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
