"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";

type AdminApplication = {
  id: string; full_name: string; email: string; country_city: string; age: number;
  messenger: string; timezone: string; status: string; created_at: string;
  submitted_at: string | null; file_count: number; photo_count: number; video_count: number;
};
type AdminFile = {
  id: string; kind: string; file_name: string; content_type: string; file_size: number; created_at: string;
};
type AdminDetail = AdminApplication & {
  language: string; motivation: string; experience: string; hours_per_week: string;
  preferred_schedule: string; content_comfort: string; strongest_features: string;
  equipment: string; english_level: string; relocation_open: string; additional_info: string;
  files: AdminFile[];
};
type Preview = { file: AdminFile; url: string };

export default function AdminPage() {
  const [token, setToken] = useState(readStoredToken);
  const [savedToken, setSavedToken] = useState(readStoredToken);
  const [applications, setApplications] = useState<AdminApplication[]>([]);
  const [detail, setDetail] = useState<AdminDetail | null>(null);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [lightbox, setLightbox] = useState<Preview | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "submitted" | "draft">("all");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (savedToken) void loadApplications(savedToken);
  }, []);

  const visibleApplications = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return applications.filter((application) => {
      const matchesFilter = filter === "all" || application.status === filter;
      const searchable = [application.full_name, application.email, application.country_city, application.messenger].join(" ").toLowerCase();
      return matchesFilter && (!normalized || searchable.includes(normalized));
    });
  }, [applications, filter, query]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sessionStorage.setItem("sg-admin-token", token);
    setSavedToken(token);
    await loadApplications(token);
  }

  async function loadApplications(accessToken = savedToken) {
    if (!accessToken) return;
    setLoading(true); setMessage("");
    try {
      const response = await fetch("/api/admin/applications", { headers: { authorization: `Bearer ${accessToken}` } });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Unable to load applications.");
      setApplications(payload.applications ?? []);
      if (detail && !payload.applications.some((item: AdminApplication) => item.id === detail.id)) setDetail(null);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unexpected error");
    } finally { setLoading(false); }
  }

  async function loadDetail(id: string) {
    setLoading(true); setMessage("");
    try {
      const response = await fetch(`/api/admin/applications/${id}`, { headers: { authorization: `Bearer ${savedToken}` } });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Unable to load application.");
      setDetail(payload.application);
      await loadPreviews(payload.application.files ?? []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unexpected error");
    } finally { setLoading(false); }
  }

  async function loadPreviews(files: AdminFile[]) {
    const entries = await Promise.all(files.map(async (file) => {
      if (!file.content_type.startsWith("image/") && !file.content_type.startsWith("video/")) return null;
      const response = await fetch(`/api/admin/media/${file.id}`, { headers: { authorization: `Bearer ${savedToken}` } });
      if (!response.ok) return null;
      const url = URL.createObjectURL(await response.blob());
      return [file.id, url] as const;
    }));
    setPreviews((current) => ({ ...current, ...Object.fromEntries(entries.filter(Boolean) as Array<readonly [string, string]>) }));
  }

  async function downloadFile(file: AdminFile) {
    const response = await fetch(`/api/admin/media/${file.id}`, { headers: { authorization: `Bearer ${savedToken}` } });
    if (!response.ok) { setMessage("File could not be downloaded."); return; }
    const href = URL.createObjectURL(await response.blob());
    const link = document.createElement("a"); link.href = href; link.download = file.file_name;
    document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(href);
  }

  async function deleteApplication() {
    if (!detail || !window.confirm(`Delete the application from ${detail.full_name}? This also removes its portfolio files.`)) return;
    setLoading(true); setMessage("");
    try {
      const response = await fetch(`/api/admin/applications/${detail.id}`, {
        method: "DELETE", headers: { authorization: `Bearer ${savedToken}` },
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Unable to delete application.");
      setDetail(null); setPreviews({});
      setMessage("Application and its media were deleted.");
      await loadApplications();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unexpected error");
    } finally { setLoading(false); }
  }

  function signOut() {
    sessionStorage.removeItem("sg-admin-token"); setSavedToken(""); setToken(""); setApplications([]); setDetail(null);
  }

  if (!savedToken) {
    return (
      <main className="admin-login-shell">
        <section className="admin-login-card">
          <div className="admin-brandline"><span className="admin-brand-dot" /> Strawberry Glam Models / Admin</div>
          <p className="eyebrow">Private review workspace</p>
          <h1>Application inbox</h1>
          <p className="admin-muted">Review candidates, open submitted media securely and manage applications from one protected workspace.</p>
          <form className="admin-login-form" onSubmit={handleLogin}>
            <label className="field"><span>Admin access key</span><input autoFocus type="password" value={token} onChange={(event) => setToken(event.target.value)} /></label>
            <button className="primary-form-button" type="submit">Open inbox</button>
          </form>
          {message && <p className="admin-message" role="alert">{message}</p>}
        </section>
      </main>
    );
  }

  const submittedCount = applications.filter((item) => item.status === "submitted").length;
  const draftCount = applications.filter((item) => item.status === "draft").length;

  return (
    <main className="admin-shell">
      <div className="admin-workspace">
        <header className="admin-topbar">
          <div><p className="eyebrow">Strawberry Glam Models</p><h1>Application inbox</h1><p className="admin-muted">Private candidate review and media vault.</p></div>
          <div className="admin-top-actions"><button className="admin-quiet-button" type="button" onClick={() => loadApplications()}>Refresh</button><button className="admin-quiet-button" type="button" onClick={signOut}>Sign out</button></div>
        </header>
        {message && <p className="admin-message" role="alert">{message}</p>}
        <section className="admin-toolbar">
          <label className="admin-search"><span>Search applications</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, email, city or messenger" /></label>
          <div className="admin-filter-group">
            {([["all", `All ${applications.length}`], ["submitted", `Submitted ${submittedCount}`], ["draft", `Drafts ${draftCount}`]] as const).map(([value, label]) => <button className={filter === value ? "active" : ""} key={value} type="button" onClick={() => setFilter(value)}>{label}</button>)}
          </div>
        </section>
        <section className="admin-workspace-grid">
          <div className="admin-list-panel">
            <div className="admin-panel-heading"><div><p className="eyebrow">Candidates</p><h2>Applications</h2></div><span className="admin-count-label">{visibleApplications.length} shown</span></div>
            <div className="admin-application-list">
              {loading && <p className="admin-muted">Loading secure inbox...</p>}
              {!loading && !visibleApplications.length && <p className="admin-empty">No applications match this filter.</p>}
              {visibleApplications.map((application) => <button className={detail?.id === application.id ? "admin-application-card selected" : "admin-application-card"} key={application.id} type="button" onClick={() => loadDetail(application.id)}>
                <span className="admin-card-main"><strong>{application.full_name || "Unnamed candidate"}</strong><small>{application.email}</small><small>{application.country_city || "Location not provided"}</small></span>
                <span className="admin-card-side"><span className={`admin-status ${application.status}`}>{application.status}</span><small>{application.photo_count} photos / {application.video_count} videos</small><small>{formatDate(application.created_at)}</small></span>
              </button>)}
            </div>
          </div>
          <div className="admin-detail-panel">
            {!detail ? <div className="admin-detail-empty"><span className="admin-empty-mark">+</span><p>Select an application to review its profile and media.</p></div> : <ApplicationDetail detail={detail} previews={previews} onPreview={(file) => previews[file.id] && setLightbox({ file, url: previews[file.id] })} onDownload={downloadFile} onDelete={deleteApplication} />}
          </div>
        </section>
      </div>
      {lightbox && <div className="admin-lightbox" role="dialog" aria-modal="true"><button className="admin-lightbox-backdrop" aria-label="Close preview" type="button" onClick={() => setLightbox(null)} /><div className="admin-lightbox-content"><div className="admin-lightbox-heading"><strong>{lightbox.file.file_name}</strong><div><button type="button" onClick={() => downloadFile(lightbox.file)}>Download</button><button type="button" onClick={() => setLightbox(null)}>Close</button></div></div>{lightbox.file.content_type.startsWith("video/") ? <video controls autoPlay src={lightbox.url} /> : <img src={lightbox.url} alt={lightbox.file.file_name} />}</div></div>}
    </main>
  );
}

function ApplicationDetail({ detail, previews, onPreview, onDownload, onDelete }: { detail: AdminDetail; previews: Record<string, string>; onPreview: (file: AdminFile) => void; onDownload: (file: AdminFile) => void; onDelete: () => void }) {
  const answers = [["Motivation", detail.motivation], ["Experience", detail.experience], ["Hours per week", detail.hours_per_week], ["Schedule", detail.preferred_schedule], ["Content comfort", detail.content_comfort], ["Strongest features", detail.strongest_features], ["Equipment", detail.equipment], ["Additional info", detail.additional_info]];
  return <article>
    <header className="admin-detail-heading"><div><span className={`admin-status ${detail.status}`}>{detail.status}</span><h2>{detail.full_name || "Unnamed candidate"}</h2><div className="admin-detail-meta"><span>{detail.age} years</span><span>{detail.country_city}</span><span>{detail.email}</span><span>{detail.language?.toUpperCase()}</span></div></div><button className="admin-delete-button" type="button" onClick={onDelete}>Delete application</button></header>
    <dl className="admin-facts"><div><dt>Messenger</dt><dd>{detail.messenger || "Not provided"}</dd></div><div><dt>Time zone</dt><dd>{detail.timezone || "Not provided"}</dd></div><div><dt>English</dt><dd>{detail.english_level || "Not provided"}</dd></div><div><dt>Relocation</dt><dd>{detail.relocation_open || "Not provided"}</dd></div></dl>
    <div className="admin-answers">{answers.map(([label, value]) => <section key={label}><h3>{label}</h3><p>{value || "Not provided"}</p></section>)}</div>
    <div className="admin-files"><div className="admin-files-heading"><div><p className="eyebrow">Private media</p><h3>Portfolio</h3></div><span>{detail.files.length} files attached to this application</span></div><div className="admin-media-grid">{detail.files.map((file) => <button className="admin-media-card" key={file.id} type="button" onClick={() => onPreview(file)}><span className="admin-media-thumb">{previews[file.id] ? (file.content_type.startsWith("video/") ? <video muted src={previews[file.id]} /> : <img src={previews[file.id]} alt="" />) : <span>{file.kind.toUpperCase()}</span>}</span><span className="admin-media-copy"><strong>{file.file_name}</strong><small>{file.kind} / {formatBytes(file.file_size)}</small><span className="admin-media-actions"><span>Preview</span><span onClick={(event) => { event.stopPropagation(); onDownload(file); }}>Download</span></span></span></button>)}</div></div>
  </article>;
}

function readStoredToken() { return typeof window === "undefined" ? "" : sessionStorage.getItem("sg-admin-token") ?? ""; }
function formatDate(value: string) { return value ? new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value)) : "Unknown date"; }
function formatBytes(bytes: number) { if (!bytes) return "0 B"; const units = ["B", "KB", "MB", "GB"]; let value = bytes; let index = 0; while (value >= 1024 && index < units.length - 1) { value /= 1024; index += 1; } return `${value.toFixed(index ? 1 : 0)} ${units[index]}`; }
