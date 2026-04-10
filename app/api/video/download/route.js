import { Readable } from "stream";
import ytdl from "@distube/ytdl-core";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const ID_RE = /^[a-zA-Z0-9_-]{11}$/;

function sanitizeFilename(name) {
  return (name || "video")
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "")
    .trim()
    .slice(0, 120) || "video";
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = (searchParams.get("id") || "").trim();
  if (!ID_RE.test(id)) {
    return NextResponse.json({ error: "Invalid video id" }, { status: 400 });
  }

  try {
    const info = await ytdl.getInfo(id);
    const title = sanitizeFilename(info.videoDetails?.title);
    const format = ytdl.chooseFormat(info.formats, {
      filter: "videoandaudio",
      quality: "highest",
    });
    if (!format) {
      return NextResponse.json(
        { error: "No combined video+audio format available for this video" },
        { status: 422 }
      );
    }

    const nodeStream = ytdl.downloadFromInfo(info, { format });
    const webStream = Readable.toWeb(nodeStream);

    return new NextResponse(webStream, {
      headers: {
        "Content-Type": format.mimeType || "video/mp4",
        "Content-Disposition": `attachment; filename="${title}.mp4"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    const msg = e?.message || "Download failed";
    return NextResponse.json(
      { error: msg },
      { status: msg.includes("410") || msg.includes("private") ? 403 : 500 }
    );
  }
}
