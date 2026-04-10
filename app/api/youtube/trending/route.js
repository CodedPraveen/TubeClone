export async function GET(req) {
  try {
    const API_KEY = process.env.YOUTUBE_API_KEY

    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&maxResults=24&key=${API_KEY}`

    const res = await fetch(url)

    if (!res.ok) {
      throw new Error("YouTube API failed")
    }

    const data = await res.json()

    return Response.json(data)

  } catch (error) {
    console.error(error)

    return Response.json(
      { error: "Service unavailable" },
      { status: 503 }
    )
  }
}
