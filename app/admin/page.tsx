"use client";

import { type FormEvent, useState } from "react";

type AdminApplication = {
  id: string;
  full_name: string;
  email: string;
  country_city: string;
  age: number;
  messenger: string;
  timezone: string;
  status: string;
  created_at: string;
  submitted_at: string | null;
  file_count: number;
  photo_count: number;
  video_count: number;
};

type AdminFile = {
  id: string;
  kind: string;
  file_name: string;
  content_type: string;
  file_size: number;
  created_at: string;
};

type AdminDetail = AdminApplication & {
  language: string;
  motivation: string;
  experience: string;
  hours_per_week: string;
  preferred_schedule: string;
  content_comfort: string;
  strongest_features: string;
  equipment: string;
  english_level: string;
  relocation_open: string;
  additional_info: string;
  files: AdminFile[];
};

export default function AdminPage() {
  const [token, setToken] = useState(readStoredToken);
  const [savedToken, setSavedToken] = useState("");
  const [applications, setApplications] = useState<AdminApplication[]>([]);
  const [detail, setDetail] = useState<AdminDetail | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sessionStorage.setItem("sg-admin-token", token);
    setSavedToken(token);
    await loadApplications(token);
  }

  async function loadApplications(accessToken = savedToken) {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/applications", {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to load applications.");
      }

      setApplications(payload.applications);
      setDetail(null);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  async function loadDetail(id: string) {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`/api/admin/applications/${id}`, {
        headers: { authorization: `Bearer ${savedToken}` },
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to load application.");
      }

      setDetail(payload.application);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  async function downloadFile(file: AdminFile) {
    const response = await fetch(`/api/admin/media/${file.id}`, {
      headers: { authorization: `Bearer ${savedToken}` },
    });

    if (!response.ok) {
      setMessage("File could not be downloaded.");
      return;
    }

    const blob = await response.blob();
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = file.file_name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(href);
  }

  return (
    <main className="admin-shell">
      <section className="admin-login">
        <div>
          <p className="eyebrow">Strawberry Glam Models</p>
          <h1>Application Review</h1>
          <p>Protected inbox for submitted model applications and portfolio files.</p>
        </div>
        <form onSubmit={handleLogin}>
          <label className="field">
            <span>Admin access key</span>
            <input
              type="password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
            />
          </label>
          <button className="primary-form-button" type="submit">
            Open inbox
          </button>
        </form>
      </section>

      {message && <div className="admin-message">{message}</div>}

      {savedToken && (
        <section className="admin-grid">
          <div className="admin-list">
            <div className="admin-list-header">
              <h2>Applications</h2>
              <button type="button" onClick={() => loadApplications()}>
                Refresh
              </button>
            </div>
            {loading && <p>Loading...</p>}
            {applications.map((application) => (
              <button
                className="admin-row"
                key={application.id}
                type="button"
                onClick={() => loadDetail(application.id)}
              >
                <span>
                  <strong>{application.full_name}</strong>
                  {application.country_city}
                </span>
                <span>
                  {application.photo_count} photos / {application.video_count} videos
                </span>
              </button>
            ))}
          </div>

          <div className="admin-detail">
            {detail ? (
              <>
                <div className="admin-detail-heading">
                  <div>
                    <p className="eyebrow">{detail.status}</p>
                    <h2>{detail.full_name}</h2>
                    <p>
                      {detail.age} • {detail.country_city} • {detail.email}
                    </p>
                  </div>
                  <span>{detail.language.toUpperCase()}</span>
                </div>

                <dl className="admin-facts">
                  <div>
                    <dt>Messenger</dt>
                    <dd>{detail.messenger}</dd>
                  </div>
                  <div>
                    <dt>Time zone</dt>
                    <dd>{detail.timezone}</dd>
                  </div>
                  <div>
                    <dt>English</dt>
                    <dd>{detail.english_level}</dd>
                  </div>
                  <div>
                    <dt>Relocation</dt>
                    <dd>{detail.relocation_open}</dd>
                  </div>
                </dl>

                <div className="admin-answers">
                  {[
                    ["Motivation", detail.motivation],
                    ["Experience", detail.experience],
                    ["Hours per week", detail.hours_per_week],
                    ["Schedule", detail.preferred_schedule],
                    ["Content comfort", detail.content_comfort],
                    ["Strongest features", detail.strongest_features],
                    ["Equipment", detail.equipment],
                    ["Additional info", detail.additional_info],
                  ].map(([label, value]) => (
                    <section key={label}>
                      <h3>{label}</h3>
                      <p>{value}</p>
                    </section>
                  ))}
                </div>

                <div className="admin-files">
                  <h3>Portfolio files</h3>
                  {detail.files.map((file) => (
                    <button key={file.id} type="button" onClick={() => downloadFile(file)}>
                      <span>{file.file_name}</span>
                      <span>
                        {file.kind} • {formatBytes(file.file_size)}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p>Select an application to review.</p>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

function readStoredToken() {
  if (typeof window === "undefined") {
    return "";
  }

  return sessionStorage.getItem("sg-admin-token") ?? "";
}

function formatBytes(bytes: number) {
  if (!bytes) {
    return "0 MB";
  }

  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}
